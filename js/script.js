//focusing on the 'Name' field
const labelName = document.getElementById('name');
labelName.focus();
const checkbox = document.getElementsByTagName("input[type=checkbox]");
const label = document.querySelector('label');
const fieldset = document.querySelector('fieldset');
//"Job Role"
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
//unless 'other' is selected under the Jobe Role drop down menu,   the other job role input should be hiden.
otherJobRole.style.display = 'none';

//event listner to check for any change. When there is a change detected, the the conditional is activated. If the user specifically selects 'other', then the other-job input appears. If not, then it remains hiden.
jobRole.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    otherJobRole.style.display = 'block';
  } else {
    otherJobRole.style.display = 'none';
  }
});

//T-Shirt Info section
const tDesign = document.getElementById('design');
const tColor = document.getElementById('color');
const colorOptions = document.getElementById('color').children;
tColor.disabled = 'true';


tDesign.addEventListener('change', (e) => {
  tColor.disabled = false;

  for (i = 0; i < colorOptions.length; i++) {
    const designValue = e.target.value;
    const dataTheme = colorOptions[i].getAttribute('data-theme');

    if (designValue === dataTheme) {
      colorOptions[i].hidden = false;
      colorOptions[i].setAttribute('selected', true);
    } else if (designValue !== dataTheme) {
      colorOptions[i].hidden = true;
      colorOptions[i].removeAttribute('selected');
    }
  }

});


//Register for Activities section:

const registerActivities = document.getElementById('activities');
let activitiesCost = document.getElementById('activities-cost');
let actCheckboxes = document.querySelectorAll('.activities-box input');
let totalCost = 0;

registerActivities.addEventListener('change', (e) => {
  let dataCost = e.target.getAttribute('data-cost');
  dataCost = parseInt(dataCost);

  if (e.target.checked) {
    totalCost += dataCost;
  } else {
    totalCost -= dataCost;
  }


  activitiesCost.innerHTML = `Total: $${totalCost}`;

});


//Payment info section:
const payWith = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');
//credit card is the default option
payWith[1].selected = true;

payPal.style.display = 'none';
bitCoin.style.display = 'none';



payWith.addEventListener('change', (e) => {
  if (e.target.value === 'paypal') {
    payPal.style.display = 'block';
    creditCard.style.display = 'none';
    bitCoin.style.display = 'none';
  }
  if (e.target.value === 'bitcoin') {
    bitCoin.style.display = 'block';
    creditCard.style.display = 'none';
    payPal.style.display = 'none';
  }
  if (e.target.value === 'credit-card') {
    creditCard.style.display = 'block';
    payPal.style.display = 'none';
    bitCoin.style.display = 'none';
  }

});

//Form Validation:
const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipcode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector("form");


//Functions for 'form validation'
function nameValidator() {
  let nameField = labelName.value;
  let nameTest = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if (nameField === '') {
    labelName.parentNode.classList.add('not-valid');
    labelName.parentElement.lastElementChild.style.display = 'block';
  } else {
    labelName.parentNode.classList.replace('not-valid', 'valid');
    return true;
  }
}

function emailValidator() {
  let emailField = email.value;
  let emailTest = /^[^@]+@[^@.]+\.[a-z]+$/i;
  if (!emailTest.test(emailField)) {
    email.parentNode.classList.add('not-valid');
    email.parentElement.lastElementChild.style.display = 'block';
  } else {
    email.parentNode.classList.replace('not-valid', 'valid');
    return true;
  }
}

function ccValidation() {
  let ccField = cardNumber.value;
  let ccTest = /^\d{13,16}$/;
  if (!ccTest.test(ccField)) {
    cardNumber.parentNode.classList.add('not-valid');
    cardNumber.parentElement.lastElementChild.style.display = 'block';
  } else {
    cardNumber.parentNode.classList.replace('not-valid', 'valid');
    return true;
  }
}

function zipValidator() {
  let zipcodeField = zipcode.value;
  let zipCodeTest = /^\d{5}$/;
  if (!zipCodeTest.test(zipcodeField)) {
    zipcode.parentNode.classList.add('not-valid');
    zipcode.parentElement.lastElementChild.style.display = 'block';
  } else {
    zipcode.parentNode.classList.replace('not-valid', 'valid');
    return true;
  }
}

function cvvValidator() {
  let cvvField = cvv.value;
  let cvvTest = /^\d{3}$/;
  if (!cvvTest.test(cvvField)) {
    cvv.parentNode.classList.add('not-valid');
    cvv.parentElement.lastElementChild.style.display = 'block';
  } else {
    cvv.parentNode.classList.replace('not-valid', 'valid');
    return true;
  }
}

function activitiesValidator() {
  if (totalCost === 0) {
    registerActivities.classList.add('not-valid');
    registerActivities.lastElementChild.style.display = 'block';

  } else {
    registerActivities.classList.replace('not-valid', 'valid');
    return true;
  }
}

form.addEventListener('submit', (e) => {

  if (!nameValidator()) {
    e.preventDefault();
  }
  if (!emailValidator()) {
    e.preventDefault();
  }
  if (!activitiesValidator()) {
    e.preventDefault();
  }
  if (payWith.value === 'credit-card') {
    if (!ccValidation()) {
      e.preventDefault();
    }
    if (!zipValidator()) {
      e.preventDefault();
    }
    if (!cvvValidator()) {
      e.preventDefault();
    }
  }


});

//Accessibility

for (let i = 0; i < actCheckboxes.length; i++) {
  actCheckboxes[i].addEventListener('focus', (e) => {
    actCheckboxes[i].parentNode.classList.add('focus');
  });
  actCheckboxes[i].addEventListener('blur', (e) => {
    actCheckboxes[i].parentNode.classList.remove('focus');
  });

}
