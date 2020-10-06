class Calculator {
    constructor(beforeTextElement, nowTextElement) {
        this.beforeTextElement = beforeTextElement
        this.nowTextElement = nowTextElement
        this.clear()
    }

    clear() {
        this.now = '0'
        this.before = ''
        this.operation = undefined
    }

    clearEntry() {
        this.now = '0'
    }

    delete() {
        this.now = this.now.toString().slice(0,-1)
        if(this.now === ''){
            this.now = '0'
        }
    }

    appendNumber(number) {
        if(number === '.' && this.now.includes('.')) return
        if(number === '±' && this.now === '') return
        if(number === '±'){
            this.now = this.now*(-1)
            return
        }
        if(this.now === '0'){
            this.now = number.toString()
            return
        }
        this.now = this.now.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.now === '') return
        if(this.before !== ''){
            this.compute()
        }
        this.operation = operation
        this.before = this.now
        this.now = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.before)
        const current = parseFloat(this.now)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '✕':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.now = computation
        this.operation = undefined
        this.before = ''
    }

    updateDisplay() {
        this.nowTextElement.innerText = this.now
        if(this.operation != null) {
            this.beforeTextElement.innerText = 
            `${this.before} ${this.operation}`
        } else {
            this.beforeTextElement.innerText = ''
        }
    }

}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const beforeTextElement = document.querySelector('[data-before]')
const nowTextElement = document.querySelector('[data-now]')
const clearEntryButton = document.querySelector('[data-clear-entry]')

const calculator = new Calculator(beforeTextElement, nowTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

clearEntryButton.addEventListener('click', button => {
    calculator.clearEntry()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})