let productData = {}; // Stores the product name

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "setProduct") {
        productData[sender.tab.id] = message.product;
    }

    if (message.action === "findAlternative") {
        let productName = message.product.toLowerCase();

        // Sample alternatives (Replace with API call)
        const alternatives = {
            // Containers & Bottles
            "plastic container": "Glass container, Stainless steel container",
            "plastic storage box": "Glass storage box, Bamboo storage box",
            "tupperware": "Glass food container, Stainless steel tiffin",
            "plastic food box": "Glass lunch box, Stainless steel lunchbox",
            "plastic bottle": "Stainless steel bottle, Glass bottle",
            "water bottle": "Stainless steel bottle, Copper bottle, Glass bottle",
        
            // Bags & Wrappings
            "plastic bag": "Cloth bag, Jute bag, Biodegradable bag",
            "grocery bag": "Jute shopping bag, Canvas bag",
            "plastic wrap": "Beeswax wrap, Silicone food wrap",
            "cling film": "Beeswax wrap, Compostable food wrap",
            "ziplock bag": "Silicone food bag, Reusable fabric pouch",
            "food storage bag": "Silicone bag, Reusable fabric wrap",
        
            // Straws & Cutlery
            "plastic straw": "Paper straw, Stainless steel straw, Bamboo straw",
            "disposable straw": "Paper straw, Bamboo straw",
            "plastic spoon": "Wooden spoon, Bamboo spoon, Stainless steel spoon",
            "plastic fork": "Wooden fork, Bamboo fork, Stainless steel fork",
            "plastic knife": "Wooden knife, Bamboo knife, Stainless steel knife",
            "disposable cutlery": "Wooden cutlery, Bamboo cutlery",
        
            // Cups, Plates & Utensils
            "plastic cup": "Paper cup, Glass cup, Bamboo cup",
            "coffee cup": "Reusable travel mug, Stainless steel cup",
            "disposable cup": "Paper cup, Bamboo cup",
            "plastic plate": "Palm leaf plate, Bamboo plate, Ceramic plate",
            "disposable plate": "Compostable plate, Wooden plate",
            "plastic bowl": "Bamboo bowl, Ceramic bowl, Wooden bowl",
        
            // Household Items
            "plastic toothbrush": "Bamboo toothbrush, Recycled plastic toothbrush",
            "toothbrush": "Bamboo toothbrush, Eco-friendly toothbrush",
            "plastic comb": "Wooden comb, Bamboo comb",
            "hairbrush": "Wooden hairbrush, Bamboo hairbrush",
            "plastic razor": "Stainless steel safety razor, Bamboo razor",
            "shaving razor": "Metal razor, Bamboo handle razor",
            "plastic soap dispenser": "Glass soap dispenser, Stainless steel soap dispenser",
            "shampoo bottle": "Shampoo bar, Refillable shampoo bottle",
            "plastic sponge": "Loofah, Wooden dish brush, Coconut fiber scrubber",
        
            // Office & School Supplies
            "plastic pen": "Recycled paper pen, Bamboo pen, Metal refillable pen",
            "ballpoint pen": "Bamboo pen, Metal refillable pen",
            "plastic file folder": "Recycled paper folder, Cloth document holder",
            "plastic notebook cover": "Recycled cardboard cover, Cloth-bound notebook",
        
            // Shopping & Packaging
            "plastic packaging": "Recyclable paper packaging, Compostable packaging",
            "bubble wrap": "Corrugated cardboard wrap, Compostable air cushions",
            "plastic mailing envelope": "Paper envelope, Compostable mailer",
        
            // Travel & Picnic
            "plastic lunchbox": "Stainless steel tiffin, Glass lunchbox",
            "lunch bag": "Insulated fabric lunch bag, Canvas lunch bag",
            "plastic picnic utensils": "Bamboo utensils, Wooden utensils",
            "plastic takeout container": "Compostable takeout container, Stainless steel tiffin",
            "food delivery container": "Biodegradable takeout box, Stainless steel container",
        
            // Miscellaneous
            "plastic coffee pod": "Reusable stainless steel coffee pod",
            "plastic earbuds": "Bamboo earbuds, Cotton swabs with paper stems",
            "plastic tea bags": "Loose leaf tea, Compostable tea bags",
            "plastic ice cube tray": "Stainless steel ice cube tray, Silicone tray",
            "plastic hanger": "Wooden hanger, Metal hanger",
            "plastic keychain": "Wooden keychain, Metal keychain",
            "plastic dustbin": "Metal dustbin, Bamboo dustbin",
            "plastic fishing line": "Biodegradable fishing line, Cotton fishing line",
        };
        
        

        let alternative = alternatives[productName] || null;
        sendResponse({ alternative: alternative });
    }

    return true;
});

// Clear stored data when the tab is closed
chrome.tabs.onRemoved.addListener(tabId => {
    delete productData[tabId];
});
