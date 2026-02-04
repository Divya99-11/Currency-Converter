async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;
    const result = document.getElementById("result");

    if (!amount || amount <= 0) {
        result.innerText = "Please enter a valid amount";
        return;
    }

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await response.json();

        if (data.result !== "success") {
            result.innerText = "Failed to fetch exchange rates";
            return;
        }

        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);

        result.innerText = `${amount} ${from} = ${converted} ${to}`;
    } catch (error) {
        result.innerText = "Network error. Please try again.";
    }
}

