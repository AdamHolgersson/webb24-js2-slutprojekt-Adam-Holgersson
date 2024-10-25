// En funktion för navbaren
export function Navbar({ setCurrentPage, cartItems }) {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <nav>
            <button onClick={() => setCurrentPage("products")}>Produkter</button>
            <button onClick={() => setCurrentPage("cart")}>Kundvagn ({totalItems})</button>
        </nav>
    )
}