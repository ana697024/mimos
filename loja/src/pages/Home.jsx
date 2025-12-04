import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../Api/fakeApi'
import ProductCard from '../components/ProductCard'
import { useCart } from '../contexts/CartContext'


export default function Home(){
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const { addToCart } = useCart()


useEffect(() => {
let mounted = true
fetchProducts()
.then(data => { if (mounted) setProducts(data) })
.catch(err => { if (mounted) setError(err.message) })
.finally(() => { if (mounted) setLoading(false) })
return () => mounted = false
}, [])


if (loading) return <div className="center">Carregando produtos...</div>
if (error) return <div className="center">Erro: {error}</div>


return (
<div>
<h1 className="page-title">Mimos — Produtos</h1>
<section className="grid">
{products.map(p => (
<ProductCard key={p.id} product={p} onAdd={(prod)=>addToCart(prod, 1)} />
))}
</section>
</div>
)
}