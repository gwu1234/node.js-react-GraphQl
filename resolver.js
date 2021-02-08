const db = require('./db')  
const Query = {  
   hello:() => {  
      return "Welcome to Graphql Skeleton"  
   },  
   employees:() => db.employees.list()  
}  
module.exports = {Query}  