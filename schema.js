const graphql = require('graphql');
const _ = require('lodash');
const db = require('./db') 
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

var employees = db.employees.list()
var companies = db.companies.list() 

const Employee = new GraphQLObjectType({ 
    name: "Employee",
    fields: ()=>({
        id: {type: GraphQLString}, 
        firstName: {type: GraphQLString}, 
        lastName:  {type: GraphQLString}, 
        password:  {type: GraphQLString}, 
        companyId: {type: GraphQLString}  
    })
 })
 
const Company = new GraphQLObjectType({ 
    name: "Company",
    fields: ()=>({
        id: {type: GraphQLString}, 
        name: {type: GraphQLString}, 
        location:  {type: GraphQLString},
        rating: {type: GraphQLInt}
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            resolve(parent, args){
                return "welcome to GraphQl";
            }
        },
        companies: {
            type: new GraphQLList(Company),
            resolve(parent, args){
                return companies;
            }
        },
        employees: {
            type: new GraphQLList(Employee),
            resolve(parent, args){
                return employees;
            }
        },
        employeesById: {
            type: Employee,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                console.log(args.id)
                let found = employees.find((employee => employee.id === args.id))
                return found
            }
         },
         employeesAtCompany: {
            type: new GraphQLList(Employee),
            args: { companyId: { type: GraphQLString } },
            resolve(parent, args) {
                console.log(args.companyId)
                let found = employees.filter((employee=> employee.companyId === args.companyId))
                return found
            }
         }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});