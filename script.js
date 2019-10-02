//Task 15 //
//Javascript code for functionality of the store // 




var ShoppingCart = (function($) {
  "use strict";
  
  // Cahce necesarry DOM Elements
  var productsEl = document.querySelector(".products"),
      cartEl =     document.querySelector(".shopping-cart-list"),
      productQuantityEl = document.querySelector(".product-quantity"),
      emptyCartEl = document.querySelector(".empty-cart-btn"),
      cartCheckoutEl = document.querySelector(".cart-checkout"),
      totalPriceEl = document.querySelector(".total-price");
  
  // Fake JSON data array here should be API call
  var products = [
    {
      id: 0,
      name: "iPhone 6S",
      description: "Apple iPhone 5s 16GB CPO - Space Grey",
      imageUrl: "https://news.naijatechguide.com/wp-content/uploads/2019/05/8d908bc6-e4ad-4846-96f2-1ae0b223675e_1.9ed55c048eb7e564099f3cda06939fe2.jpeg",
      price: 799
    },
    {
      id: 1,
      name: "iPhone 5S",
      description: "Apple iPhone 5s 16GB CPO - Space Grey.",
      imageUrl: "https://i5.walmartimages.com/asr/927a1469-d20c-4603-9569-d3fb973467bb_1.5b3d4a5fba8e6d98a830ee521521fc5b.jpeg",
      price: 349,
    },
    {
      id: 2,
      name: "Macbook",
      description: "12-inch MacBook 1.2GHz dual-core m3 256GB - Silver.",
      imageUrl: "https://assets.pcmag.com/media/images/509156-macbook-pro-2018-1.jpg?width=810&height=456",
      price: 1499
    },
    {
      id: 3,
      name: "Macbook Air",
      description: "12-inch MacBook 1.3GHz dual-core i5 512GB - Space Grey.",
      imageUrl: "https://cdn2.shopify.com/s/files/1/0201/2674/products/MacBook_Case_in_Crystal_Clear_AIR_96adcf25-a70d-4f6f-91b9-f1173a787238_360x.jpg?v=1550792898",
      price: 999
    },
    {
      id: 4,
      name: "Macbook Air 2013",
      description: "12-inch MacBook 1.3GHz dual-core i5 512GB - Silver.",
      imageUrl: "https://www.myistore.co.za/media/catalog/product/cache/1/image/1600x/9df78eab33525d08d6e5fb8d27136e95/m/b/mb-sgry-front_2.png",
      price: 599
    },
    {
      id: 5,
      name: "Macbook Air 2012",
      description: "12-inch MacBook 1.2GHz dual-core m3 256GB - Space Grey.",
      imageUrl: "https://powerbite.co.za/wp-content/uploads/2019/04/Macbook-air-47.jpg",
      price: 499
    },
  ],
      productsInCart = []; // Product in cart variable when the cart is still empty //
  
  // Function that generate the list of product in the cart //
  var generateProductList = function() {
    products.forEach(function(item) {
      var productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `<div class="product-image">
                                <img src="${item.imageUrl}" alt="${item.name}">
                             </div>
                             <div class="product-name"><span>Product:</span> ${item.name}</div>
                             <div class="product-description"><span>Description:</span> ${item.description}</div>
                             <div class="product-price"><span>Price:</span> ${item.price} </div>
                             <div class="product-add-to-cart">
                               
                               <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                             </div>
                          </div>
`;
                             
productsEl.appendChild(productEl);    // Appending productE1 variable which is the div //
    });
  }
  
  // Like one before and I have also used ES6 template strings
  var generateCartList = function() {
    
    cartEl.innerHTML = "";
    
    productsInCart.forEach(function(item) {
      var li = document.createElement("li");
      li.innerHTML = `${item.quantity} ${item.product.name} - R${item.product.price * item.quantity}`;
      cartEl.appendChild(li);
    });
    
    productQuantityEl.innerHTML = productsInCart.length;
    
    generateCartButtons()
  }
  

  var tranport = prompt("If you would like your stuff to be delivered to your house press 1 if not press 2 ");
  
  // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
  var generateCartButtons = function() {
    if(productsInCart.length > 0) {
      emptyCartEl.style.display = "block";
      cartCheckoutEl.style.display = "block";
      if(tranport==1){                                                                                    
      totalPriceEl.innerHTML = "R " + Number(calculateTotalPrice() + 100 + (calculateTotalPrice()*0.14)).toFixed(2)
    }
      else if (tranport ==2){
        totalPriceEl.innerHTML = "R " + Number(calculateTotalPrice() + (calculateTotalPrice()*0.14)).toFixed(2)
    };


    } else {
      emptyCartEl.style.display = "none";
      cartCheckoutEl.style.display = "none";
    }
  }
  
  // Setting up listeners for click event on all products and Empty Cart button as well
  var setupListeners = function() {
    productsEl.addEventListener("click", function(event) {
      var el = event.target;
      if(el.classList.contains("add-to-cart")) {
       var elId = el.dataset.id;
       addToCart(elId);
      }
    });
    
    emptyCartEl.addEventListener("click", function(event) {
      if(confirm("Are you sure?")) {
        productsInCart = [];
      }
      generateCartList();
    });
  }

  
  // Adds new items or updates existing one in productsInCart array
  var addToCart = function(id) {
    var obj = products[id];
    if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
      productsInCart.push({product: obj, quantity: 1});
    } else {
      productsInCart.forEach(function(item) {
        if(item.product.id === obj.id) {
          item.quantity++;
        }
      });
    }
    generateCartList();
  }
  
  
  // This function checks if project is already in productsInCart array
  var productFound = function(productId) {
    return productsInCart.find(function(item) {
      return item.product.id === productId;
    });
  }

  var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
      return total + (item.product.price *  item.quantity);
    }, 0);
  }
  
  // This functon starts the whole application
  var init = function() {
    generateProductList();
    setupListeners();
  }
  
  // Exposes just init function to public, everything else is private
  return {
    init: init
  };
  
  // I have included jQuery although I haven't used it
} )(jQuery);

ShoppingCart.init();




function myFunction() {
  var num =document.getElementById("sub").innerHTML;
  alert("Thank, you your order is successful and your reference  is"+ Math.random());
}



