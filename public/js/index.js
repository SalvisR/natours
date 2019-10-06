/* eslint-disable */
import '@babel/polyfill';
import {
  login,
  logout
} from './login';
import {
  displayMap
} from './mapbox';
import {
  updateSettings
} from './updateSettings';
import {
  bookTour
} from './stripe'

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userSettingsForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');

// VALUES
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordCurrent = document.getElementById('password-current');
const passwordConfirm = document.getElementById('password-confirm');
const name = document.getElementById('name');
const photo = document.getElementById('photo');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    login(email.value, password.value);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

// Update name, email, photo
if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();

    // For photo
    const form = new FormData();
    form.append('name', name.value);
    form.append('email', email.value);
    form.append('photo', photo.files[0]);

    updateSettings(form, 'data');
  });
}

// Update passwrord
if (userSettingsForm) {
  userSettingsForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.querySelector('.btn--save-password');
    btn.textContent = 'Updating...';
    await updateSettings({
      passwordCurrent: passwordCurrent.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value
    }, 'password');

    passwordCurrent.value = '';
    password.value = '';
    passwordConfirm.value = '';
    btn.textContent = 'Save password';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const {
      tourId
    } = e.target.dataset;
    bookTour(tourId)
  });
}
