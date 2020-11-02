import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import { getQueriesForElement } from '@testing-library/react';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();


    return (
        isAuthenticated && (
            <div style={{ display: 'none' }}>
                <span id='userId'>{user.sub}</span>
                <span id='userNick'>{user.nickname}</span>
                <span id='userEmail'>{user.email}</span>
                {/* <img alt={user.name} src={user.picture} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <JSONPretty data={user} /> */}
            </div>
        )
    );
}


export default Profile;