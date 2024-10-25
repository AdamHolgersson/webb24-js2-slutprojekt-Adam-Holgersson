import { useState, useEffect } from "react";
import { Navbar } from './Navbar';
import { Loader } from './Loader';
import { MainContent } from './MainContent';
import { fetchProducts } from "../utils/fetchProducts.js";
import { updateProductStock } from "../utils/updateProduct.js";

// huvud kod
export default function App() {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState("products");

    const loadProducts = async () => {
        try {
            const productsData = await fetchProducts();
            setProducts(productsData);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                if (existingItem.quantity < product.inventory) {
                    return prev.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    console.warn(`Kan inte lägga till fler av ${product.name}. Endast ${product.inventory} kvar i lager.`);
                    return prev;
                }
            } else {
                if (product.inventory > 0) {
                    return [...prev, { ...product, quantity: 1 }];
                } else {
                    console.warn(`Produkten ${product.name} är slut i lager.`);
                    return prev;
                }
            }
        });
    };
    
    const completePurchase = async () => {
        try {
            await Promise.all(
                cartItems.map(item => {
                    const newInventory = item.inventory - item.quantity;
                    if (newInventory >= 0) {
                        return updateProductStock(item.id, newInventory);
                    } else {
                        console.warn(`Lagret för ${item.name} är för lågt för att slutföra köpet.`);
                    }
                })
            );
            setCartItems([]);
            setCurrentPage("completedPurchase");
            await loadProducts();
        } catch (error) {
            console.error("Fel vid uppdatering av saldo:", error);
        }
    };
    
    const clearCart = () => {
        setCartItems([]);
        setCurrentPage("products");
    }

    return (
        <>
            <h1>T On The Go</h1>
            <Navbar setCurrentPage={setCurrentPage} cartItems={cartItems} />
            <Loader loading={loading} error={error} />
            <MainContent 
                currentPage={currentPage} 
                products={products} 
                cartItems={cartItems} 
                addToCart={addToCart} 
                completePurchase={completePurchase}
                clearCart={clearCart} 
                setCurrentPage={setCurrentPage} 
            />
        </>
    );
}