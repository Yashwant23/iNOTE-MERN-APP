const connectToMongo = require("./db.js");
const express = require('express')

require("dotenv").config()
connectToMongo()
var cors = require('cors')

const app = express();
app.use(cors())

const PORT = process.env.PORT || 5000
app.use(express.json());
//Routes
app.use("/api/auth", require('./routes/auth.js'));
app.use("/api/notes", require('./routes/notes.js'));



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})