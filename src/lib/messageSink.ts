const textEncoder = new TextEncoder();
//** Server-side provider of messages. */
export class MessageSink {
    controllers = new Set<ReadableStreamController<any>>();

    constructor() { }

    public sendMessage(message: any) {
        let encoded = JSON.stringify(message);
        let blob = textEncoder.encode(`data: ${encoded}\n\n`);
        this.controllers.forEach(controller => controller.enqueue(blob));
    }

    public newStream() {
        let controllers = this.controllers;
        let thisController: any = undefined;
        let stream = new ReadableStream(
            {
                start(controller) {
                    thisController = controller;
                    controllers.add(controller);
                },
                cancel() {
                    if (thisController) {
                        controllers.delete(thisController);
                    }
                }
            }
        );
        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache"
            }
        });
    }
}