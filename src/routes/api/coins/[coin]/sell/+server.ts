import { SellOrder } from "$lib/database.js";
import { verifyAuth } from "$lib/user";
import type { RequestHandler } from "@sveltejs/kit";
import { UUID } from "mongodb";

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

    // TODO modify portfolio
    
    let order = new SellOrder({
        buyer: new UUID(user.userId),
        coin: "", // TODO
        quantity: 0, // TODO
        unit_price: 0, // TODO
    });
    order.save();
    return new Response("");
}) satisfies RequestHandler;
