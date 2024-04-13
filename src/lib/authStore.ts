import { browser } from "$app/environment";
import { createClient, type IAuthClient, type User } from "@propelauth/javascript";
import { derived, readable, readonly, writable, type Readable, type Writable } from "svelte/store";
import { env } from '$env/dynamic/public';

let client_value: IAuthClient | null = null;
if (browser) {
    client_value = createClient({
        authUrl: env.PUBLIC_AUTH_URL,
        enableBackgroundTokenRefresh: true,
    }) ?? null;
}
let authClient: Readable<IAuthClient | null> = readable(client_value);

let user: Readable<User | null> = derived(authClient, (authClient, set) => {
    authClient?.getAuthenticationInfoOrNull().then((authInfo) => set(authInfo?.user ?? null));
});

export {
    authClient,
    user
};