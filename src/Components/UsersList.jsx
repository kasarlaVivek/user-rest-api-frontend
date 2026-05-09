import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

function UsersList() {
    let [users, setUsers] = useState([]);
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        async function getUsers() {
            try {
                let res = await fetch('http://localhost:3000/user-api/users', {
                    method: "GET",
                });
                if (res.status === 201) {
                    let data = await res.json();
                    setUsers(data.payload);
                } else {
                    throw new Error("data failed to fetch")
                }
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false);
            }
            if (loading) {
                return <p>Loading</p>
            }
            if (error) {
                return <p>{error.message}</p>
            }
        }
        getUsers();
    }, [])

    const goToUser = (userObj) =>{
        navigate('/user',{state:userObj})
    }

    return (
        <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-100'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>List of Users</h1>
            {users.map((userObj, index) => (
                <div key={userObj._id} className="border-2 py-2  cursor-pointer" onClick={()=>goToUser(userObj)}>
                    <p className="font-semibold text-gray-700">{userObj.name}</p>
                    <p className="text-sm text-gray-500">{userObj.email}</p>
                </div>
            ))}
        </div>

    )
}

export default UsersList