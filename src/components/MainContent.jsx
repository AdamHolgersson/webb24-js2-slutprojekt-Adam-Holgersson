import { ProductPage } from './ProductPage';
import { CartPage } from './CartPage';
import { CompletedPurchasePage } from './CompletedPurchasePage';

// Funktion för att hantera huvudsidan, dvs produktsidan. Mest för att göra koden i App lite mindre.
export function MainContent({ currentPage, products, cartItems, addToCart, completePurchase, clearCart, setCurrentPage }) {
    switch (currentPage) {
        case "products":
            return <ProductPage products={products} cartItems={cartItems} addToCart={addToCart} />;
        case "cart":
            return (
                <CartPage 
                    cartItems={cartItems} 
                    completePurchase={completePurchase} 
                    clearCart={clearCart}
                    setCurrentPage={setCurrentPage}
                />
            );
        case "completedPurchase":
            return <CompletedPurchasePage setCurrentPage={setCurrentPage} />;
        default:
            return <ProductPage products={products} cartItems={cartItems} addToCart={addToCart} />;
    }
}