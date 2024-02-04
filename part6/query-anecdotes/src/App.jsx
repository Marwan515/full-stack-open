import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdotes, voteAnecdote } from './requests'
import { NotificationContextProvider } from './NotificationContext'
import { useContext } from 'react'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const notify = (msg) => {
    notificationDispatch({type: 'ADD', payload: msg})
    setTimeout(() => {
      notificationDispatch({type: 'REMOVE'})
    }, 5000);
  }

  const newAnecdotesMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    },
    onError: (err) => {
      notify(err.response.data.error)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (result.isPending) {
    return <div>Loading.....!!!</div>
  }

  if (result.isError) {
    return <div>anecdotes service not available due to problems in server</div>
  }

  const createAnecData = (content) => {
    return {
      content: content,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0
    }
  }

  const onCreate = (event) => {
    event.preventDefault()
    const content = createAnecData(event.target.anecdote.value)
    event.target.anecdote.value = ''
    newAnecdotesMutation.mutate(content)
    notify(`You Created: ${content.content}`)
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes += 1})
    notify(`You've Voted: ${anecdote.content}`)
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      
      <Notification  />
      
      <AnecdoteForm onCreate={onCreate} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
