function addCart(product, rate, img) {
    alert("Product is added to your Cart!");
    var item = {
      product: product,
      img: img,
      rate: rate,
      qty: 1
    };

    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    chCart();
    chTotal();
  }


  function chCart() {
    var cartElement = document.getElementById("cart-rem");
    cartElement.innerHTML = "";
    var carts = JSON.parse(localStorage.getItem("cart")) || [];
    carts.forEach(function(item, index) {
      var cart_s = document.createElement("div");
      cart_s.classList.add("col-md-2", "mb-4");

      var innerHTML = `
        <div class="cartproduct">
            <img src="../Images/${item.img}" alt="Loading" class="img">
            <div class="product-details">
              <h3 class="cart-title">${item.product}</h3>
              <p class="cart-cost">Price: ₹ ${item.rate}</p>
              <input type="number" min="1" placeholder="Quantity" class="qty" data-index="${index}" value="${item.qty}">
              <div class="t">
                <button class="delete" data-index="${index}">Delete</button>
              </div>
            </div>
        </div>
      `;


      cart_s.innerHTML = innerHTML;
      cartElement.appendChild(cart_s);
    });

    lis();
    chTotal();
  }


  function lis() {
    var q = document.querySelectorAll(".qty");
    q.forEach(function(input) {
      input.addEventListener("change", handleQuantityChange);
    });

    var del = document.querySelectorAll(".delete");
    del.forEach(function(button) {
      button.addEventListener("click", handleDelete);
    });
  }


  function handleQuantityChange(event) {
    var index = event.target.dataset.index;
    var newQuantity = parseInt(event.target.value);
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cart.length) {
      cart[index].qty = newQuantity;

      localStorage.setItem("cart", JSON.stringify(cart));
      chTotal();
    }
  }


  function handleDelete(event) {
    var index = event.target.dataset.index;
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      chCart();
      chTotal();
    }
  }


  function chTotal() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var total = 0;
    cart.forEach(function(item) {
      total += item.rate * item.qty;
    });
    var totalElement = document.getElementById("cost");
    totalElement.textContent = "₹"+total;
  }

  window.addEventListener("load", function() {
    chCart();
  });

  function Order() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
      alert("Your order has been placed!Refresh your page");
      localStorage.removeItem("cart");
    } else {
      alert("Your Cart has no item!!!");
    } 
  }