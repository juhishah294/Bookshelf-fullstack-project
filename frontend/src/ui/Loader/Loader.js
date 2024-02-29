import React from 'react';
import './Loader.css';

const Loader = ({ className }) => {
  return (
    <div className={[className, 'lds-default'].join(' ')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
