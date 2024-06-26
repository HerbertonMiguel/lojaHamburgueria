const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

// abrir modal do carrinho
cartBtn.addEventListener("click", function () {
  cartModal.style.display = "flex";
});

// clicando fora do modal fecha
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    //adicionar no carrinho
    addToCart(name, price);
  }
});

// função adicionar no carrinho
function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name); //find = a buscar

  if (existingItem) {
    //se o item existe, aumenta a quantidade + 1
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModal();
  // Atualiza o contador do carrinho
  cartCounter.innerText = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

//atualiza carrinho
function updateCartModal() {
  // Seu código de atualização do carrinho aqui...
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.innerHTML = `
        
         <div class="flex items-center justify-between">
             <div>
                 <p class="font-medium">${item.name}</p>
                 <p>Qtd:${item.quantity}</p>
                 <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
             </div>

           
                 <button class="remove-from-cart-btn" data-name="${item.name}">
                     Remover
                 </button>

        </div>
             
         `;

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCounter.innerHTML = cart.length;
  // Após atualizar o carrinho, salve no localStorage
  saveCartToLocalStorage();
}

function updateCartModal() {
  // Seu código de atualização do carrinho aqui...
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.innerHTML = `
        
         <div class="flex items-center justify-between">
             <div>
                 <p class="font-medium">${item.name}</p>
                 <p>Qtd:${item.quantity}</p>
                 <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
             </div>

           
                 <button class="remove-from-cart-btn" data-name="${item.name}">
                     Remover
                 </button>

        </div>
             
         `;

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCounter.innerHTML = cart.length;
  // Após atualizar o carrinho, salve no localStorage
  saveCartToLocalStorage();
}

// Chama a função para carregar o carrinho do localStorage quando a página carregar
window.addEventListener('load', loadCartFromLocalStorage);
  

// função para remover item do carrinho

cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");

    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }

    cart.splice(index, 1);
    updateCartModal();
  }
}

addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
});

// finalizar carrinho

checkoutBtn.addEventListener("click", function () {
  const isOpen = checkRestaurantOpen();
  if (!isOpen) {
    alert("RESTAURANTE FECHADO NO  MOMENTO");
    return;
  }

  if (cart.length === 0) return;
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }

  // envia  o pedido para API whats
  const cartItems = cart
    .map((item) => {
      return `
            ${item.name}
            Quantidade:(${item.quantity})
            Preço: R$${item.price}
            `;
    })
    .join("");

  const message = encodeURIComponent(cartItems);
  const phone = "5584987064895";

  window.open(
    `https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`,
    "_blank"
  );
});

// verifica a hora e manipula card horario
function checkRestaurantOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 08 && hora < 22;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-600");
} else {
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
}


// Função para salvar o carrinho no localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}









  
 
