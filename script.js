
let cart = [];
function toggleCart() {
    const sidebar = document.getElementById('sidebarCart');
    sidebar.style.right = (sidebar.style.right === '0px') ? '-300px' : '0px';
    renderCart();
}
function addToCart(name, price, image) {
  
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
  } else {
      const item = {
          name,
          price,
          image,
          quantity: 1,
          totalPrice: price
      };
      cart.push(item);
  }
  renderCart();

  const button = event.target; 
  button.classList.add('cart-animation');
  setTimeout(() => {
      button.classList.remove('cart-animation');
  }, 300);

  const successMessage = document.createElement('div');
  successMessage.classList.add('cart-success');
  successMessage.innerText = `${name} added to cart!`;
  document.body.appendChild(successMessage);

  setTimeout(() => {
      successMessage.remove();
  }, 2000);
}


function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function buyCart() {
  if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
  }
  cart = [];
  const cartBody = document.querySelector(".cart-body");
  cartBody.innerHTML = `
      <p style="text-align: center; font-size: 16px; color: green; font-weight: bold; margin: 20px 0;">
          Thank you for buying from U-shop!
      </p>
  `;
  console.log("Cart cleared:", cart);
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
         <div class="cart-item">
         <img src="${item.image}" alt="${item.name}">
         <span class="item-name">${item.name }  </span>
         <span class="item-price">$${item.price } x ${item.quantity } = <b>$${item.totalPrice }</b></span>
         <button onclick="removeFromCart('${item.name}')" class="remove-btn">Remove</button>
         </div>`;
        cartItemsContainer.appendChild(cartItem);
        total += item.totalPrice;
    });
    cartTotalContainer.innerHTML = `Total: $${total}`;
}
document.getElementById('search-button').addEventListener('click', function () {
  const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
  const items = document.querySelectorAll('.shop-section .box');

  items.forEach(item => {
      const itemName = item.getAttribute('data-name').toLowerCase();
      if (itemName.includes(searchInput)) {
          item.style.display = 'block'; 
      } else {
          item.style.display = 'none'; 
      }
  });
});


document.getElementById('search-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
      document.getElementById('search-button').click();
  }
});
function showWorkingMessage(button) {
   
    const messageElement = document.getElementById('workingMessage');
    messageElement.style.display = 'block'; 
    
    
    setTimeout(() => {
        messageElement.style.display = 'none'; 
    }, 3000); 
}







