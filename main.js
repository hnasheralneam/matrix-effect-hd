// character lists
let characterList = "Α, α, Β, β, Γ, γ, Δ, δ, Ε, ε, Ζ, ζ, Η, η, Θ, θ, Ι, ι, Κ, κ, Λ, λ, Μ, μ, Ν, ν, Ξ, ξ, Ο, ο, Π, π, Ρ, ρ, Σ, σ, ς, Τ, τ, Υ, υ, Φ, φ, Χ, χ, Ψ, ψ, Ω, ω".split(", ");
let emojiList = "🍔, 🦅, 🇺🇸, 🛻".split(", ");


// variables
let animationSpeedMultiplier = 400;
let charSpacing = -1;


// grids and columns
let columns;
let rows;




setColumnsAndRows();
generateColumns();

window.addEventListener("resize", () => {
   setColumnsAndRows();
   generateColumns();
});



function setColumnsAndRows() {
   let pageHeight = window.innerHeight;
   rows = Math.floor(pageHeight / 20) + 1;
   let columnNumber = Math.floor(window.innerWidth / 11.7);
   columns = columnNumber;

   document.body.style.display = "grid";
   document.body.style.gridTemplateColumns = `repeat(${columns}, 1ch)`;
}

function generateColumns() {
   document.body.innerHTML = "";
   for (let i = 0; i < columns; i++) {
      let columnElement = document.createElement("div");
      columnElement.width = "1ch";
      document.body.appendChild(columnElement);
      // generate characters
      let charOpacity = Math.random();
      let opacityDiff = 0.04;
      for (let j = 0; j < rows; j++) {
         charOpacity += opacityDiff;

         if (charOpacity > 1)
            charOpacity = charSpacing;

         let charElement = document.createElement("p");
         charElement.textContent = randomCharacter();
         charElement.style.opacity = charOpacity;
         columnElement.appendChild(charElement);

         // let startCharChange = setTimeout(() => {
         //    let changeChar = setInterval(() => {
         //       charElement.textContent = randomCharacter();
         //    }, 1500);
         // }, Math.random() * 200);
      }


      // Movement
      let animationSpeed = Math.random() * animationSpeedMultiplier;
      let moveDown = setInterval(() => {
         columnElement.style.transform = `translateY(20px)`;
         setTimeout(() => {
            columnElement.style.transform = `translateY(0)`;
            moveCharToTop();
         }, animationSpeed);
      }, animationSpeed);

      function moveCharToTop() {
         let lastChar = columnElement.lastChild;
         columnElement.removeChild(lastChar);
         columnElement.insertBefore(lastChar, columnElement.firstChild);
      }
   }
}

function randomCharacter() { 
   return characterList[Math.floor(Math.random() * characterList.length)];
}