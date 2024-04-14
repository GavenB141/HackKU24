import { BuyOrder, SellOrder, User, type IBuyOrder, type ISellOrder } from "./database";
import mongoose from "mongoose";

function onLoop() {
    processSaleOrders();
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
        session.abortTransaction();
        // await session.commitTransaction();
        // console.log("transaction committed");
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
    seller.balance = seller.balance + cost;
    
    let oldPortfolioAmount = buyer.portfolio.get(buyOrder.coin) ?? 0;
    buyer.portfolio.set(buyOrder.coin, oldPortfolioAmount + quantity);

    let refundPerUnit = buyOrder.unit_price - sellOrder.unit_price;
    let refund = refundPerUnit * quantity;
    buyer.balance = buyer.balance + refund;

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

export function initialize() {
    setInterval(onLoop, 5000);
}