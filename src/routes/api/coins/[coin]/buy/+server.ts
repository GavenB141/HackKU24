import { BuyOrder, Coin, User } from "$lib/database.js";
import { verifyAuth } from "$lib/user";
import { json, type RequestHandler } from "@sveltejs/kit";
import { UUID } from "mongodb";
import { startSession } from "mongoose";

export const POST = (async function ({request, params}) {
    let headers = request.headers;
    let user = await verifyAuth(headers);
    if (!user) {
        return new Response("unauthorized", {
            status: 401
        })
    }
    
    let ticker = params.coin;
    let { quantity, payment } = await request.json();
    quantity = parseFloat(quantity);
    payment = parseFloat(payment);

    if(Number.isNaN(quantity) || quantity <= 0) {
        return json({error: "Quantity must be a number greater than zero."})
    }
    if(Number.isNaN(payment) || payment <= 0) {
        return json({error: "Payment must be a number greater than zero."})
    }

    let dbCoin = await Coin.findById(ticker);
    if(!dbCoin) {
        return json({error: "That coin does not exist."})
    }
    
    let error = undefined;
    let session = await startSession();
    await session.withTransaction(async (session) => {
        let dbUser = await User.findById(new UUID(user.userId));
        if (!dbUser) {
            error = "you don't exist.";
            return await session.abortTransaction();
        }
        if (dbUser.balance < (quantity * payment)) {
            error = "Not enough liquid balance!";
            return await session.abortTransaction();
        }
        dbUser.balance -= quantity * payment;

        await dbUser.save();
        await session.commitTransaction();
    });
    if (error) {
        return json({error: error})
    }
    
    let order = new BuyOrder({
        buyer: new UUID(user.userId),
        coin: ticker,
        quantity,
        unit_price: payment,
    });
    order.save();
    return json({success: "Successfully ordered!"});
}) satisfies RequestHandler;
