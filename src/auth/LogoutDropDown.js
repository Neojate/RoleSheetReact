import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Profile } from '../components/Profile';

export const LogoutDropDown = () => {
    const { isAuthenticated, logout, user } = useAuth0();
    return (
        isAuthenticated && (
            <div className="nav-item dropdown">
                <a
                    aria-expanded="false"
                    aria-haspopup="true"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                    id="logoutdropdown">
                    {user.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="logoutdropdown">
                    <Link to="/statistics">Estadísticas</Link>
                    <button className="no-button nav-link" onClick={() => logout()}>Logout</button>
                </div>
            </div>
        )
    );

}