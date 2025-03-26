chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "PRODUCT_FOUND") {
        let query = `${message.product} eco-friendly alternatives`;

        fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&key=YOUR_API_KEY&cx=YOUR_SEARCH_ENGINE_ID`)
            .then(response => response.json())
            .then(data => {
                let results = data.items ? data.items.map(item => item.title) : ["No alternatives found"];
                
                // Store in Chrome Storage
                chrome.storage.sync.set({ alternatives: results }, () => {
                    console.log("Alternatives stored:", results);
                });
            })
            .catch(error => console.error("Error fetching alternatives:", error));
    }
});
