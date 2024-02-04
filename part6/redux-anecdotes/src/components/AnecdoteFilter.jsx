import { filterAnec } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"
const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  const filterByHandle = event => {
    const filterData = event.target.value
    dispatch(filterAnec(filterData))
  }
  return (
    <div>
      <h3>Filter</h3>
      <input name="filtered" type="text" onChange={filterByHandle} />
    </div>
  )
}

export default AnecdoteFilter