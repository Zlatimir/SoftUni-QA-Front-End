window.addEventListener("load", solve);

function solve() {
    const purchaseBtn = document.querySelector('#purchase-btn');
    const numTickets = document.querySelector('#num-tickets');
    const seatPref = document.querySelector('#seating-preference');
    const name = document.querySelector('#full-name');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone-number');

    const preview = document.querySelector('#ticket-preview');

    purchaseBtn.addEventListener('click', function () {
        if (numTickets.value === '' || seatPref.value === '' || name.value === '' || email.value === '' || phone.value === '') {
            alert('Please fill out all fields');
        } else {
            purchaseBtn.disabled = true;
            preview.style.display = 'block';
            document.querySelector('#purchase-num-tickets').textContent = numTickets.value;
            numTickets.value = '';
            document.querySelector('#purchase-seating-preference').textContent = seatPref.value;
            seatPref.value = '';
            document.querySelector('#purchase-full-name').textContent = name.value;
            name.value = '';
            document.querySelector('#purchase-email').textContent = email.value;
            email.value = '';
            document.querySelector('#purchase-phone-number').textContent = phone.value;
            phone.value = '';
        }
    });

    const editBtn = document.querySelector('#edit-btn');

    editBtn.addEventListener('click', function () {
        numTickets.value = document.querySelector('#purchase-num-tickets').textContent;
        seatPref.value = document.querySelector('#purchase-seating-preference').textContent;
        name.value = document.querySelector('#purchase-full-name').textContent;
        email.value = document.querySelector('#purchase-email').textContent;
        phone.value = document.querySelector('#purchase-phone-number').textContent;
        purchaseBtn.disabled = false;
        preview.style.display = 'none';

    });

    const buyBtn = document.querySelector('#buy-btn');
    const success = document.querySelector('#purchase-success');

    buyBtn.addEventListener('click', function () {
        success.style.display = 'block';
        preview.style.display = 'none';
    });

    const backBtn = document.querySelector('#back-btn');

    backBtn.addEventListener('click', function () {
        success.style.display = 'none';
        purchaseBtn.disabled = false;
    });
}