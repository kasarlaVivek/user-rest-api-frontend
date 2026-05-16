import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

function UsersList() {
    let [users, setUsers] = useState([]);
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(true);

    let navigate = useNavigate();

    useEffect(() => {
        async function getUsers() {
            try {
                let res = await fetch('https://user-rest-api-1.onrender.com/user-api/users', {
                    method: "GET",
                });
                if (res.status === 200 || res.status === 201) {
                    let data = await res.json();
                    setUsers(data.payload || []);
                } else {
                    throw new Error("Failed to fetch data")
                }
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false);
            }
        }
        getUsers();
    }, [])

    const goToUser = (userObj) => {
        navigate('/user', { state: userObj })
    }

    if (loading) {
        return <p style={{textAlign: 'center', fontSize: '1.2rem', marginTop: '3rem'}}>Loading users...</p>
    }
    
    if (error) {
        return <p style={{color: 'var(--danger)', textAlign: 'center', marginTop: '3rem'}}>{error.message}</p>
    }

    return (
        <div className='glass-card' style={{maxWidth: '600px'}}>
            <h1 className='page-title'>List of Users</h1>
            <div className="user-list">
                {users.length === 0 ? (
                    <p style={{textAlign: 'center', color: 'var(--text-muted)'}}>No users found.</p>
                ) : (
                    users.map((userObj) => (
                        <div key={userObj._id} className="user-card" onClick={() => goToUser(userObj)}>
                            <p className="user-name">{userObj.name}</p>
                            <p className="user-email">{userObj.email}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default UsersList;