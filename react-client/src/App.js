import './App.css';
import React from "react"

function App() {
  const [employees, setEmployees] = React.useState([])

  const fetchEmployees = async () => {
      const response =  await fetch('http://localhost:4000/graphql', {
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({query:'{employees {id,lastName,firstName,password}}'})
      })
      const rsponseBody =  await response.json();
      setEmployees(rsponseBody.data.employees)
  }
 
  console.log (employees)
  return (
    <div className="App">
          <div className = "App-body" >
             <div>Graphql Skeleton</div>
             <button onClick={()=>fetchEmployees()}>Submit Graphql Query</button>
             {employees && employees.length > 0 && <div className="App-employees">
                 <p>Employees List from Graphql Server</p>
                 {employees.map((e, index)=>{
                    return <div key={index}>
                         {e.firstName + " " + e.lastName}
                    </div>
                 })}
             </div>}
          </div>
    </div>
  );
}

export default App;
