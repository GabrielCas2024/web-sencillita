const loginForm = document.querySelector("#login-form");
const siteContent = document.querySelector("#site-content");
const loginMessage = document.querySelector("#login-message");
const loginLink = document.querySelector("#login-link");
const userGreeting = document.querySelector("#user-greeting");
const loggedUser = document.querySelector("#logged-user");
const logoutButton = document.querySelector("#logout-button");

const validUsername = "profe";
const validPasswordHash = "6e89996fccb6f42b37b173f362194d498f34092696528a3ea26289371058ce18";

async function hashValue(value) {
	const encodedValue = new TextEncoder().encode(value);
	const hashBuffer = await crypto.subtle.digest("SHA-256", encodedValue);
	return Array.from(new Uint8Array(hashBuffer), byte => byte.toString(16).padStart(2, "0")).join("");
}

function showAuthenticatedContent() {
	loginLink.hidden = true;
	userGreeting.hidden = false;
	loggedUser.textContent = validUsername;
	logoutButton.hidden = false;
}

if (siteContent && sessionStorage.getItem("authenticated") === "true") {
	showAuthenticatedContent();
}

if (loginForm) {
	if (sessionStorage.getItem("authenticated") === "true") {
		window.location.replace("index.html");
	}

	loginForm.addEventListener("submit", async event => {
		event.preventDefault();
		loginMessage.textContent = "";

		const formData = new FormData(loginForm);
		const username = formData.get("username").trim();
		const password = formData.get("password");
		const passwordHash = await hashValue(password);

		if (username === validUsername && passwordHash === validPasswordHash) {
			sessionStorage.setItem("authenticated", "true");
			window.location.replace("index.html");
			return;
		}

		loginMessage.textContent = "Usuario o contraseña incorrectos.";
		loginForm.querySelector("#password").value = "";
		loginForm.querySelector("#password").focus();
	});
}

if (logoutButton) {
	logoutButton.addEventListener("click", () => {
		sessionStorage.removeItem("authenticated");
		window.location.replace("index.html");
	});
}
