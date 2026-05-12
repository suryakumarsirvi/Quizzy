import 'dotenv/config';

const requiredEnv = [
    'SERVER_PORT',
    'SERVER_HOST',
    'MONGO_URI'
];

requiredEnv.forEach((key)=>{
    if(!process.env[key]){
        return console.log(`Required Env Key Missing: ${key}`)
    }
});

const CONFIG = {
    SERVER_PORT: process.env.SERVER_PORT,
    SERVER_HOST: process.env.SERVER_HOST,
    MONGO_URI: process.env.MONGO_URI
}

export default CONFIG;