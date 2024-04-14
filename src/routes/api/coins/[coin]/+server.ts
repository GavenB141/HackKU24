import { verifyAuth } from "$lib/user";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST = (async function({ request, params }) {
    let headers = request.headers;
    let user = await verifyAuth(headers);
    if (!user) {
        return new Response("unauthorized", {
            status: 401
        })
    }
    
    let ticker = params.coin;
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
    if(ticker.length < 3 || ticker.length > 5) {
        return json({error: "Ticker must be 3-5 characters."})
    }
    console.log(ticker)

    // still needs to validate against dupe tickers
    // and actually upload to db

    return json({success: "Successfully submitted."});
}) satisfies RequestHandler;
