import React from 'react';
import { useDrag } from 'react-dnd';
import PokerCard from '../../lib/PokerCard.js';
import styles from './index.scss';

const DraggableBox = (props) => {
  const {
    id, position: { left, top, }, cardInformation, children, canDrag,
  } = props;

  // 創建 PokerCard 的 instance
  const pokerCard = new PokerCard(cardInformation.cardId);

  // 產生畫面的部分先留著
  const getPokerSuitSvgWith = (suitType, color, size = 20) => {
    let correspondSVG;
    switch (suitType) {
      case 'spades':
        correspondSVG = <path fill={color} d="M12,2C9,7 4,9 4,14C4,16 6,18 8,18C9,18 10,18 11,17C11,17 11.32,19 9,22H15C13,19 13,17 13,17C14,18 15,18 16,18C18,18 20,16 20,14C20,9 15,7 12,2Z" />;
        break;
      case 'club':
        correspondSVG = <path fill={color} d="M12,2C14.3,2 16.3,4 16.3,6.2C16.21,8.77 14.34,9.83 14.04,10C15.04,9.5 16.5,9.5 16.5,9.5C19,9.5 21,11.3 21,13.8C21,16.3 19,18 16.5,18C16.5,18 15,18 13,17C13,17 12.7,19 15,22H9C11.3,19 11,17 11,17C9,18 7.5,18 7.5,18C5,18 3,16.3 3,13.8C3,11.3 5,9.5 7.5,9.5C7.5,9.5 8.96,9.5 9.96,10C9.66,9.83 7.79,8.77 7.7,6.2C7.7,4 9.7,2 12,2Z" />;
        break;
      case 'heart':
        correspondSVG = <path fill={color} d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />;
        break;
      case 'diamond':
        correspondSVG = <path fill={color} d="M19,12L12,22L5,12L12,2" />;
        break;
      default:
        throw new Error(`Can not get SVG with suit name: ${suitType}`);
    }
    return (
      <svg style={{ width: `${size}px`, height: `${size}px`, }} viewBox="0 0 24 24">
        {correspondSVG}
      </svg>
    );
  };

  const getPokerNumberWith = (suitType, num) => {
    const color = pokerCard.getPokerMainColor();
    return <span className={styles.cardFont} style={{ color, }}>{num}</span>;
  };

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
          {getPokerSuitSvgWith(
            pokerCard.getPokerSuit(), pokerCard.getPokerMainColor()
          )}
          {getPokerNumberWith(pokerCard.getPokerSuit(), pokerCard.getPokerNumber())}
        </div>
        {getPokerSuitSvgWith(
          pokerCard.getPokerSuit(), pokerCard.getPokerMainColor(), 60
        )}
      </div>
      {children}
    </div>
  );
};

export default DraggableBox;
