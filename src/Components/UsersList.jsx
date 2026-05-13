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
                let res = await fetch('https://user-rest-api-1.onrender.com/user-api/users', {
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

    const goToUser = (userObj) => {
        navigate('/user', { state: userObj })
    }

    return (
        <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-100'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>List of Users</h1>
            {users.map((userObj, index) => (
                <div 
                    key={userObj._id} 
                    className={`border-2 p-3 mb-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${!userObj.status ? 'bg-gray-50 border-gray-200 opacity-75' : 'bg-white border-blue-50'}`} 
                    onClick={() => goToUser(userObj)}
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className={`font-semibold ${!userObj.status ? 'text-gray-500' : 'text-gray-800'}`}>{userObj.name}</p>
                            <p className="text-sm text-gray-500">{userObj.email}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${userObj.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {userObj.status ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default UsersList