const db = require('./db')  
const Query = {  
   // find all emplyees 
   employees:() => db.employees.list(),
   // find all companies
   companies:() => db.companies.list() ,
   // find an employee by its employees
   employeesById: (obj, args, context, info) => {
      console.log(args.id)
      return db.employees.list().filter((employee => employee.id === args.id))
   },
   // gind all employees of company whose companyId is args.companyId
   employeesAtCoompany: (obj, args, context, info) => {
      console.log(args.companyId)
      return db.employees.list().filter((employee=> employee.companyId === args.companyId))
   }
}  
module.exports = {Query}  