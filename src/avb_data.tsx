export const TYPE_ENV_TEST = 'testnet';
export const TYPE_ENV_DEV = 'devnet';
export const TYPE_ENV_MAIN = 'mainnet';

/* PROYECT CONTRATS */
export const avb_twister: { [key: string]: string } = {}; 
avb_twister[TYPE_ENV_TEST] = 'erd1qqqqqqqqqqqqqpgq6nzu0pnavrju20rs7te550fs3rdd4qjvrruqet4c73';
avb_twister[TYPE_ENV_DEV] = 'erd1qqqqqqqqqqqqqpgqyp9cnn3ztvqgjd5fl43dwedrj7mnmkw3rruqnkz9en' /*'erd1qqqqqqqqqqqqqpgq846wajwae8quetezanj6ycxw3egf2626rruqjpr4mw';/*'erd1qqqqqqqqqqqqqpgqdvn39pq0d33s9msla5u7662q03nmgsj4rruqa7h5p6' /*'erd1qqqqqqqqqqqqqpgqzyenm3gzz3qlw53htqwdn5tpfrk8n3cdrruqfzzasr'; */
avb_twister[TYPE_ENV_MAIN] = 'erd1qqqqqqqqqqqqqpgqrjgy5yyx7kg2tvquctcvwc7ywd773r63vxtsc693mz';

export const avb_contractShard: { [key: string]: number } = {};
avb_contractShard[TYPE_ENV_TEST] = 0;
avb_contractShard[TYPE_ENV_DEV] = 0;
avb_contractShard[TYPE_ENV_MAIN] = 0;

export const avb_chain_ID: { [key: string]: string } = {};
avb_chain_ID[TYPE_ENV_TEST] = 'T';
avb_chain_ID[TYPE_ENV_DEV] = 'D';
avb_chain_ID[TYPE_ENV_MAIN] = '1';

/*  GATEWAY URLS*/
export const avb_gatewayURL: { [key: string]: string } = {};
avb_gatewayURL[TYPE_ENV_TEST] = 'https://testnet-gateway.multiversx.com';
avb_gatewayURL[TYPE_ENV_DEV] = 'https://devnet-gateway.multiversx.com';
avb_gatewayURL[TYPE_ENV_MAIN] = 'https://gateway.multiversx.com';

export const avb_apiURL: { [key: string]: string } = {}; 
avb_apiURL[TYPE_ENV_TEST] = "https://testnet-api.multiversx.com";
avb_apiURL[TYPE_ENV_DEV] = "https://devnet-api.multiversx.com";
avb_apiURL[TYPE_ENV_MAIN] = "https://api.multiversx.com";

export const avb_apiURLTwister: { [key: string]: string } = {}; 
avb_apiURLTwister[TYPE_ENV_TEST] = 'https://testtwister.netlify.app/.netlify';
avb_apiURLTwister[TYPE_ENV_DEV] = 'https://elrondtwister.netlify.app/.netlify';
avb_apiURLTwister[TYPE_ENV_MAIN] = 'https://api.xtwister.cash/.netlify';

export const avb_explorerURL: { [key: string]: string } = {};
avb_explorerURL[TYPE_ENV_TEST] = "https://testnet-explorer.multiversx.com";
avb_explorerURL[TYPE_ENV_DEV] = "https://devnet-explorer.multiversx.com";
avb_explorerURL[TYPE_ENV_MAIN] = "https://explorer.multiversx.com";

interface token_type {
  tokenIdentifier: string;
  decimals: number;
  logo: string;
}

export const avb_tokenList: { [key: string]: token_type[] } = {};
avb_tokenList[TYPE_ENV_TEST] = [
  {
    tokenIdentifier: 'EGLD',
    decimals: 18,
    logo: '/img/elrond-symbol.svg'
  }
];

avb_tokenList[TYPE_ENV_DEV] = [
  {
    tokenIdentifier: 'EGLD',
    decimals: 18,
    logo: '/img/elrond-symbol.svg'
  }
];

avb_tokenList[TYPE_ENV_MAIN] = [
  {
    tokenIdentifier: 'EGLD',
    decimals: 18,
    logo: '/img/elrond-symbol.svg'
  }
];
