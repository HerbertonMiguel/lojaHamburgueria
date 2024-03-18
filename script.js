const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];


// abrir modal do carrinho
cartBtn.addEventListener("click", function(){
    cartModal.style.display="flex"
})

// clicando fora do modal fecha
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display="none"
    }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display="none"
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        //adicionar no carrinho
        addToCart(name,price)

    }
    
})

// função adicionar no carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name) //find = a buscar

    if(existingItem){
        //se o item existe, aumenta a quantidade + 1
        existingItem.quantity += 1;
        
    }else{
        cart.push({
            name,
            price,
            quantity:1
        })
    }

updateCartModal()    
}

//atualiza carrinho


function updateCartModal(){
    cartItemsContainer.innerHTML = ""
    let total = 0;

    cart.forEach(item =>{
        const cartItemeLEMENT = document.createElement("div")
    })
}