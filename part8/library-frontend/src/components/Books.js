const Books = ({changeGenre, categories, booksData}) => {
  
  const tHeadPadding = {paddingLeft: "32px"}
  return (
    <div>
      <h2>Books</h2>
      <div>
        <button onClick={() => changeGenre('')}>all</button>
        {categories.map(c => <button key={c} onClick={() => changeGenre(c)}>{c}</button>)}
      </div>
      <table>
        <tbody>
          <tr>
            <th>Author: </th>
            <th style={tHeadPadding}>Published: </th>
            <th style={tHeadPadding}>Genres: </th>
          </tr>
          {booksData.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              {a.genres.map((a) => <td key={a}>{a}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
