import React from 'react';
import Suit from './suit';

class PokerGame {

  constructor(blockType, blockData, blockIndex) {
    this.blockType = blockType;
    this.blockData = blockData;
    this.blockIndex = blockIndex;
  }

  getCardPositionInBlock() {
    const getQuestBlockPosition = () => ({ left: 0, top: 30, });
    const getTempOrOverBlockPosition = () => ({ left: -2, top: -2, });
    return this.blockType === 'question' ? getQuestBlockPosition() : getTempOrOverBlockPosition();
  }

  getEmptyContentBlock() {
    if (this.blockType !== 'over') {
      return null;
    }
    const emptyContent = (color) => {
      switch (this.blockIndex) {
        case 0:
          return Suit.Spades.getSuitSvg(color);
        case 1:
          return Suit.Heart.getSuitSvg(color);
        case 2:
          return Suit.Club.getSuitSvg(color);
        case 3:
          return Suit.Diamond.getSuitSvg(color);
        default:
          throw new Error(`Can not get suit for index: ${this.blockIndex}`);
      }
    };

    return (
      <svg style={{ width: '60px', height: '60px', }} viewBox="0 0 24 24">
        {emptyContent('#99A779')}
      </svg>
    );
  }

  isBlockDataEmpty() {
    return this.blockData.length === 0;
  }
}

export default PokerGame;
