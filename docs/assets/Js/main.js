// Apply staggered animation delay to elements with the class 'box'
document.querySelectorAll(".box").forEach((box, index) => {
  box.style.animationDelay = `${index * 0.2}s`;
});

document.addEventListener("DOMContentLoaded", () => {
  // Get references to the dark mode toggle button and the light mode stylesheet link
  const darkModeToggle = document.getElementById("darkModeToggle");
  const lightModeStylesheet = document.getElementById("lightModeStylesheet");

  // Initialize the theme based on saved preference or default to 'dark' mode
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  // Toggle between light and dark mode on button click
  darkModeToggle.addEventListener("click", () => {
    const isLightMode = lightModeStylesheet.getAttribute("href") !== "";
    setTheme(isLightMode ? "dark" : "light");
  });

  function setTheme(mode) {
    if (mode === "light") {
      // Enable light mode by linking the light-mode CSS and updating the toggle icon
      lightModeStylesheet.setAttribute("href", "./assets/css/light-mode.css");
      darkModeToggle.setAttribute("src", "./assets/images/dark-mode.png");
      localStorage.setItem("theme", "light");
    } else {
      // Enable dark mode by removing the light-mode CSS and updating the toggle icon
      lightModeStylesheet.setAttribute("href", "");
      darkModeToggle.setAttribute("src", "./assets/images/light-mode.png");
      localStorage.setItem("theme", "dark");
    }
  }
});

const loadedData = {};

// Function to dynamically load search.json files based on .box elements
async function loadSearchData() {
  const boxes = document.querySelectorAll(".box");
  const versionPromises = Array.from(boxes).map(async (box) => {
    const link = box.querySelector("a");
    const version = link.href.match(/\/(v[\d.]+)\//)?.[1]; // Extract version from the URL
    if (version) {
      const path = `./${version}/data/search.json`;
      try {
        const response = await fetch(path);
        const data = await response.json();
        loadedData[version] = data.list;
      } catch (error) {
        console.error(`Failed to load search data for ${version}:`, error);
      }
    }
  });

  await Promise.all(versionPromises);
}

// Load data on page load
window.onload = loadSearchData;

const searchInput = document.getElementById('searchInput');
const searchResultContainer = document.querySelector('.search-result');
const DESCRIPTION_MAX_LENGTH = 90; // Max length for description
const TITLE_MAX_LENGTH = 30;
// Render search results to the DOM
function renderSearchResults(results) {
    if (results.length === 0) {
        searchResultContainer.innerHTML = `
            <div class="result">
                <img src="./assets/images/icons8-link-96.png" alt="icon">
                <div>
                    <p>No results found!</p>
                </div>
            </div>
        `;
        return;
    }

    searchResultContainer.innerHTML = results.map(result => {
        // Extract the actual URL from the link using regex
        const urlMatch = result.link.match(/href="([^"]*)"/);
        const relativePath = urlMatch ? urlMatch[1] : '#';
        const fullUrl = `${result.version}/${relativePath}`;
        return `
            <div class="result">
                <img src="./assets/images/icons8-link-96.png" alt="icon">
                <div>
                    <span>${result.version} :</span>
                    <a href="${fullUrl}" target="_blank" rel="noopener noreferrer">
                        ${(result.title).length > TITLE_MAX_LENGTH ? result.title.slice(0, TITLE_MAX_LENGTH) + '...' : result.title }
                    </a>
                    <p>${(result.description ?? '').length > DESCRIPTION_MAX_LENGTH 
                        ? result.description.slice(0, DESCRIPTION_MAX_LENGTH) + '...' 
                        : result.description ?? ''}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Perform the search with matching only against the title
function searchDocumentation(query) {
    if (query.length < 3) {
        searchResultContainer.innerHTML = ''; // Clear results if query is too short
        return;
    }

    const results = [];
    for (const [version, data] of Object.entries(loadedData)) {
        data.forEach(item => {
            if (item.title.toLowerCase().includes(query)) {
                results.push({ ...item, version });
            }
        });
    }

    renderSearchResults(results);
}

// Automatically search when typing (no need for button or Enter key)
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    searchDocumentation(query);
});


