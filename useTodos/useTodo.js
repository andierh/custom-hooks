import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer';

export const useTodo = (initialState) => {

    const init = () => {
        return JSON.parse( localStorage.getItem('todos') )  || [];
    }

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
      localStorage.setItem( 'todos', JSON.stringify( todos ) );
    }, [todos])
    

    const handleNewTodo = ( todo ) => {
        const action = {
            type: 'Add todo',
            payload: todo
        }

        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: 'Remove Todo',
            payload: id
        })
    }


    const handleToggleTodo = ( id ) => {
        dispatch({
            type: 'Toggle Todo',
            payload: id
        })
    }





  return {
    todos,
    handleDeleteTodo,
    handleToggleTodo,
    handleNewTodo,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todos=> !todos.done).length,
}
}
