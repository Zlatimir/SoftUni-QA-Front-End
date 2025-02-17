window.addEventListener("load", solve);

function solve() {
    let roomSizeInput = document.getElementById("room-size");
    let timeSlotInput = document.getElementById("time-slot");
    let fullNameInput = document.getElementById("full-name");
    let emailInput = document.getElementById("email");
    let phoneInput = document.getElementById("phone-number");

    let preview = document.getElementById("preview");

    let roomSizePreview = document.getElementById("preview-room-size");
    let timeSlotPreview = document.getElementById("preview-time-slot");
    let fullNamePreview = document.getElementById("preview-full-name");
    let emailPreview = document.getElementById("preview-email");
    let phonePreview = document.getElementById("preview-phone-number");

    let confirm = document.getElementById("confirmation");

    let bookRoomButton = document.getElementById("book-btn");
    bookRoomButton.addEventListener("click", onBook);

    function onBook() {
        let roomSize = roomSizeInput.value;
        let timeSlot = timeSlotInput.value;
        let fullName = fullNameInput.value;
        let email = emailInput.value;
        let phone = phoneInput.value;

        if (roomSize === "" || timeSlot === "" || fullName === "" || email === "" || phone === "") {
            return;
        };

        preview.style.display = "block";

        roomSizePreview.textContent = roomSize;
        timeSlotPreview.textContent = timeSlot;
        fullNamePreview.textContent = fullName;
        emailPreview.textContent = email;
        phonePreview.textContent = phone;

        roomSizeInput.value = "";
        timeSlotInput.value = "";
        fullNameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";

        bookRoomButton.disabled = true;
    };

    let editButton = document.getElementById("edit-btn");
    editButton.addEventListener("click", onEdit);

    function onEdit() {
        roomSizeInput.value = roomSizePreview.textContent;
        timeSlotInput.value = timeSlotPreview.textContent;
        fullNameInput.value = fullNamePreview.textContent;
        emailInput.value = emailPreview.textContent;
        phoneInput.value = phonePreview.textContent;

        preview.style.display = "none";

        bookRoomButton.disabled = false;
    };

    let confirmButton = document.getElementById("confirm-btn");
    confirmButton.addEventListener("click", onConfirm);

    function onConfirm() {
        preview.style.display = "none";
        confirm.style.display = "block";
    };

    let backButton = document.getElementById("back-btn");
    backButton.addEventListener("click", onBack);

    function onBack(){
        confirm.style.display = "none";
        bookRoomButton.disabled = false;
    };
};
