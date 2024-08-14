// character lists
let characterList = "Α, α, Β, β, Γ, γ, Δ, δ, Ε, ε, Ζ, ζ, Η, η, Θ, θ, Ι, ι, Κ, κ, Λ, λ, Μ, μ, Ν, ν, Ξ, ξ, Ο, ο, Π, π, Ρ, ρ, Σ, σ, ς, Τ, τ, Υ, υ, Φ, φ, Χ, χ, Ψ, ψ, Ω, ω".split(", ");
let russian = "б, в, г, д, ж, з, к, л, м, н, п, р, с, т, ф, х, ц, ч, ш, щ, а, е, ё, и, о, у, ы, э, ю, я, й, ъ, ь".split(", ")
let emojiList = "🍔, 🦅, 🇺🇸, 🛻".split(", ");


let matrixElement = document.querySelector(".matrix");

// variables
let animationSpeedMultiplier = 400;
let charSpacing = -1;
let opacityDiff = 0.04;

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

   matrixElement.style.display = "grid";
   matrixElement.style.gridTemplateColumns = `repeat(${columns}, 1ch)`;
}

function generateColumns() {
   matrixElement.innerHTML = "";
   for (let i = 0; i < columns; i++) {
      let columnElement = document.createElement("div");
      columnElement.width = "1ch";
      matrixElement.appendChild(columnElement);
      // generate characters
      let charOpacity = Math.random();
      for (let j = 0; j < rows; j++) {
         charOpacity += opacityDiff;

         if (charOpacity > 1){
            charOpacity = charSpacing;
}
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


// edit mode
let editElement = document.querySelector(".edit");
document.querySelector(".toggle-edit").addEventListener("click", () => {
   if (editElement.style.visibility === "visible")
      editElement.style.visibility = "hidden";
   else 
      editElement.style.visibility = "visible";
});

let speedSlider = document.querySelector("#speed-slider");
// let spacingSlider = document.querySelector("#spacing-slider");
// let trailSlider = document.querySelector("#length-slider");

speedSlider.value = animationSpeedMultiplier;
// spacingSlider.value = charSpacing;

speedSlider.addEventListener("change", () => {
   animationSpeedMultiplier = speedSlider.value;
   generateColumns();
});

// spacingSlider.addEventListener("change", () => {
//    // charSpacing = spacingSlider.value;
//    generateColumns();
// });

// trailSlider.addEventListener("change", () => {
//    console.log(trailSlider.value);
//    opacityDiff = trailSlider.value;
//    generateColumns();
// });