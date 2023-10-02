import React, { useEffect, useState } from 'react';
import { ContentCopy } from '@mui/icons-material';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import './note.scss';
import { SendDeposit } from 'lib/Twister/sendtx';
import { Iuser_token } from '../Deposit/deposit';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Note = (props: { noteAll: any; setTx: any; user_token: Iuser_token, setHabilitado: any }) => {
  const [t] = useTranslation('global');
  const [msg_error, set_msg_error] = useState('');

  const launch = () => {
    if (msg_error === t('copied')) {
      props.setTx(false);
      props.setHabilitado(false);
      SendDeposit(
        parseInt(props.user_token.amount),
        props.user_token.token,
        props.noteAll.tx
      );
    } else {
      set_msg_error(t('pleaseCopy'));
    }
  };
  const cancel = () => {
    sessionStorage.removeItem('note');
    props.setTx(false);
    props.setHabilitado(false);
  };

  const downloadTxtFile = (note: string) => {
    const element = document.createElement('a');
    const array = [note];
    const file = new Blob(array, {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'myNote.txt';
    document.body.appendChild(element);
    element.click();
    set_msg_error(t('copied'));
  };
  return (
    <div className='border_red'>
      <IconButton onClick={cancel}>
        <CloseIcon className='modal-default-close' />
      </IconButton>

      <h2>{t('yourNote')}</h2>
      <div>{t('pleaseBackupYourNote')}</div>
      <div>{t('treatYourNote')}</div>
      <div className='note'>
        {props.noteAll.note}
        <div>
          <CopyToClipboard
            text={props.noteAll.note}
            onCopy={() => downloadTxtFile(props.noteAll.note)}
          >
            <span style={{ cursor: 'pointer' }}>
              <ContentCopy className='note' />
              <span style={{ color: 'red' }}> {t('copyNote')}</span>
            </span>
          </CopyToClipboard>

        </div>
        {msg_error !== '' && (
          <div className='alert alert-danger text-center'>{msg_error}</div>
        )}{' '}
        <button
          style={{ width: '100%' }}
          type='submit'
          className='btn'
          onClick={launch}
        >
          {t('deposit')}
        </button>
      </div>
    </div>
  );
};

export default Note;
