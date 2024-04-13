import mongoose, { Schema, type InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: Schema.Types.UUID, required: true },
    balance: { type: Schema.Types.Decimal128, required: true },
    portfolio: {
        type: Map,
        of: Schema.Types.Decimal128,
    }
});
export type IUser = InferSchemaType<typeof userSchema>;
export const User: mongoose.Model<IUser> = mongoose.model("users", userSchema);

const coinSchema = new mongoose.Schema({
    _id: { type: String, required: true },
});
export type ICoin = InferSchemaType<typeof coinSchema>;
export const Coin: mongoose.Model<ICoin> = mongoose.model("coins", coinSchema);

const buyOrderSchema = new mongoose.Schema({
    buyer: {
        type: Schema.Types.UUID,
        ref: "users",
        required: true,
    },
    coin: {
        type: String,
        ref: "coins",
        required: true,
    },
    quantity: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    unit_price: {
        type: Schema.Types.Decimal128,
        required: true,
    },
});
export type IBuyOrder = InferSchemaType<typeof buyOrderSchema>;
export const BuyOrder: mongoose.Model<IBuyOrder> = mongoose.model("buyOrders", buyOrderSchema);

const sellOrderSchema = new mongoose.Schema({
    seller: {
        type: Schema.Types.UUID,
        ref: "users",
        required: true,
    },
    coin: {
        type: String,
        ref: "coins",
        required: true,
    },
    quantity: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    unit_price: {
        type: Schema.Types.Decimal128,
        required: true,
    },
});
export type ISellOrder = InferSchemaType<typeof sellOrderSchema>;
export const SellOrder: mongoose.Model<ISellOrder> = mongoose.model("sellOrders", sellOrderSchema);