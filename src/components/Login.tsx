import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface User {
    username: string;
    password: string;
}

const Login = () => {

    const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setError('')
    },[]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        try {
            const inputUsername = event.target.username.value;
            const inputPassword = event.target.password.value;
            if(inputUsername === 'Admin' && inputPassword === 'Welcome') {
                setIsLoggedInUser(true);
            } else {
                setError('Enter valid username and password');
            }
        } catch (error) {
          
        }
      }
     
    return (
        <div>
            <h2>Login</h2>
            <div>
                {isLoggedInUser && (
                    <Navigate to="/dashboard" replace={true} />
                )}
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="form-control">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <button type="submit">Login</button>
                    <p className="error-msg">{error}</p>
                </form>
            </div>
        </div>
    );
}

export default Login;