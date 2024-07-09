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
  resetForm();  // Reset the form when the modal is validated
}


//Functions to verify user data

// Function to verify age 
function validateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  //Removes one year to age if the user is not 18 yet
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18) {
    return "Vous devez avoir plus de 18 ans";
  }
  if (age > 130) {
    return "Veuillez renseigner un age valide";
  }
  
}

// Function to verify email is valid
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}

// Function to verify names contain only letters
function isValidName(name) {
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'-]+$/;
  return nameRegex.test(name);
}

// Check the validity of user data
btnSubmit.addEventListener("click", function(event) {
  event.preventDefault();
  clearError();

  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.querySelector('input[name="location"]:checked');
  const termsAccepted = document.getElementById("checkbox1").checked;
  const subscribeEvents = document.getElementById("checkbox2").checked;
  
  let validForm = true;

  if (firstName.length < 2 || !isValidName(firstName)) {
    showError(document.getElementById("first"), "Votre prénom doit contenir au moins deux caractères et uniquement des lettres");
    validForm = false;
  }

  if (lastName.length < 2 || !isValidName(lastName)) {
    showError(document.getElementById("last"), "Votre nom doit contenir au moins deux caractères et uniquement des lettres");
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
  } else {
    const ageValidationMessage = validateAge(birthdate);
    if (ageValidationMessage) {
      showError(document.getElementById("birthdate"), ageValidationMessage);
      validForm = false;
    }
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
    console.log({
      firstName: firstName,
      lastName ,
      email: email,
      age: birthdate,
      location: location.value,
      nombreDeTournoi: quantity,
      termsAccepted,
    });
    showSuccessMessage();
  }
});


// Clear any previous error messages 
function clearError() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());
}

// Display error message if user data is invalid
function showError(input, message) {
  const error = document.createElement("p");
  error.innerHTML = message;
  error.className = "error-message";
  error.style.color = "red";
  error.style.fontSize = "14px";
  input.parentElement.appendChild(error);
}


// Function to display success message after form submission

function showSuccessMessage() {
  // Hide any remaining form elements
  const form= document.querySelector("body > main > div.bground > div > div > form");
  form.style.display="none";

  const modalContent = modalbg.querySelector(".content");

  // Create success message element
  const successMessage = document.createElement("p");
  successMessage.innerHTML = "Merci pour<br/>votre inscription";
  successMessage.className = "success-message";
  successMessage.style.color = "white";
  successMessage.style.fontSize = "20px";
  successMessage.style.textAlign = "center";
  successMessage.style.marginTop = "200px";
  modalContent.appendChild(successMessage);

  // Add margin between message and button
  const margin = document.createElement("div");
  margin.style.height = "40px"; 
  modalContent.appendChild(margin);

  // Create close button element
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "Fermer";
  closeButton.className = "btn-submit"; // Using the same class as the "C'est parti" button
  closeButton.style.marginTop = "230px"; 
  closeButton.style.marginBottom = "20px"
  closeButton.style.display = "block"; 
  modalContent.appendChild(closeButton);

  // Add click event listener to close the modal
    closeButton.addEventListener("click", function(event) {
    event.preventDefault();
    hideModal();
    resetForm();  // Reset the form fields when the modal is closed
    form.style.display = "block";
    successMessage.remove();
    closeButton.remove();
  });
}


// Function to hide the modal
function hideModal() {
  modalbg.style.display = "none";
}

// Function to reset the form fields
function resetForm() {
  document.getElementById("first").value = "";
  document.getElementById("last").value = "";
  document.getElementById("email").value = "";
  document.getElementById("birthdate").value = "";
  document.getElementById("quantity").value = "";
  const locationRadios = document.querySelectorAll('input[name="location"]');
  locationRadios.forEach(radio => radio.checked = false);
  document.getElementById("checkbox1").checked = false;
  document.getElementById("checkbox2").checked = false;

  formData.forEach(element => {
    element.style.display = "block";
  });
}




