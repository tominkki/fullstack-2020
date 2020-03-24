import React from 'react'

const Header = ({course}) =>(
    <h1>{course.name}</h1>
)
    
const Part = ({part}) =>(
    <p>{part.name} {part.exercises}</p>
)
    
const Content = ({parts}) =>(
    <div>
        {parts.map( part =>
        <div key = {part.id}>
        <Part part = {part} />
        </div>
        )}        
    </div>
)
      
const Total = ({parts}) =>{
    const exercises = parts.map(part => part.exercises)
    
    const total = exercises.reduce( (acc, cur) => 
        acc + cur
    )
      
    return(
        <>
        <h3>total of {total} exercises</h3>
        </>
    )
}
    
const Course = ({course}) => (
    <>
    <Header course = {course} />
    <Content parts = {course.parts} />
    <Total parts = {course.parts} />
    </>
)

export default Course