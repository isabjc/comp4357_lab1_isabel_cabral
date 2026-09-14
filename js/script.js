/*
 * COMP4537 Lab 1 - Memory Game
 *
 * ChatGPT was used to assist with the development and explanation
 * of this assignment.
 */

import { UserInterface } from "./userInterface.js";
import { MemoryGame } from "./memoryGame.js";

const rootElement = document.getElementById("app");

const userInterface = new UserInterface(rootElement);
const memoryGame = new MemoryGame(userInterface);

userInterface.getForm().addEventListener("submit", (event) => {
    event.preventDefault();

    const numberOfButtons = userInterface.getButtonCount();

    if (!userInterface.isValidButtonCount(numberOfButtons)) {
        userInterface.showInvalidInput();
        return;
    }

    memoryGame.start(numberOfButtons);
});