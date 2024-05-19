import express from 'express';
import connectDB from './db/db.js';
import 'dotenv/config';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import cookieParser from 'cookie-parser';
import path from 'path'


const __dirname = path.resolve()

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server is running on port 3000!");
    });
}).catch((err) => {
    console.log(err)
})