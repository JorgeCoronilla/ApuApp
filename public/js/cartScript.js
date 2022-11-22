const buyButton = document.getElementById('buyButton')
buyButton.addEventListener('click', ()=>{
    let admin = localStorage.getItem('admin')
    if(admin == true){
        window.location.assign(`/adminpay`)
    }else{
        window.location.assign(`/userpay`)
    }
})