import { useQuery } from '@apollo/client'
import { ALL_BOOKS} from '../queries'

const Recommended = ({setError, genre}) => {
  const {loading, error, data} = useQuery(ALL_BOOKS, {variables: {genre}})
  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    setError(`ERROR! ${error}`)
    return <div>Error! {error}</div>
  }

  const tHeadPadding = {paddingLeft: "32px"}
  return (
    <div>
      <h2>Books</h2>
      <div>
        Recommended Books For You
      </div>
      <table>
        <tbody>
          <tr>
            <th>Author: </th>
            <th style={tHeadPadding}>Published: </th>
            <th style={tHeadPadding}>Genres: </th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
              {a.genres.map((a) => <td key={a}>{a}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended