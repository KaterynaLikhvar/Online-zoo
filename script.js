// ----------------------Carousel PETS IN ZOO-----------------------------------------------------------
const gap = 20;
const carousel = document.getElementById('carousel'),
      content = document.getElementById('carousel-content'),
      slides = document.querySelectorAll('.carousel-item'),
      next = document.getElementById('next'),
      prev = document.getElementById('prev');

let slideIndex = 0;

let width = carousel.offsetWidth;
let imgWidth = document.querySelector('.carousel-img').offsetWidth;
window.addEventListener('resize', (e) => {
  width = carousel.offsetWidth;
  imgWidth = document.querySelector('img').offsetWidth;
});

next.addEventListener('click', e => {
  content.style.transition = 'transform .3s ease-in-out';
  slideIndex >= 4 ? false : slideIndex++;
  content.style.transform = 'translateX(' + (-slideIndex * (imgWidth + gap) + 'px');
  
  jumpUp();
});

prev.addEventListener('click', e => {
  content.style.transition = 'transform .3s ease-in-out';
  slideIndex <= 0 ? false : slideIndex--;
  content.style.transform = 'translateX(' + (-slideIndex * (imgWidth + gap) + 'px');
  jumpDown()
});

function jumpUp() {
  content.addEventListener('transitionend', () => {
      if (slideIndex > 3) {
        slideIndex = 0;
      } 
      else {
        slideIndex;
      }
    content.style.transition = 'none';
    content.style.transform = 'translateX(' + (-slideIndex * (imgWidth + gap) + 'px');
  })
}
function jumpDown() {
  content.addEventListener('transitionend', () => {
      if (slideIndex < 1) {
        slideIndex = 4;
      }
       slideIndex;
    content.style.transition = 'none';
    content.style.transform = 'translateX(' + (-slideIndex * (imgWidth + gap) + 'px');
  })
}
// ----------------------POP-UP-----------------------------------------------------------
const cover = document.getElementById('cover');
const feedback = document.getElementById('feedback');
const donateInfo = document.getElementById('donate-info');
const donateCard = document.getElementById('donate-card');

// const feedbackBtn = document.getElementById('testimonials-btn');
const feedbackBtn = document.querySelectorAll('.feedback-link');
const donateBtn = document.getElementsByName('footer_btn')
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



// -------------Carousel HOW IT WORKS---------------------------------------------
const state = {};
const carouselList = document.querySelector('.roundabout-list');
const carouselItems = document.querySelectorAll('.roundabout-item');
const elems = Array.from(carouselItems);

carouselList.addEventListener('click', function (event) {
  var newActive = event.target.closest('.roundabout-item');
  if (!newActive) {
    return;
  };
  update(newActive);
});

const update = function(newActive) {
  const newActivePos = newActive.dataset.pos;

  const current = elems.find((elem) => elem.dataset.pos == 0);
  const prevPic = elems.find((elem) => elem.dataset.pos == -1);
  const nextPic = elems.find((elem) => elem.dataset.pos == 1);
  const firstPic = elems.find((elem) => elem.dataset.pos == -2);
  const lastPic = elems.find((elem) => elem.dataset.pos == 2);
  
  current.classList.remove('roundabout-item_active');
  
  [current, prevPic, nextPic, firstPic, lastPic].forEach(item => {
    var itemPos = item.dataset.pos;

    item.dataset.pos = getPos(itemPos, newActivePos)
  });
};

const getPos = function (current, active) {
  const diff = current - active;

  if (Math.abs(current - active) > 2) {
    return -current;
  }
  return diff;
}