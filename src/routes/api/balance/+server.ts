import { Coin, User, type IUser } from '$lib/database.js';
import { verifyAuth } from '$lib/user.js';
import { json, type RequestHandler } from '@sveltejs/kit';
import { Decimal128, UUID } from 'mongodb';
import { type UserPortfolio } from '$lib/types.js';
import { MessageSink } from '$lib/messageSink.js';
import { getUserPortfolio } from '$lib/getPortfolio';

const messageSinks: { [id: string]: MessageSink; } = {};
function initMessageSink(userId: string) {
    if (messageSinks?.[userId]) {
        return messageSinks[userId];
    }
    let sink = new MessageSink();
    messageSinks[userId] = sink;
    // TODO: Add filter on the watch that makes it not send for any change across all accounts
    let watch = User.watch();
    let onChange = async (change: any) => {
        try {
            await sendPortfolioUpdate(userId, sink);
        } catch {
            watch.close();
        }
    };
    watch.on('change', onChange);
    return sink;
}

async function sendPortfolioUpdate(userId: string, sink: MessageSink) {
    let res: UserPortfolio = await getUserPortfolio(new UUID( userId));
    sink.sendMessage(res)
}

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
        console.error("no document found when searching for valid user's balance, wut");
        return new Response("internal server error", {
            status: 500
        });
    }
    let sink = initMessageSink(user.userId);
    // waiting to make sure that the connection is established before message sent
    setTimeout(() => sendPortfolioUpdate(user.userId, sink), 500);
    return initMessageSink(user.userId).newStream();
}) satisfies RequestHandler;
