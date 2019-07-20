import React from 'react';
import GameTable from '../GameTable';
import SideMenu from '../SideMenu';
import styles from './index.scss';

const Main = () => (
  <div className={styles.main_block}>
    <GameTable />
    <SideMenu />
  </div>
);

export default Main;
