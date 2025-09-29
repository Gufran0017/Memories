require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./utils/db');
const connectCloudinary = require('./utils/cloudinary');
const authRouter = require('./router/authRoutes');
const memoryRouter = require('./router/memoryRouter');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT ||5000;


app.get('/', (req, res) => {
    res.send("Hello");
});

app.use('/api/auth', authRouter);
app.use('/api/user', memoryRouter);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    });

connectCloudinary();