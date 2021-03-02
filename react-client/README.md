# React App of Graphql Client 

This project was bootstrapped with [Create React App]

## How to Query Graphql Server from React Client

const fetchEmployees = async () => {

      const response =  await fetch('http://localhost:4000/graphql', {

        method:'POST',

        headers:{'content-type':'application/json'},

        body:JSON.stringify({query:'{employees {id,lastName,firstName,password}}'})

      })

      const rsponseBody =  await response.json();

      setEmployees(rsponseBody.data.employees)

}

## How to Query Graphql Server from GraphiQL

### find all employees

at resolvers:

employees:() => db.employees.list()
   
at GraphiQL Browser

{employees {

  id,

  lastName,

  firstName,

  companyId

}}

### find all companies

at resolvers:

companies:() => db.companies.list() 
   
at GraphiQL Browser

{companies {

  id,

  name

}}


### find an employee of a given employee id

at resolvers:

employeesById: (obj, args, context, info) => {

  return db.employees.list().filter((employee=>employee.id==args.id))
   
}
   
at GraphiQL Browser

{ employeesById(id:"E1001") {

    id,

    firstName,

    lastName

  } 

}

### find all employees from a company of given company id

at resolvers:

employeesAtCoompany: (obj, args, context, info) => {

    return db.employees.list().filter((employee=>employee.companyId 
  
        === args.companyId))
}
   
at GraphiQL Browser

{employeesAtCoompany(companyId: "com-102") {

     firstName,

     lastName

   }
   
}



