const unsubscribe = document.getElementById('unsubscribe');
const select_unsubscribe = document.getElementById('select_unsubscribe');
const sure_to_unsubscribe = document.getElementById('sure_to_unsubscribe');

unsubscribe.addEventListener('click', ()=>{
    select_unsubscribe.style.display = 'none';
    sure_to_unsubscribe.style.display = 'flex';
})