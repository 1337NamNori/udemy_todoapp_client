import axios from 'axios';

const url = `https://udemy-mern-todoapp.herokuapp.com/todos`;

export const readTodos = () => axios.get(url);
export const createTodo = (newTodo) => axios.post(url, newTodo);
export const updateTodo = (id, todo) => axios.put(`${url}/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);
