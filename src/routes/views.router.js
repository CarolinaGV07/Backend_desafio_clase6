import {Router} from 'express'
import ProductManager from '../manager/ProductManager.js'

const router = Router()
const productManager = new ProductManager()

router.get('/', (req,res) => {
    res.render('index', {css: 'index'})
})

router.get('/home', async (req,res) => {
    const products = await productManager.listProducts()
    res.render('home', {products, css: 'home'})
})

router.get('/realtimeproducts', async (req,res) => {
    const products = await productManager.listProducts()
    res.render('realTimeProducts', {products, css: 'realTimeProducts'})
})

router.get('/form_products', async (req,res) => {
    res.render('form', {css:'form'})
})

router.post('/form_products', async (req,res) => {
    const data = req.body
    const newProduct = await productManager.createProduct(data)
    res.redirect('/home')
})

export default router