function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("fromCurrency").value.toUpperCase();
    const to = document.getElementById("toCurrency").value.toUpperCase();

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Network error");
            return response.json();
        })
        .then(data => {
            const rates = data[from.toLowerCase()];
            if (!rates || !rates[to.toLowerCase()]) {
                document.getElementById("result").innerText = "Unsupported currency pair";
                return;
            }
            const converted = (amount * rates[to.toLowerCase()]).toFixed(2);
            document.getElementById("result").innerText =
                `${amount} ${from} = ${converted} ${to}`;
        })
        .catch(error => {
            document.getElementById("result").innerText = "Error fetching data";
            console.error("Error:", error);
        });
}