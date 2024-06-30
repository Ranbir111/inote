import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Signup(props) {
    let navigate = useNavigate();

    const { showAlert } = props;
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let { name, email, password, cpassword } = credentials;
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (password === cpassword) {
            const url = process.env.REACT_APP_API_URL + "/api/auth/createuser";
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })
                .then((response) => { return response.json() })
                .then((data) => {
                    if (data.success === true) {
                        // Save the auth token and redirect to home page
                        localStorage.setItem("token", data.authToken);
                        showAlert("SignedUp successfully", "success");
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
        } else {
            setLoading(false);
            showAlert("Password and Confirm password should be same!", "danger");
        }
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <form className='container my-2' onSubmit={handleSubmit}>
            <h1><b>Sign Up to your account</b></h1>
            <div className="my-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" onChange={handleChange} id="name" name='name' aria-describedby="nameHelp" required />
            </div>
            <div className="my-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={handleChange} id="email" name='email' aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" minLength={8} className="form-control" onChange={handleChange} id="password" name='password' required />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" minLength={8} className="form-control" onChange={handleChange} id="cpassword" name='cpassword' required />
            </div>
            {/* <button type="submit" className="btn btn-primary">Submit</button> */}
            <button type="submit" disabled={loading} className="btn btn-primary">
                {loading && <div className="spinner-grow text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
                {!loading && "Submit"}
            </button>
        </form>
    )
}

export default Signup
