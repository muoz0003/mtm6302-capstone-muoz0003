document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const nasaImage = document.getElementById('nasa-image');
    const datePicker = document.getElementById('date-picker');
    const favoriteButton = document.getElementById('favorite-button');
    const favoritesContainer = document.getElementById('favorites');
    const fullSizeImageContainer = document.getElementById('full-size-image-container');
    const fullSizeImage = document.getElementById('full-size-image');
    const closeButton = document.querySelectorAll('.close-button');
    const fullSizeDescription = document.getElementById('full-size-description');
    const nasaDescription = document.getElementById('nasa-description');
    const yesterdayImage = document.getElementById('yesterday-image');
    const randomImage = document.getElementById('random-image');
    const lastYearImage = document.getElementById('last-year-image');
    const additionalImageContainer = document.getElementById('additional-image-container');
    const additionalImage = document.getElementById('additional-image');
    const additionalDescription = document.getElementById('additional-description');

    let favorites = [];

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    datePicker.value = today;
    fetchNasaImage(today);
    fetchAdditionalImages(today);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.opacity = '0';
        } else {
            header.style.opacity = '1';
        }
    });

    datePicker.addEventListener('change', () => {
        const date = datePicker.value;
        fetchNasaImage(date);
        fetchAdditionalImages(date);
    });

    favoriteButton.addEventListener('click', () => {
        if (favorites.length < 3) {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');

            const favoriteImage = document.createElement('img');
            favoriteImage.src = nasaImage.src;
            favoriteImage.alt = nasaImage.alt;
            favoriteImage.addEventListener('click', () => {
                fullSizeImage.src = favoriteImage.src;
                fullSizeImage.alt = favoriteImage.alt;
                fullSizeDescription.textContent = nasaDescription.textContent;
                fullSizeImageContainer.classList.remove('hidden');
            });

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'X';
            deleteButton.addEventListener('click', () => {
                favoritesContainer.removeChild(favoriteItem);
                favorites = favorites.filter(fav => fav !== nasaImage.src);
            });

            favoriteItem.appendChild(favoriteImage);
            favoriteItem.appendChild(deleteButton);
            favoritesContainer.appendChild(favoriteItem);
            favorites.push(nasaImage.src);
        } else {
            alert('You can only save up to 3 favorite pictures.');
        }
    });

    nasaImage.addEventListener('click', () => {
        fullSizeImage.src = nasaImage.src;
        fullSizeImage.alt = nasaImage.alt;
        fullSizeDescription.style.display = 'none'; // Hide the description
        fullSizeImageContainer.classList.remove('hidden');
    });

    closeButton.forEach(button => {
        button.addEventListener('click', () => {
            fullSizeImageContainer.classList.add('hidden');
            additionalImageContainer.classList.add('hidden');
        });
    });

    async function fetchNasaImage(date) {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=xO3eVxQ1tHI0QYeJ2UPiEirooj2g5ei8oGsAfInY&date=${date}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data); // Log the API response for debugging
            if (data.media_type === 'image') {
                nasaImage.src = data.url;
                nasaImage.alt = data.title;
                nasaDescription.textContent = data.explanation;
            } else {
                nasaImage.src = '';
                nasaImage.alt = 'No image available for this date';
                nasaDescription.textContent = '';
                alert('The media for the selected date is not an image.');
            }
        } catch (error) {
            console.error('Error fetching the NASA picture of the day:', error);
        }
    }

    async function fetchAdditionalImages(date) {
        const yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastYear = new Date(date);
        lastYear.setFullYear(lastYear.getFullYear() - 1);

        const dates = [
            { element: yesterdayImage, date: yesterday.toISOString().split('T')[0] },
            { element: lastYearImage, date: lastYear.toISOString().split('T')[0] }
        ];

        for (const { element, date } of dates) {
            try {
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=xO3eVxQ1tHI0QYeJ2UPiEirooj2g5ei8oGsAfInY&date=${date}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.media_type === 'image') {
                    element.src = data.url;
                    element.alt = data.title;
                    element.addEventListener('click', () => {
                        additionalImage.src = data.url;
                        additionalImage.alt = data.title;
                        additionalDescription.textContent = data.explanation;
                        additionalImageContainer.classList.remove('hidden');
                    });
                } else {
                    element.src = '';
                    element.alt = 'No image available for this date';
                }
            } catch (error) {
                console.error(`Error fetching the NASA picture for ${date}:`, error);
            }
        }

        // Fetch a random image
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=xO3eVxQ1tHI0QYeJ2UPiEirooj2g5ei8oGsAfInY&count=1`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const randomData = data[0];
            if (randomData.media_type === 'image') {
                randomImage.src = randomData.url;
                randomImage.alt = randomData.title;
                randomImage.addEventListener('click', () => {
                    additionalImage.src = randomData.url;
                    additionalImage.alt = randomData.title;
                    additionalDescription.textContent = randomData.explanation;
                    additionalImageContainer.classList.remove('hidden');
                });
            } else {
                randomImage.src = '';
                randomImage.alt = 'No image available for this date';
            }
        } catch (error) {
            console.error('Error fetching the random NASA picture:', error);
        }
    }

    // Smooth scrolling for menu links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Number counting animation
    const counters = document.querySelectorAll('.count');
    const speed = 200; // The lower the slower

    const countUp = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp();
                observer.unobserve(aboutSection);
            }
        });
    });

    observer.observe(aboutSection);
});