import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        //
    };

    return (
        <div className="contianer">
            <div className="row p-5">
                <h4>Login</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter email"
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
