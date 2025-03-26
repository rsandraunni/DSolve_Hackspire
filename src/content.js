console.log("Eco Shopping Assistant content script loaded on Amazon!");

function extractAmazonProductDetails() {
  let productName = document.getElementById("productTitle,.B_NuCI")?.innerText.trim() || "";
  let productPrice = document.querySelector(".a-price-whole")?.innerText.trim() || "";

  if (productName) {
    chrome.runtime.sendMessage({
      action: "PRODUCT_INFO",
      productName: productName,
      productPrice: productPrice
    });
  }
}

// Run extraction when the page loads
if (window.location.hostname.includes("amazon.")) {
  window.onload = extractAmazonProductDetails;
}
