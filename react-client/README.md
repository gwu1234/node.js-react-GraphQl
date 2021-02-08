# React App of Graphql Client 

This project was bootstrapped with [Create React App]

## How to Query Graphql Server 

const fetchEmployees = async () => {

      const response =  await fetch('http://localhost:4000/graphql', {

        method:'POST',

        headers:{'content-type':'application/json'},

        body:JSON.stringify({query:'{employees {id,lastName,firstName,password}}'})

      })

      const rsponseBody =  await response.json();

      setEmployees(rsponseBody.data.employees)
      
}



