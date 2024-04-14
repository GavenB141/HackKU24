import { User } from '$lib/database.js';
import { verifyAuth } from '$lib/user.js';
import { json, type RequestHandler } from '@sveltejs/kit';
import { UUID } from 'mongodb';
import { type UserPortfolio } from '$lib/types.js';

export const GET = (async function({ request }) {
    let headers = request.headers;
    let user = await verifyAuth(headers);
    if (!user) {
        return new Response("unauthorized", {
            status: 401
        })
    }
    let document = await User.findById(new UUID(user.userId));
    if (!document) {
        console.error("no document found when searching for user balance, wut");
        return new Response("internal server error", {
            status: 500
        });
    }
    let res: UserPortfolio = {liquid: document.balance};
    return json(res);
}) satisfies RequestHandler;
