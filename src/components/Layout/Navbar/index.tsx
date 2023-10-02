import React from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import { logout } from '@multiversx/sdk-dapp/utils';
import { Navbar as BsNavbar, NavItem, Nav, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { dAppName } from 'config';
import { routeNames } from 'routes';
import Languaje from '../Languajes/index';
import { ReactComponent as ElrondLogo } from './../../../assets/img/logo90.svg';
import { usdc } from './../../../config';
import './navbar.scss';
import { ApiStatus } from '..';

const Navbar = () => {
  const { address, account } = useGetAccountInfo();
  const apiStatus:any=React.useContext(ApiStatus);

  const handleLogout = () => {
    sessionStorage.removeItem('sessionId');
    sessionStorage.removeItem('note');
    logout(`${window.location.origin}/unlock`);
  };
  const isLoggedIn = Boolean(address);
  const [t] = useTranslation('global');

  return (
    <React.Fragment>
      <Container fluid className='head mt-3'>
        <Row>
          <div className="col-{breakpoint}- autologo" style={{paddingLeft:'10px'}}>
            <Link to={isLoggedIn ? routeNames.dashboard : routeNames.home}>
              <ElrondLogo className='elrond-logo flex-grow-1' />
              {/* <span className='dapp-name text-muted flex-grow-1 text-center'>{ dAppName}</span> */}
            </Link>
          </div>
          <div className='col-md-auto text-center pt-4 coin_api'>
            <div>
              {isLoggedIn && (
                <span className='dapp-name flex-grow-1 text-center'>
                  <img alt='LogOut' src={'/img/balance.png'}></img>&nbsp;
                  <FormatAmount value={account.balance} token='EGLD' digits={2} data-testid='balance' />
                </span>
              )}
            </div>&nbsp;&nbsp;
            <div className='apiStatus' style={{color:'white'}}>
              <img alt='LogOut' src={'/img/api.png'} width='20px'></img>&nbsp;
              {apiStatus?.success?
                <span style={{color:'#89fadd'}}>{t('apiOnline')}</span>:
                <span style={{color:'red'}}>{t('apiOffline')}</span>}
            </div>
          </div>
          <div className='col-{breakpoint}-auto'>
            <div className='absolutContainer'>
              <BsNavbar expand="md" id="basic-navbar-nav" variant="dark">
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav" >
                  <Nav>
                    <NavItem>
                      <Languaje />
                    </NavItem>
                    {isLoggedIn && (
                      <NavItem>
                        <button className='btn btn-lan' onClick={handleLogout}>
                          <img alt='LogOut' width={38} height={38} src={'/img/logout.png'}></img>
                        </button>
                      </NavItem>
                    )}
                  </Nav>
                </BsNavbar.Collapse>
              </BsNavbar>
            </div>
          </div>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Navbar;
