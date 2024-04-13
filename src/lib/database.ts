import { UUID } from "mongodb";
import mongoose, { Schema, type InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    _id: UUID,
    balance: { type: Schema.Types.Decimal128, required: true },
});
export type IUser = InferSchemaType<typeof userSchema>;
export const User: mongoose.Model<IUser> = mongoose.model("users", userSchema);

const tokenSchema = new mongoose.Schema({
    _id: String,
});
export type IToken = InferSchemaType<typeof tokenSchema>;
export const Token: mongoose.Model<IToken> = mongoose.model("Token", tokenSchema);
