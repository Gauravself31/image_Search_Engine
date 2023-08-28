const accessKey = 'C9hPbqHrJz_LqP8xhbg0CybkS1IZ2FzxXn8SdR3CWkA'
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
let page = 1;
//function to fetch images using api un

const fetchImages = async (query, pageNo) => {
    if (pageNo === 1) {
        imagesContainer.innerHTML = '';

    }
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=1&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

 if(data.results.length > 0){

 
    data.results.forEach(photo => {

        //creating image div


        const imageElement = document.createElement(`div`);
        imageElement.classList.add('imageDiv');
        imageElement.innerHTML = `<img src ="${photo.urls.regular}"/>`;




        //creating overlay

        const overlayElement = document.createElement('Div');
        overlayElement.classList.add('overlay');



        //creating overlay text

        const overlayText = document.createElement('h3');
        overlayText.innerHTML = `${photo.alt_description}`;


        overlayElement.appendChild(overlayText);
        imageElement.appendChild(overlayElement);

        imagesContainer.appendChild(imageElement);
    });
if(data.total_pages === pageNo){
    loadMoreBtn.style.display = "none";
}
else{

    loadMoreBtn.style.display = "block";
}
 }
 else {
    imagesContainer.innerHTML = `<h2>No image found! please check your query.</h2`;
}
}



// adding event listner to search form


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1;
        fetchImages(inputText, page);
    }
    else {
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2`;
    }
});




// adding event listner to load more button

loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
});
