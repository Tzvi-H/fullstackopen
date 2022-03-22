const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Header = props => (
  <h2>{props.course}</h2>
)

const Content = ({ parts }) => (
  <div>
    { parts.map(part => <Part key={part.id} part={part} />) }
  </div>  
)

const Total = ({ parts }) => (
  <p>
    <strong>total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises</strong>
  </p>
)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

export default Course