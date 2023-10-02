/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classNames from 'classnames';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import './languaje.scss';


function Languaje() {
  const [selected_language, selected_languaje] = React.useState('');
  const [t, i18n] = useTranslation('global');

  const languages = ['en', 'es', 'fr', 'ro'];
  const default_language = languages[0];
  const currentLanguageCode = cookies.get('i18next') || default_language;


  if (selected_language !== currentLanguageCode){
    selected_languaje(currentLanguageCode);
  }
  return (
    <div className='dropdown'>
      <button
        type='button'
        className='btn text-center dropleft btn-lan'
        data-toggle='dropdown'
      >
        <img width={38} height={38} src={'/img/languages.png'}></img>{/* {t('language')} */}
      </button>
      <div className='dropdown-menu dropdown'>
        {languages.map((idioma, index) => (
          <a
            key={index}
            href='#'
            className={classNames('dropdown-item', {
              disabled: currentLanguageCode === idioma
            })}
            data-toggle='collapse' 
            data-target='.navbar-collapse.show'
            onClick={() => {
              i18n.changeLanguage(idioma);
              selected_languaje(idioma);
            }}
          >
            <img
              width={20}
              height={20}
              className={idioma}
              src={'/img/' + idioma + '.png'}
              style={{
                opacity: currentLanguageCode === idioma ? 0.5 : 1
              }}
            ></img>{' '}
            {t(idioma)}
          </a>
        ))}
      </div>
    </div>
  );
};
export default Languaje;
