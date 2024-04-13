import { SellOrder } from "$lib/database.js";
import { verifyAuth } from "$lib/user";
import { UUID } from "mongodb";

export async function POST({request}) {
    let headers = request.headers;
    let user = await verifyAuth(headers);
    if (!user) {
        return new Response("unauthorized", {
            status: 401
        })
    }

    // TODO modify portfolio
    
    let order = new SellOrder({
        buyer: new UUID(user.userId),
        coin: "", // TODO
        quantity: 0, // TODO
        unit_price: 0, // TODO
    });
    order.save();
    return new Response("");
}