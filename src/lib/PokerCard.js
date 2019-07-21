class PokerCard {
  constructor(cardId) {
    this.cardId = cardId;
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
}

export default PokerCard;
