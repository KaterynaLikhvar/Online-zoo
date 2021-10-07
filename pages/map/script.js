const mapImg = document.getElementById('map');
const wrapper = document.getElementById('map-container');
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const btnZoomOut = document.getElementById('zoomOut');
const btnZoomIn = document.getElementById('zoomIn');

let count = 1;

let topIndent = 0;
let leftIndent = 0;

function calculateCoords(e, elem) {
  let box = elem.getBoundingClientRect();
  topIndent = e.pageY - box.top + scrollX;
  leftIndent = e.pageX - box.left + scrollY;
};
const moveAt = (e) => {
  mapImg.style.left = e.pageX - leftIndent + 'px';
  mapImg.style.top = e.pageY - topIndent + 'px';
};

const stopDrag = () => {
  document.removeEventListener('mousemove', moveAt);
  mapImg.removeEventListener('mouseup', stopDrag);
}

mapImg.addEventListener('mousedown', (e) => {

  calculateCoords(e, mapImg);
  moveAt(e);

  document.addEventListener('mousemove', moveAt);
  mapImg.addEventListener('mouseup', stopDrag);
});

mapImg.ondragstart = function() {
  return false;
};

header.addEventListener('mouseover', stopDrag);
footer.addEventListener('mouseover', stopDrag);

btnZoomOut.addEventListener('click', () => {
  if (count <= 1) return;
  count -= 0.2;
  mapImg.style.transform = `scale(${count})`;
});
btnZoomIn.addEventListener('click', () => {
  if (count >= 2) return;
  count += 0.2;
  mapImg.style.transform = `scale(${count})`;
  console.log(count);
});

// ----------------------POP-UP-----------------------------------------------------------
const cover = document.getElementById('cover');
const feedback = document.getElementById('feedback');
const donateInfo = document.getElementById('donate-info');
const donateCard = document.getElementById('donate-card');

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