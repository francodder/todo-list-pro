import React from 'react';
import ReactDOM from 'react-dom';
import TodoListApp from './TodoListApp';
import './styles/main.sass'

ReactDOM.render(
  <React.StrictMode>
    <TodoListApp />
  </React.StrictMode>,
  document.getElementById('root')
);

