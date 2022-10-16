const slides = document.querySelectorAll('.slider__item');
const promoCards = document.querySelectorAll('.promo-card');
const sliderRadioButtons = document.querySelectorAll('.slider__radio-field');
const promoSection = document.querySelector('.promo');
const sliderButtonNext = document.querySelector('.slider__button--next');
const sliderButtonPrevious = document.querySelector('.slider__button--previous');

const nextSlideOn = function () {
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('slider__item--active')) {
      if (i === slides.length - 1) {
        slides[i].classList.remove('slider__item--active');
        slides[0].classList.add('slider__item--active');
        promoSection.style.backgroundColor = window.getComputedStyle(promoCards[0]).backgroundColor;
        sliderRadioButtons[0].checked = true;
        return;
      }
      slides[i].classList.remove('slider__item--active');
      slides[i+1].classList.add('slider__item--active');
      promoSection.style.backgroundColor = window.getComputedStyle(promoCards[i+1]).backgroundColor;
      sliderRadioButtons[i+1].checked = true;
      return;
    }
  }
};

const previousSlideOn = function () {
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('slider__item--active')) {
      if (i === 0) {
        slides[i].classList.remove('slider__item--active');
        slides[slides.length - 1].classList.add('slider__item--active');
        promoSection.style.backgroundColor = window.getComputedStyle(promoCards[slides.length - 1]).backgroundColor;
        sliderRadioButtons[sliderRadioButtons.length - 1].checked = true;
        return;
      }
      slides[i].classList.remove('slider__item--active');
      slides[i-1].classList.add('slider__item--active');
      promoSection.style.backgroundColor = window.getComputedStyle(promoCards[i-1]).backgroundColor;
      sliderRadioButtons[i-1].checked = true;
      return;
    }
  }
};

const neededSlideOn = function () {
  slides.forEach((slide) => slide.classList.remove('slider__item--active'));
  for (let i = 0; i < sliderRadioButtons.length; i++) {
    if (sliderRadioButtons[i].checked === true) {
      slides[i].classList.add('slider__item--active');
      promoSection.style.backgroundColor = window.getComputedStyle(promoCards[i]).backgroundColor;
      return
    }
  }
};

sliderButtonNext.addEventListener('click', nextSlideOn);
sliderButtonPrevious.addEventListener('click', previousSlideOn);
sliderRadioButtons.forEach((sliderRadioButton) => sliderRadioButton.addEventListener('click', neededSlideOn));
