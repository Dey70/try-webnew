// Handles the contact form submission
function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  console.log("Form Submitted:", { name, email, message });
  alert("Message sent successfully!");
  document.querySelector("form").reset();
}

// Copy code to clipboard
function copyCode() {
  const code = document.querySelector(".code-snippet pre").innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("Code copied to clipboard!");
  });
}

// Assign copy button handler
window.onload = () => {
  const copyBtn = document.querySelector(".copy-button");
  if (copyBtn) {
    copyBtn.addEventListener("click", copyCode);
  }
};
