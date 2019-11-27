// reading environment variables

const dotenv=require('dotenv');
dotenv.config();
module.exports={
    API_KEY : process.env.API_KEY,
    API_SECRET : process.env.API_SECRET,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
}