import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const formElements = Object.fromEntries(
  [...form.elements].map(el => [el.name, el])
);
let formData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

const saveFormData = throttle(({ target: { name, value } }) => {
  formData[name] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

const handleSubmit = e => {
  e.preventDefault();
  localStorage.removeItem('feedback-form-state');
  form.reset();
  console.log(formData);
  formData = {};
};

form.addEventListener('input', saveFormData);
form.addEventListener('submit', handleSubmit);

Object.entries(formData).forEach(([name, value]) => {
  formElements[name].value = value;
});
