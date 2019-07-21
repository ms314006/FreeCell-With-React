export const SET_QUESTION_LAYOUT = 'SET_QUESTION';

export const setQuestionLayout = questionLayout => ({
  type: SET_QUESTION_LAYOUT,
  payload: {
    ...questionLayout,
  },
});

export const SET_TEMP_LAYOUT = 'SET_TEMP_LAYOUT';

export const setTempLayout = tempLayout => ({
  type: SET_TEMP_LAYOUT,
  payload: {
    ...tempLayout,
  },
});

export const SET_OVER_LAYOUT = 'SET_OVER_LAYOUT';

export const setOverLayout = overLayout => ({
  type: SET_OVER_LAYOUT,
  payload: {
    ...overLayout,
  },
});

export const ADD_OPERATION_RECORD = 'ADD_OPERATION_RECORD';

export const addOperationRecord = operationRecord => ({
  type: ADD_OPERATION_RECORD,
  payload: {
    ...operationRecord,
  },
});

export const RESTART_GAME = 'RESTART_GAME';

export const restartGame = () => ({
  type: RESTART_GAME,
});

export const GET_PREVIOUS_RECORD = 'GET_PREVIOUS_RECORD';

export const getPreviousRecord = () => ({
  type: GET_PREVIOUS_RECORD,
});

export const NEW_GAME = 'NEW_GAME';

export const newGame = () => ({
  type: NEW_GAME,
});
