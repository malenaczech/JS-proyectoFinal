const cards = document.getElementById('fragances')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCart = document.getElementById('template-cart').content
const footer = document.getElementById('footer-carrito')
const items = document.getElementById('items')
let cart = {}
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => { 
    getData()
    if (localStorage.getItem('carrito')){
        cart = JSON.parse(localStorage.getItem('carrito'))
        showCart()
    }
})

cards.addEventListener('click', e => { addCart(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })

const getData = async () => {
    const res = await fetch('../data-base/fragance.json');
    const data = await res.json()
    // console.log(data)
    makeCards(data)
}


const makeCards = data => {
    data.forEach(item => {
        templateCard.querySelector('.card_img').setAttribute("src", item.img)
        templateCard.querySelector('.card_brand').textContent = item.brand
        templateCard.querySelector('.card_name').textContent = item.name
        templateCard.querySelector('.card_price').textContent = item.price
        templateCard.querySelector('button').dataset.id = item.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

// Agregar al cart
const addCart = e => {
    if (e.target.classList.contains('card_btn')){
        setCart(e.target.parentElement)
    }
e.stopPropagation()
}


const setCart = item => {
    // console.log(item)
    const product = {
        brand: item.querySelector('.card_brand').textContent,
        name: item.querySelector('.card_name').textContent,
        price: item.querySelector('.card_price').textContent,
        id: item.querySelector('.card_btn').dataset.id,
        amount: 1
    }
    //console.log(product)
    if (cart.hasOwnProperty(product.id)) {
        product.amount = cart[product.id].amount + 1
    }
    cart[product.id] = {...product}
    console.log(cart)
    showCart()
    }

    const showCart = () => {
        items.innerHTML = ''
        Object.values(cart).forEach(product => {
            templateCart.querySelector('.cart_id').textContent = product.id
            templateCart.querySelector('.cart_brand').textContent = product.brand
            templateCart.querySelector('.cart_name').textContent = product.name
            templateCart.querySelector('.cart_amount').textContent = product.amount
            templateCart.querySelector('.cart_price').textContent = product.price * product.amount
            //botones
            templateCart.querySelector('.btn-info').dataset.id = product.id
            templateCart.querySelector('.btn-danger').dataset.id = product.id
            const clone = templateCart.cloneNode(true)
            fragment.appendChild(clone)
        })
        items.appendChild(fragment)
        showFooter()
        localStorage.setItem('carrito', JSON.stringify(cart))
    }
    
    const showFooter = () => {
        footer.innerHTML = ''
        if (Object.keys(cart).length === 0) {
            footer.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío</th>
            `
            return
        }
        // sumar amount y sumar totales
        new Calculate(itemAmount, finalPrice)
        // console.log(nPrecio)
        templateFooter.querySelector('.foot_amount').textContent = nAmount
        templateFooter.querySelector('.foot_total').textContent = nPrice
        const clone = templateFooter.cloneNode(true)
        fragment.appendChild(clone)
        footer.appendChild(fragment)
        const boton = document.querySelector('#empty-cart')
        boton.addEventListener('click', () => {
            cart = {}
            showCart()
        })
    }
    
    

    const btnAumentarDisminuir = e => {
        console.log (e.target)
        if (e.target.classList.contains('btn-info')) {
            const product = cart[e.target.dataset.id]
            product.amount++
            cart[e.target.dataset.id] = {...product}
            showCart()
        }
        if (e.target.classList.contains('btn-danger')) {
            const producto = cart[e.target.dataset.id]
            producto.amount--
            if (producto.amount === 0) {
                delete cart[e.target.dataset.id]
            } else {
                cart[e.target.dataset.id] = {...producto}
            }
            showCart()
        }
        e.stopPropagation()
    }