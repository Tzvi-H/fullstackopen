const Header = props => (
  <h2>{props.course}</h2>
)

const Content = ({ parts }) => (
  <div>
    { parts.map(part => <Part key={part.id} part={part} />) }
  </div>  
)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Total = ({ parts }) => (
  <p>
    <strong>total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises</strong>
  </p>
)

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development Curriculum</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </>
  )
}

export default App