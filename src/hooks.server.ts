import { env } from "$env/dynamic/private";
import mongoose from "mongoose";

await mongoose.connect(env.PRIVATE_MONGO_CONNECTION_STRING);