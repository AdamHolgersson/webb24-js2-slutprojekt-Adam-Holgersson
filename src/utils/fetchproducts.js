// Funktion för att hämta produkterna och varsitt unikt id för hantering..
export async function fetchProducts() {
    const url = "https://t-on-the-go-default-rtdb.europe-west1.firebasedatabase.app/products.json";

    const res = await fetch(url);
    const data = await res.json();

    if (!data) throw new Error("Inga produkter hittade");

    const productList = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
    }));

    return productList;
}