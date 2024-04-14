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
            let coins : {
                [name: string]: {count: Decimal128, marketValue: Decimal128}
            } = {};

            Object.keys(message["coins"]).forEach((key)=>{
                coins[key] = {
                    count: new Decimal128(message["coins"][key]["count"]),
                    marketValue: new Decimal128(message["coins"][key]["marketValue"]),
                }
            })

            if (liquid) set({
                liquid: new Decimal128(liquid),
                coins: coins,
            });
        });
    }
}, <UserPortfolio>{ liquid: new Decimal128(0), coins: {} });

export const netWorth: Readable<number> = derived(portfolio, (portfolio) => {
    if (portfolio.coins) {
        let total = Number(portfolio.liquid.toString());
        for (let name of Object.keys(portfolio.coins)) {
            let coin = portfolio.coins[name];
            let count = Number(coin['count'].toString());
            let marketValue = Number(coin['marketValue'].toString());
            total += count * marketValue;
        }
        return total;
    } else {
        return Number(portfolio.liquid.toString());
    }
}, 0);