window.addEventListener("DOMContentLoaded", () => {
    const url = 'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
    const searchBtn = document.getElementById("searchBtn");
    const searchForm = document.getElementById('searchForm');
    const imagesWrapper = document.getElementById('imagesWrapper');
    const headerSearchInput = document.getElementById('headerSearchInput');

    searchBtn.addEventListener('click', search);

    /* request to server function */
    async function getImages(url) {
        try {
            const response = await fetch(url);
            const dataJson = await response.json();
            return dataJson.results;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /* searching listener */
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        search();
    })

    /* remove last results */
    function removeImagesResult() {
        while (imagesWrapper.firstChild) {
            imagesWrapper.removeChild(imagesWrapper.firstChild);
        }
    }

    /* search function */
    function search() {
        removeImagesResult();
        showImagesResult();
    }

    function addImages(arrayImg) {
        arrayImg.map((elem, index) => {
            const imgSrc = elem.urls.regular;
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `img ${index}`;
            img.id = elem.id;
            imagesWrapper.append(img);
        });
    }

    async function showImagesResult() {
        let newUrl = '';
        const requestText = headerSearchInput.value;

        if (requestText.trim() == '') {
            newUrl = url;
        } else {
            newUrl = `https://api.unsplash.com/search/photos?query=${requestText}&per_page=30&orientation=landscape&client_id=ys_OSYX6mtTO91uGO1x_cMkDNKeJb0Z8OdYs_PI07_g`;
        }

        let newImagesArray = await getImages(newUrl);
        addImages(newImagesArray);
    }

    showImagesResult();
});
