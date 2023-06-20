import React from 'react';
import { HOME_TITLE } from '../constants';

function HomePage() {

  return (
    <div className="home-page">
        <h1 className='home-title'>{HOME_TITLE}</h1>
        <h2 className='home-description'>NLP model trained on 107 million papers from the <a href='https://archive.org/details/GeneralIndex'>General Index</a></h2>
    </div>
  );
}
export default HomePage;
