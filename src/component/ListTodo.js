import React, { useEffect, useState } from 'react'
import "./listTodo.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const ListTodo = () => {
    const history = useHistory();
    const [state, setState] = useState({
        items: []
    })
    const callTodoList = async () => {
        let tokens = localStorage.getItem("acceess");
        const response = await axios('http://localhost:8000/list/', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${tokens}`
            }
        }).then(res => {
            console.warn(res);
            setState({ items: res.data });
        }).catch(err => {
            console.error(err);
            history.push("/register");
        });

        console.warn("state:", state);

    }
    useEffect(() => {
        // callTodoList()
        console.warn("ok ok")
    }, [])
    return (
        <>
            <div class="wrapper">
                <header>Todo App</header>
                <div class="inputField">
                    <input type="text" placeholder="Add your new todo" />
                    <button><i class="fas fa-plus"></i></button>
                </div>
                <ul class="todoList">
                    <li>GYM<span class="icon" ><i class="fas fa-trash"></i></span></li>
                    <li>GYM<span class="icon" ><i class="fas fa-trash"></i></span></li>
                    <li>GYM<span class="icon" ><i class="fas fa-trash"></i></span></li>
                    <li>GYM<span class="icon" ><i class="fas fa-trash"></i></span></li>
                </ul>
                <div class="footer">
                    <span>You have <span class="pendingTasks"></span> pending tasks</span>
                    <button>Clear All</button>
                </div>
            </div>
        </>
    )
}

export default ListTodo
