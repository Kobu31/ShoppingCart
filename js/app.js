
const addCarrito = document.querySelectorAll('.addToCart');

  addCarrito.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
  });
  
  const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');
  
  const comprarButton = document.querySelector('.comprarButton');
  comprarButton.addEventListener('click', comprarButtonClicked);
  
  function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.img-container');
    const gTitle = item.querySelector('.gTitle').textContent;
    const price = item.querySelector('.price').textContent;
    const imgproductos = item.querySelector('.img-productos').src;
  
    addItemToShoppingCart(gTitle, price, imgproductos);
  }

  function addItemToShoppingCart(gTitle, price, imgproductos){
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
      );
      for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === gTitle) {
          let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
          elementQuantity.value++;
          $('.toast').toast('show');
          updateShoppingCartTotal();
          return;
        }
      }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent =`<div class="row shoppingCartItem">
    <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <img src='${imgproductos}' class="shopping-cart-image">
            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${gTitle}
            </h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 shoppingCartItemPrice">${price}</p>
        </div>
    </div>
    <div class="col-4">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                value="1">
            <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
    </div>
</div>`;

 shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}


  function updateShoppingCartTotal(){
    let total =0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}
function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
  }
  
  function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
  }
  
  function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
  }
  


   //toasty que todavia no anda

  /* function toasty(){
    Toastify({
      Text: "Agregado al carrito!",
      duration: 3000,
    }).showToast;
  } */

  let titleCarrito =localStorage.getItem('titleCarrito');
  let priceCarrito =localStorage.getItem('priceCarrito');
  let imgCarrito =localStorage.getItem('imgCarrito');

  /* document.getElementById('titleJuego').textContent = titleJuego;
  document.getElementById('priceJuego').textContent = priceJuego;;
  document.querySelector('#imgJuego').src = imgJuego; */

  function guardarCarrito(){
   let titleCarrito = document.getElementById('titleJuego').textContent;
   let priceCarrito = document.getElementById('priceJuego').textContent;
 /*   let imgCarrito = document.querySelector('#imgJuego').src; */
    localStorage.setItem('title', titleCarrito);
    localStorage.setItem('price', priceCarrito);
    localStorage.setItem('img', imgCarrito);
  }