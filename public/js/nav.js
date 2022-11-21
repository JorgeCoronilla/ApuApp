const goToCart = document.getElementById('goToCart')

goToCart.addEventListener('click', ()=>{
    let cart = JSON.parse(localStorage.getItem('cart'))
    window.location.assign(`/cart/${cart}`)
});