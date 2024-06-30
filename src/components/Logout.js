import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    if (localStorage.clear()) {
        navigate('/login');
    }
    return (
        <div className='d-flex justify-content-center'>
            <h1>Logging out...</h1>
        </div>
    )
}

export default Logout
