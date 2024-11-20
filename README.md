# David Munoz Jensen
### Student ID: 041120463
## Capstone Project: Astronomy Picture of the Day Search

# Capstone Project

This repository contains the source code for the **Capstone Project: Astronomy Picture of the Day Search**.

## Project Overview

The **Capstone Project: Astronomy Picture of the Day Search** focuses on creating a website to demonstrate the API from NASA that shows pictures of the galaxy for each day. The mockup is focused on Desktop, Tablet, and Mobile screen sizes. In the mockup folder in part 2 branch, you can find the respective PDF for each one. My intention is to make a one-page scrolling website with a quick link menu that will jump to a specific part of the page instead of loading another page. There will be animations for buttons, and the about page will display how many pictures the site has displayed on that particular date. Additionally, there will be another section for the picture of yesterday, random picture, and a last year picture that users can access. Finally, there will be a contact form that users can use to send feedback or messages. This will be coded in JS.

## Project Supervisor
All the coding in this project was made by David Muñoz Jensen and under the guide of Professor David Plata Ramirez for the MTM6302 section 3 Web Development III course in Algonquin College.

## Process

1. **Date Picker**: Added a date picker box where the user can select a specific date, and the picture for that date will be displayed.
2. **Favorite Button**: Added a favorite button that allows users to favorite a maximum of 3 pictures. The favorites are stored on the page, and users have the capability to remove them.
3. **Counters**: Implemented 3 counters that display relevant information in the about section.
4. **Contact Form**: Added a contact form so users can send feedback. The form includes fields for name, email, phone (optional), and message.

## Features

- **NASA API**: Used to fetch the Astronomy Picture of the Day.
- **Figma**: For designing the layout and mockups.
- **HTML/CSS/JavaScript**: For building the website and implementing functionality.
- **Intersection Observer API**: For triggering animations when elements come into view.
- **Animated Background**: A dynamic night sky with moving stars.
- **Responsive Design**: Ensures the website looks good on Desktop, Tablet, and Mobile screen sizes.
- **ARIA Labels and Accessibility**: Improved accessibility with ARIA labels and semantic HTML.
- **Interactive Gallery**: A gallery showcasing award-winning photographs with hover effects and a modal for viewing full-size images.

## Dynamic Night Sky Background

The background of the web application features a dynamic night sky with moving stars, created using the HTML5 `<canvas>` element and JavaScript. This background adds a visually appealing and immersive experience for users, enhancing the overall aesthetic of the application.

### Implementation Details

1. **HTML5 `<canvas>` Element**:
   - The `<canvas>` element is used to draw the night sky. It is positioned as a fixed background, covering the entire viewport.
   - The canvas is set to cover the full width and height of the viewport, ensuring that the dynamic background is always visible.

2. **JavaScript for Animation**:
   - JavaScript is used to create and animate the stars. The stars are represented as small circles drawn on the canvas.
   - An array of star objects is created, each with properties such as position, radius, and speed.
   - The `drawStars` function iterates through the array of stars, drawing each one on the canvas.
   - The `updateStars` function updates the position of each star, creating the illusion of movement. Stars that move out of the viewport are repositioned to the opposite side, ensuring a continuous animation.
   - The `animate` function uses `requestAnimationFrame` to create a smooth animation loop, continuously calling the `drawStars` and `updateStars` functions.

3. **Visual Effects**:
   - The stars are given a slight variation in size and speed to create a more natural and realistic effect.
   - The background color of the canvas is set to a dark shade to simulate the night sky, with stars appearing as small, bright points of light.
   - The movement of the stars is subtle and slow, adding to the calming and immersive experience.

4. **Performance Considerations**:
   - The animation is optimized to ensure smooth performance across different devices and screen sizes.
   - The number of stars and their properties are carefully chosen to balance visual appeal and performance.


## Resources Used

- **NASA API**: Used to fetch the Astronomy Picture of the Day.
- **Figma**: For designing the layout and mockups.
- **HTML/CSS/JavaScript**: For building the website and implementing functionality.
- **Intersection Observer API**: For triggering animations when elements come into view.

## Challenges Faced

- **API Integration**: Ensuring the correct data is fetched and displayed for the selected date.
- **Favorite Functionality**: Implementing the logic to allow only a maximum of 3 favorites and providing the capability to remove them.
- **Responsive Design**: Making sure the website looks good on Desktop, Tablet, and Mobile screen sizes.
- **Animations**: Implementing smooth animations for buttons and counters.
- **Form Validation**: Ensuring the contact form fields are validated correctly before submission.
- **Performance**: Ensuring the animation runs smoothly without affecting the overall performance of the website.
- **Compatibility**: Making sure the animation works across different browsers and devices.

## Accessibility Improvements

- **ARIA Labels**: Added ARIA labels to improve accessibility for screen readers.
- **Semantic HTML**: Used semantic HTML elements like `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` to enhance the structure and accessibility of the webpage.
- **Keyboard Navigation**: Ensured that all interactive elements are accessible via keyboard navigation.

## Scripts Used

- **Bootstrap**: For responsive design and styling.
- **jQuery**: For DOM manipulation and event handling.
- **Popper.js**: For positioning tooltips and popovers.
- **ScrollCue**: For triggering animations when elements come into view.

## Copyright
- **NASA API**: All images and data fetched from the NASA API belong to NASA.
- **Bootstrap**: © 2011-2021 Twitter, Inc. Code licensed under MIT.
- **jQuery**: © 2021 OpenJS Foundation and jQuery contributors. Code licensed under MIT.
- **Popper.js**: © 2016-2021 Federico Zivolo. Code licensed under MIT.
- **ScrollCue**: © 2021 ScrollCue contributors. Code licensed under MIT.
- **Coding**: © 2024 David Muñoz Jensen.

## Figma Design Link

The design and layout for the project can be accessed via the following Figma link:

[Capstone Project Design on Figma](https://www.figma.com/design/5R9fWuGJKO1bxbb6tVrOdO/Capstone-Project?node-id=0-1&t=aSwiapIpGHe9pgi0-1)

Best Regards,
David Munoz