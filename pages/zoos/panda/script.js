const sideBtn = document.querySelector('.sidebar-btn');
const sidebar = document.querySelector('.sidebar');
const closeSidebar = document.querySelector('.sidebar-close-btn');

const showSidebar = () => {
  sidebar.classList.remove('hiddenMenu');
  sideBtn.style.display = "none";
  closeSidebar.style.display = 'block';
}
const hideSidebar = () => {
  sidebar.classList.add('hiddenMenu');
  sideBtn.style.display = 'block';
  closeSidebar.style.display = 'none';
}
sideBtn.addEventListener('click', showSidebar);
closeSidebar.addEventListener('click', hideSidebar);

//----------------------POP-UP-----------------------------------------------------------
const cover = document.getElementById('cover');
const feedback = document.getElementById('feedback');
const donateInfo = document.getElementById('donate-info');
const donateCard = document.getElementById('donate-card');

const feedbackBtn = document.querySelectorAll('.feedback-link');
const donateBtn = document.getElementsByName('footer_btn');
const feedBtn = document.querySelectorAll('.feedBtn');
const submitBtnFeedback = document.getElementById('feedback_btn');
const submitBtnNext = document.getElementById('donate-info_btn');
const submitBtnDonate = document.getElementById('card_btn');
const closeBtn = document.querySelectorAll('.close');

const nameForm = document.getElementById('nameF');
const emailForm = document.getElementById('emailF');
const textForm = document.getElementById('feedback-text');

const animalSelect = document.getElementById('animal');
const sumDonate = document.getElementById('amount');
const creditCardForm = document.querySelector('.card-front_form')

const cardNumber = document.getElementById('card_number');
const cardMonth = document.getElementById('card_month');
const cardYear = document.getElementById('card_year');
const cardCvc = document.getElementById('cvc');
const cardHolder = document.getElementById('card_owner');

const openFeedback = () => {
  cover.classList.remove('hidden');
  feedback.classList.remove('hidden');
  document.body.classList.add('notScrolling');
  window.scrollTo(0, 0);
}
const openDonate = () => {
  cover.classList.remove('hidden');
  donateInfo.classList.remove('hidden');
  document.body.classList.add('notScrolling');
  window.scrollTo(0, 0);
}

const openCard = () => {
  donateCard.classList.remove('hidden');
  document.body.classList.add('notScrolling');
  window.scrollTo(0, 0);
  if (!donateInfo.classList.contains('hidden')) {
          donateInfo.onclick = (elem) => {
            elem.preventDefault();
          }
        }
}

const closePopup = () => {
  cover.classList.add('hidden');
  feedback.classList.add('hidden');
  donateInfo.classList.add('hidden');
  donateCard.classList.add('hidden');
  document.body.classList.remove('notScrolling');
}
const validateDonate = () => {
  let selectedAnimal = animalSelect.value.length;
  if (
    selectedAnimal > 1 &&
    sumDonate.validity.valid) {
    submitBtnNext.classList.remove('invalid');
  } else {
    submitBtnNext.classList.add('invalid');
  }
}

const validate = () => {
  if (
    nameForm.validity.valid &&
    emailForm.validity.valid &&
    textForm.validity.valid
  ) {
    submitBtnFeedback.classList.remove('invalid');
  } else {
    submitBtnFeedback.classList.add('invalid');
  }
}
nameForm.addEventListener('input', () => {
  validate();
});

emailForm.addEventListener('input', () => {
  validate();
});

textForm.addEventListener('input', () => {
  validate();
});

animalSelect.addEventListener('input', () => {
  validateDonate();
});

sumDonate.addEventListener('input', () => {
  validateDonate();
});

//feedbackBtn.addEventListener('click', openFeedback);
feedbackBtn.forEach(item => item.addEventListener('click', openFeedback));
donateBtn.forEach(item => item.addEventListener('click', openDonate));
feedBtn.forEach(item => item.addEventListener('click', openDonate));

submitBtnFeedback.addEventListener('click', () => {
  if (submitBtnFeedback.classList.contains('invalid')) return;
  closePopup();
});

submitBtnNext.disabled = true;
donateInfo.addEventListener('input', () => {
  if (sumDonate.value.length > 0 && animalSelect.value.length > 1) {
    submitBtnNext.disabled = false;
    submitBtnNext.addEventListener('click', () => {
      if (submitBtnNext.classList.contains('invalid')) return;
      openCard();
      });
  }
});

submitBtnDonate.disabled = true;
creditCardForm.addEventListener('input', () => {
  //             1111111111111111
  if (
    cardNumber.value.length == 16 && 
    cardMonth.value.length == 2 &&
    cardYear.value.length == 2 &&
    cardCvc.value.length == 3 &&
    cardHolder.value.length > 0
    ) {
    submitBtnDonate.classList.remove('invalid');
    submitBtnDonate.disabled = false;
    submitBtnDonate.addEventListener('click', () => {
      if (submitBtnDonate.classList.contains('invalid')) return;
      closePopup();
      alert('Thanks for your support!');
      });
  }else {
    submitBtnDonate.classList.add('invalid');
  }
});

cover.addEventListener('click', closePopup);
closeBtn.forEach((item) => item.addEventListener('click', closePopup));

// ------------------------VIDEO--------------------------------------------------------------
const videoContent = document.querySelector('.small-video-wrapper');
const currentVideo = document.querySelector('.current-video')

const playVideo = (event) => {
  const videoItem = event.target.dataset.video;
  if (videoItem !== undefined){
    currentVideo.src = videoItem;
  }
}
videoContent.addEventListener('click', playVideo);

