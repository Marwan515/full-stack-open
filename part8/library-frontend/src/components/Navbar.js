import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import NewBook from './NewBook'
import LoginForm from './LoginForm'
import Notification from './Notification'
import Recommended from './Recommended'

const Navbar = ({setNotification, token, logOut, setToken, me, changeGenre, booksData, categories}) => {

  const navbarStyle = {
    textDecoration: "none",
    color: "black",
    border: "solid 2px black",
    display: 'flex'
  }
  
  return (
    <div>
      <div style={navbarStyle}>
        <Link to={"/authors"}><button>Authors</button></Link>
        <Link to={"/books"}><button>Books</button></Link>
        {token && <>
          <Link to={"/addbook"}><button>Add New Book</button></Link>
          <Link to={"/recommended"}><button>recommended</button></Link>
          <button onClick={logOut}>Log-Out</button>
        </>}
        {!token && <Link to={"/login"}><button>Log-In</button></Link>}
      </div>
      <div><Notification /></div>
      <div>
        <Routes>
          <Route path="/authors" element={<Authors setMsg={setNotification} />} />
          <Route path="/" element={<Books changeGenre={changeGenre} categories={categories} booksData={booksData} />} />
          <Route path="/books" element={<Books changeGenre={changeGenre} categories={categories} booksData={booksData} />} />
          <Route path='/recommended' element={<Recommended setError={setNotification} genre={me.data.me.favoriteGenre} />} />
          {token && <Route path="/addbook" element={<NewBook setMsg={setNotification} />} />}
          {!token && <Route path="/login" element={<LoginForm tokenSet={setToken} setMsg={setNotification} />} />}
        </Routes>
      </div>
    </div>
  )
}

export default Navbar