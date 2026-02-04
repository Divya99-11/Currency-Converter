const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultDiv = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

// Event listener
convertBtn.addEventListener("click", convertCurrency);

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);

    if (!amount || amount <= 0) {
        resultDiv.textContent = "Please enter a valid amount.";
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await response.json();

        if (data.result !== "success") {
            resultDiv.textContent = "Failed to fetch exchange rates.";
            return;
        }

        const rate = data.rates[to];
        const convertedAmount = (amount * rate).toFixed(2);

        resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        resultDiv.textContent = "Network error. Please try again.";
    }
}


