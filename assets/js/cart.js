function checkAll() {
    let checkboxs = document.getElementsByName("cart-check");
    let checkAll = document.getElementById("check-all");
    let subtotal = document.getElementById("subtotal");
    let total = document.getElementById("total");
    let shippingFee = document.getElementById("shippingFee");

    if(checkAll.checked == true) {
        for(let checkbox of checkboxs) {
            checkbox.checked = true;
        }
    }
    else {
        for(let checkbox of checkboxs) {
            checkbox.checked = false;
        }
    }

    subtotal.textContent = "PHP 17534.00"
    total.textContent = "PHP 17534.00"
    shippingFee.textContent = "PHP 50.00"
}