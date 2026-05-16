import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router';

function AddUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let [errorMsg, setErrorMsg] = useState(null);
    let [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const onUserCreate = async (newUser) => {
        setErrorMsg(null);
        try {
            setLoading(true);
            let res = await fetch("https://user-rest-api-1.onrender.com/user-api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser),
            });
            if (res.status === 201) {
                navigate('/users-list')
            } else {
                throw new Error("Failed to create user. Please try again.")
            }
        } catch (err) {
            setErrorMsg(err.message || "An unexpected error occurred");
            // Auto hide the toast after 5 seconds
            setTimeout(() => {
                setErrorMsg(null);
            }, 5000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='glass-card' style={{ position: 'relative' }}>
            {/* Toast Notification Container */}
            {errorMsg && (
                <div className="toast-container">
                    <div className="toast error">
                        <span>⚠️ {errorMsg}</span>
                        <button type="button" className="toast-close" onClick={() => setErrorMsg(null)}>&times;</button>
                    </div>
                </div>
            )}

            <h1 className='page-title'>Add New User</h1>
            <form onSubmit={handleSubmit(onUserCreate)} className='form-group'>
                <input type="text" placeholder='Enter username' {...register("name", { required: true })} className='input-field' />
                <input type="email" placeholder='Enter email' {...register("email", { required: true })} className='input-field' />
                <input type="date" placeholder='Enter DOB' {...register("dateOfBirth")} className='input-field' />
                <input type="number" placeholder='Enter mobile number' {...register("mobileNumber")} className='input-field' />
                <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit User'}
                </button>
            </form>
        </div>
    )
}

export default AddUser;