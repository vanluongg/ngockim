function onclickRegister() {
    if (checkFormValidation() == true && getLisItemsFromLocal().length > 0) {
        alert('Registration successful!');
    }
    if (getLisItemsFromLocal().length == 0) {
        alert('Giỏ hàng trống!');
    }
}

function checkFormValidation() {
    if (checkFormEmpty() == false || checkEmail() == false || checkPhoneNumber() == false) {
        showErrorEmail();
        showErrorPhoneNumber();       
        return false;
    } else {
        return true;
    }
}

function checkFormEmpty() {
    var check = true;

    // b1: truy cập tất cả các nodeInput muốn check notEmpty -> list nodeInput
    var listNodeInput = document.querySelectorAll('input[notEmpty]');

    // b2: lấy dữ liệu trong nodeInput
    for (let i = 0; i < listNodeInput.length; i++) {
        var nodeInput = listNodeInput[i];
        var result = nodeInput.value;

        // b3: truy xuất tới nodeShowError
        var idNodeInput = nodeInput.getAttribute('id');
        var nodeShowError = getErrorNode(idNodeInput);

        // b4: nếu result = empty thì showError
        if (result == '' || result.length == 0) {
            var errContentNotEmpty = getErrorContentNotEmpty(nodeInput);
            nodeShowError.innerHTML = errContentNotEmpty;
            check = false;
        } else {
            nodeShowError.innerHTML = '';
        }
    }
    return check;
}

function getErrorNode(inputID) {
    var nodeShowError = document.querySelector('label.error[for=' + inputID + ']');
    return nodeShowError;
}

function getErrorContentNotEmpty(nodeInput) {
    var errContent = 'Please fill out this field!';
    if (nodeInput.hasAttribute('errContentNotEmpty')) {
        errContent = nodeInput.getAttribute('errContentNotEmpty');
    }
    return errContent;
}

function checkEmail() {
    var node = document.getElementById('email').value;
    var regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;

    return regex.test(node);
}

function showErrorEmail() {
    if (checkEmail() == false) {
        nodeInput = document.querySelector('input[regexEmail]');
        var idNodeInput = nodeInput.getAttribute('id');
        var nodeShowError = getErrorNode(idNodeInput);
        nodeShowError.innerHTML = 'Gmail is incorrect!';
        return false;
    } else {
        nodeShowError.innerHTML = '';
    }
    return true;
}

function checkPhoneNumber() {
    var node = document.getElementById('phone-number').value;
    var regex = /^[0]{1}[1-9]{1}[0-9]{8,9}$/;

    return regex.test(node);
}

function showErrorPhoneNumber() {
    if (checkPhoneNumber() == false) {
        nodeInput = document.querySelector('input[regexPhoneNumber]');
        var idNodeInput = nodeInput.getAttribute('id');
        var nodeShowError = getErrorNode(idNodeInput);
        nodeShowError.innerHTML = 'Phone number is incorrect!';
        return false;
    } else {
        nodeShowError.innerHTML = '';
    }
    return true;
}

function checkPass() {
    var nodePass1 = document.getElementById('pass1').value;
    var nodePass2 = document.getElementById('pass2').value;
    if (nodePass1 === nodePass2) {
        return true;
    }
    var nodeShowError = getErrorCheckPass().innerHTML = 'Password incorrect!';
    return false;
}

function getErrorCheckPass() {
    var nodeShowError = document.querySelector('label.error[for=pass2]');
    return nodeShowError;
}

function checkHandsome() {
    var check = document.getElementById('check-handsome').checked;
    if (check == true) {
        return true;
    }
    return false;
}
