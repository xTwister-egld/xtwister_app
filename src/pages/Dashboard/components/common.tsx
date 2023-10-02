import * as React from 'react';
import Deposit from './Deposit/deposit';

import { Dialog, DialogContent, styled } from '@mui/material';
import {
  TabPanelUnstyled,
  TabsListUnstyled,
  TabsUnstyled,
  TabUnstyled,
  tabUnstyledClasses,
} from '@mui/base';
import { useTranslation } from 'react-i18next';

import './common.scss';
import Withdraw from './Withdraw/withdraw';
import { WalletProvider, WALLET_PROVIDER_DEVNET, } from '@multiversx/sdk-web-wallet-provider';
import { SendClaim } from 'lib/Twister/sendtx';
import { Transaction } from '@multiversx/sdk-core/out';
import { explorerUrl } from 'config';

const Common = () => {
  const [t] = useTranslation('global');

  const Tab = styled(TabUnstyled)`
    cursor: pointer;
    width: 40%;
    @media (max-width: 400px) {
      width: 45%;
    }
    border: 3px solid #89fadd;
    border-bottom: 0px;
    display: flex;
    justify-content: center;
    padding: 10px;
    background-color: #016658 !important;
    color: #89fadd !important;

    &:hover {
      background-color: #89fadd !important;
      color: black !important;
    }
    &:nth-of-type(1) {
      border-radius: 7px 50px 0px 0px;
    }
    &:nth-of-type(2) {
      border-radius: 50px 7px 0px 0px;
    }

    &.${tabUnstyledClasses.selected} {
      background-color: #89fadd !important;
      color: black !important;
    }
  `;

  const TabPanel = styled(TabPanelUnstyled)(
    ({ theme }) => `
  width: 100%;
  padding: 0px 12px 15px 12px;
  border: 3px solid;
  border-color: #89fadd;
  background: black;
  border-radius: 0px 0px 12px 12px;
  `
  );

  const TabsList = styled(TabsListUnstyled)(
    ({ theme }) => `
 
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: space-between;
  `
  );
  const [modal, setModal] = React.useState(false);
  const [tx, setTx] = React.useState<string | null>();
  const [msg_error, set_msg_error] = React.useState('');
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (sessionStorage.getItem('modal')) {
        setTx(sessionStorage.getItem('modal'));
        setModal(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (
    window.location.href.includes('walletProviderStatus=transactionsSigned') &&
    window.location.href.includes('claim') && !window.location.href.includes('signSession')
  ) {
    const provider = new WalletProvider(WALLET_PROVIDER_DEVNET);
    const plainSignedTransactions = provider.getTransactionsFromWalletUrl();
    const plainTransactionClone = structuredClone(plainSignedTransactions[0]);
    plainTransactionClone.data = Buffer.from(
      plainTransactionClone.data
    ).toString('base64');
    const transaction = Transaction.fromPlainObject(plainTransactionClone);
    SendClaim(transaction, set_msg_error);

  }

  const close_modal = () => {
    setModal(false);
    sessionStorage.removeItem('modal');
    //delete href
    window.history.replaceState({}, '', '/dashboard');
  };
  return (
    <>
      {msg_error !== '' && (
        <div className='alert alert-danger text-center'>{msg_error}</div>
      )}
      <TabsUnstyled
        className='main_table'
        defaultValue={0}
      >
        <TabsList>
          <Tab className='btn'>{t('deposit')}</Tab>
          <Tab className='btn'>{t('withdraw')}</Tab>
        </TabsList>
        <TabPanel value={0}>
          <Deposit />
        </TabPanel>
        <TabPanel value={1}>
          <Withdraw />
        </TabPanel>
      </TabsUnstyled>
      {modal && (
        <Dialog
          className='modal_note'
          open={true}
          sx={{ backdropFilter: 'blur(2px)' }}
        >
          <div style={{ backgroundColor: 'black', border: '1px dashed red' }}>
            <DialogContent sx={{ backgroundColor: 'black', color: 'white' }}>
              <h2 style={{ marginBottom: '-20px', textAlign: 'center' }}>Withdraw Tx</h2>
              <div className='spinner-box'>
                <div className='solar-system'>
                  <div className='earth-orbit orbit'>
                    <div className='planet earth'></div>
                    <div className='venus-orbit orbit'>
                      <div className='planet venus'></div>
                      <div className='mercury-orbit orbit'>
                        <div className='planet mercury'></div>
                        <div className='sun'></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal_text' style={{ overflowWrap: 'anywhere' }}>
                {t('processing')}
              </div>
              <div className='modal_link' style={{ overflowWrap: 'anywhere' }}>
                <a
                  className='modal_link'
                  href={explorerUrl + '/transactions/' + tx}
                  target='_blank'
                  rel='noreferrer'
                >
                  {t('open')}
                </a>
              </div>
              {/* <div style={{overflowWrap:'anywhere'}}></div> */}
              <button
                style={{ width: '100%', marginTop: '20px' }}
                type='submit'
                className='btn'
                onClick={close_modal}
              >
                {t('close')}
              </button>
            </DialogContent>
          </div>
        </Dialog>
      )}
    </>
  );
};
export default Common;
