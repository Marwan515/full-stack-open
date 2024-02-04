import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnec = async (event) => {
    event.preventDefault()
    const anec = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    dispatch(createAnecdote(anec))
    dispatch(notify(`New Anecdote Added: ${anec}`, 6))

  }

  return (
    <div>
      <h2>Add Anecdote</h2>
      <form onSubmit={addAnec}>
        <input name='anecdoteInput' type='text' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}
export default AnecdoteForm