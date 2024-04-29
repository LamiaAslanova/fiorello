window.addEventListener('scroll', function() {
  var header2 = document.querySelector('.header2');
  var distanceFromTop = window.scrollY;

  if (distanceFromTop > 700) {
    header2.style.top = '0';
  } else {
    header2.style.top = '-100px';
  }
});

let cart

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"))
} else {
  cart = []
  localStorage.setItem("cart", JSON.stringify(cart))
}

const addToCart = (id) => {
  fetch("http://localhost:3000/flowers")
    .then((response) => response.json())
    .then((data) => {
      const cartTarget = cart.find((x) => x.item.id == id)
      if (!cartTarget) {
        const target = data.find((y) => y.id == id)
        let newCartItem = {
          item: target,
          count: 1,
          price: target.price,
          totalPrice: target.price
        }
        cart.push(newCartItem)
        localStorage.setItem("cart", JSON.stringify(cart))
      }
      else {
        cartTarget.count++
        cartTarget.totalPrice = cartTarget.price * cartTarget.count
        localStorage.setItem("cart", JSON.stringify(cart))
      }
    })
}

fetch("http://localhost:3000/flowers")
  .then((response) => response.json())
  .then((data) => {
    const renderUI = (items) => {
      const cards = document.getElementById("cards")
      cards.innerHTML = ""
      for (let i = 0; i < items.length; i++) {
        cards.innerHTML += `
        <div class="col-3">
        <div class="card">
                <img src="${items[i].image}" alt="">
                <h5>${items[i].name}</h5>
                <a onclick="addToCart(${items[i].id})" href="#" id="add">Add to cart</a>
                <p class="price">$${items[i].price}</p>
                </div>
                </div>
                `
      }
    }
    renderUI(data)
  })