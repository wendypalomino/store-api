require('dotenv').config()

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler');
const connectDB =  require('./db/db');

app.use(express.json())
app.use(errorMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000

const startServer =  async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(
            `Server is listening on ${port}...`
        ))
    } catch (err){
        console.log(err)
    }

}

startServer()