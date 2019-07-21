import {
  SET_QUESTION_LAYOUT,
  SET_TEMP_LAYOUT,
  SET_OVER_LAYOUT,
  ADD_OPERATION_RECORD,
  RESTART_GAME,
  GET_PREVIOUS_RECORD,
  NEW_GAME
} from '../actions/pokerCard';
import questions from '../assets/questions.js';

const getRandomQuest = () => {
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  return JSON.parse(JSON.stringify(questions[getRandom(0, questions.length - 1)]));
};
let newQuest = getRandomQuest();

export const initState = {
  questionLayout: newQuest,
  tempLayout: [[], [], [], []],
  overLayout: [[], [], [], []],
  operationRecord: [{
    recordNumber: 0,
    questionLayout: newQuest,
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
    case NEW_GAME: {
      newQuest = getRandomQuest();
      return {
        ...state,
        questionLayout: newQuest,
        tempLayout: [[], [], [], []],
        overLayout: [[], [], [], []],
        operationRecord: [{
          recordNumber: 0,
          questionLayout: newQuest,
          tempLayout: [[], [], [], []],
          overLayout: [[], [], [], []],
        }],
      };
    }
    default:
      return state;
  }
};

export default pokerCard;
