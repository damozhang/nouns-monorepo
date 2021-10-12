import { ChainId } from '@usedapp/core';

interface Config {
  auctionProxyAddress: string;
  tokenAddress: string;
  nounsDaoProxyAddress: string;
  nounsDaoExecutorAddress: string;
  subgraphApiUri: string;
  jsonRpcUri: string;
  wsRpcUri: string;
  enableHistory: boolean;
}

type SupportedChains = ChainId.Rinkeby | ChainId.Mainnet | typeof LOCAL_CHAIN_ID;

export const LOCAL_CHAIN_ID = 31337;

export const CHAIN_ID: SupportedChains = parseInt(process.env.REACT_APP_CHAIN_ID ?? '4');

export const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY ?? '';

const config: Record<SupportedChains, Config> = {
  [ChainId.Rinkeby]: {
    jsonRpcUri:
      process.env.REACT_APP_RINKEBY_JSONRPC ||
      `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    wsRpcUri:
      process.env.REACT_APP_RINKEBY_WSRPC ||
      `wss://rinkeby.infura.io/ws/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    auctionProxyAddress: '0x62656Ff96edaA5Fc05431763eA23D5F8A5F43E39',
    tokenAddress: '0x439dF3d2bb1b9D9E9d93Ac08CD1Ae62980EbCa3e',
    nounsDaoProxyAddress: '0xddF1550Af289BEb68F1D865Bea1a212811859a3D',
    nounsDaoExecutorAddress: '0x30Bd63fc9eAF2867D9c78951579374B966b0076c',
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph-rinkeby-v4',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true' || false,
  },
  [ChainId.Mainnet]: {
    auctionProxyAddress: '0x830BD73E4184ceF73443C15111a1DF14e495C706',
    tokenAddress: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
    nounsDaoProxyAddress: '0x6f3E6272A167e8AcCb32072d08E0957F9c79223d',
    nounsDaoExecutorAddress: '0x0BC3807Ec262cB779b38D65b38158acC3bfedE10',
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph',
    jsonRpcUri:
      process.env.REACT_APP_MAINNET_JSONRPC ||
      `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    wsRpcUri:
      process.env.REACT_APP_MAINNET_WSRPC ||
      `wss://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true' || false,
  },
  [LOCAL_CHAIN_ID]: {
    auctionProxyAddress: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
    tokenAddress: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    // Temporarily set this to _any_ address until local deployment is configured
    nounsDaoExecutorAddress: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
    nounsDaoProxyAddress: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
    subgraphApiUri: '',
    jsonRpcUri: 'http://localhost:8545',
    enableHistory: false,
    wsRpcUri: 'ws://localhost:8545',
  },
};

export default config[CHAIN_ID];
