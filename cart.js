window.addEventListener('scroll', function() {
    var header2 = document.querySelector('.header2');
    var distanceFromTop = window.scrollY;
  
    if (distanceFromTop > 350) {
      header2.style.top = '0';
    } else {
      header2.style.top = '-100px';
    }
  });

const tBody = document.getElementById("tBody")
const table2 = document.getElementById("table2")
let cart

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"))
} else {
    cart = []
    localStorage.setItem("cart", JSON.stringify(cart))
}

const renderUI = (items) => {
    tBody.innerHTML = ""
    let subtotal = 0
    for (let i = 0; i < items.length; i++) {
        tBody.innerHTML += `
            <tr>
                <td class="x">
                    <button onclick="deleteFromCart(${items[i].id})">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </td>
                <td class="td"><img width="86px" src="${items[i].item.image}"/>${items[i].item.name}</td>
                <td class="num">$${items[i].item.price}</td>
                <td>
                    <div class="quan">
                        <div class="quan__left">
                            Quantity
                        </div>
                        <div class="quan__right">
                            <button onclick="reduceFromCart(${items[i].item.id})"><i class="fa-solid fa-caret-left"></i></button>${items[i].count}<button onclick="addToCart(${items[i].item.id})"><i class="fa-solid fa-caret-right"></i></button>
                        </div>
                    </div>
                </td>
                <td class="num">$${items[i].totalPrice}</td>
            </tr>
        `
        subtotal += items[i].totalPrice
    }

    table2.innerHTML = ""
    for (let i = 0; i < items.length; i++) {
        table2.innerHTML = `
        <tr>
            <td class="head">SUBTOTAL</td>
            <td class="desc">$${subtotal}</td>
        </tr>
        <tr>
            <td class="head">SHIPPING</td>
            <td class="desc">Enter your address to view shipping options. <br> Calculate shipping</td>
        </tr>
        <tr>
            <td class="head">TOTAL</td>
            <td style="font-weight:bold" class="desc">$${subtotal}</td>
        </tr>
        `
    }

    const cartTotal = document.getElementById("cartTotal")
    cartTotal.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> CART ($${subtotal})`
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
                renderUI(cart)
            }
            else {
                cartTarget.count++
                cartTarget.totalPrice = cartTarget.price * cartTarget.count
                localStorage.setItem("cart", JSON.stringify(cart))
                renderUI(cart)
            }
        })
}

const reduceFromCart = (id) => {
    let target = cart.find((x) => x.item.id == id)
    if (target.count > 1) {
        target.count--
        target.totalPrice = target.count * target.price
        localStorage.setItem("cart", JSON.stringify(cart))
        renderUI(cart)
    } else {
        const indexOftarget = cart.indexOf(target)
        cart.splice(indexOftarget, 1)
        localStorage.setItem("cart", JSON.stringify(cart))
        renderUI(cart)
    }
}

const deleteFromCart = (id) => {
    const target = cart.find(x => x.id == id)
    const indexOfTarget = cart.indexOf(target)
    cart.splice(indexOfTarget, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    renderUI(cart)
}

renderUI(cart)