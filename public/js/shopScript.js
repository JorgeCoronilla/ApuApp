const addToCart = document.querySelectorAll('.addToCart');
const goToCart = document.getElementById('goToCart');
var cart = []
window.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.cart == undefined){
        localStorage.setItem('cart', JSON.stringify(cart))
    }else{
        cart = JSON.parse(localStorage.getItem('cart'))
        console.log(cart)
    }

    addToCart.forEach(element => {
        element.addEventListener('click', ()=>{
            let separador = 0;
            cart.push(parseInt(element.dataset.id))
            // cart.push(separador)
            localStorage.setItem('cart', JSON.stringify(cart))
            console.log(cart)
        })
    });

    goToCart.addEventListener('click', ()=>{
        cart = JSON.parse(localStorage.getItem('cart'))
        window.location.assign(`/cart/${cart}`)
    });
})

