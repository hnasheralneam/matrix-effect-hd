let characterList = "Α, α, Β, β, Γ, γ, Δ, δ, Ε, ε, Ζ, ζ, Η, η, Θ, θ, Ι, ι, Κ, κ, Λ, λ, Μ, μ, Ν, ν, Ξ, ξ, Ο, ο, Π, π, Ρ, ρ, Σ, σ, ς, Τ, τ, Υ, υ, Φ, φ, Χ, χ, Ψ, ψ, Ω, ω".split(", ");
print(characterList);

let columns = 90;
let rows = 30;

let pageHeight = window.innerHeight;
rows = Math.floor(pageHeight / 20) + 1;

document.body.style.display = "grid";
document.body.style.gridTemplateColumns = `repeat(${columns}, 1ch)`;

// generate columns
for (let i = 0; i < columns; i++) {
   let columnElement = document.createElement("div");
   columnElement.width = "1ch";
   document.body.appendChild(columnElement);
   // generate characters
   let charOpacity = Math.random();
   let opacityDiff = 0.04;
   let fading = false;
   for (let j = 0; j < rows; j++) {
      if (fading)
         charOpacity -= opacityDiff;
      else
         charOpacity += opacityDiff;

      if (charOpacity < -0.1)
         fading = false;
      else if (charOpacity > 1)
         fading = true;

      let charElement = document.createElement("p");
      charElement.textContent = randomCharacter();
      charElement.style.opacity = charOpacity;
      columnElement.appendChild(charElement);

      // let startCharChange = setTimeout(() => {
      //    let changeChar = setInterval(() => {
      //       charElement.textContent = randomCharacter();
      //    }, 2500);
      // }, Math.random() * 1000);
   }


   // Movement
   let transitionSpeed = 400;
   let movementSpeed = Math.random() * 1000 // + transitionSpeed;
   let moveDown = setInterval(() => {
      columnElement.style.transition = `transform ${movementSpeed}ms linear`;
      columnElement.style.transform = `translateY(20px)`;
      setTimeout(() => {
         columnElement.style.transition = `0s`;
         columnElement.style.transform = `translateY(0)`;
         moveCharToTop();
      }, movementSpeed);
   }, movementSpeed - 20);

   function moveCharToTop() {
      let lastChar = columnElement.lastChild;
      columnElement.removeChild(lastChar);
      columnElement.insertBefore(lastChar, columnElement.firstChild);
   }
}

function randomCharacter() { 
   return characterList[Math.floor(Math.random() * characterList.length)];
}