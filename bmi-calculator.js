const form = document.querySelector('.calculator');
const unitInputs = document.querySelectorAll('input[name="units"]');
const metricFields = document.querySelector('.metric-fields');
const imperialFields = document.querySelector('.imperial-fields');
const welcomeResult = document.querySelector('.welcome-result');
const calculatedResult = document.querySelector('.calculated-result');
const errorMessage = document.querySelector('.form-error');

function selectedUnits() {
  return document.querySelector('input[name="units"]:checked').value;
}

function updateCalculator() {
  const metric = selectedUnits() === 'metric';
  metricFields.hidden = !metric;
  imperialFields.hidden = metric;
  errorMessage.hidden = true;
  welcomeResult.hidden = false;
  calculatedResult.hidden = true;
}

function calculateBMI() {
  const metric = selectedUnits() === 'metric';
  const heightCm = Number(document.querySelector('#height-cm').value);
  const weightKg = Number(document.querySelector('#weight-kg').value);
  const feet = Number(document.querySelector('#height-ft').value);
  const inches = Number(document.querySelector('#height-in').value);
  const weightLb = Number(document.querySelector('#weight-lb').value);
  const hasHeight = metric ? document.querySelector('#height-cm').value !== '' : (document.querySelector('#height-ft').value !== '' || document.querySelector('#height-in').value !== '');
  const hasWeight = metric ? document.querySelector('#weight-kg').value !== '' : document.querySelector('#weight-lb').value !== '';

  if (!hasHeight && !hasWeight) {
    errorMessage.hidden = true;
    welcomeResult.hidden = false;
    calculatedResult.hidden = true;
    return;
  }

  let bmi;
  if (metric) {
    const heightM = heightCm / 100;
    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return showError();
    bmi = weightKg / (heightM * heightM);
  } else {
    const totalInches = (feet * 12) + inches;
    if (!totalInches || !weightLb || totalInches <= 0 || weightLb <= 0 || inches < 0 || inches >= 12) return showError();
    bmi = 703 * weightLb / (totalInches * totalInches);
  }

  errorMessage.hidden = true;
  welcomeResult.hidden = true;
  calculatedResult.hidden = false;
  document.querySelector('#bmi-value').textContent = bmi.toFixed(1);

  let category;
  let context;
  if (bmi < 18.5) {
    category = 'Underweight';
    context = 'This is below the adult healthy weight range. BMI is a screening measure; a healthcare professional can help interpret it.';
  } else if (bmi < 25) {
    category = 'Healthy weight';
    context = 'This falls within the adult healthy weight range. BMI is one screening measure and does not describe overall health.';
  } else if (bmi < 30) {
    category = 'Overweight';
    context = 'This falls within the adult overweight range. BMI is a screening measure, not a diagnosis.';
  } else {
    category = 'Obesity';
    context = 'This falls within the adult obesity range. BMI is a screening measure, not a diagnosis.';
  }
  document.querySelector('#bmi-category').textContent = category;
  document.querySelector('#bmi-guidance').textContent = context;
}

function showError() {
  errorMessage.hidden = false;
  welcomeResult.hidden = false;
  calculatedResult.hidden = true;
}

unitInputs.forEach(input => input.addEventListener('change', updateCalculator));
form.querySelectorAll('input[type="number"]').forEach(input => input.addEventListener('input', calculateBMI));
