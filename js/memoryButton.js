/*
 * ChatGPT was used to assist with the development and explanation
 * of this COMP4537 Lab 1 assignment.
 */

export class MemoryButton {
    constructor(number, color) {
        this.number = number;
        this.color = color;
        this.element = document.createElement("button");

        this.createButton();
    }

    createButton() {
        this.element.classList.add("memory-button");
        this.element.textContent = this.number;
        this.element.style.backgroundColor = this.color;
        this.element.disabled = true;
    }

    showNumber() {
        this.element.textContent = this.number;
    }

    hideNumber() {
        this.element.textContent = "";
    }

    enable() {
        this.element.disabled = false;
    }

    disable() {
        this.element.disabled = true;
    }

    setPosition(x, y) {
        this.element.style.position = "fixed";
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    resetPosition() {
        this.element.style.position = "static";
        this.element.style.left = "";
        this.element.style.top = "";
    }

    getElement() {
        return this.element;
    }
}