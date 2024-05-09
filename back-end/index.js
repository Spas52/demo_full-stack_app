const Express = require("express");
const Mongoclient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");

const app = Express();
app.use(cors());

const CONNECTION_STRING="mongodb+srv://spas52:Fokasduha8@cluster0.hookzw3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"















const DATABASENAME="todoappdb";
let database;

app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful!");
    });
})

app.get('/api/todoapp/GetNotes', (request,response)=>{
    database.collection("todoappcollection").find({}).toArray((error,result)=>{
        response.send(result);
    });
})

app.post('/api/todoapp/AddNotes',multer().none(),(request,response)=>{
    database.collection("todoappcollection").count({},function(error,numOfDocs){
        database.collection("todoappcollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Succesfully!");
    })
})

app.delete('/api/todoapp/DeleteNotes',(request,response)=>{
    database.collection("todoappcollection").deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully!");
});