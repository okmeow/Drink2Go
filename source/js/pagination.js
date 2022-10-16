const paginationLinks = document.querySelectorAll('.catalog-pagination__link');

const offPaginationCurrent = (evt) => {
  evt.preventDefault();
  paginationLinks.forEach((paginationLink) => paginationLink.classList.remove('catalog-pagination__link--current'));
}

paginationLinks.forEach((paginationLink) => paginationLink.addEventListener('click', offPaginationCurrent));
paginationLinks[0].removeEventListener('click', offPaginationCurrent)
paginationLinks[paginationLinks.length - 1].removeEventListener('click', offPaginationCurrent)

for (let i = 1; i < paginationLinks.length - 1; i++ ) {
  paginationLinks[i].addEventListener('click', () => paginationLinks[i].classList.add('catalog-pagination__link--current'));
}

const checkPaginationCurrent = (evt) => {
  for (let i = 1; i < paginationLinks.length - 1; i++ ) {
    if (paginationLinks[paginationLinks.length - 2].classList.contains('catalog-pagination__link--current')) {
      paginationLinks[paginationLinks.length - 1].style.opacity = "0";
      paginationLinks[paginationLinks.length - 1].style.cursor = "default";
      paginationLinks[0].style.opacity = "1";
      paginationLinks[0].style.cursor = "pointer";
      return;
    }
    if (paginationLinks[1].classList.contains('catalog-pagination__link--current')) {
      paginationLinks[paginationLinks.length - 1].style.opacity = "1";
      paginationLinks[paginationLinks.length - 1].style.cursor = "pointer";
      paginationLinks[0].style.opacity = "0";
      paginationLinks[0].style.cursor = "default";
      return;
    }
    paginationLinks[paginationLinks.length - 1].style.opacity = "1";
    paginationLinks[paginationLinks.length - 1].style.cursor = "pointer";
    paginationLinks[0].style.opacity = "1";
    paginationLinks[0].style.cursor = "pointer";
  }
}

const changePaginationOnPrevious = (evt) => {
  evt.preventDefault();
  if (paginationLinks[1].classList.contains('catalog-pagination__link--current')) {
    return;
  }

  for (let i = 1; i < paginationLinks.length - 1; i++ ) {
    if (paginationLinks[i].classList.contains('catalog-pagination__link--current')) {
      paginationLinks[i].classList.remove('catalog-pagination__link--current');
      paginationLinks[i-1].classList.add('catalog-pagination__link--current');
      return;
    }
  }
}

const changePaginationOnNext = (evt) => {
  evt.preventDefault();
  if (paginationLinks[paginationLinks.length - 2].classList.contains('catalog-pagination__link--current')) {
    return;
  }

  for (let i = 1; i < paginationLinks.length - 1; i++ ) {
    if (paginationLinks[i].classList.contains('catalog-pagination__link--current')) {
      paginationLinks[i].classList.remove('catalog-pagination__link--current');
      paginationLinks[i+1].classList.add('catalog-pagination__link--current');
      return;
    }
  }
}

paginationLinks[0].addEventListener('click', changePaginationOnPrevious);
paginationLinks[paginationLinks.length - 1].addEventListener('click', changePaginationOnNext);
paginationLinks.forEach((paginationLink) => paginationLink.addEventListener('click', checkPaginationCurrent));
