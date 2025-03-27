document.getElementById("searchBtn").addEventListener("click", function () {
  let productName = document.getElementById("productName").value.trim();

  if (productName === "") {
      document.getElementById("result").innerText = "Please enter a product name.";
      return;
  }

  // Send message to background script to fetch alternatives
  chrome.runtime.sendMessage({ action: "findAlternative", product: productName }, function (response) {
      if (response && response.alternative) {
          document.getElementById("result").innerHTML = 
              `<strong>Alternative:</strong> ${response.alternative}`;
      } else {
          document.getElementById("result").innerText = "No alternatives found.";
      }
  });
});

