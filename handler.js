import {buildResponse, failure} from "./response-lib";
import Web3 from "web3";
import mistABI from "./abi/mistToken.json"
import aurumABI from "./abi/aurumToken.json"
import { TokenAddresses } from "./configs/TokenAddresses";
import BigNumber from "bignumber.js";

// const burnAddres = "0x000000000000000000000000000000000000dead"


const web3 = new Web3(process.env.Provider);
const mistContract = new web3.eth.Contract(mistABI, process.env.MistAddress);
const aurumContract = new web3.eth.Contract(aurumABI, process.env.AurumAddress);


export async function getMistTotalSupply() {
    try {
        const totalSupply = await mistContract.methods.totalSupply().call();
        const burnt = await mistContract.methods.balanceOf(process.env.BurnAddress).call();
        const circ = new BigNumber(totalSupply).minus(new BigNumber(burnt));
        return success(circ.shiftedBy(-18).toNumber().toString());
    } catch (e) {
        return failure(e);
    }
}

export async function getMistCirculatingSupply() {
    try {
        const totalSupply = await mistContract.methods.totalSupply().call();
        const burnt = await mistContract.methods.balanceOf(process.env.BurnAddress).call();
        const circ = new BigNumber(totalSupply).minus(new BigNumber(burnt));
        return success(circ.shiftedBy(-18).toNumber().toString());
    } catch (e) {
        return failure(e);
    }
}


export async function getAurumTotalSupply() {
    try {
        const totalSupply = await aurumContract.methods.totalSupply().call();
        const burnt = await aurumContract.methods.balanceOf(process.env.BurnAddress).call();
        const circ = new BigNumber(totalSupply).minus(new BigNumber(burnt));
        return success(circ.shiftedBy(-18).toNumber().toString());
    } catch (e) {
        return failure(e);
    }
}

export async function getAurumCirculatingSupply() {
    try {
        const totalSupply = await aurumContract.methods.totalSupply().call();
        const burnt = await aurumContract.methods.balanceOf(process.env.BurnAddress).call();
        const circ = new BigNumber(totalSupply).minus(new BigNumber(burnt));
        return success(circ.shiftedBy(-18).toNumber().toString());
    } catch (e) {
        return failure(e);
    }
}


function success(body){
    return buildResponse(200, body, {"Cache-Control": "max-age=500"});
}