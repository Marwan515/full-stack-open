import React from 'react'
import PropTypes from 'prop-types'

const UserDetail = ({username, logoutOc}) => {
  return (
    <div>
      <p>
        {username} Logged-in
      </p>
      <button className="redButton" onClick={logoutOc}>Log-Out</button>
    </div>
  )
}

UserDetail.propTypes = {
  username: PropTypes.string.isRequired,
  logoutOc: PropTypes.func.isRequired
}

export default UserDetail