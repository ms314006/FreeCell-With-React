import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import Card from '../Card';
import styles from './index.scss';


const GameTable = (props) => {
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

  const [tempLayout, setTempLayout] = useState([[], [], [], []]);

  const [overLayout, setOverLayout] = useState([[], [], [], []]);

  const [operationRecord, setOperationRecord] = useState([{
    recordNumber: 0,
    questionLayout: [
      ['heart_2', 'club_1', 'heart_9', 'heart_1', 'diamond_2', 'spades_7', 'club_10'],
      ['spades_13', 'diamond_1', 'diamond_11', 'spades_3', 'diamond_4'],
      ['club_12', 'club_11', 'diamond_8', 'spades_6', 'spades_4', 'heart_12', 'club_3'],
      ['club_4', 'spades_9', 'heart_10', 'club_6', 'diamond_5', 'club_9', 'club_2'],
      ['club_5', 'diamond_13', 'heart_5', 'spades_1', 'diamond_6', 'club_13', 'diamond_12', 'spades_11'],
      ['heart_8', 'heart_4', 'diamond_3', 'club_7', 'club_8', 'spades_2'],
      ['diamond_9', 'diamond_7', 'heart_3', 'heart_11', 'spades_5', 'heart_13'],
      ['diamond_10', 'spades_10', 'heart_6', 'heart_7', 'spades_12', 'spades_8']
    ],
    tempLayout: [[], [], [], []],
    overLayout: [[], [], [], []],
  }]);

  const getQuestBlockPosition = () => {
    const poritionX = 0;
    const poritionY = 30;
    return { left: poritionX, top: poritionY, };
  };

  const getTempOrOverBlockPosition = () => {
    const poritionX = -2;
    const poritionY = -2;
    return { left: poritionX, top: poritionY, };
  };

  const getPokerSuitWithIndex = (index) => {
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
        throw new Error(`Can not get suit for index: ${index}`);
    }
  };

  const getPokerColorWithSuit = (suit) => {
    switch (suit) {
      case 'spades':
      case 'club':
        return '#8497C6';
      case 'heart':
      case 'diamond':
        return '#EE957E';
      default:
        throw new Error(`Can not get color with suit name: ${suit}`);
    }
  };

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

  const getPokerSuit = (data = '') => data.split('_')[0];
  const getPokerNumber = (data = '') => Number(data.split('_')[1]);

  const addOperationRecord = () => {
    const cloneOperationRecord = JSON.parse(JSON.stringify(operationRecord));
    // 取得新編號
    const newNumber = cloneOperationRecord.length;
    // 加入紀錄
    cloneOperationRecord.push({
      recordNumber: newNumber,
      questionLayout: questionLayout.map(column => column.map(row => row)),
      tempLayout: tempLayout.map(column => column.map(row => row)),
      overLayout: overLayout.map(column => column.map(row => row)),
    });
    setOperationRecord(cloneOperationRecord);
  };

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

    const trunToOverIndex = () => getNewColumnIndex() - 4;

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
      cloneOverArray.splice(trunToOverIndex(), 1, targetColumn);
      setQuestionLayout(cloneQuestArray);
      setOverLayout(cloneOverArray);
    };

    const moveTempToOver = () => {
      const cloneTempArray = tempLayout.map(column => column.map(row => row));
      const cloneOverArray = overLayout.map(column => column.map(row => row));
      const moveOutColumn = cloneTempArray[getOriginColumnIndex()];
      const targetColumn = [moveOutColumn[moveOutColumn.length - 1]];
      cloneTempArray.splice(getOriginColumnIndex(), 1, []);
      cloneOverArray.splice(trunToOverIndex(), 1, targetColumn);
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
          const targetBlockLastCard = targetBlockColumn[targetBlockColumn.length - 1];
          const targetBlockLastCardColor = getPokerColorWithSuit(getPokerSuit(targetBlockLastCard));
          const targetBlockLastCardNumber = getPokerNumber(targetBlockLastCard);
          const moveOutCardColor = getPokerColorWithSuit(getPokerSuit(item.cardInformation.cardId));
          const moveOutCardNumber = getPokerNumber(item.cardInformation.cardId);
          if (targetBlockLastCardColor !== moveOutCardColor
            && targetBlockLastCardNumber - 1 === moveOutCardNumber) {
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
          const targetBlockColumn = over[trunToOverIndex()];
          const targetBlockLastCard = targetBlockColumn[targetBlockColumn.length - 1];
          const targetBlockLastCardSuit = getPokerSuit(targetBlockLastCard);
          const targetBlockLastCardNumber = getPokerNumber(targetBlockLastCard);
          const targetBlockCorrespondSuit = getPokerSuitWithIndex(trunToOverIndex());
          const moveOutCardSuit = getPokerSuit(item.cardInformation.cardId);
          const moveOutCardNumber = getPokerNumber(item.cardInformation.cardId);
          if ((targetBlockColumn.length === 0 && moveOutCardNumber === 1
            && targetBlockCorrespondSuit === moveOutCardSuit)
            || (targetBlockLastCardSuit === moveOutCardSuit
              && targetBlockLastCardNumber + 1 === moveOutCardNumber)) {
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
      addOperationRecord();
    }
  };

  const producePokerCardColumn = (column, columnIndex, type) => {
    if (column.length === 0) {
      return type === 'over' && column.length === 0
        ? getPokerSuitSvgWith(getPokerSuitWithIndex(columnIndex), '#99A779', 48) : null;
    }
    let currentRowIndex = -1;
    const produceSingleCard = () => {
      const isCanDrap = () => {
        switch (type) {
          case 'over':
            return false;
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
              if (!(getPokerColorWithSuit(getPokerSuit(column[i])) !== getPokerColorWithSuit(getPokerSuit(column[i + 1]))
                && getPokerNumber(column[i]) - 1 === getPokerNumber(column[i + 1])
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
          id={`${columnIndex}_${currentRowIndex}`}
          cardInformation={cardInformation}
          position={type === 'question'
            ? getQuestBlockPosition(columnIndex, currentRowIndex) : getTempOrOverBlockPosition()
          }
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

export default GameTable;
