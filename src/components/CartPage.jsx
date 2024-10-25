// Funktion för kundvagns sidan med totalsumma och knappar för att antingen slutföra köpet eller tömma kundvagnen.
export function CartPage({ cartItems, completePurchase, clearCart, setCurrentPage }) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    return (
        <div>
            <h1>Kundvagn</h1>
            {cartItems.length === 0 ? (
                <p>Din kundvagn är tom</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.id}>
                            <h3>{item.name}</h3>
                            <p>Pris: {item.price} kr</p>
                            <p>Antal: {item.quantity} st</p>
                        </div>
                    ))}
                    <h2>Totalsumma: {total} kr</h2>
                    <button onClick={completePurchase}>Slutför köp</button>
                    <button onClick={() => {    // vid knapptryck så töms kundvagnen och skickar användaren till produktsidan.
                        clearCart();    
                        setCurrentPage("products");
                    }}>Töm kundvagn</button>
                </div>
            )}
        </div>
    );
}