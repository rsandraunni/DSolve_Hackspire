document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("searchBtn");
    const productInput = document.getElementById("productName");
    const resultDiv = document.getElementById("result");
  
    searchBtn.addEventListener("click", function () {
      const productName = productInput.value.trim();
      if (!productName) {
        resultDiv.innerHTML = "<p>Please enter a product name.</p>";
        return;
      }
  
      // Fake product alternatives for now (later, connect to a database)
      const alternatives = {
        "plastic bottle": ["Glass bottle", "Steel bottle"],
        "plastic bag": ["Cloth bag", "Paper bag"]
      };
  
      const alternativeList = alternatives[productName.toLowerCase()] || ["No alternatives found."];
  
      resultDiv.innerHTML = `<p>Alternatives: ${alternativeList.join(", ")}</p>`;
    });
  });
  