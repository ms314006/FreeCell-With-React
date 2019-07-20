import React from 'react';
import styles from './index.scss';

const SideMenu = () => (
  <div className={styles.sideMenu}>
    <div className={styles.timeBlock}>
      <span className={styles.title}>TIME</span>
      <span className={styles.time}>00:00</span>
      <button type="button" className={styles.button}>UNDO</button>
    </div>
    <div className={styles.controlButtonBlock}>
      <button type="button" className={styles.button}>RESTART</button>
      <button type="button" className={styles.button}>NEW GAME</button>
    </div>
  </div>
);

export default SideMenu;
