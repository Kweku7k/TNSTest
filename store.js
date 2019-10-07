var tItems = [];

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
   else{
    ready()

}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('remove-item')
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++){ 
        var button = removeCartItemButtons[i]
        button.addEventListener('click',removeCartItem)
    } 
        
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++){ 
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
}
    var addToCartButtons = document.getElementsByClassName('addcart')
    for (var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}


function removeCartItem(event){
    var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.parentElement.remove()
            updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    // var tItems = [];
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    // console.log(shopItem)
    var itemContent = shopItem.getElementsByClassName('content')[0]
    var title = itemContent.getElementsByClassName('title')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imgsrc = shopItem.getElementsByClassName('image-1')[0].src
    console.log(title, price, imgsrc)
    tItems.push(title, price)
    console.log(tItems)
    addItemToCart(title, price)
    updateCartTotal()
    
}




function addItemToCart(title, price){
var cartRow = document.createElement('div')
var cartItemContainer = document.getElementsByClassName('store-items')[0]
// var cartItems = document.getElementsByClassName('store-items')[0]
var cartItemNames = cartItemContainer.getElementsByClassName('item-name')
 for (var i=0; i < cartItemNames.length; i++){
     if (cartItemNames[i].innerText == title)
     {
         alert ("This item is already added to the cart ")
         return;
     }
 }
var cartRowContents = `
<div class="row">
<div class="item-image" >
<img src="img/cart.png">
                  </div>
                  <div class="item-name" style="width: 40%; font-size: 20px; padding-top: 15px;">
                  ${title}
                  </div>
                  <input class="cart-quantity-input" type="number" value="1" style="height:9%; width: 7%; vertical-align: middle;">
                  <div class="right-control" style="width: 20%; text-align: right;">
                  <div class="remove-item">
                    <i class="fa fa-minus-circle fa-2x"></i>
                  </div>
                  <div class="item-price">
                    <small class="text-muted price">${price}</small> 
                    </div>
                    
                  </div>`
// var storeItems = document.
cartRow.innerHTML = cartRowContents
cartItemContainer.append(cartRow)
cartRow.getElementsByClassName('remove-item')[0].addEventListener('click',removeCartItem)
cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

// function addItemToCart(title){
// var cartRow = document.createElement('div')
// cartRow.innerText = title
// var cartItems = document.getElementsByClassName('store-items')[0]
// // cartItems.append(cartRow)
// console.log(cartItems)                  
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('store-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('row')
    var total = 0;
    for (var i = 0; i < cartRows.length; i++){ 
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price =parseFloat( priceElement.innerText.replace('Ghc',''))
        var quantity = quantityElement.value
        total = total + (price*quantity)
    }
    total = Math.round(total * 100)/100
    document.getElementsByClassName('total-price')[0].innerText = 'Ghc'+total
}