import React from 'react'
import AddStockButton from './addStockButton.js'

const Suggestions = (props) => {
  const res = props.results.map(x =>
    <li key={x.Symbol}> 
    <div style={{display:"inline-block", padding:"20px"}}>
      {x.Symbol}
    </div>
    <div style={{display:"inline-block"}}>
    {x.Name}
    </div>
    <div style={{display:"inline-block", padding:"10px"}}>
    <AddStockButton symbol={x.Symbol} name={x.Name} add_function={props.add_function}/>
    </div>
    </li>)
  return <div style={{textAlign:"center", margin:"0 auto", width:"800px", border: "2px solid"}}>
    <ul style={{overflow:"auto", maxHeight: "200px", listStylePosition:"inside",  listStyleType:"none",textAlign:"right"}}> {res} </ul>
  </div>
}

export default Suggestions