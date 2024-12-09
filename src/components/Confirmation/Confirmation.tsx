import React from 'react';
import './Confirmation.scss';
import thankYouIcon from '../../assets/images/icon-thank-you.svg';

const Confirmation: React.FC = () => {
  return (
    <div className='confirmation'>
      <img src={thankYouIcon} alt='Thank you icon' className='thank-you-icon' />
      <h1 className='confirmation-title'>Thank you!</h1>
      <p className='confirmation-message'>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
    </div>
  );
};

export default Confirmation;
