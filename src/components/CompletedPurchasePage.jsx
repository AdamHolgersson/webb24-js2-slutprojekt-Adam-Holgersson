// Funktion för att visa en sida efter ett genomfört köp och en knapp för att gå tillbaka till produktsidan.
export function CompletedPurchasePage({ setCurrentPage }) {
    return (
        <div>
            <h1>Köp genomförd!</h1>
            <p>Tack för ditt köp.</p>
            <button onClick={() => setCurrentPage("products")}>Tillbaka till produkterna</button>
        </div>
    )
}