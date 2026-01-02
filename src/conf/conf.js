import dotenv from "dotenv";

//* configure dotenv and import all enviroment variables
dotenv.config();


const conf = {
    port:String(process.env.PORT),
    access_token_secret:String(process.env.ACCESS_TOKEN_SECRET),
    access_token_expiry:String(process.env.ACCESS_TOKEN_EXPIRY),
}

//* freeze the object { ReadOnly Object }
Object.freeze(conf);

export { conf }