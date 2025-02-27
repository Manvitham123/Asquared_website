
function checkPassword(event) {
    event.preventDefault(); 

    const correctPassword = "Bestmag"; 
    const enteredPassword = document.getElementById("password").value; 

    if (enteredPassword === correctPassword) {
        window.location.href = "index2.html"; 
    } else {
        alert("Incorrect password. Try again.");
    }
}