
import { projectName } from 'config';
import React from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';
import './footer.scss';

const Footer = () => {
  return (
    <footer className='text-center mt-2 mb-3 love'>
      <div>
        MADE WITH <HeartIcon className='mx-1' /> BY {projectName}.
        <br />
        <a {...{ target: '_blank' }} href='https://twitter.com/xtwister_egld'>
          <img
            src={process.env.PUBLIC_URL + '/img/logo_twitter_white.png'}
            width='30'
            alt='TWITTER'
          />
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a
          {...{ target: '_blank' }}
          href='https://xTwister.gitbook.io/litepaper'
        >
          <img
            src={process.env.PUBLIC_URL + '/img/logo_gitbook_white.png'}
            width='30'
            alt='MEDIUM'
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
