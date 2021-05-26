import MultiCallAbi from "./abi/Multicall.json";
import erc20 from "./abi/erc20.json";
import BigNumber from "bignumber.js";
import {ContractAddresses} from "./configs/ContractAddresses";
import {Interface} from "@ethersproject/abi";
import {aurumFarmsConfig} from "./configs/aurumFarms";
import {mistFarmsConfig} from "./configs/mistFarms";
// import {farmsConfig} from "./configs/farms";

import Web3 from "web3";
import {TokenSymbols} from "./configs/TokenSymbols";
import {failure, success} from "./response-lib";

const ZERO = new BigNumber(0);
const web3 = new Web3(process.env.Provider);
const multi = new web3.eth.Contract(MultiCallAbi, ContractAddresses.multiCall);

export async function getMistTVL() {
    try {        
        const farms = await fetchMistFarms();
        const bnbbusdFarm = farms.find(f => f.pid === 2);
        const mistbusdFarm = farms.find(f => f.pid === 0);
        const bnbPrice = bnbbusdFarm.tokenPriceVsQuote ? new BigNumber(bnbbusdFarm.tokenPriceVsQuote) : ZERO;
        const mistPrice = mistbusdFarm.tokenPriceVsQuote ? new BigNumber(mistbusdFarm.tokenPriceVsQuote) : ZERO;        

        let value = new BigNumber(0);
        for (let i = 0; i < farms.length; i++) {
            const farm = farms[i]
            if (farm.lpTotalInQuoteToken) {
                let val;
                if (farm.quoteTokenSymbol === TokenSymbols.BNB) {
                    val = (bnbPrice.times(farm.lpTotalInQuoteToken));
                } else if (farm.quoteTokenSymbol === TokenSymbols.MIST){
                    val = (mistPrice.times(farm.lpTotalInQuoteToken));
                } else {
                    val = (farm.lpTotalInQuoteToken);
                }
                value = value.plus(val);
            }
        }
        return success(value.toFixed(2));
    } catch (e) {
        return failure(e);
    }
}

export async function getAurumTVL() {
    try {        
        const farms = await fetchAurumFarms();
        const bnbbusdFarm = farms.find(f => f.pid === 2);
        const aurumbusdFarm = farms.find(f => f.pid === 0);
        const mistbusdFarm = farms.find(f => f.pid === 3);
        const bnbPrice = bnbbusdFarm.tokenPriceVsQuote ? new BigNumber(bnbbusdFarm.tokenPriceVsQuote) : ZERO;
        const aurumPrice = aurumbusdFarm.tokenPriceVsQuote ? new BigNumber(aurumbusdFarm.tokenPriceVsQuote) : ZERO;        
        const mistPrice = mistbusdFarm.tokenPriceVsQuote ? new BigNumber(mistbusdFarm.tokenPriceVsQuote) : ZERO;        

        console.log ("Prices Mist(%s), Aurum(%s), bnb (%s)", mistPrice.toFixed(2), aurumPrice.toFixed(2), bnbPrice.toFixed(2))

        let value = new BigNumber(0);
        for (let i = 0; i < farms.length; i++) {
            const farm = farms[i]
            if (farm.lpTotalInQuoteToken) {
                let val;
                if (farm.quoteTokenSymbol === TokenSymbols.BNB) {
                    val = (bnbPrice.times(farm.lpTotalInQuoteToken));
                } else if (farm.quoteTokenSymbol === TokenSymbols.AURUM){
                    val = (aurumPrice.times(farm.lpTotalInQuoteToken));
                } else if (farm.quoteTokenSymbol === TokenSymbols.MIST){
                    val = (mistPrice.times(farm.lpTotalInQuoteToken));
                } else {
                    val = (farm.lpTotalInQuoteToken);
                }
                value = value.plus(val);
            }
        }
        return success(value.toFixed(2));
    } catch (e) {
        return failure(e);
    }
}


export async function getTVL() {
    try {      
        const mistTotal = getMistTVL()
        const aurumTotal = getAurumTVL() 
        
        return success(mistTotal+aurumTotal);
    } catch (e) {
        return failure(e);
    }
}


async function multicall(abi, calls) {
    const itf = new Interface(abi)
    const callData = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const {returnData} = await multi.methods.aggregate(callData).call()
    const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

    return res
}

const CHAIN_ID = 56;

async function fetchMistFarms() {
    return await Promise.all(
        mistFarmsConfig.map(async (farmConfig) => {
            const lpAddress = farmConfig.lpAddresses[CHAIN_ID]

            const calls = [
                // Balance of token in the LP contract
                {
                    address: farmConfig.tokenAddresses[CHAIN_ID],
                    name: 'balanceOf',
                    params: [lpAddress],
                },
                // Balance of quote token on LP contract
                {
                    address: farmConfig.quoteTokenAdresses[CHAIN_ID],
                    name: 'balanceOf',
                    params: [lpAddress],
                },
                // Balance of LP tokens in the master chef contract
                {
                    address: farmConfig.isTokenOnly ? farmConfig.tokenAddresses[CHAIN_ID] : lpAddress,
                    name: 'balanceOf',
                    params: [ContractAddresses.mistMasterChef],
                },
                // Total supply of LP tokens
                {
                    address: lpAddress,
                    name: 'totalSupply',
                },
                // Token decimals
                {
                    address: farmConfig.tokenAddresses[CHAIN_ID],
                    name: 'decimals',
                },
                // Quote token decimals
                {
                    address: farmConfig.quoteTokenAdresses[CHAIN_ID],
                    name: 'decimals',
                },
            ]

            const [
                tokenBalanceLP,
                quoteTokenBlanceLP,
                lpTokenBalanceMC,
                lpTotalSupply,
                tokenDecimals,
                quoteTokenDecimals
            ] = await multicall(erc20, calls)

            let tokenAmount;
            let lpTotalInQuoteToken;
            let tokenPriceVsQuote;
            if (farmConfig.isTokenOnly) {
                tokenAmount = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals));
                if (farmConfig.tokenSymbol === TokenSymbols.BUSD && farmConfig.quoteTokenSymbol === TokenSymbols.BUSD) {
                    tokenPriceVsQuote = new BigNumber(1);
                } else {
                    tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
                }
                lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote);
            } else {
                // Ratio in % a LP tokens that are in staking, vs the total number in circulation
                const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

                // Total value in staking in quote token value
                lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
                    .div(new BigNumber(10).pow(18))
                    .times(new BigNumber(2))
                    .times(lpTokenRatio)

                // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
                tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
                const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
                    .div(new BigNumber(10).pow(quoteTokenDecimals))
                    .times(lpTokenRatio)

                if (tokenAmount.comparedTo(0) > 0) {
                    tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount);
                } else {
                    tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
                }
            }
 
            return {
                ...farmConfig,
                tokenAmount: tokenAmount.toJSON(),
                lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
                tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
            }
        }),
    )
}

async function fetchAurumFarms() {
    return await Promise.all(
        aurumFarmsConfig.map(async (farmConfig) => {
            const lpAddress = farmConfig.lpAddresses[CHAIN_ID]

            const calls = [
                // Balance of token in the LP contract
                {
                    address: farmConfig.tokenAddresses[CHAIN_ID],
                    name: 'balanceOf',
                    params: [lpAddress],
                },
                // Balance of quote token on LP contract
                {
                    address: farmConfig.quoteTokenAdresses[CHAIN_ID],
                    name: 'balanceOf',
                    params: [lpAddress],
                },
                // Balance of LP tokens in the master chef contract
                {
                    address: farmConfig.isTokenOnly ? farmConfig.tokenAddresses[CHAIN_ID] : lpAddress,
                    name: 'balanceOf',
                    params: [ContractAddresses.aurumMasterChef],
                },
                // Total supply of LP tokens
                {
                    address: lpAddress,
                    name: 'totalSupply',
                },
                // Token decimals
                {
                    address: farmConfig.tokenAddresses[CHAIN_ID],
                    name: 'decimals',
                },
                // Quote token decimals
                {
                    address: farmConfig.quoteTokenAdresses[CHAIN_ID],
                    name: 'decimals',
                },
            ]

            const [
                tokenBalanceLP,
                quoteTokenBlanceLP,
                lpTokenBalanceMC,
                lpTotalSupply,
                tokenDecimals,
                quoteTokenDecimals
            ] = await multicall(erc20, calls)

            let tokenAmount;
            let lpTotalInQuoteToken;
            let tokenPriceVsQuote;
            if (farmConfig.isTokenOnly) {
                tokenAmount = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals));
                if (farmConfig.tokenSymbol === TokenSymbols.BUSD && farmConfig.quoteTokenSymbol === TokenSymbols.BUSD) {
                    tokenPriceVsQuote = new BigNumber(1);
                } else {
                    tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
                }
                lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote);
            } else {
                // Ratio in % a LP tokens that are in staking, vs the total number in circulation
                const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

                // Total value in staking in quote token value
                lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
                    .div(new BigNumber(10).pow(18))
                    .times(new BigNumber(2))
                    .times(lpTokenRatio)

                // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
                tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
                const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
                    .div(new BigNumber(10).pow(quoteTokenDecimals))
                    .times(lpTokenRatio)

                if (tokenAmount.comparedTo(0) > 0) {
                    tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount);
                } else {
                    tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
                }
            }
 
            return {
                ...farmConfig,
                tokenAmount: tokenAmount.toJSON(),
                lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
                tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
            }
        }),
    )
}