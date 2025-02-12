window.addEventListener('load', solve);

function solve() {
    let carModelElement = document.getElementById("car-model");
    let carYearElement = document.getElementById("car-year");
    let partNameElement = document.getElementById("part-name");
    let partNumberElement = document.getElementById("part-number");
    let conditionElement = document.getElementById("condition");

    let partInfoElement = document.getElementById("part-info");
    let infoCarModelElement = document.getElementById("info-car-model");
    let infoCarYearElement = document.getElementById("info-car-year");
    let infoPartNameElement = document.getElementById("info-part-name");
    let infoPartNumberElement = document.getElementById("info-part-number");
    let infoConditionElement = document.getElementById("info-condition");

    let confirmOrderElement = document.getElementById("confirm-order");

    let nextButtonElement = document.getElementById("next-btn");
    nextButtonElement.addEventListener("click", funNext);

    function funNext() {
        let carModel = carModelElement.value;
        let carYear = Number(carYearElement.value);
        let partName = partNameElement.value;
        let partNumber = Number(partNumberElement.value);
        let condition = conditionElement.value;
        let yearNow = Number(new Date().getFullYear());

        if (carModel === "" || carYear < 1990 || carYear > yearNow || partName === "" || partNumber < 1 || condition === "") {
            return;
        }
        infoCarModelElement.textContent = carModel;
        infoCarYearElement.textContent = carYear;
        infoPartNameElement.textContent = partName;
        infoPartNumberElement.textContent = partNumber;
        infoConditionElement.textContent = condition;

        partInfoElement.style.display = "block";
        nextButtonElement.disabled = true;

        carModelElement.value = "";
        carYearElement.value = "";
        partNameElement.value = "";
        partNumberElement.value = "";
        conditionElement.value = "";
    }

    let editButtonElement = document.getElementById("edit-btn");
    editButtonElement.addEventListener("click", funEdit);

    function funEdit() {
        carModelElement.value = infoCarModelElement.textContent;
        carYearElement.value = infoCarYearElement.textContent;
        partNameElement.value = infoPartNameElement.textContent;
        partNumberElement.value = infoPartNumberElement.textContent;
        conditionElement.value = infoConditionElement.textContent;
        partInfoElement.style.display = "none";
        nextButtonElement.disabled = false;
    }

    let confirmButtonElement = document.getElementById("confirm-btn");
    confirmButtonElement.addEventListener("click", funConfirm);

    function funConfirm(){        
        confirmOrderElement.style.display = "block";
        partInfoElement.style.display = "none";
    }

    let newOrderButton = document.getElementById("new-btn");
    newOrderButton.addEventListener("click", funNewOrder);

    function funNewOrder(){
        confirmOrderElement.style.display = "none";
        nextButtonElement.disabled = false;
    }
};




