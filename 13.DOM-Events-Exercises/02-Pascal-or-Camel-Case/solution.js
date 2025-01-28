function solve() {
  let text = document.getElementById('text').value;
  let namingConvention = document.getElementById('naming-convention').value;
  let result = text.toLowerCase();
  switch (namingConvention) {
    case 'Camel Case':
      result = result.split(' ').map((word, index) => index !== 0 ? word[0].toUpperCase() + word.slice(1) : word).join('');
      break;
    case 'Pascal Case':
      result = result.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join('');
      break;
    default:
      result = 'Error!';
      break;
  }
  document.getElementById('result').textContent = result;
}