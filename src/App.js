import { useEffect, useState } from 'react';
import { readTodos, createTodo } from './functions/index.js';
import Loading from './components/loading/Loading.js';

function App() {
    const [todo, setTodo] = useState({ title: '', content: '' });
    useEffect(() => {
        const fetchData = async () => {
            const result = await readTodos();
            console.log(result);
        };
        fetchData();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        const result = await createTodo(todo);
        console.log(result);
    };

    return (
        <div className="container">
            <div className="row">
                <pre>{JSON.stringify(todo)}</pre>
                <form className="col s12" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="input-field col s6">
                            <i class="material-icons prefix">title</i>
                            <input
                                id="title"
                                type="text"
                                className="validate"
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
                            class="waves-effect waves-light btn"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <Loading />

            <ul class="collection with-header">
                <li class="collection-header">
                    <h4>Todo List</h4>
                </li>
                <li class="collection-item">
                    <div>
                        Alvin
                        <a href="#!" class="secondary-content">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>
                </li>
                <li class="collection-item">
                    <div>
                        Alvin
                        <a href="#!" class="secondary-content">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>
                </li>
                <li class="collection-item">
                    <div>
                        Alvin
                        <a href="#!" class="secondary-content">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>
                </li>
                <li class="collection-item">
                    <div>
                        Alvin
                        <a href="#!" class="secondary-content">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default App;
