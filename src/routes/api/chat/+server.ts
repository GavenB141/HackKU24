// Temporary chat feature

let controllers: Set<ReadableStreamController<any>> = new Set();
let encoder = new TextEncoder();
function sendMessage(message: String) {
    // TODO: Escape message (form encoding) so that there's no funny injections
    let encoded = encoder.encode(`data: ${message}\n\n`);
    controllers.forEach((controller) => {
        controller.enqueue(encoded);
    })
}

export async function GET() {
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
    let data = await event.request.formData();
    let message = data.get("message");

    // HACK: This makes the type system happy at least
    if (typeof(message) === "string") { 
        sendMessage(message);
    }

    return new Response();
}