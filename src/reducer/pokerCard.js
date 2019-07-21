import {
  SET_QUESTION_LAYOUT,
  SET_TEMP_LAYOUT,
  SET_OVER_LAYOUT,
  ADD_OPERATION_RECORD,
  RESTART_GAME,
  GET_PREVIOUS_RECORD,
} from '../actions/pokerCard';

export const initState = {
  questionLayout: [
    ['heart_9', 'spades_7', 'club_10', 'diamond_2', 'heart_2', 'heart_1', 'club_1'],
    ['spades_13', 'diamond_11', 'diamond_4', 'spades_3', 'diamond_1'],
    ['club_12', 'club_11', 'diamond_8', 'spades_6', 'spades_4', 'heart_12', 'club_3'],
    ['spades_9', 'heart_10', 'club_6', 'club_9', 'club_4', 'diamond_5', 'club_2'],
    ['club_5', 'diamond_13', 'heart_5', 'diamond_6', 'club_13', 'diamond_12', 'spades_11', 'spades_1'],
    ['heart_8', 'club_7', 'club_8', 'heart_4', 'diamond_3', 'spades_2'],
    ['diamond_9', 'diamond_7', 'heart_11', 'heart_13', 'spades_5', 'heart_3'],
    ['diamond_10', 'spades_10', 'spades_12', 'spades_8', 'heart_7', 'heart_6']
  ],
  tempLayout: [[], [], [], []],
  overLayout: [[], [], [], []],
  operationRecord: [{
    recordNumber: 0,
    questionLayout: [
      ['heart_9', 'spades_7', 'club_10', 'diamond_2', 'heart_2', 'heart_1', 'club_1'],
      ['spades_13', 'diamond_11', 'diamond_4', 'spades_3', 'diamond_1'],
      ['club_12', 'club_11', 'diamond_8', 'spades_6', 'spades_4', 'heart_12', 'club_3'],
      ['spades_9', 'heart_10', 'club_6', 'club_9', 'club_4', 'diamond_5', 'club_2'],
      ['club_5', 'diamond_13', 'heart_5', 'diamond_6', 'club_13', 'diamond_12', 'spades_11', 'spades_1'],
      ['heart_8', 'club_7', 'club_8', 'heart_4', 'diamond_3', 'spades_2'],
      ['diamond_9', 'diamond_7', 'heart_11', 'heart_13', 'spades_5', 'heart_3'],
      ['diamond_10', 'spades_10', 'spades_12', 'spades_8', 'heart_7', 'heart_6']
    ],
    tempLayout: [[], [], [], []],
    overLayout: [[], [], [], []],
  }],
};

const pokerCard = (state = initState, action) => {
  switch (action.type) {
    case SET_QUESTION_LAYOUT:
      return {
        ...state,
        questionLayout: action.payload.questionLayout,
      };
    case SET_TEMP_LAYOUT:
      return {
        ...state,
        tempLayout: action.payload.tempLayout,
      };
    case SET_OVER_LAYOUT:
      return {
        ...state,
        overLayout: action.payload.overLayout,
      };
    case ADD_OPERATION_RECORD: {
      const operationRecord = JSON.parse(JSON.stringify(state.operationRecord));
      operationRecord.push({
        ...action.payload.operationRecord,
        newNumber: operationRecord.length,
      });
      return {
        ...state,
        operationRecord,
      };
    }
    case RESTART_GAME:
      return {
        ...state,
        ...initState,
      };
    case GET_PREVIOUS_RECORD: {
      const getPreciousRecoreIndex = () => state.operationRecord.length - 1;
      return {
        ...state,
        ...state.operationRecord[getPreciousRecoreIndex()],
        operationRecord: state.operationRecord.slice(0, getPreciousRecoreIndex()),
      };
    }
    default:
      return state;
  }
};

export default pokerCard;
