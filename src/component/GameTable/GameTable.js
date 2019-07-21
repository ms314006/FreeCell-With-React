import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useDrop } from 'react-dnd';
import Card from '../Card';
import PokerGame from '../../lib/PokerGame.js';
import PokerCard from '../../lib/PokerCard.js';
import * as actions from '../../actions/pokerCard.js';
import styles from './index.scss';

const GameTable = (props) => {
  const {
    questionLayout, tempLayout, overLayout,
    setQuestionLayout, setTempLayout, setOverLayout, addOperationRecord,
  } = props;

  const moveCardPosition = (item, x, y) => {
    const getOriginColumnIndex = () => Number(item.id.split('_')[0]);
    const getOriginRowIndex = () => Number(item.id.split('_')[1]);
    // 原本座標在左上角，加上寬度一半 ，讓判斷的座標在牌的中心
    const getNewColumnIndex = () => {
      // 先去頭去尾
      if ((getOriginColumnIndex() === 0 && x < 0) || (getOriginColumnIndex() === 7 && x > 0)) {
        return getOriginColumnIndex();
      }
      // 之後要算移動多少
      const movePositionX = Math.floor((x + 40) / 100);
      return getOriginColumnIndex() + movePositionX;
    };

    const trunToOverIndex = index => index - 4;

    const isMoveToTempOrOverBlock = () => {
      switch (item.cardInformation.type) {
        case 'question':
          return y + (getOriginRowIndex() * 30) >= 460;
        case 'temp':
        case 'over':
          return y >= -10;
        default:
          throw new Error(`Can not check is Temp or Over block: ${item.cardInformation.type}`);
      }
    };

    const moveQuestionToTemp = () => {
      const cloneQuestArray = questionLayout.map(column => column.map(row => row));
      const cloneTempArray = tempLayout.map(column => column.map(row => row));
      let moveOutColumn = cloneQuestArray[getOriginColumnIndex()];
      const targetColumn = cloneTempArray[getNewColumnIndex()];
      targetColumn.push(moveOutColumn[moveOutColumn.length - 1]);
      moveOutColumn = moveOutColumn.slice(0, moveOutColumn.length - 1);
      cloneQuestArray.splice(getOriginColumnIndex(), 1, moveOutColumn);
      setQuestionLayout(cloneQuestArray);
      setTempLayout(cloneTempArray);
    };

    const moveTempToTemp = () => {
      const cloneTempArray = tempLayout.map(column => column.map(row => row));
      const moveOutColumn = cloneTempArray[getOriginColumnIndex()];
      const targetColumn = cloneTempArray[getNewColumnIndex()];
      cloneTempArray.splice(getNewColumnIndex(), 1, moveOutColumn);
      cloneTempArray.splice(getOriginColumnIndex(), 1, targetColumn);
      setTempLayout(cloneTempArray);
    };

    const moveTempToQuestion = () => {
      const cloneQuestArray = questionLayout.map(column => column.map(row => row));
      const cloneTempArray = tempLayout.map(column => column.map(row => row));
      let moveOutColumn = cloneTempArray[getOriginColumnIndex()];
      const targetColumn = cloneQuestArray[getNewColumnIndex()];
      targetColumn.push(moveOutColumn[0]);
      moveOutColumn = moveOutColumn.slice(0, getOriginRowIndex());
      cloneTempArray.splice(getOriginColumnIndex(), 1, moveOutColumn);
      setQuestionLayout(cloneQuestArray);
      setTempLayout(cloneTempArray);
    };

    const moveQuestionToQuestion = () => {
      const cloneQuestArray = questionLayout.map(column => column.map(row => row));
      const targetColumn = cloneQuestArray[getNewColumnIndex()];
      let moveOutColumn = cloneQuestArray[getOriginColumnIndex()];
      targetColumn.push(...moveOutColumn.slice(getOriginRowIndex(), moveOutColumn.length));
      moveOutColumn = moveOutColumn.slice(0, getOriginRowIndex());
      cloneQuestArray.splice(getNewColumnIndex(), 1, targetColumn);
      cloneQuestArray.splice(getOriginColumnIndex(), 1, moveOutColumn);
      setQuestionLayout(cloneQuestArray);
    };

    const moveQuestionToOver = () => {
      const cloneQuestArray = questionLayout.map(column => column.map(row => row));
      const cloneOverArray = overLayout.map(column => column.map(row => row));
      let moveOutColumn = cloneQuestArray[getOriginColumnIndex()];
      const targetColumn = [moveOutColumn[moveOutColumn.length - 1]];
      moveOutColumn = moveOutColumn.slice(0, moveOutColumn.length - 1);
      cloneQuestArray.splice(getOriginColumnIndex(), 1, moveOutColumn);
      cloneOverArray.splice(trunToOverIndex(getNewColumnIndex()), 1, targetColumn);
      setQuestionLayout(cloneQuestArray);
      setOverLayout(cloneOverArray);
    };

    const moveTempToOver = () => {
      const cloneTempArray = tempLayout.map(column => column.map(row => row));
      const cloneOverArray = overLayout.map(column => column.map(row => row));
      const moveOutColumn = cloneTempArray[getOriginColumnIndex()];
      const targetColumn = [moveOutColumn[moveOutColumn.length - 1]];
      cloneTempArray.splice(getOriginColumnIndex(), 1, []);
      cloneOverArray.splice(trunToOverIndex(getNewColumnIndex()), 1, targetColumn);
      setTempLayout(cloneTempArray);
      setOverLayout(cloneOverArray);
    };

    const moveOverToQuestion = () => {
      const cloneQuestArray = questionLayout.map(column => column.map(row => row));
      const cloneOverArray = overLayout.map(column => column.map(row => row));
      let moveOutColumn = cloneOverArray[trunToOverIndex(getOriginColumnIndex())];
      const moveOutCard = new PokerCard(moveOutColumn[0]);
      const targetColumn = cloneQuestArray[getNewColumnIndex()];
      targetColumn.push(moveOutColumn[0]);
      if (moveOutCard.getPokerNumber() === 1) {
        moveOutColumn = moveOutColumn.slice(0, getOriginRowIndex());
      } else {
        moveOutColumn = [`${moveOutCard.getPokerSuit()}_${moveOutCard.getPokerSuit() - 1}`];
      }
      cloneOverArray.splice(trunToOverIndex(getOriginColumnIndex()), 1, moveOutColumn);
      cloneQuestArray.splice(getNewColumnIndex(), 1, targetColumn);
      setQuestionLayout(cloneQuestArray);
      setOverLayout(cloneOverArray);
    };

    const moveOverToTemp = () => {
      const cloneTempArray = tempLayout.map(column => column.map(row => row));
      const cloneOverArray = overLayout.map(column => column.map(row => row));
      let moveOutColumn = cloneOverArray[trunToOverIndex(getOriginColumnIndex())];
      const moveOutCard = new PokerCard(moveOutColumn[0]);
      const targetColumn = cloneTempArray[getNewColumnIndex()];
      targetColumn.push(moveOutColumn[moveOutColumn.length - 1]);
      if (moveOutCard.getPokerNumber() === 1) {
        moveOutColumn = moveOutColumn.slice(0, getOriginRowIndex());
      } else {
        moveOutColumn = [`${moveOutCard.getPokerSuit()}_${moveOutCard.getPokerNumber() - 1}`];
      }
      cloneOverArray.splice(trunToOverIndex(getOriginColumnIndex()), 1, moveOutColumn);
      cloneTempArray.splice(getNewColumnIndex(), 1, targetColumn);
      setTempLayout(cloneTempArray);
      setOverLayout(cloneOverArray);
    };

    // 封裝判斷
    const getMoveOutBlcokAndTargetBlock = () => {
      switch (true) {
        case (getOriginColumnIndex() === getNewColumnIndex() && item.cardInformation.type === 'temp' && isMoveToTempOrOverBlock()):
          return ['temp', 'sameColumnBlock'];
        case (getOriginColumnIndex() === getNewColumnIndex() && item.cardInformation.type === 'question' && !isMoveToTempOrOverBlock()):
          return ['question', 'sameColumnBlock'];
        case (item.cardInformation.type === 'temp' && !isMoveToTempOrOverBlock()):
          return ['temp', 'question'];
        case (item.cardInformation.type === 'temp' && getNewColumnIndex() < 4 && isMoveToTempOrOverBlock()):
          return ['temp', 'temp'];
        case (item.cardInformation.type === 'temp' && getNewColumnIndex() > 3 && isMoveToTempOrOverBlock()):
          return ['temp', 'over'];
        case (item.cardInformation.type === 'over' && !isMoveToTempOrOverBlock()):
          return ['over', 'question'];
        case (item.cardInformation.type === 'over' && getNewColumnIndex() < 4 && isMoveToTempOrOverBlock()):
          return ['over', 'temp'];
        case (!isMoveToTempOrOverBlock()):
          return ['question', 'question'];
        case (getNewColumnIndex() < 4 && isMoveToTempOrOverBlock()):
          return ['question', 'temp'];
        case (item.cardInformation.type === 'question' && getNewColumnIndex() > 3 && isMoveToTempOrOverBlock()):
          return ['question', 'over'];
        default:
          throw new Error('Can not get curreponse action');
      }
    };

    // 操作
    const moveCardToTargetBlock = () => {
      const [moveout, target] = getMoveOutBlcokAndTargetBlock();
      switch (true) {
        case (moveout === 'temp' && target === 'question'):
          moveTempToQuestion();
          break;
        case (moveout === 'temp' && target === 'temp'):
          moveTempToTemp();
          break;
        case (moveout === 'temp' && target === 'over'):
          moveTempToOver();
          break;
        case (moveout === 'over' && target === 'question'):
          moveOverToQuestion();
          break;
        case (moveout === 'over' && target === 'temp'):
          moveOverToTemp();
          break;
        case (moveout === 'question' && target === 'question'):
          moveQuestionToQuestion();
          break;
        case (moveout === 'question' && target === 'temp'):
          moveQuestionToTemp();
          break;
        case (moveout === 'question' && target === 'over'):
          moveQuestionToOver();
          break;
        default:
          throw new Error('Can not get curreponse move action');
      }
    };

    // 檢查
    const isCanMove = (question, temp, over) => {
      const [, target] = getMoveOutBlcokAndTargetBlock();
      switch (target) {
        case 'question': {
          // 如果是移動到 question，判斷該躝的最後一張，顏色是否相反，數字是否加一
          const targetBlockColumn = question[getNewColumnIndex()];
          // 如果那欄沒有牌就直接放了
          if (targetBlockColumn.length === 0) {
            return true;
          }
          const targetBlockLastCard = new PokerCard(targetBlockColumn[targetBlockColumn.length - 1]);
          const moveOutCard = new PokerCard(item.cardInformation.cardId);
          if (targetBlockLastCard.getPokerMainColor() !== moveOutCard.getPokerMainColor()
            && targetBlockLastCard.getPokerNumber() - 1 === moveOutCard.getPokerNumber()) {
            return true;
          }
          break;
        }
        case 'temp': {
          const targetBlockColumn = temp[getNewColumnIndex()];
          if (targetBlockColumn.length === 0) {
            return true;
          }
          break;
        }
        case 'over': {
          const targetBlockColumn = over[trunToOverIndex(getNewColumnIndex())];
          const targetBlockLastCard = new PokerCard(targetBlockColumn[targetBlockColumn.length - 1]);
          const targetBlockCorrespondSuit = PokerCard.getPokerSuitWithIndex(trunToOverIndex(getNewColumnIndex()));
          const moveOutCard = new PokerCard(item.cardInformation.cardId);
          if ((targetBlockColumn.length === 0 && moveOutCard.getPokerNumber() === 1
            && targetBlockCorrespondSuit === moveOutCard.getPokerSuit())
            || (targetBlockLastCard.getPokerSuit() === moveOutCard.getPokerSuit()
              && targetBlockLastCard.getPokerNumber() === moveOutCard.getPokerNumber())) {
            return true;
          }
          break;
        }
        case 'sameColumnBlock':
          return false;
        default:
          throw new Error('Can not check can move');
      }
      return false;
    };

    if (isCanMove(questionLayout, tempLayout, overLayout)) {
      // 移動卡片
      moveCardToTargetBlock();
      // 記錄這次的操作
      addOperationRecord({
        questionLayout: questionLayout.map(column => column.map(row => row)),
        tempLayout: tempLayout.map(column => column.map(row => row)),
        overLayout: overLayout.map(column => column.map(row => row)),
      });
    }
  };

  const producePokerCardColumn = (column, columnIndex, type) => {
    const pokerGame = new PokerGame(type, column, columnIndex);

    if (pokerGame.isBlockDataEmpty()) {
      return pokerGame.getEmptyContentBlock();
    }

    const getCardId = (cardInformation) => {
      const { arrayIndex, } = cardInformation;
      switch (cardInformation.type) {
        case 'question':
        case 'temp':
          return `${arrayIndex.column}_${arrayIndex.row}`;
        case 'over':
          return `${arrayIndex.column + 4}_${arrayIndex.row}`;
        default:
          throw new Error(`Can not get CardId type: ${type}`);
      }
    };

    let currentRowIndex = -1;
    const produceSingleCard = () => {
      const isCanDrap = () => {
        switch (type) {
          case 'over':
          case 'temp':
            return true;
          case 'question': {
            if (currentRowIndex === column.length - 1) {
              return true;
            }
            // 取得目前 temp empty count
            const tempLayoutEmptyCount = tempLayout.reduce((count, value) => value.length === 0 ? count += 1 : count += 0, 0);
            // 可移動數
            const canDrapCardCount = tempLayoutEmptyCount + 1;
            for (let i = currentRowIndex; i < column.length - 1; i += 1) {
              const currentPokerCard = new PokerCard(column[i]);
              const nextPokerCard = new PokerCard(column[i + 1]);
              if (!(currentPokerCard.getPokerMainColor() !== nextPokerCard.getPokerMainColor()
                && currentPokerCard.getPokerNumber() - 1 === nextPokerCard.getPokerNumber()
                && column.length - (currentRowIndex + 1) < canDrapCardCount)) {
                return false;
              }
            }
            return true;
          }
          default:
            throw new Error(`Can not check can drap with type: ${type}`);
        }
      };

      currentRowIndex += 1;
      const cardInformation = {
        type,
        cardId: column[currentRowIndex],
        arrayIndex: { column: columnIndex, row: currentRowIndex, },
      };

      return (
        <Card
          canDrag={isCanDrap()}
          key={currentRowIndex}
          id={getCardId(cardInformation)}
          cardInformation={cardInformation}
          position={pokerGame.getCardPositionInBlock()}
        >
          {currentRowIndex < column.length - 1 ? produceSingleCard() : null}
        </Card>
      );
    };
    return produceSingleCard();
  };

  const moveBox = useCallback(
    (item, left, top) => {
      moveCardPosition(item, left, top);
    },
    [questionLayout, tempLayout, overLayout]
  );

  const [, drop] = useDrop({
    accept: 'card',
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveBox(item, left, top);
      return undefined;
    },
  });

  return (
    <div className={styles.gemeTable}>
      <div ref={drop}>
        <div className={styles.top_block}>
          {questionLayout.map((column, columnIndex) => (
            <div key={columnIndex} className={`${styles.questionCard} ${styles.put_card_block}`}>
              {producePokerCardColumn(column, columnIndex, 'question')}
            </div>
          ))}
        </div>
        <div className={styles.bottom_block}>
          <div className={styles.bottom_card_block}>
            {tempLayout.map((column, columnIndex) => (
              <div key={columnIndex} className={`${styles.put_card_block} ${styles.bottom_card_block_outsideBorder}`}>
                <div className={styles.bottom_card_block_insideBorder}>
                  {producePokerCardColumn(column, columnIndex, 'temp')}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.bottom_card_block}>
            {overLayout.map((column, columnIndex) => (
              <div key={columnIndex} className={`${styles.put_card_block} ${styles.bottom_card_block_outsideBorder}`}>
                <div className={styles.bottom_card_block_insideBorder}>
                  {producePokerCardColumn(column, columnIndex, 'over')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  questionLayout: state.questionLayout,
  tempLayout: state.tempLayout,
  overLayout: state.overLayout,
  operationRecord: state.operationRecord,
});

const mapStateToDispatch = dispatch => ({
  setQuestionLayout: (questionLayout) => { dispatch(actions.setQuestionLayout({ questionLayout, })); },
  setTempLayout: (tempLayout) => { dispatch(actions.setTempLayout({ tempLayout, })); },
  setOverLayout: (overLayout) => { dispatch(actions.setOverLayout({ overLayout, })); },
  addOperationRecord: (operationRecord) => { dispatch(actions.addOperationRecord({ operationRecord, })); },
});

export default connect(mapStateToProps, mapStateToDispatch)(GameTable);
