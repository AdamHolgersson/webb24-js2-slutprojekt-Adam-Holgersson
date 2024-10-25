// Funktion för att uppdatera lagersaldot 
export async function updateProductStock(productId, newStock) {
    const url = `https://t-on-the-go-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`;

    const res = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inventory: newStock })
    });

    if (!res.ok) {
        throw new Error("Fel vid uppdatering av lager");
    }
}