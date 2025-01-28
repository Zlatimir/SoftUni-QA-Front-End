function addItem() {
    let text = document.getElementById('newItemText').value;
    let value = document.getElementById('newItemValue').value;
    let newElement = document.createElement('option');
    newElement.textContent = text;
    newElement.value = value;
    document.getElementById('menu').appendChild(newElement);
    document.getElementById('newItemText').value = '';
    document.getElementById('newItemValue').value = '';
}