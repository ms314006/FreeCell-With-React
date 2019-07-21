import { createStore } from 'redux';
import reducer from '../reducer/pokerCard.js';

const store = createStore(reducer);

window.store = store;

export default store;
