import { env } from "$env/dynamic/private";
import mongoose from "mongoose";
import { initialize } from "$lib/game.server"
import type { Handle } from "@sveltejs/kit";
import { verifyAuth } from "$lib/user";
import { User } from "$lib/database";
import { UUID } from "mongodb";

await mongoose.connect(env.PRIVATE_MONGO_CONNECTION_STRING);
initialize();

export const handle: Handle = async ({ event,  resolve }) => {
    // HACK: I don't know when to make a user, so we do it any time they connect to the backend
    // to make sure they have an account
    let user = await verifyAuth(event.request.headers);
    if (typeof user !== 'boolean') {
        let userDb = await User.findById(user.userId);
        if (userDb === null) {
            await User.create({
                _id: new UUID(user.userId),
                balance: 1000,
            });
        }
    }

	const response = await resolve(event);
	return response;
};