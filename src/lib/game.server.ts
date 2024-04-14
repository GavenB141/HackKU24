import { BuyOrder, Coin, SellOrder, User, type IBuyOrder, type ISellOrder } from "./database";
import mongoose from "mongoose";

function onLoop() {
    processSaleOrders();
    backgroundActivity();
    runMines();
}

async function processSaleOrders() {
    let session = await mongoose.startSession();
    await session.withTransaction(async (session) => {
        let buyOrders = await BuyOrder.find({});
        for (let buyOrder of buyOrders) {
            let sellOrders = await SellOrder.find({});
            for (let sellOrder of sellOrders) {
                await attemptBuySaleOrder(buyOrder, sellOrder);
            }
        }
        await session.commitTransaction();
        console.log("transaction committed");
    });
}

async function attemptBuySaleOrder(buyOrder: IBuyOrder, sellOrder: ISellOrder) {
    if (buyOrder.coin != sellOrder.coin)
        return; // can't sell wrong product
    if (buyOrder.unit_price < sellOrder.unit_price)
        return; // can't sell for more than agreed

    let buyer = await User.findById(buyOrder.buyer);
    let seller = await User.findById(sellOrder.seller);
    if (!buyer || !seller) {
        console.error("missing; buyer is", buyer, "seller is", seller);
        return; // can't sell with missing persons
    }

    if (!buyer.portfolio) {
        // this needs to be initialized sometimes
        console.log(buyer);
        buyer.portfolio = {};
        console.log(buyer);
    }

    console.log("before", buyOrder, sellOrder, buyer, seller);
    let quantity = Math.min(buyOrder.quantity, sellOrder.quantity);
    buyOrder.quantity -= quantity;
    sellOrder.quantity -= quantity;
    
    let unit_price = sellOrder.unit_price;
    let cost = quantity * unit_price;
    seller.balance = Number(seller.balance) + cost;
    
    let oldPortfolioAmount = buyer.portfolio.get(buyOrder.coin) ?? 0;
    buyer.portfolio.set(buyOrder.coin, Number(oldPortfolioAmount) + quantity);

    let refundPerUnit = buyOrder.unit_price - sellOrder.unit_price;
    let refund = refundPerUnit * quantity;
    buyer.balance = Number(buyer.balance) + refund;

    Coin.findByIdAndUpdate({_id: sellOrder.coin, last_sold_for: unit_price});

    if (sellOrder.quantity == 0) {
        console.log("delete sellorder");
        await SellOrder.findByIdAndDelete(sellOrder._id);
    } else {
        sellOrder.save();
    }
    if (buyOrder.quantity == 0) {
        console.log("delete buyorder");
        await BuyOrder.findByIdAndDelete(buyOrder._id);
    } else {
        buyOrder.save();
    }
    await seller.save();
    await buyer.save();
    console.log("after", buyOrder, sellOrder, buyer, seller);
}

async function backgroundActivity() {
    // TODO: Simulate background behavior
}

const TIME_TO_MINE_MS = 1000 * 60;
let last_mine = Date.now() - TIME_TO_MINE_MS;
async function runMines() {
    if (Date.now() - last_mine > TIME_TO_MINE_MS) {
        last_mine = Date.now();
        console.log("running the mines!")
        await distributeMined();
    }
}

async function distributeMined() {
    let users = await User.find({});
    for (let user of users) {
        let session = await mongoose.startSession();
        session.withTransaction(async (session) => {
            if (!user.portfolio) return; // need a portfolio to mine with
            let allCoins = Array.from(user.portfolio.keys());
            if (allCoins.length == 0) return; // no empty lists
            let minedCoin = allCoins[Math.floor(Math.random() * allCoins.length)];
            let newCount = Number(user.portfolio.get(minedCoin)) + 1;
            console.log("mined", user._id, minedCoin);
            user.portfolio.set(minedCoin, newCount);
            await user.save();
            await session.commitTransaction();
        })
    }
}

export function initialize() {
    setInterval(onLoop, 5000);
}
