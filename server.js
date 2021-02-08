const bodyParser = require('body-parser');  
const cors = require('cors');  
const express = require('express');  
var { graphqlHTTP } = require('express-graphql');
const port = process.env.PORT || 4000;  
const app = express();  
const fs = require('fs')  
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})  
const resolvers = require('./resolver')  
const {makeExecutableSchema} = require('graphql-tools')  
const schema = makeExecutableSchema({typeDefs, resolvers})  
app.use(cors(), bodyParser.json());  
app.use('/graphql', graphqlHTTP({
   schema: schema,
   graphiql: true,
 }));
app.listen(  
   port, () => console.info(  
      `Server started on port ${port}`  
   )  
);  