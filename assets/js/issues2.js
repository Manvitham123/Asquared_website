
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const closeBtn = document.querySelector("#close-btn");
const book = document.querySelector("#book");

const papers = Array.from(document.querySelectorAll(".paper"));
let currentEnlarged = null; 
let currentEnlargedP = null; 


prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);
closeBtn.addEventListener("click", deEnlargePage);


let currentLocation = 1;
const numOfPapers = papers.length;
const maxLocation = numOfPapers + 1;


function setZIndexes() {
    const papers = Array.from(document.querySelectorAll(".paper"));
    papers.forEach((paper, index) => {
        paper.style.zIndex = papers.length - index;
    });
}


window.onload = setZIndexes;
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

function openBook() {
    book.style.transform = "translateX(50%)";
    console.log(width)
    if(width <= 480){
        prevBtn.style.transform = "translateX(-285%)";
        nextBtn.style.transform = "translateX(285%)";

    }
    else if(width <= 900){
        prevBtn.style.transform = "translateX(-330%)";
        nextBtn.style.transform = "translateX(330%)";

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
    if (currentEnlarged) return; 
    console.log(`enlarging ${content}`);
    content.classList.add("enlarged");
    paper.dataset.originalZIndex = paper.style.zIndex || "1"; 
    paper.style.zIndex = parseInt(paper.dataset.originalZIndex) + 100; 
    currentEnlarged = content;
    currentEnlargedP = paper;
    prevBtn.style.visibility = "hidden";
    nextBtn.style.visibility = "hidden";
    closeBtn.style.display = "block";
}


function deEnlargePage() {
    if (!currentEnlarged) return;
    currentEnlarged.classList.remove("enlarged");
    currentEnlargedP.style.zIndex = currentEnlargedP.dataset.originalZIndex;
    delete currentEnlargedP.dataset.originalZIndex; // Clean up the stored value
    currentEnlarged = null;
    currentEnlargedP = null;
    prevBtn.style.visibility = "visible";
    nextBtn.style.visibility = "visible";
    closeBtn.style.display = "none";
}
