const buttonEdit = document.getElementById('uD_edit_data')
const input = document.querySelectorAll('input[type="text"]')

buttonEdit.addEventListener('click', () => {
    input.forEach(element => {
        element.removeAttribute("readonly");
    });

    if (buttonEdit.value == 'Editar') {
        buttonEdit.value = 'Cancelar'
        var values = [];
        input.forEach(element => {
            values.push(element.value)
        })
        console.log(values)
    } else {
        buttonEdit.value = 'Editar';
        input.forEach(element => {
            element.setAttribute("readonly", 'readonly');
            // element.value = values[index]
        });
    }
})