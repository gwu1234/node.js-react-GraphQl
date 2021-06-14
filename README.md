# Full Stack Application (Node.js, React) with GraphQl

This project was a skeleton of full stack application with a Node.js (Express) server,

a React Client, built in with with GraphQl 

## GraphQl Server 

var { graphqlHTTP } = require('express-graphql');

app.use('/graphql', graphqlHTTP({

   schema: schema,

   graphiql: true,

 }));

## notarealdb

const { DataStore } = require('notarealdb'); 

## GraphQl Client 

### fetch all employees

const fetchAllEmployees = async () => {

      const response =  await fetch('http://localhost:4000/graphql', {

        method:'POST',

        headers:{'content-type':'application/json'},

        body:JSON.stringify({query:'{employees {id,lastName,firstName,password}}'})

      })

      const rsponseBody =  await response.json();

      setEmployees(rsponseBody.data.employees)

}

### fetch employee by Id 

const fetchEmployee = async () => {

      const response =  await fetch('http://localhost:4000/graphql', {

          method:'POST',

          headers:{'content-type':'application/json'},

          body:JSON.stringify({query:'{employeesById(id:"E1001") {id, firstName, lastName}}'})

      })

      const rsponseBody =  await response.json();

      setEmployees(rsponseBody.data.employeesById)

  }

### fetch Companies

const fetchCompanies = async () => {

      const response =  await fetch('http://localhost:4000/graphql', {

         method:'POST',

         headers:{'content-type':'application/json'},

         body:JSON.stringify({query:'{companies {id,name, location}}'})
       
      })

      const rsponseBody =  await response.json();
      
      setCompanies(rsponseBody.data.companies)

  }

## How to test on GraphiQL

### find all employees:

{ employees {

   lastName,

   firstName,

}}

mapped to resolver:

employees:() => db.employees.list()

### find all companies:

{companies {

   id,

   name

}}

mapped to resolver:

companies:() => db.companies.list() 

### find an employee of a given employee id:

employeesById(id:"E1001") {  

     id, 

     firstName,

     lastName

  }  

}  

mapped to resolver:

employeesById: (obj, args, context, info) => 
      
  db.employees.list().filter((employee => employee.id === args.id))
   

### find all employees from a company of a given company id:

{employeesAtCoompany(companyId: "com-102") {

     firstName,

     lastName

   }

}

mapped to resolver :

employeesAtCoompany: (obj, args, context, info) => {
      
   return db.employees.list().filter((employee=> employee.companyId 
   
   === args.companyId))
   
}

## mutation:

### addCompany

mutation {

  addCompany (id: "com-106", name:"Costume", location:"Toronto", rating: 4.04) {

      id,

      name,

      location,

      rating

  }

}

### addEmployee

mutation {

  addEmployee (id: "e1009", firstName:"James", lastName:"Yong", password:"Toronto", companyId: "com-105") {
    id,

    firstName,

    companyId,

  }
  
}


