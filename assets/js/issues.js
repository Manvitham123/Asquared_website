const magazines = {
    1: [
        'images/magazine1-page1.jpg',
        'images/magazine1-page2.jpg',
        'images/magazine1-page3.jpg',
        'images/magazine1-page4.jpg',
    ],
    2: [
        'images/magazine2-page1.jpg',
        'images/magazine2-page2.jpg',
        'images/magazine2-page3.jpg',
        'images/magazine2-page4.jpg',
    ],
};

let currentMagazine = null;
let currentPageIndex = 0;

function openMagazine(magazineId) {
    currentMagazine = magazines[magazineId];
    currentPageIndex = 0;
    updateModalPages();
    document.getElementById('magazineModal').style.display = 'flex';
}

function closeMagazine() {
    document.getElementById('magazineModal').style.display = 'none';
}

function updateModalPages() {
    const leftPage = document.getElementById('leftPage');
    const rightPage = document.getElementById('rightPage');
    
    // Set the left page to the current index
    leftPage.src = currentMagazine[currentPageIndex] || '';

    // Set the right page to the next index
    rightPage.src = currentMagazine[currentPageIndex + 1] || '';
}

function nextPages() {
    if (currentMagazine && currentPageIndex < currentMagazine.length - 2) {
        currentPageIndex += 2;
        updateModalPages();
    }
}

function prevPages() {
    if (currentMagazine && currentPageIndex > 0) {
        currentPageIndex -= 2;
        updateModalPages();
    }
}
