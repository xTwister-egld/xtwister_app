import {
  TYPE_ENV_TEST,
  TYPE_ENV_DEV,
  TYPE_ENV_MAIN,
  avb_tokenList,
  avb_explorerURL,
  avb_apiURL,
  avb_gatewayURL,
  avb_contractShard,
  avb_chain_ID,
  avb_twister,
  avb_apiURLTwister
} from 'avb_data';


export const dAppName = 'xTwister x🌪️⚡';
export const projectName = 'xTwister MIXER';
//export const environment = TYPE_ENV_TEST; // ==> TESTNET
export const environment = TYPE_ENV_MAIN; // ==> MAINNET
//export const environment = TYPE_ENV_DEV; // ==> DEVNET

export const contractAddress = avb_twister[environment]; //SC Twister
export const apiUrl = avb_apiURL[environment]; //URL Api
export const explorerUrl = avb_explorerURL[environment]; //URL explorer
export const tokenList = avb_tokenList[environment]; // llist of Available Tokens
export const gatewayUrl = avb_gatewayURL[environment]; //URL Gateaway
export const apiUrlTwister = avb_apiURLTwister[environment]; //Functions deposit/claim 
export const contractShard = avb_contractShard[environment];
export const chain_ID = avb_chain_ID[environment];

export const egld = 'EGLD';
export const usdc = 'USDC-8d4068';
export const api = 'https://api.multiversx.com';


export const owner = 'erd1szstudxrtuy7m8e2w0lggh23x2e2u0l23su5kv775lhncufpvxtss0ef7h';
export const walletConnectV2ProjectId = '16b870ee63e0088fc161e3f4a0bb08af';


export interface IMarks {
  value:number
  label: string
  disabled: boolean;
};

export const marks: Array<IMarks> = [
  {
    value: 1,
    label: '1 EGLD',
    disabled: false,
  },
  {
    value: 15,
    label: '15 EGLD',
    disabled: false,
  },
  {
    value: 50,
    label: '50 EGLD',
    disabled: true,
  },
  {
    value: 100,
    label: '100 EGLD',
    disabled: true,
  },
];