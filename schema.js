const graphql = require('graphql');
const _ = require('lodash');
const db = require('./db') 
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID,GraphQLSchema, GraphQLList, GraphQLFloat } = graphql;

var employees = db.employees.list()
var companies = db.companies.list() 

const EmployeeType = new GraphQLObjectType({ 
    name: "Employee",
    fields: ()=>({
        id: {type: GraphQLID}, 
        firstName: {type: GraphQLString}, 
        lastName:  {type: GraphQLString}, 
        password:  {type: GraphQLString}, 
        companyId: {type: GraphQLID},
        company: {
            type: CompanyType,
            resolve(parent, args){
                //console.log(parent);
                let found = companies.find((company => parent.companyId === company.id))
                return found;
            }
        } 
    })
 })
 
const CompanyType = new GraphQLObjectType({ 
    name: "Company",
    fields: ()=>({
        id: {type: GraphQLID}, 
        name: {type: GraphQLString}, 
        location:  {type: GraphQLString},
        rating: {type: GraphQLFloat},
        employee: {
            type: GraphQLList(EmployeeType),
            resolve(parent, args){
                //console.log(parent);
                let found = employees.filter((employee => parent.id === employee.companyId))
                return found;
            }
        } 
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
            type: new GraphQLList(CompanyType),
            resolve(parent, args){
                return companies;
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args){
                return employees;
            }
        },
        employeesById: {
            type: EmployeeType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                //console.log(args.id)
                let found = employees.find((employee => employee.id === args.id))
                return found
            }
         },
         employeesAtCompany: {
            type: new GraphQLList(EmployeeType),
            args: { companyId: { type: GraphQLString } },
            resolve(parent, args) {
                //console.log(args.companyId)
                let found = employees.filter((employee=> employee.companyId === args.companyId))
                return found
            }
         }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCompany: {
            type: CompanyType,
            args: {
                id: { type: GraphQLID },  
                name: { type: GraphQLString },  
                location: { type: GraphQLString },  
                rating: { type: GraphQLFloat }
            },
            resolve(parent, args){
                let company = {
                    id: args.id,
                    name: args.name,
                    location: args.location,
                    rating: args.rating
                };
                //console.log (company)
                let id = db.companies.create(company);
                //console.log (id) 
                return company;
            }
        },
        addEmployee: {
            type: EmployeeType,
            args: {
                id: { type: GraphQLID },  
                firstName: { type: GraphQLString }, 
                lastName: { type: GraphQLString }, 
                password: { type: GraphQLString },  
                companyId: { type: GraphQLID }
            },
            resolve(parent, args){
                let employee = {
                    id: args.id,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    password: args.password,
                    companyId: args.companyId
                };
                let id = db.employees.create(employee);
                return employee;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});