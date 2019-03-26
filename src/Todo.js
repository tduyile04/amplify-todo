import React, { Component } from 'react';
import './Todo.css';
import config from './aws-exports';
import Amplify, { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';

import { listTodos } from '../src/graphql/queries';

Amplify.configure(config);

class Todo extends Component {
  state = {
    todos: []
  }

  render() {
    return (
      <Connect query={graphqlOperation(listTodos)}>
        {({data: { listTodos: todos }, loading, error }) => {
          if (error) return <h3>Error loading data</h3>
          if(loading) return <h3>Loading data...</h3>
          return (
            <ul>
              {todos.items.map(todo => {
                return <li key={todo.id}>{todo.name} - {todo.description} - {String(todo.completed)}</li>
              })}
            </ul>
          )
        }}
      </Connect>
    )
  }
}

export default Todo;
