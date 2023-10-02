/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  useGetAccountInfo,
  useTrackTransactionStatus,
} from '@multiversx/sdk-dapp/hooks';
import { FormControl, Stack } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Card from 'components/Layout/card';
import { gatewayUrl, IMarks, marks } from 'config';
import { getTokensFromUser, type_token_list } from 'lib/utilities';
import './deposit.scss';
import { useTranslation } from 'react-i18next';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { routeNames } from 'routes';
import Note from '../Note/note';
import { getNoteDeposit } from 'apiRequests/deposit';
import {
  getAmountsByToken,
  getDepositsPerTokenAmount,
} from 'lib/Twister/querys';
import { Test } from 'lib/Twister/depositFunctions';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';

export interface Iuser_token {
  token: string;
  amount: string;
}

const Deposit = () => {
  const initalToken: Iuser_token = {
    token: 'EGLD',
    amount: '1',
  };

  const [t] = useTranslation('global');
  const { account, address } = useGetAccountInfo();

  const [tx, setTx] = useState(false);
  const [noteAll, setNoteAll] = useState({});
  const [textButton, setTextButton] = useState<string>(t('getNote'));
  const [msg_error, set_msg_error] = useState('');
  const [user_token, placeToken] = useState(initalToken);
  const [amaountMarks, setamaountMarks] = useState<IMarks[]>([]);
  const [avaiable_tokens, update_avaiable_tokens] = useState<type_token_list[]>(
    []
  );
  const [habilitado, setHabilitado] = useState<boolean>(false);
  useEffect(() => {
    getTokens();
    getAmountsMarks();
    const timer = setInterval(() => {
      getTokens();
      getAmountsMarks();
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const getAmountsMarks = () => {
    getAmountsByToken(user_token.token, marks).then((el) => {
      setamaountMarks(el);
    });
  };

  const getTokens = () => {
    getTokensFromUser(account).then((token_list: type_token_list[]) => {
      update_avaiable_tokens(token_list);
    });
  };

  const handleInputChange = (event: any) => {
    placeToken({
      ...user_token,
      [event.target.name]: event.target.value,
    });
    set_msg_error('');
  };

  const [checked, setChecked] = React.useState(false);
  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  const isLoggedIn = Boolean(address);
  let note = sessionStorage.getItem('note');
  if (!note) note = '';

  const enviarDatos = (event: any) => {
    event.preventDefault();
    setHabilitado(true);
    if (parseFloat(user_token.amount) === 0) {
      set_msg_error(t('vs.no_zero'));
    } else if (
      avaiable_tokens.length > 0 &&
      avaiable_tokens[0].balance / 10 ** 18 > parseFloat(user_token.amount)
    ) {
      sessionStorage.removeItem('note');
      setTextButton(t('loading'));
      // getNoteDeposit(user_token, set_msg_error).then((note) => {
      Test(user_token, set_msg_error).then((note: any) => {
        if (note) {
          sessionStorage.setItem('note', note.note);
          setNoteAll(note);
          setTextButton(t('getNote'));
          setTx(true);
        } else {
          setTextButton(t('getNote'));
        }
      });
    } else if (avaiable_tokens.length === 0) {
      set_msg_error(t('insufficientBalance'));
    } else {
      set_msg_error(t('insufficientBalance'));
    }
  };

  const networkProvider = new ProxyNetworkProvider(gatewayUrl);
  const transactionStatus = useTrackTransactionStatus({
    transactionId: sessionStorage.getItem('sessionId'),
  });
  if (transactionStatus.isSuccessful) {
    const txhash = transactionStatus.transactions
      ? transactionStatus.transactions[0].hash
      : '';
    networkProvider.getTransaction(txhash).then((info) => {
      const message_info = info.logs.events.filter(
        (data) => data.identifier === 'deposit'
      )[0];
      if (message_info && message_info.data.includes('blacklist')) {
        set_msg_error(message_info.data);
      }
    });
  }
  // Delete variables if the tx fails or is cancelled.
  if (transactionStatus.isFailed || transactionStatus.isCancelled) {
    sessionStorage.removeItem('sessionId');
    sessionStorage.removeItem('note');
  }

  return (
    <Card>
      <form onSubmit={enviarDatos}>
        <Stack
          direction='column'
          spacing={2}
          style={{
            textAlign: 'center',
            fontSize: '20px',
          }}
        >
          <br></br>
          <div className='radio_group'>
            {t('amount')}
            <RadioGroup
              row
              name='value_radio'
              defaultValue={1}
              sx={{ justifyContent: 'center', py: '20px' }}
            >
              {amaountMarks.map((mark) => (
                <FormControlLabel
                  key={mark.value}
                  value={mark.value}
                  control={
                    <Radio
                      sx={{
                        color: '#89fadd',
                        '&.Mui-checked': {
                          color: '#89fadd',
                        },
                        '& .MuiTypography-root': {
                          color: 'red',
                        },
                        '&.Mui-disabled': {
                          color: '#64748B',
                        },
                      }}
                    />
                  }
                  name='amount'
                  label={mark.label}
                  labelPlacement='bottom'
                  onChange={handleInputChange}
                  disabled={mark.disabled}
                  sx={{
                    '&.Mui-disabled': {
                      WebkitTextFillColor: '#64748B',
                    },
                  }}
                />
              ))}
            </RadioGroup>
            {/*{
              <p className='alert alert-danger' style={{ margin: '5px' }}>
                {t('pendings') + pending_deposit}
              </p>
            }
            TODO: Que sea por cantidad seleccinada, 
            que tengamos semaforo de colores para el texto/fondo
            p.ej: 0-1: Rojo, 2-5: Amarillo, >5: verde */}
          </div>

          {tx && note.length > 20 && (
            <>
              <Dialog
                className='modal_note'
                open={true}
                maxWidth='xs'
                sx={{ backdropFilter: 'blur(2px)' }}
              >
                <DialogContent
                  sx={{ border: '1px dashed red', backgroundColor: 'black' }}
                >
                  <Note
                    noteAll={noteAll}
                    setTx={setTx}
                    user_token={user_token}
                    setHabilitado={setHabilitado}
                  ></Note>
                </DialogContent>
              </Dialog>
            </>
          )}
          {msg_error && (
            <p className='alert alert-danger' style={{ margin: '5px' }}>
              {msg_error}
            </p>
          )}

          {isLoggedIn && (
            <>
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
                      required
                    />
                  }
                  label={t('checkWarnings')}
                />
              </FormControl>
              <button
                disabled={habilitado}
                style={{ margin: '15px' }}
                type='submit'
                className='btn'
              >
                {textButton}
              </button>
              <span
                style={{ color: 'red', fontSize: '13px', fontWeight: 'bold' }}
              >
                {t('fees')}
              </span>
            </>
          )}
          {!isLoggedIn && (
            <Link
              to={routeNames.unlock}
              style={{ margin: '5px' }}
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

export default Deposit;
