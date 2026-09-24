import { getAuthenticatedUser } from "./authService.js";
import { FRIDGE_FILE } from "./config.js";
import { readFromJsonFile } from "./fileService.js";
import { createBasePromptByRole, createPrompt } from "./promptService.js";
import { askAi } from "./aiService.js";

const form = document.querySelector("#search-form");
const userNameInput = document.querySelector("#user-name");
const dishTitleInput = document.querySelector("#dish-title");
const searchButton = document.querySelector("#search-button");
const roleOutput = document.querySelector("#role");
const resultOutput = document.querySelector("#result");

const errorModal = document.querySelector("#error-modal");
const errorText = document.querySelector("#error-text");
const closeModalButton = document.querySelector("#close-modal");

function showError(message) {
  errorText.textContent = message;

  if (typeof errorModal.showModal === "function") {
    errorModal.showModal();
  } else {
    alert(message);
  }
}

closeModalButton.addEventListener("click", () => {
  errorModal.close();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userName = userNameInput.value.trim();
  const dishTitle = dishTitleInput.value.trim();

  if (!userName) {
    showError("Введите имя пользователя");
    return;
  }

  if (!dishTitle) {
    showError("Введите название блюда");
    return;
  }

  searchButton.disabled = true;
  searchButton.textContent = "Ищу...";
  roleOutput.textContent = "";
  resultOutput.textContent = "";

  try {
    const user = getAuthenticatedUser(userName);
    const products = await readFromJsonFile(FRIDGE_FILE);
    const basePrompt = createBasePromptByRole(user);
    const prompt = createPrompt(basePrompt, dishTitle, products);
    const answer = await askAi(prompt);

    roleOutput.textContent = `${user.name} → ${user.role}`;
    resultOutput.textContent = answer;
  } catch (error) {
    showError(error.message || "Произошла ошибка приложения");
  } finally {
    searchButton.disabled = false;
    searchButton.textContent = "Искать";
  }
});
