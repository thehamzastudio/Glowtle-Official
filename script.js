console.log("musk al Zahra Store Loaded");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
  cart.push({ name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

function updateCartCount() {
  const count = cart.length;
  const el = document.getElementById("cart-count");
  if (el) el.innerText = count;
}

// Call this on every page load to keep cart icon updated
updateCartCount();