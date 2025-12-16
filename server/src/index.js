import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import  {typeDefs } from "./typeDefs.js";
import {resolvers} from "./resolvers.js";
import mongoose from 'mongoose';
import dotenv from "dotenv";

await mongoose.connect("mongodb://127.0.0.1:27017/movies_db")

console.log('MongoDB connected')


dotenv.config();
 
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const PORT = 5000;

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`Server ready with ${url}`)