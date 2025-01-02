import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', data.token);
            toast.success('Login successful!');
            navigate('/');
        } catch (err) {
            toast.error('Invalid credentials!');
        }
    };

    return (
        <div className="auth-main v1">
            <div className="auth-wrapper">
                <div className="auth-form">
                    <div className="card my-5">
                        <div className="card-body">
                            <div className="text-center">

                                <h4 className="f-w-500 mb-1">Login with your email</h4>

                            </div>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="form-control"
                                        id="floatingInput1"
                                        placeholder="Password"
                                    />
                                </div>
                                
                                <div className="d-grid mt-4">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </form>
                            <p className="mb-3 text-center mt-3">
                                Don't have an Account?{' '}
                                <Link to="/register" className="link-primary ms-1">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
