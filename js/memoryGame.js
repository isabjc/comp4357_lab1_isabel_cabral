import { MemoryButton } from "./memoryButton.js";

export class MemoryGame {
    constructor(userInterface) {
        this.userInterface = userInterface;

        this.buttons = [];
        this.expectedButton = 1;
        this.buttonCount = 0;
        this.scrambleCount = 0;

        this.scrambleTimer = null;
        this.startTimer = null;

        this.MIN_COLOR_VALUE = 0;
        this.MAX_COLOR_VALUE = 255;
        this.SCRAMBLE_INTERVAL = 2000;
        this.MILLISECONDS_PER_SECOND = 1000;
    }

    start(numberOfButtons) {
        this.resetGame();

        this.buttonCount = numberOfButtons;

        this.createButtons();
        this.scheduleScrambling();
    }

    resetGame() {
        this.clearTimers();

        this.buttons = [];
        this.expectedButton = 1;
        this.buttonCount = 0;
        this.scrambleCount = 0;

        this.userInterface.clearMessage();
        this.userInterface.clearButtons();
    }

    clearTimers() {
        if (this.startTimer !== null) {
            clearTimeout(this.startTimer);
            this.startTimer = null;
        }

        if (this.scrambleTimer !== null) {
            clearInterval(this.scrambleTimer);
            this.scrambleTimer = null;
        }
    }

    createButtons() {
        for (let i = 1; i <= this.buttonCount; i++) {
            const color = this.generateRandomColor();
            const memoryButton = new MemoryButton(i, color);

            this.buttons.push(memoryButton);
            this.userInterface.addButton(memoryButton.getElement());
        }
    }

    generateRandomColor() {
        const red = this.getRandomInteger(
            this.MIN_COLOR_VALUE,
            this.MAX_COLOR_VALUE
        );

        const green = this.getRandomInteger(
            this.MIN_COLOR_VALUE,
            this.MAX_COLOR_VALUE
        );

        const blue = this.getRandomInteger(
            this.MIN_COLOR_VALUE,
            this.MAX_COLOR_VALUE
        );

        return `rgb(${red}, ${green}, ${blue})`;
    }

    getRandomInteger(minimum, maximum) {
        return Math.floor(
            Math.random() * (maximum - minimum + 1)
        ) + minimum;
    }

    scheduleScrambling() {
        const pauseTime =
            this.buttonCount * this.MILLISECONDS_PER_SECOND;

        this.startTimer = setTimeout(() => {
            this.scrambleButtons();

            this.scrambleCount++;

            if (this.scrambleCount === this.buttonCount) {
                this.finishScrambling();
                return;
            }

            this.scrambleTimer = setInterval(() => {
                this.scrambleButtons();

                this.scrambleCount++;

                if (this.scrambleCount === this.buttonCount) {
                    clearInterval(this.scrambleTimer);
                    this.scrambleTimer = null;

                    this.finishScrambling();
                }
            }, this.SCRAMBLE_INTERVAL);
        }, pauseTime);
    }

    scrambleButtons() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        for (const memoryButton of this.buttons) {
            const element = memoryButton.getElement();

            const buttonWidth = element.offsetWidth;
            const buttonHeight = element.offsetHeight;

            const maximumX = Math.max(
                0,
                windowWidth - buttonWidth
            );

            const maximumY = Math.max(
                0,
                windowHeight - buttonHeight
            );

            const randomX = this.getRandomInteger(0, maximumX);
            const randomY = this.getRandomInteger(0, maximumY);

            memoryButton.setPosition(randomX, randomY);
        }
    }

    finishScrambling() {
        for (const memoryButton of this.buttons) {
            memoryButton.hideNumber();
            memoryButton.enable();

            memoryButton.getElement().addEventListener(
                "click",
                () => this.handleButtonClick(memoryButton),
                { once: true }
            );
        }
    }

    handleButtonClick(memoryButton) {
        if (memoryButton.number !== this.expectedButton) {
            this.userInterface.showWrongOrder();
            this.revealAllButtons();
            this.disableAllButtons();

            return;
        }

        memoryButton.showNumber();
        memoryButton.disable();

        this.expectedButton++;

        if (this.expectedButton > this.buttonCount) {
            this.userInterface.showExcellentMemory();
            this.disableAllButtons();
        }
    }

    revealAllButtons() {
        for (const memoryButton of this.buttons) {
            memoryButton.showNumber();
        }
    }

    disableAllButtons() {
        for (const memoryButton of this.buttons) {
            memoryButton.disable();
        }
    }
}