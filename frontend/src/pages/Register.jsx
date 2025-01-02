import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await API.post('http://localhost:5000/api/auth/register', formData); 
            toast.success('Registration successful! Please log in.');
            navigate("/login"); 
        } catch (err) {
            toast.error('Email is already registered!');
        }
    };

    return (
        <div className="auth-main v1">
            <div className="auth-wrapper">
                <div className="auth-form">
                    <div className="card my-5">
                        <div className="card-body">
                            <div className="text-center">
                                
                                <h4 className="f-w-500 mb-1">Register with your email</h4>
                                
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Name"
                                    />
                                </div>
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
                                        Register
                                    </button>
                                    <p className="mb-3 text-center mt-3">
                                    Already have an Account?{' '}
                                    <a href="/login" className="link-primary ms-1">
                                        Log In
                                    </a>
                                </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
