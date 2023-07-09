const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');
const router = require('./routes/userRoute')
//rest object
const app = express();

//config dot env file

dotenv.config();

//db connecting
connectDb();


//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/users', require('./routes/userRoute'))

//transection routes
app.use('/api/v1/transections', require('./routes/transectionRoutes'))

// app.use('/users', router)

// app.get('/', (req,res)=>{
//   res.send("<h1>server is on port 8080</h1>")
// })


// app.get('/hello', (req, res) => {
//   res.send("hello not coming slow")
// })


const PORT = 8080 || process.env.PORT

///listenner
app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})