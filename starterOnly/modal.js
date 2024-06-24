function editNav(){
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const btnSubmit= document.querySelector(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


const validForm=false;

//Display error message
function showError(input, message) {
  const error = document.createElement("p");
  error.innerHTML = message;
  error.className = "error-message";
  error.style.color = "red";
  error.style.fontSize = "14px"; // Set the font size to 11px
  input.parentElement.appendChild(error);
  console.log(" show error");

}

//Clear error message
function clearError() {
  
    //Clear any previous error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => msg.remove());
    console.log("I clean error"); 
 
}


function atLeast18(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}



// Add event listener to the "btn-submit" button
btnSubmit.addEventListener("click", function(event) {

  event.preventDefault();

    clearError();

    const firstName= document.getElementById("first").value;
    const lastName= document.getElementById("last").value;
    const email= document.getElementById("email").value;
    const birthdate= document.getElementById("birthdate").value;
    const quantity= document.getElementById("quantity").value;
    const location= document.querySelector('input[name="location"]:checked');
    const termsAccepted= document.getElementById("checkbox1").checked;
    const subscribeEvents= document.getElementById("checkbox2").checked;

  
    let validForm = true;

    if (firstName.length < 2) {
      showError(document.getElementById("first"), "Votre prénom doit contenir au moins deux caractères");
      validForm = false;
    }
  
    if (lastName.length < 2) {
      showError(document.getElementById("last"), "Votre nom doit contenir au moins deux caractères");
      validForm = false;
    }
  
    if (email === "") {
      showError(document.getElementById("email"), "Veuillez renseigner votre email");
      validForm = false;
    } else if (!isValidEmail(email)) {
      showError(document.getElementById("email"), "Veuillez renseigner un email valide");
      validForm = false;
    }
  
    if (birthdate === "") {
      showError(document.getElementById("birthdate"), "Veuillez renseigner votre date de naissance");
      validForm = false;
    } else if (!atLeast18(birthdate)) {
      showError(document.getElementById("birthdate"), "Vous devez avoir au moins 18 ans pour participer");
      validForm = false;
    }
  
    if (quantity === "") {
      showError(document.getElementById("quantity"), "Veuillez remplir tous les champs");
      validForm = false;
    }
  
    if (location === null) {
      showError(document.querySelector('input[name="location"]'), "Veuillez selectionner un tournoi");
      validForm = false;
    }

    if (!termsAccepted) {
      showError(document.getElementById("checkbox1"), "Veuillez accepter les conditions d'utilisation");
      validForm = false;
    }
  
    if (validForm) {
      showSuccessMessage();
    }
  });




