import React from 'react';
import { useEffect, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
} from '@mui/material';
import { t } from 'i18next';
import Card from 'components/Layout/card';
import { useTranslation } from 'react-i18next';
import { getNoteClaim } from 'apiRequests/deposit';
import { SendClaim } from 'lib/Twister/sendtx';
import { Link } from 'react-router-dom';
import { contractAddress } from 'config';
import {
  useGetAccountInfo,
  useGetAccountProvider,
  useGetNetworkConfig,
} from '@multiversx/sdk-dapp/hooks';
import { routeNames } from 'routes';
import { Transaction, TransactionPayload, Address } from '@multiversx/sdk-core/out';
import { Gauge } from './gauge';
import { getDepositsPerTokenAmount } from 'lib/Twister/querys';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { sendTransactions } from '@multiversx/sdk-dapp/services';

const Withdraw = () => {
  const [t] = useTranslation('global');
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const { provider } = useGetAccountProvider();
  const isLoggedIn = Boolean(address);
  const [pending_deposit, set_pending_deposit] = useState([0, 0, 0, 0]);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [msg_error, set_msg_error] = useState('');
  const [note, setNote] = useState('');
  const [donar,setDonar] = useState(false);

  const enviarDatos = async (event: any) => {
    setEnabled(true);
    event.preventDefault();
    if (!donar && !checked){
      set_msg_error(t('selectDest'));
      setEnabled(false);
      return;
    }
    if (note.startsWith('xTwister') && note.length > 30) {
      const noteTX = await getNoteClaim(note,donar,address, set_msg_error);
      if (!noteTX) {
        setEnabled(false);
      } else {
        const innerTx = new Transaction({
          nonce: account.nonce,
          sender: new Address(address),
          receiver: new Address(contractAddress),
          gasLimit: 0,
          chainID: network.chainId,
          data: new TransactionPayload('claim@' + noteTX),
        });
        if ((Number(account.balance) / 10 ** 18) < 0.01) {
          provider
            .signTransaction(innerTx)
            .then((signedTx) => {
              if (signedTx) {
                SendClaim(signedTx, set_msg_error, setEnabled);
              }
            })
            .catch((err) => {
              setEnabled(false);
            });
        } else {
          await refreshAccount();

          innerTx.setGasLimit(100000000);
          const { sessionId /*, error*/ } = await sendTransactions({
            transactions: innerTx,
            transactionsDisplayInfo: {
              processingMessage: 'Processing Claim transaction',
              errorMessage: 'An error has occured during Claim',
              successMessage: 'Claim transaction successful',
            },
            redirectAfterSign: false,
          });
          setEnabled(false);
          if (sessionId != null) {
            sessionStorage.setItem('sessionId', sessionId);
          }
        }
      }
    } else {
      setEnabled(false);
      set_msg_error(t('noteError'));
    }
  };
  useEffect(() => {
    pendingWithdraw();
    const timer = setInterval(() => {
      pendingWithdraw();
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange_Notes = (event: any) => {
    setNote(event.target.value);
    set_msg_error('');
  };
  const shard = useGetAccountInfo().shard;
  const [checked, setChecked] = useState(false);
  const handleChange = (event: any) => {
    setChecked(event.target.checked);
    setDonar(false);
  };

  const pendingWithdraw = () => {
    const egld_ammount = ['1', '15', '50', '100'];
    const promiseList = egld_ammount.map((e) => {
      return getDepositsPerTokenAmount({ token: 'EGLD', amount: e });
    });
    Promise.all(promiseList).then((deposits: any) => {
      set_pending_deposit(deposits);
    });
  };
  const handleDonar = () => {
    setDonar(!donar);
    setChecked(false);
  };

  return (
    <Card>
      <p>{account.balance}</p>
      <form onSubmit={enviarDatos}>
        <Stack
          direction='column'
          spacing={2}
          style={{
            marginBottom: '10px',
            textAlign: 'center',
            fontSize: '20px',
          }}
        >
          <span style={{ marginTop: '20px' }}> {t('note')}</span>
          <TextField
            style={{ margin: '15px' }}
            type='text'
            variant='filled'
            name='note'
            multiline
            className='menu-item'
            onChange={handleInputChange_Notes}
          />
          {msg_error && (
            <p
              className='alert alert-danger text-center'
              style={{ margin: '5px 15px' }}
            >
              {msg_error}
            </p>
          )}
          {isLoggedIn && (
            <>
              {t('pscore')}
              <div
                style={{
                  margin: '0',
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                {/* 
                TODO: see if a value from 1 to 3 can be passed on one side for the colour arc, which would be the score itself. 
                for the colour arc, which would be the Score itself.
                If 0-1 -> 1
                If 2-4 -> 2
                If >4 ->3

                and on the other hand pass the count to put in the number.
                Give it a spin when there is time
                */}
                <Gauge value={pending_deposit[0]} label='1 EGLD' units={''} />
                <Gauge value={pending_deposit[1]} label='15 EGLD' units={''} />
                <Gauge value={pending_deposit[2]} label='50 EGLD' units={''} />
                <Gauge value={pending_deposit[3]} label='100 EGLD' units={''} />
              </div>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: '#89fadd',
                        '&.Mui-checked': {
                          color: '#89fadd',
                        },
                        m: '0px 10px 0px 25px',
                        minWidth: '0px',
                      }}
                      checked={checked}
                      onChange={handleChange}     
                    />
                  }
                  label={
                    t('destWallet') +
                    address.substring(0, 8) +
                    '...' +
                    address.slice(-8)
                  }
                />   
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: '#89fadd',
                        '&.Mui-checked': {
                          color: '#89fadd',
                        },
                        m: '0px 10px 0px 25px',
                        minWidth: '0px',
                      }}
                      checked={donar}
                      onChange={handleDonar}
                    />
                  }
                  label={
                    t('donate')
                  }
                />   
              </FormControl>
              <button
                disabled={enabled}
                style={{ margin: '15px 15px 0px 15px' }}
                type='submit'
                className='btn'
              >
                {t('withdraw')}
              </button>
              <span style={{ color: 'red', fontSize: '13px', fontWeight: 'bold' }}>
                {t('fees')}
              </span>
            </>
          )}
          {!isLoggedIn && (
            <Link
              to={routeNames.unlock}
              style={{ margin: '15px' }}
              className='btn '
              data-testid='loginBtn'
            >
              {t('login')}
            </Link>
          )}
        </Stack>
      </form>
    </Card>
  );
};

export default Withdraw;
