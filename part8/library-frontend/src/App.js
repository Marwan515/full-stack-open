import Navbar from './components/Navbar'
import { BOOK_ADDED, ALL_BOOKS, ME, BOOK_DETAILS } from './queries'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useNotificationDispatch } from './NotificationContext'
import { useState, useEffect } from 'react'

let categories = null
// https://www.apollographql.com/docs/react/data/mutations/#the-update-function for more detail visit the link
export const updateCache = (cache, addedBook) => {
  cache.modify({
    fields: {
      allBooks(existingBook = []) {
        const newBookRef = cache.writeFragment({
          data: addedBook,
          fragment: BOOK_DETAILS
        })
        return [...existingBook, newBookRef]
      }
    }
  })
}
const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState('')
  const notifyDispatch = useNotificationDispatch()
  const me = useQuery(ME)
  const [genre, setGenre] = useState(null)
  const {loading, error, data, refetch} = useQuery(ALL_BOOKS, {variables: {genre}})

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      setNotification(`New Book Added to The Library: ${addedBook.title}`)
      updateCache(client.cache, addedBook)
    }
  })

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [token])

  useEffect(() => {
    refetch()
  }, [genre, refetch])

  const setNotification = (msg) => {
    notifyDispatch({type: "ADD", payload: msg})
    setTimeout(() => {
      notifyDispatch({type: "REMOVE"})
    }, 5000);
  }
  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    console.log(error)
    setNotification(`ERROR! ${error}`)
    return <div>Error! {error}</div>
  }

  if (!categories) {
    categories = [...new Set(data.allBooks.map(b => b.genres).flat())]
  }

  const changeGenre = (value) => {
    setGenre(value)
  }
  if (me.loading) {
    return <div>Loading...</div>
  }

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  return (
    <div>
      <Navbar setNotification={setNotification} logOut={logOut} me={me} setToken={setToken} token={token} categories={categories} changeGenre={changeGenre} booksData={data} />
    </div>
  )
}

export default App
