import { Decimal128, UUID } from 'mongodb';
import { Coin, User } from "./database";
import type { UserPortfolio } from './types';

export async function getUserPortfolio(userId: UUID) {
    let document = await User.findById(userId);
    if (!document) {
        console.error("can't get portfolio for nonexistent user " + userId);
        throw "invalid user";
    }
    let coinsRaw = <Map<string, Decimal128>><unknown>document.portfolio ?? new Map();
    const coins = {};
    for (let name of coinsRaw.keys()) {
        coins[name] = {
            count: coinsRaw.get(name).toString(),
            marketValue: ((await Coin.findById(name))?.last_sold_for?.toString() ?? "1"),
        };
    }
    let res: UserPortfolio = { liquid: document.balance.toString(), coins: coins };
    return res;
}