document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const productInput = document.getElementById("productName");
  const resultDiv = document.getElementById("result");

  searchBtn.addEventListener("click", function () {
      const productName = productInput.value.trim().toLowerCase();

      if (!productName) {
          resultDiv.innerHTML = "<p>Please enter a product name.</p>";
          return;
      }

      // Retrieve stored alternatives from Chrome Storage
      chrome.storage.sync.get("alternatives", (data) => {
          if (data.alternatives && data.alternatives[productName]) {
              const alternativeList = data.alternatives[productName];
              resultDiv.innerHTML = `<p>Alternatives: ${alternativeList.join(", ")}</p>`;
          } else {
              resultDiv.innerHTML = `<p>No alternatives found for "${productName}".</p>`;
          }
      });
  });
});
  
