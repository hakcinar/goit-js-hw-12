import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('button');
const baseUrl = 'https://pixabay.com/api/';
const apiKey = '51405518-123002757a861b136415ef994';
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');
const perPage = 40;
let page = 1;
const heightOfGalleryItem = gallery.getBoundingClientRect().height;

loader.style.display = 'none';
loadMoreButton.style.display = 'none';
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchImages(query);
  } else {
    alert('Please enter a search term.');
  }
});

const fetchImages = async query => {
  page = 1;
  loader.style.display = 'block';
  const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safe_search=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.hits.length === 0) {
      loader.style.display = 'none';
      iziToast.error({
        title: 'No results found',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    gallery.innerHTML = data.hits
      .map(
        hit => `
                <div class="gallery__item">
                    <a href="${hit.largeImageURL}" class="gallery__item">
                        <img src="${hit.webformatURL}" alt="${hit.tags}" class="gallery__image" />
                    </a>
                    <div class="gallery__info">
                        <p class="gallery__info_item"><b>Likes</b> ${hit.likes}</p>
                        <p class="gallery__info_item"><b>Views</b> ${hit.views}</p>
                        <p class="gallery__info_item"><b>Comments</b> ${hit.comments}</p>
                        <p class="gallery__info_item"><b>Downloads</b> ${hit.downloads}</p>
                    </div>
                </div>
                `
      )
      .join('');
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      scrollZoom: false,
    });
    loader.style.display = 'none';
    lightbox.refresh();
    // Show load more button if there are more images to load
    if (data.totalHits > perPage) {
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error fetching images',
      message: error.message,
      position: 'topRight',
    });
  }
};

const loadMoreImages = async query => {
  loader.style.display = 'block';
  const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safe_search=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No more images',
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
      });
      loadMoreButton.style.display = 'none';
      loader.style.display = 'none';
      return;
    }
    gallery.insertAdjacentHTML(
      'beforeend',
      data.hits
        .map(
          hit => `
                    <div class="gallery__item">
                        <a href="${hit.largeImageURL}" class="gallery__item">
                            <img src="${hit.webformatURL}" alt="${hit.tags}" class="gallery__image" />
                        </a>
                        <div class="gallery__info">
                            <p class="gallery__info_item"><b>Likes</b> ${hit.likes}</p>
                            <p class="gallery__info_item"><b>Views</b> ${hit.views}</p>
                            <p class="gallery__info_item"><b>Comments</b> ${hit.comments}</p>
                            <p class="gallery__info_item"><b>Downloads</b> ${hit.downloads}</p>
                        </div>
                    </div>
                `
        )
        .join('')
    );
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      scrollZoom: false,
    });
    const { height: cardHeight } =
      gallery.firstElementChild?.getBoundingClientRect() || { height: 0 };
    window.scrollBy({
      top: cardHeight * 2 - 20, 
      behavior: 'smooth',
    });

    loader.style.display = 'none';
    lightbox.refresh();
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error fetching more images',
      message: error.message,
      position: 'topRight',
    });
  }
};

loadMoreButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    loadMoreImages(query);
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term before loading more images.',
      position: 'topRight',
    });
  }
  page++;
});
