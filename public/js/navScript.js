const goToCart = document.getElementById('goToCart')

goToCart.addEventListener('click', ()=>{
    let cart = JSON.parse(localStorage.getItem('cart'))
    
    if(cart.length != 0){
        window.location.assign(`/cart/${cart}`)
    }else{
        console.log('click')
        window.location.assign(`/shop`)
    }
});