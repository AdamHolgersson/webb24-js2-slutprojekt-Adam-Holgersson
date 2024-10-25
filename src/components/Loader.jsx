import { Loading } from "./Loading";
import { Error } from "./Error";

// En funktion för att hantera loading och error.
export function Loader({loading, error}) {
    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;
    return null;
}