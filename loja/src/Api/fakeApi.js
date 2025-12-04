const BASE = 'https://fakestoreapi.com'


export async function fetchProducts() {
const res = await fetch(`${BASE}/products`)
if (!res.ok) throw new Error('Erro ao buscar produtos')
return res.json()
}


export async function fetchProduct(id) {
const res = await fetch(`${BASE}/products/${id}`)
if (!res.ok) throw new Error('Produto não encontrado')
return res.json()
}


// FakeStoreAPI suporta POST /products para criar (apenas demonstração)
export async function createProduct(data) {
const res = await fetch(`${BASE}/products`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
})
return res.json()
}


export async function updateProduct(id, data) {
const res = await fetch(`${BASE}/products/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
})
return res.json()
}


export async function deleteProduct(id) {
const res = await fetch(`${BASE}/products/${id}`, { method: 'DELETE' })
return res.json()
}


// Auth: FakeStoreAPI has /auth/login which accepts username/password and returns a token
export async function loginApi(username, password) {
const res = await fetch(`${BASE}/auth/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username, password })
})
if (!res.ok) throw new Error('Falha no login')
return res.json()
}