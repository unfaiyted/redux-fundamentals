import React from 'react';
import  {connect} from 'react-redux';
import List from './List'

import {
    handleAddTodo,
    handleDeleteTodo,
    handleToggle
} from "../actions/todos";


class Todos extends React.Component {
    toggleItem = (todo) => {
        console.log('TOGGLE TODO VALUE',todo);
        this.props.dispatch(handleToggle(todo.id))

    };
    removeItem = (todo) => {
        //Instant feedback
        this.props.dispatch(handleDeleteTodo(todo));
    };
    addItem = (e) => {
        e.preventDefault();

        this.props.dispatch(
            handleAddTodo(this.input.value,
                () => this.input.value = ''));
    };
    render() {
        return(
            <div>
                <h1>Todo List</h1>
                <input
                    type='text'
                    placeholder='Add Todo'
                    ref={ (input) => this.input = input }/>
                <button onClick={this.addItem}>Add Todo</button>
                <List items={this.props.todos}
                      remove={this.removeItem}
                      toggle={this.toggleItem} />
            </div>
        )

    }
}


export default connect((state) => ({
    todos: state.todos
}))(Todos);
