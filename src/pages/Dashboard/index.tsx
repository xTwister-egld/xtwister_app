import Stats from './components/Stats/stats';
import { useEffect, useState } from 'react';
import './dashboard.scss';
import { dAppName } from 'config';
import Alert from '@mui/material/Alert';
import Common from './components/common';
import { useTranslation } from 'react-i18next';
import Accordion from '@mui/material/Accordion';
import {
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Dashboard = () => {
  const [t] = useTranslation('global');
  const [drop, setDrop] = useState(sessionStorage.getItem('drop')?
    sessionStorage.getItem('drop') === 'true':true);
  
  const dropChange = () => {
    setDrop(!drop);
    sessionStorage.setItem('drop', String(!drop));
  };

  return (
    <div className='panel_dashboard'>
      <div className='title_wrapper'>
        <div className='wrapperText'>
          <p className='line typing'>{dAppName}</p>
        </div>

        <Accordion expanded={drop}>
          <AccordionSummary
            aria-controls='panel1a-content'
            id='panel1a-header'
          />
          <AccordionDetails>
            {/* <Alert
              variant='outlined'
              severity='info'
              sx={{ marginTop: '20px', color: 'white', textAlign: 'left' }}
            >
              <div>
                {t('devnet')}
                <a
                  className='modal_link'
                  href='https://devnet-wallet.elrond.com/faucet'
                  target='_blank'
                  rel='noreferrer'
                >
                  {t('here')}
                </a>
              </div>
            </Alert> */}
            <Alert
              variant='outlined'
              severity='info'
              sx={{ marginTop: '20px', color: 'white', textAlign: 'left' }}
            >
              <div>{t('indexNotification')}</div>
            </Alert>
            <Alert
              variant='outlined'
              severity='warning'
              sx={{ marginTop: '20px', color: 'white', textAlign: 'left' }}
            >
              <div>{t('ifTXFail')}</div>
            </Alert>
            <Alert
              variant='outlined'
              severity='error'
              sx={{ marginTop: '20px', color: 'white', textAlign: 'left' }}
            >
              <div>{t('treatYourNote')}</div>
            </Alert>
          </AccordionDetails>
        </Accordion>
        <Button sx={{ color: 'rgb(124, 225, 179)' }} onClick={dropChange}>
          <ExpandMoreIcon className={'flecha' + drop} />
        </Button>
      </div>
      <div className='options'>
        <Common></Common>
        <Stats></Stats>
      </div>
    </div>
  );
};

export default Dashboard;
