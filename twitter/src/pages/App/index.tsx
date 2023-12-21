import React from 'react';
import LeftSide from '../../components/organisms/LeftSide';
import Login from '../Login';

import style from './style.module.scss';
function App() {
  return (
    // <div className="App">
    <div className={style.App}>
        {/* <LeftSide /> */}
        <Login/>
    </div>
  );
}

export default App;
