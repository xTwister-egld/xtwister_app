//import BigNumber from 'bignumber.js';
import { AccountType } from '@multiversx/sdk-dapp/types';
import { tokenList } from 'config';

export interface type_token_list {
  logo: string;
  identifier: string;
  name: string;
  ticker: string;
  balance: number;
}

/* LIST OF TOKENS FOR WHICH THE USER HAS A BALANCE AND ARE ON THE WHITELIST */
async function getTokensFromUser(
  account: AccountType,
) {
  const token_list: type_token_list[] = [];

  token_list.push({
    logo: 'https://c8.alamy.com/zoomses/9/ad4d3c4110d943e4aed21355d3cd4078/2gy0efx.jpg',
    identifier: 'EGLD',
    name: 'EGLD',
    ticker: 'EGLD',
    balance: parseFloat(account.balance.toString())
  });

  return token_list;
}



function get_token_decimals(token_name: string) {
  const new_list = tokenList.filter((token_element: any) => token_element.tokenIdentifier === token_name);
  if (new_list.length > 0) {
    return (new_list[0].decimals);
  } else {
    return (0);
  }
}


export {
  getTokensFromUser,
  get_token_decimals
};
