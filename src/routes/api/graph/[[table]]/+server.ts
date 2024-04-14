import { User } from '$lib/database.js';
import { getUserPortfolio } from '$lib/getPortfolio.js';
import { MessageSink } from '$lib/messageSink.js';
import { verifyAuth } from '$lib/user.js'

const DATA_POINTS_TO_SEND = 30;
const history = new Array(DATA_POINTS_TO_SEND);
history.fill(0);

let idx = 0;

export async function GET({request, params}) {
    let user = await verifyAuth(request.headers);
    if (!user) {
        return new Response("you are not logged in", {
            status: 401,
        });
    }
    let sink = new MessageSink();
    setTimeout(() => processStream(sink), 500);
    return sink.newStream();
}

const SINKS: MessageSink[] = [];

async function processStream(sink: MessageSink) {
    for (let i = idx + 1; i != idx; i = (i + 1) % DATA_POINTS_TO_SEND) {
        sink.sendMessage(history[i]);
    }
    SINKS.push(sink);
}

setInterval(async () => {
    let total = 0;
    let users = await User.find({});
    for (let user of users) {
        let portfolio = await getUserPortfolio(user._id);
        total += Number(portfolio.liquid.toString());
        for (let name of Object.keys(portfolio.coins)) {
            let coin = portfolio.coins[name];
            let count = Number(coin['count'].toString());
            let marketValue = Number(coin['marketValue'].toString());
            total += count * marketValue;
        }
    }
    SINKS.forEach((sink) => {
        sink.sendMessage(total);
    })
}, 5000);
