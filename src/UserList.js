import React, { useState } from 'react';

const styleObj = {
    border: '1px solid black',
    width: '200px',
}

export const UserListComponent = ({ UserList, toggle }) => {

    const [userData, setUser] = useState(false)
    if (userData) {
        return (<div style={{ border: '1px solid black', display: 'flex', flexDirection: 'column' }} >
            <button onClick={() => setUser(false)} style={{ ...styleObj, background: 'lightgreen', borderRadius: "15px" }}> 'Back To User' </button>
            <span style={styleObj}>{userData.name.firstname}</span>
            <span style={styleObj}>{userData.name.lastname}</span>
            <span style={styleObj} >{userData.address.city}</span>
            <span style={styleObj}>{userData.phone}</span>
            <span style={styleObj}>{userData.email}</span>
        </div>)
    }

    const showUserList = UserList.map((user) => {

        return (
            <div style={{ border: '1px solid black', width: '1000px', display: 'flex' }} >
                <span style={styleObj}>{user.name.firstname}</span>
                <span style={styleObj}>{user.name.lastname}</span>
                <span style={styleObj} >{user.address.city}</span>
                <span style={styleObj}>{user.phone}</span>
                <span style={styleObj}>{user.email}</span>
                <button onClick={() => setUser(user)} style={{ ...styleObj, background: 'lightgreen', borderRadius: "15px" }}> 'More Info' </button>
            </div>
        )
    })
    return <>
        <button style={{position: "absolute",    left: "10px"  , background: "lightgreen"}} onClick={() => toggle()}>{'<== back'}</button>
        <div className="userList">{showUserList}</div></>

}
