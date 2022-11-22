const buyButton = document.getElementById('buyButton')
buyButton.addEventListener('click', ()=>{
    if(!localStorage.admin){
        window.location.assign(`/userpay`)
    }else{
        window.location.assign(`/adminpay`)
    }
})