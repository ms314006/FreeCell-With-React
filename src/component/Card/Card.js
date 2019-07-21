import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import PokerCard from '../../lib/PokerCard.js';
import styles from './index.scss';

const Card = (props) => {
  const {
    id, position: { left, top, }, cardInformation, children, canDrag,
  } = props;

  // 創建 PokerCard 的 instance
  const pokerCard = new PokerCard(cardInformation.cardId);

  const [, drag] = useDrag({
    item: {
      type: 'card', id, left, top, cardInformation,
    },
    canDrag,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={styles.dragBlock} style={{ left, top, }}>
      <div
        className={styles.card}
        style={{
          border: `1px solid ${pokerCard.getPokerMainColor()}`,
          backgroundColor: pokerCard.getPokerCardBackgroundColor(),
        }}
      >
        <div className={styles.cardInformation}>
          {pokerCard.getPokerSuitSvg()}
          {pokerCard.getPokerNumberText()}
        </div>
        {pokerCard.getPokerSuitSvg(pokerCard.getPokerMainColor(), 60)}
      </div>
      {children}
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string,
  position: PropTypes.shape({
    left: PropTypes.number, top: PropTypes.number,
  }),
  cardInformation: PropTypes.shape({}),
  children: PropTypes.shape({}),
  canDrag: PropTypes.bool,
};

Card.defaultProps = {
  id: '',
  position: {
    left: 0,
    top: 0,
  },
  cardInformation: {},
  canDrag: false,
  children: {},
};

export default Card;
