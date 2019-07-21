import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/pokerCard.js';
import styles from './index.scss';

const SideMenu = (props) => {
  const {
    spendSeconds, restartGame, getPreviousRecord, addSeconds, newGame, success,
  } = props;

  useEffect(() => {
    setInterval(() => { addSeconds(); }, 1000);
  }, []);

  const formartSecondsToTime = (seconds) => {
    const fillToTwoLength = (value) => {
      const str = String(value);
      return str.length === 1 ? `0${str}` : str;
    };
    return `${fillToTwoLength(Math.floor(seconds / 60))}:${fillToTwoLength(seconds % 60)}`;
  };

  return (
    <div className={styles.sideMenu}>
      <div className={styles.timeBlock}>
        <span className={styles.title}>TIME</span>
        <span className={styles.time}>{formartSecondsToTime(spendSeconds)}</span>
        <button
          type="button"
          className={styles.button}
          onClick={getPreviousRecord}
        >
          UNDO
        </button>
      </div>
      <div className={styles.controlButtonBlock}>
        <div style={{ display: success ? 'block' : 'none', }}>
          <div>VICTORY!</div>
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={restartGame}
        >
          RESTART
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={newGame}
        >
          NEW GAME
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  spendSeconds: state.spendSeconds,
  success: state.success,
});

const mapStateToDispatch = dispatch => ({
  restartGame: () => { dispatch(actions.restartGame()); },
  getPreviousRecord: () => { dispatch(actions.getPreviousRecord()); },
  newGame: () => { dispatch(actions.newGame()); },
  addSeconds: () => { dispatch(actions.addSeconds()); }
});

export default connect(mapStateToProps, mapStateToDispatch)(SideMenu);
