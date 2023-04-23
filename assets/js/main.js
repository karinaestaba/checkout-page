(function(){
  document.querySelectorAll("button.btn-subs").forEach(
    buttonItem => {
      buttonItem.addEventListener("click", event => {
        const inputItem = buttonItem.parentNode.querySelector("input[type=number]")
          inputItem.stepDown()
          inputItem.dispatchEvent( new Event("change"));
      })
    }
  );

  document.querySelectorAll("button.btn-add").forEach(
    buttonItem => {
      buttonItem.addEventListener("click", event => {
        buttonItem.parentNode.querySelector("input[type=number]").stepUp();
        const inputItem = buttonItem.parentNode.querySelector("input[type=number]")
          inputItem.stepUp()
          inputItem.dispatchEvent( new Event("change"));
      })
    }
  );

  document.querySelectorAll(".cart-item-quantity").forEach(
    inputItem => {
      inputItem.addEventListener("change", event => {
        recalculateAmounts();
      });
    }
  )
  
  document.getElementById("submitFormBtn").addEventListener("click", event =>{
    const checkoutForm = document.getElementById("checkoutForm");
    document.body.classList.remove("show-error");
    
    if(!checkoutForm.checkValidity()){
      document.body.classList.add("show-error");
    }else{
      document.body.classList.add("show-success");
      setTimeout(() => {
        document.body.classList.remove("show-success");
        checkoutForm.submit();
      }, 1000);
    }
  });
})();

function parseToFloat(amount){
  return parseFloat(amount.match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g).join());
}

function recalculateAmounts(){
  const cartItems = document.querySelectorAll(".cart-list .cart-item");
  let cartTotalAmount = 0;
  let cartShippingAmount = parseToFloat(document.getElementById("cartShippingAmount").innerText) ?? 0;
  cartItems.forEach(item => {
    let price = parseToFloat(item.querySelector(".cart-new-price").innerText);
    let quantity = parseInt(item.querySelector(".cart-item-quantity").value);

    if(price > 0 && quantity > 0){
      cartTotalAmount += (price * quantity);
    }
  });

  document.getElementById("cartTotalAmount").innerHTML = `$${parseFloat(cartTotalAmount + cartShippingAmount).toFixed(2)}`;
}