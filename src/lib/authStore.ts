import { browser } from "$app/environment";
import { createClient, type IAuthClient, type AuthenticationInfo } from "@propelauth/javascript";
import { derived, readable, type Readable } from "svelte/store";
import { env } from '$env/dynamic/public';

let client_value: IAuthClient | null = null;
if (browser) {
    client_value = createClient({
        authUrl: env.PUBLIC_AUTH_URL,
        enableBackgroundTokenRefresh: true,
    }) ?? null;
}
let authClient: Readable<IAuthClient | null> = readable(client_value);

let authInfo: Readable<AuthenticationInfo | null> = derived(authClient, (authClient, set) => {
    authClient?.getAuthenticationInfoOrNull().then((authInfo) => set(authInfo));
});

export {
    authClient,
    authInfo
};