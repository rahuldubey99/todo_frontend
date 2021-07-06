import React from 'react'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "#68EACC" }}>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                    <NavLink className="navbar-brand" to="/logout">Logout</NavLink>

                </div>
            </nav>
        </div>
    )
}

export default Navbar
