// Add to cart function
function addToCart(pie) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existing = cart.find(item => item.id === pie.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({...pie, quantity: 1});
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${pie.name} added to cart!`);
}
  
  // Render cart contents
  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotalContainer = document.getElementById("cartTotal");
  
    cartItemsContainer.innerHTML = "";
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotalContainer.innerHTML = "";
      return;
    }
  
    let total = 0;
  
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
  
      const subtotal = (item.price * item.quantity);
      total += subtotal;
  
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" width="100">
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
      `;
  
      cartItemsContainer.appendChild(itemDiv);
    });
  
    document.getElementById("cartTotal").textContent = total.toFixed(2);

  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderCart();
  });
  
  
  // Update item quantity
  function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;
  
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
  }
  
  renderCart();
  