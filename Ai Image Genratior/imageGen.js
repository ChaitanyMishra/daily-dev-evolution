console.log("Script loaded ✅");

async function generateImage() {
    const prompt = document.getElementById("prompt").value;
    if (!prompt) return alert("Please enter a prompt!");
  
    // Save to localStorage
    savePrompt(prompt);
  
    // Call Lexica API
    const response = await fetch(`https://lexica.art/api/v1/search?q=${encodeURIComponent(prompt)}`);
    const data = await response.json();
  
    if (data.images && data.images.length > 0) {
      const imgUrl = data.images[0].src;
  
      document.getElementById("output").innerHTML = `
        <h3>Result for: "${prompt}"</h3>
        <img src="${imgUrl}" alt="Generated Image" />
      `;
    } else {
      document.getElementById("output").innerHTML = `<p>No image found for that prompt.</p>`;
    }
  
    loadHistory(); // Refresh history
  }
  
  // Save prompt to localStorage
  function savePrompt(prompt) {
    let prompts = JSON.parse(localStorage.getItem("promptHistory")) || [];
    prompts.unshift(prompt); // Add to top
    prompts = prompts.slice(0, 10); // Keep only last 10 prompts
    localStorage.setItem("promptHistory", JSON.stringify(prompts));
  }
  
  // Load history from localStorage
  function loadHistory() {
    const historyDiv = document.getElementById("history");
    const prompts = JSON.parse(localStorage.getItem("promptHistory")) || [];
  
    historyDiv.innerHTML = prompts
      .map((p) => `<div class="history-item">📝 ${p}</div>`)
      .join("");
  }
  
  loadHistory(); // Show history on load
  