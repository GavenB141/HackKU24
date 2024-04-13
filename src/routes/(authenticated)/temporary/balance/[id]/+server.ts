import { json } from "@sveltejs/kit";
import { User } from "$lib/database.js";

User.watch().on("change", document => {
    // @ts-ignore (this value is in the tutorial which claims TS hasn't been updated to include it)
    let fullDocument: any = document.fullDocument;
    console.log("new document:", fullDocument);
});

export async function GET({ params }) {
    let userId = params.id;
    // TODO: Verify the user ID is actually valid

    let userObject = await User.findOne({_id: userId});
    if (userObject) {
        return json(userObject);
    } else {
        return new Response("not found", {status: 404});
    }
}