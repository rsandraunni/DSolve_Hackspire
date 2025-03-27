// Check if running on an Amazon product page
if (window.location.href.includes("/dp/")) {
  let productTitle = document.querySelector("#productTitle")?.innerText.trim();

  if (productTitle) {
      chrome.runtime.sendMessage({ action: "setProduct", product: productTitle });
  }
}
