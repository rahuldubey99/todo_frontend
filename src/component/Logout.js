import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();
    useEffect(() => {
        let tokens = localStorage.getItem("acceess");
        axios("http://localhost:8000/logout/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${tokens}`
            }
        }).then(response => {
            console.warn("OK");
            localStorage.clear()
            history.push("/register")
        }).catch(err => console.log(err))
    })

    return (
        <div>

        </div>
    )
}

export default Logout
