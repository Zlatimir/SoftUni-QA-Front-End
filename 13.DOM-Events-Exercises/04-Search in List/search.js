function search() {
   let text = document.getElementById("searchText").value;
   let matches = 0;
   let elements = document.querySelectorAll("#towns li");
   let result = document.getElementById("result");
   
   for (let element of elements) {
      if (text != '' && element.textContent.includes(text)) {
         element.style.fontWeight = "bold";
         element.style.textDecoration = "underline";
         matches++;
      } else {
         element.style.fontWeight = "";
         element.style.textDecoration = "";
      }
   }
   result.textContent = `${matches} matches found`;
}
