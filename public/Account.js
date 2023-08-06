// Get elements
const saveButton = document.getElementById("saveButton");
const nameInput = document.getElementById("AccountBox"); 
const userTitleElement = document.querySelector(".userTitle");
const popup = document.getElementById("popup"); // Add this line to get the popup element



// Load user's saved name from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      nameInput.value = savedName;
      userTitleElement.textContent = savedName;
    }
  });

// Listen for Save button click
saveButton.addEventListener("click", () => {
  const newName = nameInput.value;
  
  
   // Save the new name to local storage
   localStorage.setItem("userName", newName);

     // Show the popup
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.opacity = 1;
  }, 100); // Add a small delay for the opacity transition to take effect
  
  // Hide the popup after a certain duration (e.g., 3 seconds)
  setTimeout(() => {
    popup.style.opacity = 0;
    setTimeout(() => {
      popup.style.display = "none";
    }, 300);
  }, 3000);
});

