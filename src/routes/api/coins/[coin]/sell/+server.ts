import { SellOrder, User } from "$lib/database.js";
import { verifyAuth } from "$lib/user";
import { json, type RequestHandler } from "@sveltejs/kit";
import { UUID } from "mongodb";
import { startSession } from "mongoose";

export const POST = (async function POST({request, params}) {
    let headers = request.headers;
    let user = await verifyAuth(headers);
    if (!user) {
        return new Response("unauthorized", {
            status: 401
        })
    }

    let ticker = params.coin;
    let {quantity, payment} = await request.json();

    let session = await startSession();

    let dbUser = await User.findById(new UUID(user.userId));
    if (!dbUser) {
        return json({error: "you are not one of us"}, {status: 401});
    }
    let error = undefined;
    session.withTransaction(async () => {
        let inventory = dbUser?.portfolio.get(ticker);
        if (!inventory || inventory < quantity) {
            error = "Not enough Coins";
        }
        let order = new SellOrder({
            seller: new UUID(user.userId),
            coin: ticker,
            quantity: quantity,
            unit_price: payment,
        });
        order.save();
    });
    if (error) {
        return json({error: error});
    }
   
    return json({success: "Created Sell Order!"});
}) satisfies RequestHandler;
