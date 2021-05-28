import { useEffect, useState } from 'react';
import {
    readTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from './functions/index.js';
import Loading from './components/loading/Loading.js';

function App() {
    const [todo, setTodo] = useState({ title: '', content: '' });
    const [todos, setTodos] = useState(null);
    const [currentID, setCurrentID] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const result = await readTodos();
            setTodos(result);
        };
        fetchData();
    }, [currentID]);
    useEffect(() => {
        let currentTodo =
            currentID !== 0
                ? todos.find((todo) => todo._id === currentID)
                : { title: '', content: '' };
        setTodo(currentTodo);
    }, [currentID]);

    useEffect(() => {
        const clearField = (e) => {
            if (e.keyCode === 27) {
                clear();
            }
        };
        window.addEventListener('keydown', clearField);
        return () => {
            window.removeEventListener('keydown', clearField);
        };
    }, []);
    const clear = () => {
        setCurrentID(0);
        setTodo({ title: '', content: '' });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (currentID === 0) {
            const result = await createTodo(todo);
            setTodos([...todos, result]);
            clear();
        } else {
            await updateTodo(currentID, todo);
            clear();
        }
    };

    const removeHandler = async (id) => {
        await deleteTodo(id);
        let todosCopy = [...todos];
        todosCopy.filter((todo) => todo._id !== id);
        setTodos(todosCopy);
        clear();
    };

    return (
        <div className="container">
            <h2 className="center">Todo App</h2>
            <div className="row">
                <form className="col s12" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="input-field col s6">
                            <i class="material-icons prefix">title</i>
                            <input
                                id="title"
                                type="text"
                                className="validate"
                                value={todo.title}
                                onChange={(e) =>
                                    setTodo({ ...todo, title: e.target.value })
                                }
                            />
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="input-field col s6">
                            <i class="material-icons prefix">description</i>
                            <input
                                id="content"
                                type="text"
                                className="validate"
                                value={todo.content}
                                onChange={(e) =>
                                    setTodo({
                                        ...todo,
                                        content: e.target.value,
                                    })
                                }
                            />
                            <label htmlFor="content">Content</label>
                        </div>
                    </div>
                    <div className="right-align">
                        <button
                            className="waves-effect waves-light btn"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            {!todos ? (
                <Loading />
            ) : todos.length > 0 ? (
                <ul className="collection with-header">
                    <li className="collection-header">
                        <h4>Todo List</h4>
                    </li>
                    {todos.map((todo) => (
                        <li
                            key={todo._id}
                            className="collection-item avatar"
                            onClick={() => setCurrentID(todo._id)}
                        >
                            <i class="material-icons circle green">
                                insert_chart
                            </i>
                            <h5 className="title">{todo.title}</h5>
                            <p>
                                {todo.content}
                                <br />
                            </p>
                            <a
                                onClick={() => removeHandler(todo._id)}
                                href="#!"
                                className="secondary-content"
                            >
                                <i className="material-icons">delete</i>
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <h4 className="center">Nothing to do</h4>
            )}
        </div>
    );
}

export default App;
