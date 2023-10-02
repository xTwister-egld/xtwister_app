import React from 'react';
import './card_styles.scss';


const Card = (props: {
  children: any;
  className?: any
}) => {

  return (
      <div className={'twistter_card card ' + (props.className || '')}>
        {props.children}
      </div>
  );
};

export default Card;