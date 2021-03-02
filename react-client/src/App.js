import './App.css';
import React from "react"

function App() {
  const [employees, setEmployees] = React.useState([])
  const [companies, setCompanies] = React.useState([])

  const fetchAllEmployees = async () => {
      const response =  await fetch('http://localhost:4000/graphql', {
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({query:'{employees {id,lastName,firstName,password}}'})
      })
      const rsponseBody =  await response.json();
      setEmployees(rsponseBody.data.employees)
  }

  const fetchEmployee = async () => {
    setEmployees([])
    setCompanies([])
    const response =  await fetch('http://localhost:4000/graphql', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({query:'{employeesById(id:"E1001") {id, firstName, lastName}}'})})
      const rsponseBody =  await response.json();
      console.log (rsponseBody.data.employeesById)
      setEmployees(rsponseBody.data.employeesById)
  }

  const fetchCompanies= async () => {
    setEmployees([])
    setCompanies([])
    const response =  await fetch('http://localhost:4000/graphql', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({query:'{companies {id,name, location}}'})})
      const rsponseBody =  await response.json();
      console.log (rsponseBody.data.companies)
      setCompanies(rsponseBody.data.companies)
  }
 
  //console.log (employees)
  return (
    <div className="App">
          <div className = "App-body" >
             <div>Graphql Skeleton</div>
             <button onClick={()=>fetchAllEmployees()}>Fetch all employees</button>
             <button onClick={()=>fetchEmployee()}>Fetch Employee By Id</button>
             <button onClick={()=>fetchCompanies()}>Fetch Companies</button>
             {employees && employees.length > 0 && <div className="App-employees">
                 <p>Employees List from Graphql Server</p>
                 {employees.map((e, index)=>{
                    return <div key={index}>
                         {e.firstName + " " + e.lastName}
                    </div>
                 })}
             </div>}
             {companies && companies.length > 0 && <div className="App-employees">
                 <p>Company List from Graphql Server</p>
                 {companies.map((c, index)=>{
                    return <div key={index}>
                         {c.name + " " + c.location}
                    </div>
                 })}
             </div>}
          </div>
    </div>
  );
}

export default App;
