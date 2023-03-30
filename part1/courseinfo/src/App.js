const Header = (props) => {
  return (
    <>
      <h1> {props.coursename.name} </h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p> {props.name} exercises: {props.num}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.part[0].name} num={props.part[0].exercises}/>
      <Part name={props.part[1].name} num={props.part[1].exercises}/>
      <Part name={props.part[2].name} num={props.part[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises: {props.part[0].exercises + props.part[1].exercises + props.part[2].exercises }</p>
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header coursename={course} />
      <Content part={course.parts} />
      <Total part={course.parts} />
    </div>
  )
}

export default App