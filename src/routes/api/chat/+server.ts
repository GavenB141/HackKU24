// Temporary chat feature

import { env } from '$env/dynamic/private';
import { initBaseAuth } from '@propelauth/node';


let controllers: Set<ReadableStreamController<any>> = new Set();
let encoder = new TextEncoder();
function sendMessage(message: String) {
    // TODO: Escape message (form encoding) so that there's no funny injections
    let encoded = encoder.encode(`data: ${message}\n\n`);
    controllers.forEach((controller) => {
        controller.enqueue(encoded);
    })
}


const {
    validateAccessTokenAndGetUser,
} = initBaseAuth({
    authUrl: env.PRIVATE_AUTH_URL,
    apiKey: env.PRIVATE_AUTH_API_KEY,
});

async function verifyAuth(headers: Headers) {
    let auth_header = headers.get("Authorization");
    if (!auth_header) {
        return false;
    }
    // TODO: Not sure what happens when this fails- assuming an exception, is it bad? Test with garbage Authentication header.
    let user = await validateAccessTokenAndGetUser(auth_header);
    return user;
}


export async function GET({request}) {
    if (!await verifyAuth(request.headers)) {
        return new Response(null, {
            status: 401
        })
    }

    let this_controller: any = undefined;
    const stream = new ReadableStream(
        {
            start(controller) {
                this_controller = controller;
                controllers.add(controller);
            },
            cancel() {
                if (this_controller) {
                    controllers.delete(this_controller);
                }
            }
        }
    );
    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache"
        }
    })
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
    if (typeof(message) === "string") { 
        sendMessage(message);
    }

    return new Response();
}