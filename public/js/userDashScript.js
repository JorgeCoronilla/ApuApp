//Botones Edit Data
const buttonEdit = document.getElementById('uD_edit_data');
const buttonSave = document.getElementById('uD_save_data');
const input = document.querySelectorAll('.user_data');
var values = [];

//Botones Edit Password
const editPassword = document.getElementById('uD_edit_password')
const savePassword = document.getElementById('uD_save_password')

const password = document.getElementById('password')
const oldPassword = document.querySelector('input[name="password"').value
const repeatOldPassword = document.querySelector('input[name="old_password"')
const newPassword = document.querySelector('input[name="user_pass"')


//Botones Edit Data
buttonEdit.addEventListener('click', () => {
    input.forEach(element => {
        element.removeAttribute("readonly");
    });

    if (buttonEdit.value == 'Editar') {
        buttonEdit.value = 'Cancelar'
        buttonSave.style.display = 'flex';
        input.forEach(element => {
            values.push(element.value);
        })
    } else {
        buttonEdit.value = 'Editar';
        buttonSave.style.display = 'none';
        input.forEach((element, index) => {
            element.value = values[index];
            element.setAttribute("readonly", 'readonly');
        });
        values = [];
    }
});

buttonSave.addEventListener('click', () => {
    buttonEdit.value = 'Editar';
    buttonSave.style.display = 'none';
    input.forEach(element => {
        element.setAttribute("readonly", 'readonly');
    });
})

//Botones Edit Password
editPassword.addEventListener('click', () => {
    if (editPassword.value == 'Cambiar') {
        editPassword.value = 'Cancelar'
        password.style.display = 'none';
        repeatOldPassword.style.display = 'flex';
        newPassword.style.display = 'flex';
        savePassword.style.display = 'flex';
    } else {
        editPassword.value = 'Cambiar';
        password.style.display = 'flex';
        repeatOldPassword.style.display = 'none';
        newPassword.style.display = 'none';
        savePassword.style.display = 'none';
    }
});

savePassword.addEventListener('click', () => {
    if (repeatOldPassword.value != oldPassword) {
        alert('contraseña incorrecta')
    } else if (repeatOldPassword.value == newPassword.value) {
        alert('Las antigua contraseña no puede ser igual a la nueva')
    } else {
        repeatOldPassword.setAttribute('disabled', 'disabled')
        alert('Cambio de contraseña realizado')
    }
});


//Hide New Password TIMERS
newPassword.addEventListener('focus', () => {
    newPassword.setAttribute('type', 'text')
    setTimeout(() => {
        newPassword.setAttribute('type', 'password')
    }, 1500);
})
newPassword.addEventListener('blur', () => {
    setTimeout(() => {
        newPassword.setAttribute('type', 'password')
    }, 1000);
})
newPassword.addEventListener('keypress', () => {
    newPassword.setAttribute('type', 'text')
    setTimeout(() => {
        newPassword.setAttribute('type', 'password')
    }, 1500);
})
