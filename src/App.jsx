import { useState } from "react"
import { data } from "./data"

function TodoItem ({task}){

   const [inp, setInp] = useState(false)
   const [value, setValue] = useState(localStorage.getItem(task.todo)||'')

   
const date = new Date().getTime()
const fr = task.frequency.split(' ')[0]
const rasb = value.split('.')
const nd = new Date(rasb[2], rasb[1]-1, rasb[0]).getTime()
const diff = ((date-nd)/(1000*60*60*24))>fr

function changeDate (){
   setInp(true)
}

function newDate (e){
   const data = e.target.value.split('-').reverse().join('.')
   setValue(data)
   localStorage.setItem(task.todo, data)
  }

function onBlur (){
  setInp(false)

}

 return (
  <tr>
          <td>{task.todo}</td>
          <td style={{backgroundColor: diff ? '#f237a1':'', color: diff ? 'white' : ''}} className="date" onClick={changeDate}>
          {inp && <input type="text" onChange={newDate} onBlur={onBlur} value={value}/>}  
          {!inp && value}</td>
          <td >{task.frequency}</td>
  </tr>
 )
}

export default function App() {

  const res = data.map(t=><TodoItem key={t.todo} task={t}/>)


  return (
    <div className="main">
      <h1>Things to do</h1>
      <table>
       <thead>
        <tr>
          <th>Todo</th>
          <th>Last time cleaned</th>
          <th>Frequency</th>
        </tr>
        </thead>
        <tbody>
        {res}
        </tbody>
      </table>
    </div>
  )
}
