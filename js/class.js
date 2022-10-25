let nAmount = ""
let nPrice = ""


class Calculate {
    constructor() {
        nAmount = Object.values(cart).reduce((acc, { amount }) => acc + amount, 0)
        nPrice = Object.values(cart).reduce((acc, {amount, price}) => acc + amount * price ,0)
    }
}

function itemAmount() {
    let result = ((acc, { amount }) => acc + amount, 0)
    return result
}

function finalPrice(){
    let total = ((acc, {amount, price}) => acc + amount * price ,0)
    return total
}

