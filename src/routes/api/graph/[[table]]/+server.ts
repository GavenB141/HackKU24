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

// a trivial made-up model of the market's history
setInterval(() => {
    let lastIdx = idx == 0 ? DATA_POINTS_TO_SEND - 1 : idx - 1;
    let value = Math.max(history[lastIdx] + (Math.max(history[lastIdx] * 0.10, 1) * (Math.random() - 0.5)), 0);
    history[idx] = value;
    SINKS.forEach((sink) => {
        sink.sendMessage(value);
    });
    idx = (idx + 1) % DATA_POINTS_TO_SEND;
}, 2000);
