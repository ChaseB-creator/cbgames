const games = [
  { id: 1, title: "Neon Shadows", genre: "RPG", price: 59.99, img: "https://placehold.co/300x180/993827/FFFFFF?text=Neon+Shadows" },
  { id: 2, title: "Pixel Racer", genre: "Racing", price: 39.99, img: "https://placehold.co/300x180/ff4444/000000?text=Pixel+Racer" },
  { id: 3, title: "Zombie Siege", genre: "Action", price: 49.99, img: "https://placehold.co/300x180/ff0000/000000?text=Zombie+Siege" },
  { id: 4, title: "Castle Tactics", genre: "Strategy", price: 44.99, img: "https://placehold.co/300x180/cc0000/ffffff?text=Castle+Tactics" },
  { id: 5, title: "Galactic Miner", genre: "Adventure", price: 34.99, img: "https://placehold.co/300x180/aa0000/ffffff?text=Galactic+Miner" }
];

function renderGames(filter = "") {
  const container = document.getElementById("recommended-games-container");
  if (!container) return;
  container.innerHTML = "";

  const filtered = games.filter(game =>
    game.title.toLowerCase().includes(filter.toLowerCase()) ||
    game.genre.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(game => {
    const div = document.createElement("div");
    div.className = "game-card";
    div.innerHTML = `
      <img src="${game.img}" alt="${game.title}">
      <h4>${game.title}</h4>
      <p>${game.genre}</p>
      <p><strong>$${game.price.toFixed(2)}</strong></p>
      <button class="button" onclick="selectGame(${game.id})">Buy Now</button>
    `;
    container.appendChild(div);
  });
}

function selectGame(gameId) {
  const game = games.find(g => g.id === gameId);
  localStorage.setItem("cbgames-selected", JSON.stringify(game));
  window.location.href = "PaymentForm.html";
}

const selectedGameSection = document.getElementById("selected-game");
if (selectedGameSection) {
  const selected = JSON.parse(localStorage.getItem("cbgames-selected"));
  if (selected) {
    selectedGameSection.innerHTML = `
      <img src="${selected.img}" alt="${selected.title}">
      <h3>${selected.title}</h3>
      <p><strong>Genre:</strong> ${selected.genre}</p>
      <p><strong>Price:</strong> $${selected.price.toFixed(2)}</p>
    `;
  }
}

const form = document.getElementById("purchaseForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const user = {
      name: data.get("name"),
      email: data.get("email"),
      address: data.get("address"),
      phone: data.get("phone")
    };
    localStorage.setItem("cbgames-user", JSON.stringify(user));
    window.location.href = "Receipt.html";
  });
}

const receiptInfo = document.getElementById("receipt-info");
const receiptImg = document.getElementById("receipt-game-img");
if (receiptInfo && receiptImg) {
  const user = JSON.parse(localStorage.getItem("cbgames-user"));
  const game = JSON.parse(localStorage.getItem("cbgames-selected"));
  if (user && game) {
    receiptImg.src = game.img;
    receiptImg.alt = game.title;
    receiptInfo.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Game:</strong> ${game.title}</p>
      <p><strong>Price:</strong> $${game.price.toFixed(2)}</p>
    `;
  }
}

const searchBar = document.getElementById("searchBar");
if (searchBar) {
  searchBar.addEventListener("input", e => renderGames(e.target.value));
  renderGames();
}