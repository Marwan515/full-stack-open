import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id, anec, content) => {
    dispatch(voteAnecdote(id, anec))
    dispatch(notify(`You voted ${content}`, 6))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.filter(anec => {return filter === '' ? true : anec.content.includes(filter)}).sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}  <button onClick={() => vote(anecdote.id, anecdote, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList