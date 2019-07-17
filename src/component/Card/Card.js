import React from 'react';
import { useDrag } from 'react-dnd';

function getStyles(left, top) {
  return {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    left,
    top,
  };
}

const DraggableBox = (props) => {
  const {
    id, left, top, suit, number,
  } = props;

  const getPokerSuitSvgWith = (suitName) => {
    switch (suitName) {
      case 'spades':
        return <path fill="#35464E" d="M12,2C9,7 4,9 4,14C4,16 6,18 8,18C9,18 10,18 11,17C11,17 11.32,19 9,22H15C13,19 13,17 13,17C14,18 15,18 16,18C18,18 20,16 20,14C20,9 15,7 12,2Z" />;
      case 'club':
        return <path fill="#35464E" d="M12,2C14.3,2 16.3,4 16.3,6.2C16.21,8.77 14.34,9.83 14.04,10C15.04,9.5 16.5,9.5 16.5,9.5C19,9.5 21,11.3 21,13.8C21,16.3 19,18 16.5,18C16.5,18 15,18 13,17C13,17 12.7,19 15,22H9C11.3,19 11,17 11,17C9,18 7.5,18 7.5,18C5,18 3,16.3 3,13.8C3,11.3 5,9.5 7.5,9.5C7.5,9.5 8.96,9.5 9.96,10C9.66,9.83 7.79,8.77 7.7,6.2C7.7,4 9.7,2 12,2Z" />;
      case 'heart':
        return <path fill="#CD4C48" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />;
      case 'diamond':
        return <path fill="#CD4C48" d="M19,12L12,22L5,12L12,2" />;
      default:
        throw new Error(`Can not get SVG with suit name: ${suitName}`);
    }
  };

  const getPokerNumberWith = (suitType, num) => {
    switch (suitType) {
      case 'spades':
      case 'club':
        return <span style={{ color: '#35464E', fontSize: '48px', }}>{num}</span>;
      case 'heart':
      case 'diamond':
        return <span style={{ color: '#CD4C48', fontSize: '48px', }}>{num}</span>;
      default:
        throw new Error(`Can not get number text with suit name: ${suitType} num: ${num}`);
    }
  };

  const [, drag] = useDrag({
    item: {
      type: 'card', id, left, top,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={getStyles(left, top)}>
      <svg style={{ width: '48px', height: '48px', }} viewBox="0 0 24 24">
        {getPokerSuitSvgWith(suit)}
      </svg>
      {getPokerNumberWith(suit, number)}
    </div>
  );
};

export default DraggableBox;
