import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/pokerCard.js';
import styles from './index.scss';

const SideMenu = (props) => {
  const { restartGame, getPreviousRecord, } = props;
  return (
    <div className={styles.sideMenu}>
      <div className={styles.timeBlock}>
        <span className={styles.title}>TIME</span>
        <span className={styles.time}>00:00</span>
        <button
          type="button"
          className={styles.button}
          onClick={getPreviousRecord}
        >
          UNDO
        </button>
      </div>
      <div className={styles.controlButtonBlock}>
        <button
          type="button"
          className={styles.button}
          onClick={restartGame}
        >
          RESTART
        </button>
        <button type="button" className={styles.button}>NEW GAME</button>
      </div>
    </div>
  );
};

const mapStateToDispatch = dispatch => ({
  restartGame: () => { dispatch(actions.restartGame()); },
  getPreviousRecord: () => { dispatch(actions.getPreviousRecord()); },
});

export default connect(null, mapStateToDispatch)(SideMenu);
