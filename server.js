const bodyParser = require('body-parser');  
const cors = require('cors');  
const express = require('express');  
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const port = process.env.PORT || 4000;  
const app = express();  
app.use(cors(), express.json());  
app.use('/graphql', graphqlHTTP({
   schema: schema,
   graphiql: true,
 }));
app.listen(  
   port, () => console.info(  
      `Server started on port ${port}`  
   )  
);  