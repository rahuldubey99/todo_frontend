import React, { useState, useEffect } from 'react'
import Image1 from '../assets/image/1.jpg';
import Image2 from '../assets/image/2.jpg'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginAndSignup = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    })
    const [login, setLogin] = useState({
        "username": "",
        "password": "",
    })

    const notifyError = (db) => {
        if (db.length > 0) {
            for (let i = 0; i < db.length; i++) {
                toast.error(db[i][0], {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });


            }
        }

    }
    const handleInputs = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });

    };
    const handleLoginInput = (e) => {
        console.warn(login)
        setLogin({
            ...login, [e.target.name]: e.target.value
        })
    }

    const [state, setState] = useState({
        toggle: true

    })
    const Result = async (e) => {
        console.log("ok done")

        // Send a POST request
        e.preventDefault();
        const result = await axios({
            method: 'post',
            url: 'http://localhost:8000/register/',
            data: {
                "username": user.username,
                "email": user.email,
                "password": user.password,
                "password2": user.password2,
            }
        }).then(res => {
            console.warn("response:", res);
            toast.success('Your account created successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(err => {
            notifyError(err.response.data.error);
        });
    }
    const LoginResult = async (e) => {
        console.log("ok done login")

        // Send a POST request
        e.preventDefault();
        await axios({
            method: 'post',
            url: 'http://localhost:8000/login/',
            data: {
                "username": login.username,
                "password": login.password,

            }
        }).then(res => {
            console.warn("response:", res);
            toast.success('Login successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.warn("acceess:", res.data["access"]);
            localStorage.setItem("acceess", res.data["access"])
            const token = localStorage.getItem("acceess")
            console.warn("token:", token);
        }).catch(err => {
            console.error("error", err.response.data);
        });

    }
    function toggleForm() {
        console.log(state)

        if (state.toggle === true)
            setState({ toggle: false })
        else
            setState({ toggle: true })
    }
    return (
        <div>
            <ToastContainer />
            <section className={state.toggle ? "active" : ""} >

                <div className={state.toggle ? "container active" : "container"}>
                    <div className="user signinBox">
                        <div className="imageBox"><img src={Image1} alt="" /></div>
                        <div className="formBox">
                            <form>
                                <h2>Sign In</h2>
                                <input type="text" placeholder="Username" name="username" value={login.username} onChange={handleLoginInput} required />
                                <input type="password" placeholder="Password" name="password" value={login.password} onChange={handleLoginInput} required />
                                <input type="submit" value="Login" onClick={LoginResult} />
                                <p className="signup">don't have an account?<a href="#" onClick={toggleForm}>Sign up.</a></p>
                            </form>
                        </div>
                    </div>
                    <div className=" user signupBox">
                        <div className="formBox">
                            <form>
                                <h2>Create an account</h2>
                                <input type="text" name="username" value={user.username} onChange={handleInputs} placeholder="Username" required />
                                <input type="text" name="email" value={user.email} onChange={handleInputs} placeholder="Email address" required />
                                <input type="password" name="password" value={user.password} onChange={handleInputs} placeholder="Create Password" required />
                                <input type="password" name="password2" value={user.password2} onChange={handleInputs} placeholder="Confirm Password" required />
                                <input type="submit" value="Sign Up" onClick={Result} />
                                <p className="signup">already have an account?<a href="#" onClick={toggleForm}>Sign in.</a></p>
                            </form>
                        </div>
                        <div className="imageBox"><img src={Image2} alt="" /></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginAndSignup
