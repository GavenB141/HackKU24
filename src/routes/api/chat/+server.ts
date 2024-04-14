// Temporary chat feature

import { MessageSink } from '$lib/messageSink.js';
import { verifyAuth } from '$lib/user.js';

let messageStream = new MessageSink();

export async function GET({request}) {
    if (!await verifyAuth(request.headers)) {
        return new Response(null, {
            status: 401
        })
    }
    return messageStream.newStream();
}

export async function POST(event) {
    if (!await verifyAuth(event.request.headers)) {
        return new Response(null, {
            status: 401
        })
    }

    let data = await event.request.formData();
    let message = data.get("message");

    // HACK: This makes the type system happy at least
    messageStream.sendMessage(message);

    return new Response();
}