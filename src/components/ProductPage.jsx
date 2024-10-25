// Produkt function för att visa information om produkterna.
export function ProductPage({ products, cartItems, addToCart }) {
    return (
        <div>
            <h1>Produkter</h1>
            {products.map(product => {
                const cartItem = cartItems.find(item => item.id === product.id);
                const isOutOfStock = product.inventory === 0 || (cartItem && cartItem.quantity >= product.inventory);
                return (
                    <div key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>Pris: {product.price} kr</p>
                        <p>Lager: {product.inventory} st</p>
                        <button onClick={() => addToCart(product)} disabled={isOutOfStock}>
                            {isOutOfStock ? "Slutsåld" : "Köp"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}