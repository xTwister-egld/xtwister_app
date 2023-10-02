import React, { useState, useEffect } from 'react';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton
} from '@multiversx/sdk-dapp/UI';
import { routeNames } from 'routes';
import './login.scss';
import { MaiarExtensionIcon, MaiarAppIcon, LedgerIcon, ElrondWebWalletIcon } from './LoginMethodIcons';
import { walletConnectV2ProjectId } from 'config';


export const UnlockRoute: () => JSX.Element = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const [maiarExtension, setMaiarExtension] = useState<boolean>(false);

  sessionStorage.removeItem('sessionId');
  sessionStorage.removeItem('note');

  React.useEffect(() => {
    if (isLoggedIn) {
      window.location.href = routeNames.dashboard;
    }
  }, [isLoggedIn]);

  return (
    <div className='home d-flex flex-fill align-items-center login'>
      <div className='m-auto cu-toplogin' data-testid='unlockPage'>
        <div className='text-center border-unset'>
          <div className='d-flex card-body py-4 px-5 mx-lg-4 loginDirection'>
            <h4 className='mb-4'>Login</h4>
            <p className='mb-4'>pick a login method</p>
            <ExtensionLoginButton
              callbackRoute={routeNames.home}
              buttonClassName='login-btn_wrapper btn-unlock btn'
            >
              <div className='d-flex flex-row method'>
                <div className='title'>
                  {MaiarExtensionIcon} Maiar Extension
                </div>
              </div>
            </ExtensionLoginButton>
            <WalletConnectLoginButton
              callbackRoute={routeNames.home}
              loginButtonText={'Maiar App'}
              {...(walletConnectV2ProjectId
                ? {
                  isWalletConnectV2: true
                }
                : {})}
              buttonClassName='login-btn_wrapper btn-unlock btn'
            >
              <div className='d-flex flex-row method'>
                <div className='title'>
                  {MaiarAppIcon} Maiar App
                </div>
              </div>
            </WalletConnectLoginButton>
            <WebWalletLoginButton
              callbackRoute={routeNames.home}
              buttonClassName='login-btn_wrapper btn-unlock btn'
            >
              <div className='d-flex flex-row method'>
                <div className='title'>
                  {ElrondWebWalletIcon} Web wallet
                </div>
              </div>
            </WebWalletLoginButton>
            <LedgerLoginButton
              callbackRoute={routeNames.home}
              className={'test-class_name'}
              buttonClassName='login-btn_wrapper btn-unlock btn'
            >
              <div className='d-flex flex-row method'>
                <div className='title'>
                  {LedgerIcon} Ledger
                </div>
              </div>
            </LedgerLoginButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
