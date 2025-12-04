import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'


export default function Header(){
const { items } = useCart()
const { user, logout } = useAuth()
const navigate = useNavigate()


return (
<header className="site-header">
<div className="brand" onClick={()=>navigate('/')}>mimos</div>
<nav>
<Link to="/">Loja</Link>
<Link to="/cart">Carrinho ({items.length})</Link>
<Link to="/admin">Admin</Link>
{user ? (
<button className="link-btn" onClick={() => { logout(); navigate('/') }}>Sair</button>
) : (
<Link to="/login">Entrar</Link>
)}
</nav>
</header>
)
}