import React from 'react'
import { Link } from 'react-router-dom'


export default function ProductCard({product, onAdd}){
return (
<article className="card">
<Link to={`/product/${product.id}`} className="thumb-link">
<img src={product.image} alt={product.title} />
</Link>
<div className="card-body">
<h3 className="title">{product.title}</h3>
<p className="price">R$ {product.price.toFixed(2)}</p>
<div className="actions">
<button onClick={() => onAdd(product)}>Adicionar</button>
<Link to={`/product/${product.id}`}>Ver</Link>
</div>
</div>
</article>
)
}