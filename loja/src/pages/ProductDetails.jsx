import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../Api/fakeApi";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (!id) throw new Error("Produto inválido");
        const p = await fetchProduct(id);
        if (!mounted) return;
        setProduct(p);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Erro ao carregar produto");
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    if (!user) {
      // se quiseres direcionar pra outra rota, troca aqui
      navigate("/login");
      return;
    }
    addToCart(product, 1);
    navigate("/cart"); // opcional: redireciona pro carrinho após adicionar
  }

  if (loading) return <div>Carregando produto...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!product) return <div>Produto não encontrado.</div>;

  return (
    <div style={{ padding: 16 }}>
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={{ maxWidth: 300, display: "block", marginBottom: 12 }}
      />
      <p>{product.description}</p>
      <p>
        <strong>Preço:</strong> R$ {product.price}
      </p>
      <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
    </div>
  );
}
