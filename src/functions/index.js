import * as api from '../api/index.js';

export const readTodos = async () => {
    try {
        const { data } = await api.readTodos();
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const createTodo = async (todo) => {
    try {
        const { data } = await api.createTodo(todo);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const updateTodo = async (id, todo) => {
    try {
        const { data } = await api.updateTodo(id, todo);
        return data;
    } catch (err) {
        console.log(err);
    }
};
