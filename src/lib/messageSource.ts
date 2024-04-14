import { fetchEventSource } from "@microsoft/fetch-event-source";

//** Client-side source of messages */
declare type MessageHandler = (message: any) => void;
export class MessageSource {
    constructor(url: RequestInfo, bearer: string, callback: MessageHandler) {
        fetchEventSource(url, {
            headers: {
                "Authorization": bearer
            },
            onmessage(ev) {
                let obj = JSON.parse(ev.data);
                callback(obj);
            }
        })
    }
}