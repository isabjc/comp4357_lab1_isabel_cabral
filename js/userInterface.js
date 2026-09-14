import { USER_MESSAGES } from "../lang/messages/en/user.js";

export class UserInterface {
    constructor(rootElement) {
        this.rootElement = rootElement;

        this.formElement = null;
        this.inputElement = null;
        this.goButton = null;
        this.messageElement = null;
        this.buttonContainer = null;

        this.createInterface();
    }

    createInterface() {
        this.formElement = document.createElement("form");
        this.formElement.classList.add("game-controls");

        const label = document.createElement("label");
        label.textContent = USER_MESSAGES.INPUT_LABEL;
        label.setAttribute("for", "button-count");

        this.inputElement = document.createElement("input");
        this.inputElement.id = "button-count";
        this.inputElement.type = "number";
        this.inputElement.min = "3";
        this.inputElement.max = "7";

        this.goButton = document.createElement("button");
        this.goButton.type = "submit";
        this.goButton.textContent = USER_MESSAGES.GO_BUTTON;

        this.messageElement = document.createElement("p");
        this.messageElement.classList.add("game-message");

        this.buttonContainer = document.createElement("div");
        this.buttonContainer.classList.add("button-container");

        this.formElement.appendChild(label);
        this.formElement.appendChild(this.inputElement);
        this.formElement.appendChild(this.goButton);

        this.rootElement.appendChild(this.formElement);
        this.rootElement.appendChild(this.messageElement);
        this.rootElement.appendChild(this.buttonContainer);
    }

    getButtonCount() {
        return Number(this.inputElement.value);
    }

    isValidButtonCount(number) {
        return (
            Number.isInteger(number)
            && number >= 3
            && number <= 7
        );
    }

    showInvalidInput() {
        this.showMessage(USER_MESSAGES.INVALID_INPUT);
    }

    showExcellentMemory() {
        this.showMessage(USER_MESSAGES.EXCELLENT_MEMORY);
    }

    showWrongOrder() {
        this.showMessage(USER_MESSAGES.WRONG_ORDER);
    }

    showMessage(message) {
        this.messageElement.textContent = message;
    }

    clearMessage() {
        this.messageElement.textContent = "";
    }

    clearButtons() {
        this.buttonContainer.replaceChildren();
    }

    addButton(buttonElement) {
        this.buttonContainer.appendChild(buttonElement);
    }

    getForm() {
        return this.formElement;
    }
}