import {TokenAddresses as contracts} from "./TokenAddresses";
import {TokenSymbols as QuoteToken} from "./TokenSymbols";

export const mistFarmsConfig = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'MIST-BUSD LP',
    lpAddresses: {
      97: '0xe423a74956adeC975Ad85fc023307Dea80B51E74',
      56: '0x70B968ac7F7860b0DB944A302724aa7fE32E370C',
    },
    tokenSymbol: 'MIST',
    tokenAddresses: {
      97: '0xB8672B92100e8a25261aB0ae76789D05f66afd47',
      56: '0x6f8FE12CC34398d15b7D5A5BA933E550DA1D099f',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'MIST-BNB LP',
    lpAddresses: {
      97: '0xFF3532323EF2a16Be8A35BB60cf2c9Fd9a52225C',
      56: '0xc100Eed27Da3D0dC39075C9051A475f7E0126845',
    },
    tokenSymbol: 'MIST',
    tokenAddresses: {
      97: '0xB8672B92100e8a25261aB0ae76789D05f66afd47',
      56: '0x6f8FE12CC34398d15b7D5A5BA933E550DA1D099f',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    risk: 1,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xc15fa3e22c912a276550f3e5fe3b0deb87b55acd',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    risk: 2,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x7561eee90e24f3b348e1087a005f78b4c8453524',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 5,
    risk: 2,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x70d8929d04b60af4fb9b58713ebcf18765ade422',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 6,
    risk: 1,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x3ab77e40340ab084c3e23be8e5a6f7afed9d41dc',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '',
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 7,
    risk: 3,
    lpSymbol: 'DOT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xbcd62661a6b1ded703585d3af7d7649ef4dcdb5c',
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      97: '',
      56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 8,
    risk: 4,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 9,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'MIST',
    lpAddresses: {
      97: '',
      56: '0x70B968ac7F7860b0DB944A302724aa7fE32E370C', // MIST-BUSD LP
    },
    tokenSymbol: 'MIST',
    tokenAddresses: {
      97: '',
      56: '0x6f8FE12CC34398d15b7D5A5BA933E550DA1D099f',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  } ,
  {
    pid: 10,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'BUSD',
    lpAddresses: {
      97: '0xe423a74956adeC975Ad85fc023307Dea80B51E74',
      56: '0x70B968ac7F7860b0DB944A302724aa7fE32E370C', // MIST-BUSD LP (BUSD-BUSD will ignore)
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 11,
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'WBNB',
    lpAddresses: {
      97: '0x0eC992033060625a1ED41c3617c5e7aC62B08C70',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BNB-BUSD LP
    },
    tokenSymbol: 'WBNB',
    tokenAddresses: {
      97: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 12,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'USDT',
    lpAddresses: {
      97: '',
      56: '0xc15fa3e22c912a276550f3e5fe3b0deb87b55acd', // USDT-BUSD LP
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 13,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'BTCB',
    lpAddresses: {
      97: '',
      56: '0xb8875e207ee8096a929d543c9981c9586992eacb', // BTCB-BUSD LP
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 14,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'ETH',
    lpAddresses: {
      97: '',
      56: '0xd9a0d1f5e02de2403f68bb71a15f8847a854b494', // ETH-BUSD LP
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 15,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'DAI',
    lpAddresses: {
      97: '',
      56: '0x3ab77e40340ab084c3e23be8e5a6f7afed9d41dc', // DAI-BUSD LP
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '',
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 16,
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'DOT',
    lpAddresses: {
      97: '',
      56: '0x54c1ec2f543966953f2f7564692606ea7d5a184e', // DOT-BUSD LP
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      97: '',
      56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 17,
    risk: 4,
    isTokenOnly: true,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '',
      56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458', // CAKE-BUSD LP
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 18,
    risk: 5,
    lpSymbol: 'MIST-AURUM LP',
    lpAddresses: {
      97: '',
      56: '0xa71f0bb3c029d397b10685f884a3523da766827d',
    },
    tokenSymbol: 'MIST',
    tokenAddresses: {
      97: '',
      56: '0x6f8FE12CC34398d15b7D5A5BA933E550DA1D099f',
    },
    quoteTokenSymbol: QuoteToken.MIST,
    quoteTokenAdresses: contracts.mist,
  },
  {
    pid: 19,
    risk: 5,
    lpSymbol: 'AURUM-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xa3c4006d1957A09CF9b94Af683877aBA03DF1eC9',
    },
    tokenSymbol: 'AURUM',
    tokenAddresses: {
      97: '',
      56: '0x49207BAA3a7332F0716788aa57B088D499bcc104',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 20,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'AURUM',
    lpAddresses: {
      97: '',
      56: '0xa3c4006d1957A09CF9b94Af683877aBA03DF1eC9', // AURUM-BUSD LP
    },
    tokenSymbol: 'AURUM',
    tokenAddresses: {
      97: '',
      56: '0x49207BAA3a7332F0716788aa57B088D499bcc104',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 21,
    risk: 5,
    lpSymbol: 'MIST-BSCDOG LP',
    lpAddresses: {
      97: '',
      56: '0x93fc52bc1189d9867520f80b8ebd51f87d317d54',
    },
    tokenSymbol: 'MIST',
    tokenAddresses: {
      97: '',
      56: '0x6f8FE12CC34398d15b7D5A5BA933E550DA1D099f',
    },
    quoteTokenSymbol: QuoteToken.MIST,
    quoteTokenAdresses: contracts.mist,
    isCommunity: true,
  },
  {
    pid: 22,
    risk: 5,
    lpSymbol: 'BNB-BSCDOG LP',
    lpAddresses: {
      97: '',
      56: '0x598a58d9acf3b2a9c1409ba8e04525b585ac4477',
    },
    tokenSymbol: 'BSCDOG',
    tokenAddresses: {
      97: '',
      56: '0xab329b1b7785be9f954bacfc7fa663ce9b36338d',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    isCommunity: true,
  },
]