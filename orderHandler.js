// import the models
const { Account } = require('./models/accounts')
const { Position } = require('./models/positions')
const { Order } = require('./models/orders')
let supportedCurrencies = require('./marketData')



function executeOrder(order, cashOnHold) {
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
        if (account.cash + cashOnHold - orderValue < 0){
            // TODO: add activity failed
            order.status = 'Failed'
            await order.save()
            return
        }
        account.cash = account.cash + cashOnHold - orderValue
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
        // TODO: add execute activity
    } else if (order.mode.toLowerCase() == 'sell'){
        // position check
        if (!position){
            // TODO: add activity failed
            order.status = 'Failed'
            await order.save()
            return
        } else {
            if (position.quantity < order.quantity){
                // TODO: add activity failed
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
    }
}

function serverTickOrderHandler() {
    const allOrders = await Order.find({})
    for (let i = 0; i < allOrders.length; i++){
        let curOrder = allOrders[i]
        if (curOrder.orderType.toLowerCase() == "market") {  // execute
            

        }
    }
}
