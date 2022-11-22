const addToCart = document.querySelectorAll('.addToCart');
const goToCart = document.getElementById('goToCart');
var cart = []
window.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.cart == undefined){
        localStorage.setItem('cart', JSON.stringify(cart))
    }else{
        cart = JSON.parse(localStorage.getItem('cart'))
    }

    addToCart.forEach(element => {
        element.addEventListener('click', ()=>{
            cart.push(parseInt(element.dataset.id))
            // cart.push(separador)
            localStorage.setItem('cart', JSON.stringify(cart))

        })
    });
})

