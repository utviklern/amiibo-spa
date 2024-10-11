// Import functions for easier testing with Jest
import { fetchAmiibos } from './api.js';
const searchInput = document.getElementById('searchInput');
// Step 1: Fetch Amiibo List
export async function fetchAndRenderAmiibos() {
  try {
    const amiibos = await fetchAmiibos('https://www.amiiboapi.com/api/amiibo/');
    renderAmiiboList(amiibos);
  } catch (error) {
    console.error('Error fetching Amiibos:', error);
  }
}

// Step 2: Render List of Amiibos
export function renderAmiiboList(amiibos) {
  // Decleared in the function for Jest's sake
  const listView = document.getElementById('listView');
  listView.innerHTML = ''; // Clear existing content
  listView.classList.add('amiibo-grid');
  amiibos.forEach(amiibo => {
    const amiiboItem = document.createElement('div');
    amiiboItem.className = 'amiibo-item';
    amiiboItem.innerHTML = `
      <h2>${amiibo.name}</h2>
      <img src="${amiibo.image}" alt="${amiibo.name}" class="amiibo-image">
      <button class="read-more" data-head="${amiibo.head}" data-tail="${amiibo.tail}">Read More</button>
      `;
    listView.appendChild(amiiboItem);
  });

// Attach event listeners to "Read More" buttons
  document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', (e) => {
      const amiiboHead = e.target.getAttribute('data-head');
      const amiiboTail = e.target.getAttribute('data-tail');
      const amiiboId = `${amiiboHead}${amiiboTail}`;
      fetchAndRenderAmiiboDetails(amiiboId);
}); });
}

// Step 3: Fetch and Display Details for an Amiibo
export async function fetchAndRenderAmiiboDetails(amiiboId) {
  try {
    const apiUrl = `https://www.amiiboapi.com/api/amiibo/?id=${amiiboId}`;
    const amiibo = await fetchAmiibos(apiUrl);
    if (amiibo) {
      renderAmiiboDetails(amiibo);
    } else {
      console.error('No details found for the specified Amiibo ID');
    }
  } catch (error) {
    console.error('Error fetching Amiibo details:', error);
  }
}

// Step 4: Render Amiibo Details
export function renderAmiiboDetails(amiibo) {
  // Decleared in the function for Jest's sake
  const detailsView = document.getElementById('detailsView');
  const listView = document.getElementById('listView');
  if (!amiibo) {
    console.error('Amiibo details are undefined');
return; }
  detailsView.innerHTML = `
    <button id="backButton">Back to List</button>
    <h2>${amiibo.name}</h2>
    <img src="${amiibo.image}" alt="${amiibo.name}">
    <p><strong>Game Series:</strong> ${amiibo.gameSeries}</p>
    <p><strong>Character:</strong> ${amiibo.character}</p>
    <p><strong>Type:</strong> ${amiibo.type}</p>
`;
// Attach event listener to "Back" button
  document.getElementById('backButton').addEventListener('click', () => {
    listView.classList.remove('hidden');
    detailsView.classList.add('hidden');
});
  listView.classList.add('hidden');
  detailsView.classList.remove('hidden');
}

// Step 5: Implement Live Search
export function implementLiveSearch() {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const amiiboItems = document.querySelectorAll('.amiibo-item');
    amiiboItems.forEach(item => {
      const name = item.querySelector('h2').innerText.toLowerCase();
      if (name.includes(searchTerm)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
}); });
}
// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderAmiibos();
  implementLiveSearch();
});