// Get elements from the DOM
const addFieldButton = document.getElementById("add-field");
const removeFieldButton = document.getElementById("remove-field");
const fieldsContainer = document.getElementById("fields-container");
const sumResult = document.getElementById("sum");
const averageResult = document.getElementById("average");
const minResult = document.getElementById("min");
const maxResult = document.getElementById("max");

// Add initial input fields
addInputField();

// Function to calculate statistics
function calculateStatistics() {
  const inputFields = document.querySelectorAll(".input-field");
  const values = [];

  inputFields.forEach((field) => {
    if (field.value !== "") {
      values.push(parseFloat(field.value));
    }
  });

  if (values.length > 0) {
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    sumResult.textContent = sum;
    averageResult.textContent = average.toFixed(2);
    minResult.textContent = min;
    maxResult.textContent = max;
  } else {
    sumResult.textContent = 0;
    averageResult.textContent = 0;
    minResult.textContent = 0;
    maxResult.textContent = 0;
  }
}

// Event listener to add a new input field
addFieldButton.addEventListener("click", addInputField);

// Event listener to update statistics when input values change
fieldsContainer.addEventListener("input", calculateStatistics);

// Event listener to remove a new input field
removeFieldButton.addEventListener("click", removeInputField);

// Function to add a new input field
function addInputField() {
  const inputField = document.createElement("input");
  inputField.type = "number";
  inputField.className = "input-field";
  fieldsContainer.appendChild(inputField);
}

// Function to remove a new input field, but only if it's empty and there is at least one input field
function removeInputField() {
  const inputFields = document.querySelectorAll(".input-field");
  const lastInputField = inputFields[inputFields.length - 1];
  if (inputFields.length > 0 && lastInputField.value === "") {
    fieldsContainer.removeChild(lastInputField);
  }
}

// Disadvatage is that it's not possible to remove any input field, only the last one
// Julia Kućmierczyk
