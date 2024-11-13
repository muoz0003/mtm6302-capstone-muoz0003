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
    const pictureTitle = document.getElementById('picture-title');
    const yesterdayImage = document.getElementById('yesterday-image');
    const randomImage = document.getElementById('random-image');
    const lastYearImage = document.getElementById('last-year-image');
    const additionalImageContainer = document.getElementById('additional-image-container');
    const additionalImage = document.getElementById('additional-image');
    const additionalDescription = document.getElementById('additional-description');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
   

    let favorites = [];

    // Show the button when the user scrolls down 100px from the top
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // When the user clicks on the button, scroll to the top of the page
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Set default date to today using local time
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    datePicker.value = formattedDate;
    fetchNasaImage(formattedDate);
    fetchAdditionalImages(formattedDate);

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
        fullSizeDescription.textContent = nasaDescription.textContent; // Set the description text
        fullSizeDescription.style.display = 'block'; // Ensure the description is visible
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
                pictureTitle.textContent = data.title; // Set the title text
                nasaDescription.textContent = data.explanation;
            } else {
                nasaImage.src = '';
                nasaImage.alt = 'No image available for this date';
                pictureTitle.textContent = 'No title available';
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
    const speed = 50; // The lower the slower

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

    // Add event listeners to gallery images
    document.querySelectorAll('.gallery-image').forEach(image => {
        image.addEventListener('click', function() {
            const src = this.src;
            const alt = this.alt;
            const modalImage = document.getElementById('modalImage');
            modalImage.src = src;
            modalImage.alt = alt;
            // Show the modal using jQuery
            $('#imageModal').modal('show');
        });
    });

    // Background night sky animation

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            dx: Math.random() * 0.5,
            dy: Math.random() * 0.5
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            ctx.moveTo(star.x, star.y);
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, true);
        }
        ctx.fill();
        updateStars();
    }

    function updateStars() {
        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            star.x += star.dx;
            star.y += star.dy;

            if (star.x > canvas.width) star.x = 0;
            if (star.y > canvas.height) star.y = 0;
            if (star.x < 0) star.x = canvas.width;
            if (star.y < 0) star.y = canvas.height;
        }
    }

    function animate() {
        drawStars();
        requestAnimationFrame(animate);
    }

    animate();

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});