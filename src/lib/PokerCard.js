import React from 'react';
import Suit from './suit';
import styles from '../component/Card/index.scss';

class PokerCard {
  constructor(cardId) {
    this.cardId = cardId;
  }

  static getPokerSuitWithIndex(index) {
    // 0,1,2,3
    switch (index) {
      case 0:
        return 'spades';
      case 1:
        return 'heart';
      case 2:
        return 'club';
      case 3:
        return 'diamond';
      default:
        throw new Error(`Can not get suit with index: ${index}`);
    }
  }

  getPokerSuit() {
    return this.cardId.split('_')[0];
  }

  getPokerNumber() {
    return Number(this.cardId.split('_')[1]);
  }

  getPokerMainColor() {
    switch (this.getPokerSuit()) {
      case 'spades':
      case 'club':
        return '#8497C6';
      case 'heart':
      case 'diamond':
        return '#EE957E';
      default:
        throw new Error(`Can not get color with suit name: ${this.getPokerSuit()}`);
    }
  }

  getPokerCardBackgroundColor() {
    switch (this.getPokerSuit()) {
      case 'spades':
      case 'club':
        return '#DCE2F1';
      case 'heart':
      case 'diamond':
        return '#FDE6E0';
      default:
        throw new Error(`Can not get background color with suit name: ${this.getPokerSuit()}`);
    }
  }

  getPokerSuitSvg(color = this.getPokerMainColor(), size = 20) {
    let correspondSVG;
    switch (this.getPokerSuit()) {
      case 'spades':
        correspondSVG = Suit.Spades.getSuitSvg(color);
        break;
      case 'club':
        correspondSVG = Suit.Club.getSuitSvg(color);
        break;
      case 'heart':
        correspondSVG = Suit.Heart.getSuitSvg(color);
        break;
      case 'diamond':
        correspondSVG = Suit.Diamond.getSuitSvg(color);
        break;
      default:
        throw new Error(`Can not get SVG with suit name: ${this.getPokerSuit()}`);
    }
    return (
      <svg style={{ width: `${size}px`, height: `${size}px`, }} viewBox="0 0 24 24">
        {correspondSVG}
      </svg>
    );
  }

  getPokerNumberText() {
    return (<span className={styles.cardFont} style={{ color: this.getPokerMainColor(), }}>{this.getPokerNumber()}</span>);
  }
}

export default PokerCard;
