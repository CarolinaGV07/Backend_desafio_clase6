
import {Router} from 'express'
import ProductManager from '../manager/ProductManager.js'

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req,res) => {
    const limit = parseInt (req.query.limit)

    const products = await productManager.listProducts()

    if(limit){
        const limitProds = products.slice(0,limit)

        res.send(limitProds) 
    } else{
        res.send(products)
    }

})

router.get('/:pid', async (req,res)=>{

    const id = parseInt(req.params.pid)
    const productFounded = await productManager.getProductById(id)
    
    if (!productFounded) res.status(404).send({ error: 'Product not found' })
    else res.send(productFounded)
})

router.post('/', async (req,res) => {
    const data = req.body
    const newProduct = await productManager.createProduct(data)
    res.send(newProduct)
})

router.put('/:pid', async (req,res)=>{
    const pid = parseInt(req.params.pid)
    const productUpdated = await productManager.updateProduct(pid)
    res.send(productUpdated)
})

router.delete('/:pid', async (req,res) => {
    const id = await productManager.deleteProduct(pid)
    res.send(id) 
})
export default router
