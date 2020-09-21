import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export const LoginButton = () => {
    const  { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <button className='no-button nav-link' onClick={() => loginWithRedirect()}>Login</button>
        )
        
    );

}