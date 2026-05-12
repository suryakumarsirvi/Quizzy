import app from "./app.js";
import CONFIG from "./config/env.config.js";
import db from './config/db.config.js';

await db.connect();

app.listen(CONFIG.SERVER_PORT, ()=>{
    console.log(`Server Running on Port: ${CONFIG.SERVER_PORT} | ${CONFIG.SERVER_HOST}`);
})