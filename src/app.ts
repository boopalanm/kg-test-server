import express, { Express } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import todoRoutes from './routes'

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
app.use(todoRoutes)

// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ccluster1-ko79j.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1-ko79j.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set('useFindAndModify', false)

mongoose
    .connect(uri, options)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error
    })
