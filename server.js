//import expressjs for creating the server and creating api routes
const express= require('express') 


// Body parsers for getting the data thrugh urls 
const bodyParser=require('body-parser')

// Importing Mongo client
const MongoClient=require('mongodb').MongoClient


// Const app controls the entire app with express functional constructor
const app=express()

// We are saying expressjs that to use body parser urlencoded to be parsed
app.use(bodyParser.urlencoded({extended:true}))

// Datatbase Connection string
const connectionString="mongodb+srv://pridhvipinninti:psppsp@cluster0.9qf6s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//Connecting the database
MongoClient.connect(connectionString,{useUnifiedTopology:true})
 .then(client => {
     console.log('connected to database server')
     const db= client.db('star-war-quotes')
     const quotesCollection = db.collection('quotes')
     

     // 1.create with POST
     // Two parameters first one route, second one is function what you want to execute
        app.post('/quotes', (req,res) => {
            quotesCollection.insertOne(req.body)
            .then(result=>{
                console.log(result)
            })
            .catch(error=>console.error(error))
        })
        //2. Reading data from MongoDb
                    app.get('/getall',(req,res)=>
        {
                    db.collection('quotes').find().toArray()
                        .then(result=>{
                        res.send(result)
                        })
                        .catch(error=>console.error(error))

                    })
                
        }).catch(console.error)


app.get('/',(req,res)=>

{
        
     res.sendFile(__dirname+'/index.html')
        
})





const PORT=3000



app.listen(PORT,()=>{

    console.log(`server running at port ${PORT}`)

}) 

