'use client'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const BestSelling = () => {

    const displayQuantity = 8
    const products = useSelector(state => state.product?.list) || []
    const totalProducts = products.length
    const getRatingLength = (product) => Array.isArray(product.rating) ? product.rating.length : 0
    const orderedProducts = Array.isArray(products)
        ? products.slice().sort((a, b) => getRatingLength(b) - getRatingLength(a))
        : []

    return (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            <Title title='Best Selling' description={`Showing ${totalProducts < displayQuantity ? totalProducts : displayQuantity} of ${totalProducts} products`} href='/shop' />
            <div className='mt-12  grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12'>
                {orderedProducts.slice(0, displayQuantity).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default BestSelling