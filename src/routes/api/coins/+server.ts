import type { CoinValues } from "$lib/types.js";
import { verifyAuth } from "$lib/user";
import { json } from "@sveltejs/kit";
import { Coin } from "$lib/database.js"
import { Decimal128 } from "decimal128";

export async function GET({ request }) {
    let headers = request.headers;
    let user = await verifyAuth(headers);
    if (!user) {
        return new Response("unauthorized", {
            status: 401
        })
    }

    let res: CoinValues = {};
    let coins = (await Coin.find({})).values();
    for (let coin of coins) {
        res[coin._id] = {
            // TODO: Calculate this based on recent trends
            marketValue: new Decimal128(0),
        };
    }
    return json(res);
}