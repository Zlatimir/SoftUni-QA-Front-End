function create(words) {
   for (const element of words) {
      let elementDiv = document.createElement('div');
      let elementP = document.createElement('p');
      elementP.textContent = element;
      elementP.style.display = 'none';
      elementDiv.appendChild(elementP);
      elementDiv.addEventListener('click', function () {
         elementP.style.display = 'block';
      });
      document.getElementById('content').appendChild(elementDiv);
      
      
   }

}