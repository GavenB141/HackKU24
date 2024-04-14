import { verifyAuth } from "$lib/user";
import { json, type RequestHandler } from "@sveltejs/kit";
import { Coin, User } from "$lib/database";
import { startSession } from "mongoose";
import { Decimal128, UUID } from "mongodb";

export const POST = (async function({ request, params }) {
    let headers = request.headers;
    let user = await verifyAuth(headers);
    if (!user) {
        return new Response("unauthorized", {
            status: 401
        })
    }
    
    let ticker = params.coin?.toUpperCase();
    if(ticker === undefined) {
        return json({error: "Ticker required."})
    }
    let { amount, investment } = await request.json()
    amount = parseFloat(amount);
    investment = parseFloat(investment);

    if(Number.isNaN(amount)) {
        return json({error: "Amount must be valid number."})
    }
    if(Number.isNaN(investment)) {
        return json({error: "Investment must be valid number."})
    }
    if(!(<number>amount > 0)) {
        return json({error: "Amount must be greater than 0."})
    }
    let investRate = investment / amount;
    if(!(investRate > 1)) {
        return json({error: "Investment must be greater than 1 per token."})
    }
    if(ticker.length < 3 || ticker.length > 5) {
        return json({error: "Ticker must be 3-5 characters."})
    }

    console.log("attempt to create ticker for", ticker)

    let existing = await Coin.findById(ticker);
    if (existing) {
        return json({error: "This Ticker has already been used."})
    }
    
    let error = undefined;
    let session = await startSession();
    await session.withTransaction(async (session) => {
        let dbUser = await User.findById(new UUID(user.userId));
        if (!dbUser) {
            error = "you don't exist.";
            return await session.abortTransaction();
        }
        if (dbUser.balance < investment) {
            error = "Not enough liquid balance!";
            return await session.abortTransaction();
        }
        dbUser.balance -= investment;

        if (!dbUser.portfolio) {
            dbUser.portfolio = {};
        }
        dbUser.portfolio.set(ticker, new Decimal128(amount.toString())); // safe to set; this is a new currency

        await new Coin({_id: ticker}).save();
        await dbUser.save();
        await session.commitTransaction();
    });
    if (error) {
        return json({error: error})
    }

    return json({success: "Successfully created."});
}) satisfies RequestHandler;
