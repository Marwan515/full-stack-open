import React from 'react'
import '../index.css'

const MessageAlert =  ({message, ttm}) => {
    if (message === null) {
        return null
    }

    return (
        <div className={ttm}>
            {message}
        </div>
    )
}
export default MessageAlert