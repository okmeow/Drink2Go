const nav = document.querySelector('.navigation');
const menuToggle = document.querySelector('.user-info__toggle');
const headerWrapper = document.querySelector('.header__wrapper');
const sortList = document.querySelector('.catalog-products__sort-list');
const sortButton = document.querySelector('.catalog-products__sort-type');
const sortItems = document.querySelectorAll('.catalog-products__sort-text');

nav.classList.remove('navigation--nojs');
menuToggle.classList.remove('user-info__toggle--nojs');
headerWrapper.classList.remove('header__wrapper--nojs');

const changeIconMenu = () => {
  if (nav.classList.contains('navigation--closed')) {
    nav.classList.remove('navigation--closed');
    nav.classList.add('navigation--opened');
  } else {
    nav.classList.add('navigation--closed');
    nav.classList.remove('navigation--opened');
  }
  return
}

const toggleMenu = () => {
  if (menuToggle.classList.contains('user-info__toggle--open')) {
    menuToggle.classList.remove('user-info__toggle--open');
    menuToggle.classList.add('user-info__toggle--close');
  } else {
    menuToggle.classList.remove('user-info__toggle--close');
    menuToggle.classList.add('user-info__toggle--open');
  }
  return
}


const closeSort = () => {
  sortList.classList.remove('catalog-products__sort-list--opened');
  sortList.classList.add('catalog-products__sort-list--closed');
  sortButton.classList.remove('catalog-products__sort-type--opened');
  sortButton.classList.add('catalog-products__sort-type--closed');
}

const openSort = () => {
  sortList.classList.remove('catalog-products__sort-list--closed');
  sortList.classList.add('catalog-products__sort-list--opened');
  sortButton.classList.remove('catalog-products__sort-type--closed');
  sortButton.classList.add('catalog-products__sort-type--opened');
}

const toggleSort = () => {
  if (sortList.classList.contains('catalog-products__sort-list--closed')) {
    return openSort();
  }

  return closeSort();
}

menuToggle.addEventListener('click', changeIconMenu);
menuToggle.addEventListener('click', toggleMenu);
sortButton.addEventListener('click', toggleSort);

const changeSortType = (item) => {
  sortButton.textContent = item.textContent;
  closeSort();
}

sortItems.forEach((item) => item.addEventListener('click', () => {
  changeSortType(item);
}));
