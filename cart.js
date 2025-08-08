let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(product);
  }
  saveCart();
  updateCartCount();
}

function updateCartCount() {
  const countSpan = document.getElementById("cart-count");
  if (countSpan) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    countSpan.textContent = count;
  }
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");
  if (!container || !totalEl) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty">Your cart is empty.</div>';
    totalEl.innerText = "Total: Rs 0";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const quantity = item.quantity || 1;
    const price = item.price * quantity;
    total += price;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-info">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-text">
          <strong>${item.name}</strong>
          <span class="price">Rs ${item.price} x ${quantity}</span>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  totalEl.innerText = "Total: Rs " + total;

  const cartSummary = cart.map(item => `${item.name} x ${item.quantity} = Rs ${item.price * item.quantity}`).join("\n");
  const cartItemsField = document.getElementById("cartItemsField");
  const totalAmountField = document.getElementById("totalAmountField");

  if (cartItemsField) cartItemsField.value = cartSummary;
  if (totalAmountField) totalAmountField.value = "Rs " + total;
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cart-items")) {
    renderCart();
  } else {
    updateCartCount();
  }

  const clearBtn = document.getElementById("clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      cart = [];
      saveCart();
      renderCart();
      updateCartCount();
    });
  }

  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      const name = document.getElementById("name").value.trim();
      const address = document.getElementById("address").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const cod = document.getElementById("cod").checked;

      if (!name || !address || !email || !phone || !cod) {
        alert("Please fill all required fields and select a payment method.");
        e.preventDefault();
        return;
      }

      if (cart.length === 0) {
        alert("Your cart is empty.");
        e.preventDefault();
        return;
      }

      localStorage.removeItem("cart");
      cart = [];
    });
  }
});

window.addToCart = addToCart;
