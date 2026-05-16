import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form';

function User() {
  let { state } = useLocation();
  let navigate = useNavigate();
  let [user, setUser] = useState(state);
  let [isEditMode, setIsEditMode] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: user
  });

  if (!user) {
    return <div style={{textAlign: 'center', marginTop: '3rem'}}>No user data found. Please go back to the user list.</div>;
  }

  const deleteUser = async () => {
    try {
      let res = await fetch(`https://user-rest-api-1.onrender.com/user-api/user/${user._id}`, {
        method: "DELETE"
      });
      if (res.status === 200 || res.status === 201) {
        alert("User deleted successfully");
        navigate('/users-list');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activateUser = async () => {
    try {
      let res = await fetch(`https://user-rest-api-1.onrender.com/user-api/user/${user._id}`, {
        method: "PATCH"
      });
      if (res.status === 200 || res.status === 201) {
        let data = await res.json();
        setUser(data.payload);
        alert("User activated successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onUpdateUser = async (updatedUser) => {
    try {
      let res = await fetch(`https://user-rest-api-1.onrender.com/user-api/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
      });
      if (res.status === 200 || res.status === 201) {
        let data = await res.json();
        setUser(data.payload);
        setIsEditMode(false);
        alert("User updated successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='glass-card'>
      <h2 className='page-title'>User Profile</h2>
      
      {!isEditMode ? (
        <div className="profile-info">
          <div className="info-group">
            <span className="info-label">Name</span>
            <span className="info-value">{user.name}</span>
          </div>
          <div className="info-group">
            <span className="info-label">Email</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-group">
            <span className="info-label">Date of Birth</span>
            <span className="info-value">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="info-group">
            <span className="info-label">Mobile Number</span>
            <span className="info-value">{user.mobileNumber}</span>
          </div>
          <div className="info-group" style={{borderBottom: 'none'}}>
            <span className="info-label">Status</span>
            <span className={`info-value ${user.status ? 'status-active' : 'status-inactive'}`}>
              {user.status ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className="btn-group">
            {user.status ? (
              <>
                <button onClick={() => setIsEditMode(true)} className="btn btn-warning">
                  Edit
                </button>
                <button onClick={deleteUser} className="btn btn-danger">
                  Delete
                </button>
              </>
            ) : (
              <button onClick={activateUser} className="btn btn-success" style={{width: '100%'}}>
                Activate User
              </button>
            )}
          </div>
          <button onClick={() => navigate('/users-list')} className="back-link">
            ← Back to Users List
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onUpdateUser)} className="form-group">
          <input type="text" {...register("name")} placeholder="Name" className="input-field" />
          <input type="email" {...register("email")} placeholder="Email" className="input-field" />
          <input type="date" {...register("dateOfBirth")} className="input-field" />
          <input type="number" {...register("mobileNumber")} placeholder="Mobile Number" className="input-field" />
          
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button type="button" onClick={() => setIsEditMode(false)} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default User;