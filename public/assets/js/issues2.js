// References to DOM elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const closeBtn = document.querySelector("#close-btn");
const book = document.querySelector("#book");

// Paper references
const papers = Array.from(document.querySelectorAll(".paper"));

let currentEnlarged = null; // Track the currently enlarged page
let currentEnlargedP = null; 

// Event listeners for navigation buttons
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);
closeBtn.addEventListener("click", deEnlargePage);

// Calculate the number of pages dynamically
let currentLocation = 1;
const numOfPapers = papers.length;
const maxLocation = numOfPapers + 1;


function setZIndexes() {
    const papers = Array.from(document.querySelectorAll(".paper"));
    papers.forEach((paper, index) => {
        paper.style.zIndex = papers.length - index;
    });
}

// Call the function on page load
window.onload = setZIndexes;

// Make each page clickable for enlargement
papers.forEach((paper, index) => {
    const frontContent = paper.querySelector(".front-content");
    const backContent = paper.querySelector(".back-content");

    if (frontContent) {
        console.log(`Adding click event to Front Content ID: ${frontContent.id}`);
        frontContent.addEventListener("click", (event) => {
            event.stopPropagation();
            console.log(`Enlarging front content with ID: ${frontContent.id}`);
            enlargePage(frontContent, paper);
        });
    }

    if (backContent) {
        console.log(`Adding click event to Back Content ID: ${backContent.id}`);
        backContent.addEventListener("click", (event) => {
            event.stopPropagation();
            console.log(`Enlarging back content with ID: ${backContent.id}`);
            enlargePage(backContent, paper);
        });
    }
});


var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

// Adjust navigation button positions based on screen size
function openBook() {
    book.style.transform = "translateX(50%)";
    if(width <= 480){
        prevBtn.style.transform = "translateX(-285%)";
        nextBtn.style.transform = "translateX(285%)";

    }
    else if(width <= 768){
        prevBtn.style.transform = "translateX(-285%)";
        nextBtn.style.transform = "translateX(285%)";

    }
    else{
        prevBtn.style.transform = "translateX(-300px)";
        nextBtn.style.transform = "translateX(300px)";

    }
   
}

function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

// Dynamically go to the next page
function goNextPage() {
    if (currentLocation < maxLocation) {
        if(currentLocation ===  1){
            openBook();

        }
        papers[currentLocation - 1].classList.add("flipped");
        papers[currentLocation - 1].style.zIndex = currentLocation;
        currentLocation++;
        if (currentLocation === maxLocation) closeBook(false);
    }
}

// Dynamically go to the previous page
function goPrevPage() {
    if (currentLocation > 1) {
        if(currentLocation === maxLocation){
            openBook();
        }
        currentLocation--;
        papers[currentLocation - 1].classList.remove("flipped");
        papers[currentLocation - 1].style.zIndex = numOfPapers - currentLocation + 1;
        if (currentLocation === 2) closeBook(true);
    }
}

function enlargePage(content, paper) {
    if (currentEnlarged) return; // Prevent multiple enlargements
    console.log(`enlarging ${content}`);

    // Add enlarged styles
    content.classList.add("enlarged");


    // Store the original zIndex to restore it later
    paper.dataset.originalZIndex = paper.style.zIndex || "1"; // Default to 1 if no zIndex is set
    paper.style.zIndex = parseInt(paper.dataset.originalZIndex) + 100; // Increase zIndex

    currentEnlarged = content;
    currentEnlargedP = paper;

    // Hide navigation buttons
    prevBtn.style.visibility = "hidden";
    nextBtn.style.visibility = "hidden";

    // Show the close button
    closeBtn.style.display = "block";
}

// De-enlarge the current content
function deEnlargePage() {
    if (!currentEnlarged) return;

    // Remove enlarged styles
    currentEnlarged.classList.remove("enlarged");

    // Restore the original zIndex
    currentEnlargedP.style.zIndex = currentEnlargedP.dataset.originalZIndex;
    delete currentEnlargedP.dataset.originalZIndex; // Clean up the stored value

    currentEnlarged = null;
    currentEnlargedP = null;

    // Restore navigation buttons
    prevBtn.style.visibility = "visible";
    nextBtn.style.visibility = "visible";

    // Hide the close button
    closeBtn.style.display = "none";
}
