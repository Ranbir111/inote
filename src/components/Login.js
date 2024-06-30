import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login(props) {
    let navigate = useNavigate();

    const { showAlert } = props;
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const url = process.env.REACT_APP_API_URL + "/api/auth/login";
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
            .then((response) => { return response.json() })
            .then((data) => {
                if (data.success === true) {
                    // Save the auth token and redirect to home page
                    localStorage.setItem("token", data.authToken);
                    showAlert("Loggedin successfully", "success");
                    setLoading(false);
                    navigate("/");

                } else {
                    setLoading(false);
                    showAlert("Invalid Credentials!", "danger");
                }
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            })
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <form className='container my-2' onSubmit={handleSubmit}>
            <h1><b>Login to your account</b></h1>
            <div className="my-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" onChange={handleChange} value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" onChange={handleChange} value={credentials.password} className="form-control" id="password" name="password" required />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary">
                {loading && <div class="spinner-grow text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>}
                {!loading && "Submit"}
            </button>
        </form>
    )
}

export default Login
