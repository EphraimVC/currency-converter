import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
    const [origin, setOrigin] = useState("EUR");
    const [to, setTo] = useState("USD");
    const [amount, setAmount] = useState(1);
    const [rates, setRates] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function exchange() {
            const res = await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${origin}&to=${to}`
            );

            const data = await res.json();
            setRates(data.rates[to]);
            setLoading(false);
        }
        if (origin === to) return setRates(amount);
        exchange();
    }, [origin, to, amount]);

    return (
        <div className="containerApp">
            <h1>Currency Converter</h1>
            <>
                <input
                    type="text"
                    placeholder="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <select
                    className="selector"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    disabled={loading}
                >
                    <option className="options" value="USD">
                        USD
                    </option>
                    <option className="options" value="EUR">
                        EUR
                    </option>
                    <option className="options" value="CAD">
                        CAD
                    </option>
                    <option className="options" value="INR">
                        INR
                    </option>
                </select>
                <select
                    className="selector"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    disabled={loading}
                >
                    <option className="options" value="USD">
                        USD
                    </option>
                    <option className="options" value="EUR">
                        EUR
                    </option>
                    <option className="options" value="CAD">
                        CAD
                    </option>
                    <option className="options" value="INR">
                        INR
                    </option>
                </select>
            </>
            <>
                {loading ? (
                    <Load />
                ) : (
                    <p className="output">
                        {rates} {to}
                    </p>
                )}
            </>
        </div>
    );
}

function Load() {
    return <p>LOADING . . .</p>;
}
