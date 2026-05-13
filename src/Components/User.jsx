import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form';

function User() {
  let { state } = useLocation();
  let navigate = useNavigate();
  let [user, setUser] = useState(state);
  let [isEditMode, setIsEditMode] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: user
  });

  if (!user) {
    return <div className="text-center mt-10">No user data found.</div>;
  }

  const deleteUser = async () => {
    try {
      let res = await fetch(`https://user-rest-api-1.onrender.com/user-api/user/${user._id}`, {
        method: "DELETE"
      });
      if (res.status === 201) {
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
      if (res.status === 201) {
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
      if (res.status === 201) {
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
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-100'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>User Profile</h2>
      
      {!isEditMode ? (
        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold text-gray-800">{user.name}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-gray-800">{user.email}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-semibold text-gray-800">{user.dateOfBirth}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Mobile Number</p>
            <p className="font-semibold text-gray-800">{user.mobileNumber}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Status</p>
            <p className={`font-semibold ${user.status ? 'text-green-600' : 'text-red-600'}`}>
              {user.status ? 'Active' : 'Inactive'}
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            {user.status ? (
              <>
                <button 
                  onClick={() => setIsEditMode(true)} 
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={deleteUser} 
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </>
            ) : (
              <button 
                onClick={activateUser} 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Activate
              </button>
            )}
          </div>
          <button 
            onClick={() => navigate('/users-list')} 
            className="w-full mt-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            Back to List
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onUpdateUser)} className="flex flex-col gap-4">
          <input 
            type="text" 
            {...register("name")} 
            placeholder="Name" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="email" 
            {...register("email")} 
            placeholder="Email" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="date" 
            {...register("dateOfBirth")} 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="number" 
            {...register("mobileNumber")} 
            placeholder="Mobile Number" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4 mt-2">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Save
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditMode(false)} 
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default User