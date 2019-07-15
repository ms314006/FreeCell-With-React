import React, { useState } from 'react';
import Sortable from 'react-sortablejs';
import styles from './index.scss';

const TempBlock = (props) => {
  const { pokerFace, } = props;
  return (
    <div className={styles.temp}>
      <Sortable
        tag="div"
        options={{
          group: 'poker',
        }}
        onChange={(order) => { console.log(order); props.movePoker(order); }}
      >
        {pokerFace}
      </Sortable>
    </div>
  );
};

const AnswerBlock = (props) => {
  const { pokerFace, } = props;
  return (
    <div className={styles.answer}>
      <Sortable
        tag="div"
        options={{
          group: 'poker',
        }}
        onChange={(order) => { props.movePoker(order); }}
      >
        {pokerFace}
      </Sortable>
    </div>
  );
};

const PokerCard = (props) => {
  const { pokerFace, } = props;
  return (
    <div
      className={styles.pokerCard}
      data-id={pokerFace}
    >
      <span>{pokerFace}</span>
    </div>
  );
};

const PokerColumn = (props) => {
  const { column, } = props;
  return (
    <div className={styles.pokerColumn}>
      <Sortable
        tag="div"
        options={{
          animation: 150,
          group: {
            name: 'poker',
            pull: true,
            put: true,
          },
        }}
        onChange={(order) => { props.movePoker(order); }}
      >
        {column.map(pokerFace => (pokerFace ? <PokerCard key={pokerFace} pokerFace={pokerFace} /> : null))}
      </Sortable>
    </div>
  );
};

const Main = (props) => {
  const { } = props;
  const [problem, setProblem] = useState([
    ['', 'heart_2', 'club_1', 'heart_9', 'heart_1', 'diamond_2', 'spades_7', 'club_10'],
    ['', 'spades_13', 'diamond_1', 'diamond_11', 'spades_3', 'diamond_4'],
    ['', 'club_12', 'club_11', 'diamond_8', 'spades_6', 'spades_4', 'heart_12', 'club_3'],
    ['', 'club_4', 'spades_9', 'heart_10', 'club_6', 'diamond_5', 'club_9', 'club_2'],
    ['', 'club_5', 'diamond_13', 'heart_5', 'spades_1', 'diamond_6', 'club_13', 'diamond_12', 'spades_11'],
    ['', 'heart_8', 'heart_4', 'diamond_3', 'club_7', 'club_8', 'spades_2'],
    ['', 'diamond_9', 'diamond_7', 'heart_3', 'heart_11', 'spades_5', 'heart_13'],
    ['', 'diamond_10', 'spades_10', 'heart_6', 'heart_7', 'spades_12', 'spades_8']
  ]);

  const [temp, setTemp] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState(['', '', '', '']);

  const movePoker = (index, column) => {
    const cloneProblem = JSON.parse(JSON.stringify(problem));
    cloneProblem.splice(index, 1, column);
    setProblem(cloneProblem);
  };

  const [history, setHistory] = useState({ 0: problem, });
  const itemsDOM = problem.map(
    (problemCol, index) => (
      <PokerColumn
        key={index}
        column={problemCol}
        movePoker={(column) => { movePoker(index, column); }}
      />
    )
  );
  return (
    <>
      <div className={styles.top_block}>
        <div className={styles.temp_block}>
          {temp.map((aTemp, index) => <TempBlock key={index} pokerFace={aTemp} />)}
        </div>
        <div className={styles.answer_block}>
          {answer.map((aAnswer, index) => <AnswerBlock key={index} pokerFace={aAnswer} />)}
        </div>
      </div>
      <div className={styles.pokerTable}>
        {itemsDOM}
      </div>
    </>
  );
};

export default Main;
