import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import Card from '../Card';
import styles from './index.scss';


const Main = (props) => {
  const {} = props;
  const [questionLayout, setQuestionLayout] = useState([
    ['heart_2', 'club_1', 'heart_9', 'heart_1', 'diamond_2', 'spades_7', 'club_10'],
    ['spades_13', 'diamond_1', 'diamond_11', 'spades_3', 'diamond_4'],
    ['club_12', 'club_11', 'diamond_8', 'spades_6', 'spades_4', 'heart_12', 'club_3'],
    ['club_4', 'spades_9', 'heart_10', 'club_6', 'diamond_5', 'club_9', 'club_2'],
    ['club_5', 'diamond_13', 'heart_5', 'spades_1', 'diamond_6', 'club_13', 'diamond_12', 'spades_11'],
    ['heart_8', 'heart_4', 'diamond_3', 'club_7', 'club_8', 'spades_2'],
    ['diamond_9', 'diamond_7', 'heart_3', 'heart_11', 'spades_5', 'heart_13'],
    ['diamond_10', 'spades_10', 'heart_6', 'heart_7', 'spades_12', 'spades_8']
  ]);

  const moveBox = useCallback(
    (id, left, top) => {
      console.log('move', id, left, top);
    },
    [questionLayout]
  );

  const getPosition = (X, Y) => {
    const poritionX = (X * 120) + (X * 12) + 12;
    const poritionY = (Y * 40) + 16;
    return { left: poritionX, top: poritionY, };
  };

  const getPokerSuit = data => data.split('_')[0];
  const getPokerNumber = data => data.split('_')[1];

  const snapToGrid = (x, y) => [x, y];

  const [, drop] = useDrop({
    accept: 'card',
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);
      [left, top] = snapToGrid(left, top);
      moveBox(item.id, left, top);
      return undefined;
    },
  });

  return (
    <div className={styles.game_table}>
      <div ref={drop} className={styles.top_block}>
        {questionLayout.map((questionRow, rowIndex) => (
          <div key={rowIndex} className={`${styles.default_block} ${styles.put_card_block}`}>
            {questionRow.map((questionCell, cellIndex) => (
              <Card
                key={cellIndex}
                id={`${rowIndex}_${cellIndex}`}
                suit={getPokerSuit(questionLayout[rowIndex][cellIndex])}
                number={getPokerNumber(questionLayout[rowIndex][cellIndex])}
                {...getPosition(rowIndex, cellIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.bottom_block}>
        <div>
          <div className={`${styles.temp_block} ${styles.put_card_block}`}>
            aa
          </div>
          <div className={`${styles.temp_block} ${styles.put_card_block}`}>
            aa
          </div>
          <div className={`${styles.temp_block} ${styles.put_card_block}`}>
            aa
          </div>
          <div className={`${styles.temp_block} ${styles.put_card_block}`}>
            aa
          </div>
        </div>
        <div>
          <div className={`${styles.done_block} ${styles.put_card_block}`}>
            bb
          </div>
          <div className={`${styles.done_block} ${styles.put_card_block}`}>
            bb
          </div>
          <div className={`${styles.done_block} ${styles.put_card_block}`}>
            bb
          </div>
          <div className={`${styles.done_block} ${styles.put_card_block}`}>
            bb
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
