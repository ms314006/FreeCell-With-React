import React from 'react';
import { Provider } from 'react-redux';
import GameTable from '../GameTable';
import SideMenu from '../SideMenu';
import styles from './index.scss';
import store from '../../store';

const Main = () => (
  <Provider store={store}>
    <div className={styles.main_block}>
      <GameTable />
      <SideMenu />
    </div>
  </Provider>
);

export default Main;
