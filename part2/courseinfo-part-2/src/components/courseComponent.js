const Header = (props) => {
  return (
    <>
      <h2> {props.coursename.name} </h2>
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

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(element => {
        return (
          <div key={element.id}>
            <Part name={element.name} num={element.exercises}/>  
          </div>
        )
      })}
    </div>
  )
}

const Total = ({parts}) => {
  let pNum = parts.reduce((element, num) => element += num.exercises, 0
  );
  return (
    <>
    <h4>Number of exercises: {pNum}</h4>
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
    <Header coursename={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
  )
}
  
export default Course