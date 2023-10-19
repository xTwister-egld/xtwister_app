import * as React from 'react';
import axios from 'axios';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { TokenPayment, Transaction } from '@multiversx/sdk-core/out';
import { apiUrlTwister, contractAddress } from 'config';
import { decimalToHex, stringToHex } from 'lib/functions';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const SendDeposit = async function (
  valor: number,
  token: string,
  note: string
) {
  let tx = {};
  const hex_data = stringToHex('deposit');
  if (token === 'EGLD') {
    tx = {
      value: TokenPayment.egldFromAmount(valor),
      data: 'deposit@' + note,
      receiver: contractAddress,
      gasLimit: '60000000',
    };
  } else {
    const valor_hex = decimalToHex((valor * 10 ** 6).toString());
    const token_hex = stringToHex(token);
    tx = {
      value: 0,
      data: 'ESDTTransfer@' + token_hex + '@' + valor_hex + '@' + hex_data,
      receiver: contractAddress,
      gasLimit: '60000000',
    };
  }

  await refreshAccount();

  const { sessionId /*, error*/ } = await sendTransactions({
    transactions: tx,
    transactionsDisplayInfo: {
      processingMessage: 'Processing Deposit transaction',
      errorMessage: 'An error has occured during Deposit',
      successMessage: 'Deposit transaction successful',
    },
    redirectAfterSign: false,
  });
  if (sessionId != null) {
    sessionStorage.setItem('sessionId', sessionId);
  }
};


const SendClaim = async function (tx: Transaction, set_msg_error: any, setHabilitado?: any) {
  const txData = tx.toPlainObject();
  //console.log(txData);
  /*
  //How get loginToken
  const tokenData = await axios.post('https://id.maiar.com/api/v1/login/init');
  const loginToken = tokenData.data.loginToken;
  //Ahora hay que coger la firma, el método es:
  useGetLoginInfo
  //Set JSON:
  {
    address: user address
    data:{}
    loginToken:previously obtained token
    signature:previously obtained signature
  }
  send by POST to https://id.maiar.com/api/v1/login
  in response we get the accessToken for send to relayer
  */

  try {
    /*const response = await axios.post(
      `${apiUrlTwister}/functions/relay`,
      JSON.stringify(txData), 
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
      }
    }
    );*/
    /*
    console.log(response);
    console.log(`${apiUrlTwister}/functions/relay`);
    */

    const response = await axios.post(
      `${apiUrlTwister}/functions/relay`,
      JSON.stringify(txData)
    );

    sessionStorage.setItem('modal', response.data);
    if (setHabilitado) setHabilitado(false);
  } catch (err: any) {
    set_msg_error(err.response.data ? err.response.data : 'Network error');
    if (setHabilitado) setHabilitado(false);
  }

  // console.log(response);
  // const status = await fetch(`${apiUrl}/transactions/`+response.data);
  // console.log(status);
  // const timer = setInterval(() => {
  //   fetch(`${apiUrl}/transactions/` + response.data)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status != 'pending') {

  //         if (data.status == 'success') {
  //           setTxResult({state: 'Succeful', tx: data.txHash });
  //         } else {
  //           setTxResult({state: 'Fail'+data.operations[0].message ,tx: data.txHash});
  //         }
  //         clearInterval(timer);
  //       }
  //     });
  // }, 6000);
};

export { SendDeposit, SendClaim };
