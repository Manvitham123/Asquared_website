// References to DOM elements
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
let numOfPapers = 14;
let maxLocation = numOfPapers + 1;


function setZIndexes() {
    const papers = Array.from(document.querySelectorAll(".paper"));
    papers.forEach((paper, index) => {
        paper.style.zIndex = papers.length - index;
    });
}

// Call the function on page load
window.onload = setZIndexes;


papers.forEach((paper) => {
    const frontContent = paper.querySelector(".front-content");
    const backContent = paper.querySelector(".back-content");

    if (frontContent) {
        frontContent.addEventListener("click", (event) => {
            event.stopPropagation();
            enlargePage(frontContent, paper);
        });
    }

    if (backContent) {
        backContent.addEventListener("click", (event) => {
            event.stopPropagation();
            enlargePage(backContent, paper);
        });
    }
});


const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");
const paper6 = document.querySelector("#p6");
const paper7 = document.querySelector("#p7");
const paper8 = document.querySelector("#p8");
const paper9 = document.querySelector("#p9");
const paper10 = document.querySelector("#p10");
const paper11 = document.querySelector("#p11");
const paper12 = document.querySelector("#p12");






var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;


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
    if(isAtBeginning){
        book.style.transform = "translateX(0%)";

    }
    else{
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";

}

function goNextPage() {
    if(currentLocation < maxLocation){
        switch(currentLocation){
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                break;
            case 4:
                paper4.classList.add("flipped");
                paper4.style.zIndex = 4;
                break;
            case 5:
                paper5.classList.add("flipped");
                paper5.style.zIndex = 5;
                break;
            case 6:
                paper6.classList.add("flipped");
                paper6.style.zIndex = 6;
                break;
            case 7: 
                paper7.classList.add("flipped");
                paper7.style.zIndex = 7;
                break;
            case 8: 
                paper8.classList.add("flipped");
                paper8.style.zIndex = 8;
                break;
            case 9: 
                paper9.classList.add("flipped");
                paper9.style.zIndex = 9;
                break;
            case 10: 
                paper10.classList.add("flipped");
                paper10.style.zIndex = 10;
                break;
            case 11: 
                paper11.classList.add("flipped");
                paper11.style.zIndex = 11;
                break;
            case 12: 
                paper12.classList.add("flipped");
                paper12.style.zIndex = 12;
                closeBook(false);
                break;
            default:
                throw new Error("unknown state")
        }
        currentLocation++;
       
    }

}

function goPrevPage() {
    if(currentLocation > 1){
        switch(currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex =  14;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 13;
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 12;
                break;
            case 5:
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 11;
                break;
            case 6:
                paper5.classList.remove("flipped");
                paper5.style.zIndex = 10;
            case 7:
                paper6.classList.remove("flipped");
                paper6.style.zIndex = 9;
            case 8:
                paper7.classList.remove("flipped");
                paper7.style.zIndex = 8;
            case 9:
                paper8.classList.remove("flipped");
                paper8.style.zIndex = 7;
            case 10:
                paper9.classList.remove("flipped");
                paper9.style.zIndex = 6;
            case 11:
                paper10.classList.remove("flipped");
                paper10.style.zIndex = 5;
            case 12:
                paper11.classList.remove("flipped");
                paper11.style.zIndex = 4;
            case 13:
                openBook();
                paper12.classList.remove("flipped");
                paper12.style.zIndex = 3;
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation--;
        updatePageBackgrounds()


    }

}

function enlargePage(content, paper) {
    if (currentEnlarged) return; 

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
    delete currentEnlargedP.dataset.originalZIndex; 

    currentEnlarged = null;
    currentEnlargedP = null;


    prevBtn.style.visibility = "visible";
    nextBtn.style.visibility = "visible";

 
    closeBtn.style.display = "none";
}
