// STEP 8 
const swag = require('../models/swag.js')
module.exports = {
    add: (req, res, next) => {
        const { id } = req.query
        for (let item in req.session.user.cart) {
            if (item.id === id) {
                res.status(200).send(req.session.user)
            }
        }
        let selectedItem = swag.find(item => item.id == id)
        req.session.user.cart.push(selectedItem)
        req.session.user.total += selectedItem.price
        res.status(200).send(req.session.user)

    },
    delete: (req, res, next) => {
        const { id } = req.query
        // remove item from req.session.user.cart[] where id === id
        let selectedItem = swag.find(item => item.id == id)
        //remove item from cart
        let newCart = req.session.user.cart.filter(item=> item.id != id)
        req.session.user.cart = newCart
        req.session.user.total -= selectedItem.price
        res.status(200).send(req.session.user)
    },
    checkout: (req, res, next) => {
        req.session.user.cart = []
        req.session.user.total = 0
        res.status(200).send(req.session.user)
    }
}