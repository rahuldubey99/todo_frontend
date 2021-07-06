import React, { useEffect, useState } from 'react'
import "./listTodo.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
const ListTodo = () => {
    const history = useHistory();
    const [state, setState] = useState([])
    const callTodoList = async () => {
        let tokens = localStorage.getItem("acceess");
        await axios('http://localhost:8000/list/', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${tokens}`
            }
        }).then(res => {
            console.warn(res.data);
            const item = res.data
            console.warn("hello", item);
            setState(item)

        }).catch(err => {
            console.error(err);
            history.push("/register");
        });
        console.warn("state:", state);



    }
    useEffect(() => {
        callTodoList()
        console.warn("ok ok")
    }, [])
    const [todo, setTodo] = useState()
    const handleTodo = (e) => {
        setTodo(e.target.value)
        console.warn("todos::", todo)
    }
    const createTodo = async () => {
        console.warn("inside function")
        let tokens = localStorage.getItem("acceess");
        await axios('http://localhost:8000/create/', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${tokens}`
            },
            data: {
                "item": todo
            }
        }).then(res => {
            console.warn("created:", res);
        }).catch(err => {
            console.warn("created error:", err);
        })

        callTodoList()
    }
    const deleteTodo = async (id) => {
        console.warn("inside function delete", id)
        let tokens = localStorage.getItem("acceess");
        await axios(`http://localhost:8000/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${tokens}`
            },

        }).then(res => {
        }).catch(err => {
            console.warn("created error:", err);
        })

        callTodoList()
    }
    return (
        <>
            <Navbar />
            <div className="body">
                <div class="wrapper">
                    <header>Todo App</header>
                    <div class="inputField">

                        <input type="text" placeholder="Add your new todo" name="todo" value={todo} onChange={handleTodo} />
                        <button type="submit" onClick={createTodo}>+
                            {/* <i className="fas fa-plus" ></i> */}

                        </button>

                    </div>
                    <ul class="todoList">

                        {
                            state.map((todos, key) => {
                                return <div key={key}> <li>{todos.item}<span className="icon" onClick={() => deleteTodo(todos.id)} ><i className="fas fa-trash"></i></span></li></div>
                            })
                        }


                        {/* <li>GYM<span class="icon" ><i class="fas fa-trash"></i></span></li>
                    <li>GYM<span class="icon" ><i class="fas fa-trash"></i></span></li>
                    <li>GYM<span class="icon" ><i class="fas fa-trash"></i></span></li> */}
                    </ul>
                    <div className="footer">
                        <span>You have <span className="pendingTasks">{state.length}</span> pending tasks</span>
                        {/* <button>Clear All</button> */}
                    </div>
                </div>

            </div>
        </>
    )
}

export default ListTodo
