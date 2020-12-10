// import the models
const { Account } = require('./models/accounts')
const { Position } = require('./models/positions')
const { Order } = require('./models/orders')
let supportedCurrencies = require('./marketData')



async function executeOrder(order) {
    price = supportedCurrencies.find((coin) => {return coin.symbol == order.symbol}).currentPrice
    let account  = await Account.findOne({creator: order.creator, _id: order.account})
    if (!account){
        order.status = 'Failed'
        await order.save()
        return
    }
    let position = await Position.findOne({creator: order.creator, account: order.account, symbol: order.symbol})
    const orderValue = order.quantity * price

    if (order.mode.toLowerCase() == 'buy'){
        // Check existing position
        if (account.cash + order.cashOnHold - orderValue < 0){
            // TODO: ADD FAILED ACITIVITY
            order.status = 'Failed'
            await order.save()
            return
        }
        account.cash = account.cash + order.cashOnHold - orderValue
        await account.save()
        if (position) { // add to position
            position.quantity = position.quantity + order.quantity
            position.bookValue = position.bookValue + orderValue
            position.avgPrice = position.bookValue / position.quantity
        }else{
            position = new Position({
                creator: order.creator,
                account: order.account,
                symbol: order.symbol,
                quantity: order.quantity,
                bookValue: orderValue,
                avgPrice: orderValue / order.quantity
            })
        }
        await position.save()
        order.status = "Executed"
        await order.save()
        // TODO: ADD EXECUTE ACITIVITY
    } else if (order.mode.toLowerCase() == 'sell'){
        // position check
        if (!position){
            // TODO: ADD FAILED ACITIVITY
            order.status = 'Failed'
            await order.save()
            return
        } else {
            if (position.quantity < order.quantity){
                // TODO: ADD FAILED ACITIVITY
                order.status = 'Failed'
                await order.save()
                return
            }
            position.quantity = position.quantity - order.quantity
            if (position.quantity === 0){
                position.remove()
            }else{
                position.save()
            }
        }
        account.cash = account.cash + orderValue
        await account.save()
        order.status = "Executed"
        await order.save()
        // TODO: ADD EXECUTE ACITIVITY
    }
}

async function serverTickOrderHandler() {
    const allOrders = await Order.find({})
    for (let i = 0; i < allOrders.length; i++){
        let curOrder = allOrders[i]
        if (curOrder.status != "Accepted"){
            continue
        }
        marktPrice = supportedCurrencies.find((coin) => {return coin.symbol == curOrder.symbol}).currentPrice
        if (curOrder.orderType.toLowerCase() == "market") {  // execute
            executeOrder(curOrder)
        }else if (curOrder.orderType.toLowerCase() == "limit"){
            if (curOrder.mode.toLowerCase() == 'buy'){
                if (marktPrice <= curOrder.limit){
                    executeOrder(curOrder)
                }
            }else if (curOrder.mode.toLowerCase() == 'sell'){
                if (marktPrice >= curOrder.limit){
                    executeOrder(curOrder)
                }
            }
        }else if (curOrder.orderType.toLowerCase() == "stop"){
            if (curOrder.mode.toLowerCase() == 'buy'){
                if (marktPrice >= curOrder.limit){
                    executeOrder(curOrder)
                }
            }else if (curOrder.mode.toLowerCase() == 'sell'){
                if (marktPrice <= curOrder.limit){
                    executeOrder(curOrder)
                }
            }
        }
    }
}

async function serverDailyOrderExpireHandler () {
    const allOrders = await Order.find({})
    for (let i = 0; i < allOrders.length; i++){
        let curOrder = allOrders[i]
        if (curOrder.status != "Accepted"){
            continue
        }
        if (curOrder.duration.toUpperCase() == "DAY"){
            order.status = "Cancelled"
            order.save()
            // TODO: ADD EXPIRE ACTIVITY
        }
    }

}


module.exports = {serverTickOrderHandler, serverDailyOrderExpireHandler}