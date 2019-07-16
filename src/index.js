import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Main from './component/Main';

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <Main />
  </DndProvider>, document.getElementById('root'));
