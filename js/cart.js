import { pies } from './pie-options.js';

// Add to cart function
function addToCart(pie) {
  // Get the selected size from the dropdown
  const sizeSelect = document.getElementById(`size-${pie.id}`);
  const selectedSize = sizeSelect ? sizeSelect.value : "Medium"; // default if no dropdown found

  // Retrieve existing cart or create a new array
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Add size info to the pie object
  const pieWithSize = { ...pie, size: selectedSize, quantity: 1 };

  // Check if this pie (with same size) already exists in cart
  const existingItemIndex = cart.findIndex(
    (item) => item.id === pie.id && item.size === selectedSize
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push(pieWithSize);
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log(`Added to cart: ${pie.name}, Size: ${selectedSize}`);
}
  
function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemElem = document.createElement("div");
    itemElem.className = "cart-item";
    itemElem.innerHTML = `
      <div style="flex: 1;">
        <strong>${item.name}</strong> (${item.size})
      </div>
      <div style="flex: 1;">$${item.price.toFixed(2)}</div>
      <div style="flex: 1;">
        <input type="number" value="${item.quantity}" min="1" 
          onchange="updateQuantity(${item.id}, this.value, '${item.size}')"
          style="width: 50px;" />
      </div>
      <div style="flex: 1;">$${itemTotal.toFixed(2)}</div>
    `;
    cartItemsContainer.appendChild(itemElem);
  });

  document.getElementById("cartTotal").textContent = total.toFixed(2);
}

function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
}

function updateQuantity(id, newQuantity, size) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.map(item => {
    if (item.id === id && item.size === size) {
      item.quantity = parseInt(newQuantity, 10);
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Attach event listeners to Add to Cart links
document.querySelectorAll(".add-to-cart").forEach(function(link) {
  link.addEventListener("click", function(event) {
    event.preventDefault();
    const id = parseInt(this.getAttribute("data-id"));
    
    // Find the pie by ID
    const pie = pies.find(p => p.id === id);
    
    if (pie) {
      addToCart(pie);
    } else {
      console.error("Pie not found with ID: " + id);
    }
  });
});

document.addEventListener("DOMContentLoaded", renderCart);
  
renderCart();
  