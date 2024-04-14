import { derived, type Readable } from "svelte/store";
import { Decimal128 } from 'decimal128';
import { authInfo } from "./authStore";
import type { UserPortfolio } from "./types";
import { MessageSource } from "./messageSource";

export function authorizedFetch(input: URL | RequestInfo, bearer: string, init?: RequestInit) {
    init = init ?? {};
    let oldHeaders = init.headers ?? {};
    let headers = {
        ...oldHeaders,
        Authorization: bearer,
    };
    let newInit = { ...init, headers: headers };
    return fetch(input, newInit);
}

export const bearerToken: Readable<string | undefined> = derived(authInfo, (authInfo, set) => {
    if (authInfo) {
        set(`Bearer ${authInfo.accessToken}`)
    }
});

export const portfolio: Readable<UserPortfolio> = derived(bearerToken, (bearer, set) => {
    if (bearer) {
        new MessageSource("/api/balance", bearer, message => {
            let liquid = message["liquid"];
            let coins = {};
            // TODO: Assign coins
            if (liquid) set({
                liquid: new Decimal128(liquid),
                coins: coins,
            });
        });
    }
}, <UserPortfolio>{ liquid: new Decimal128(0), coins: {} });