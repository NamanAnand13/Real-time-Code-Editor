import React from 'react'
import Avatar from 'react-avatar'

const Client = ({username}) => {
    return (
        <div className='client'>
            <Avatar name={username} size='50px' round="14px"></Avatar>
            <span className='username'>{username}</span>
        </div>
    )
}

export default Client