chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "PRODUCT_FOUND") {
        let product = message.product.toLowerCase(); // Normalize product name

        // Check if data is already stored in Chrome Storage
        chrome.storage.sync.get(["alternativesCache"], (data) => {
            let cache = data.alternativesCache || {}; // Default to empty object

            if (cache[product]) {
                console.log("Fetching from cache:", cache[product]);
                sendResponse({ alternatives: cache[product] }); // Return cached results
            } else {
                // If not cached, fetch from Google API
                let query = `${product} eco-friendly alternatives`;
                fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&key=AIzaSyBtMhLfWXkpifEPHnz9HgB_d5IQy4Zgcu4&cx=d4805e6640164483b`)
                    .then(response => response.json())
                    .then(data => {
                        let results = data.items ? data.items.map(item => item.title) : ["No alternatives found"];

                        // Store results in Chrome Storage
                        cache[product] = results;
                        chrome.storage.sync.set({ alternativesCache: cache }, () => {
                            console.log("Stored in Chrome Storage:", results);
                        });

                        sendResponse({ alternatives: results });
                    })
                    .catch(error => {
                        console.error("Error fetching alternatives:", error);
                        sendResponse({ alternatives: ["Error fetching alternatives."] });
                    });
            }
        });

        return true; // Ensures sendResponse works asynchronously
    }
});
