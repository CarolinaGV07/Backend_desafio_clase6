
import {Router} from 'express'
import CartManager from '../manager/CartManager.js'

const router = Router()
const cartManager = new CartManager()


router.get('/:cid', async (req,res) => {
    const cid = parseInt(req.params.cid)
    const cart = await cartManager.getCart(cid)
    res.send(cart)
})

router.post('/', async (req,res) => {
    const result = await cartManager.createCart({id: Number,products:[]})
    res.send(result)
})

router.post('/:cid/product/:pid', async (req,res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const productToCart = await cartManager.addProduct(cid,pid)

    res.send(productToCart)
})

export default router