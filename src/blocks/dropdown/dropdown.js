const dropdown = (dropdownElems, popupSelector, inputSelector, classNameToToggle,
                  applyBtnSelector) => {
    let activeDropdowns = []
    window.addEventListener('click', evt => {
        for (let elem of dropdownElems) {
            let inputs = elem.querySelectorAll(inputSelector)

            if (evt.composedPath().includes(inputs[0]) || evt.composedPath().includes(inputs[1]))
                if (!activeDropdowns.includes(elem))
                    activeDropdowns.push(elem)
        }
    })


    window.addEventListener('click', evt => {
        for (let elem of activeDropdowns) {
            let inputs = elem.querySelectorAll(inputSelector),
                popup = elem.querySelector(popupSelector)

            if (evt.composedPath().includes(popup))
                return

            else if (evt.composedPath().includes(inputs[0]) || evt.composedPath().includes(inputs[1]))
                elem.classList.toggle(classNameToToggle)

            else
                elem.classList.remove(classNameToToggle)
        }
    })

    if (applyBtnSelector) {
        for (let elem of dropdownElems) {
            const applyBtn = elem.querySelector(applyBtnSelector)

            applyBtn.onclick = () => {
                elem.classList.remove(classNameToToggle)
            }
        }
    }
}


const countedItems = (dropdownElems, textSelector, itemSelector,
                             addBtnSelector, removeBtnSelector,
                             nameSelector, valueSelector, clearBtnSelector, clearBtnDisabledClass,
                             inactiveBtnClass = '', defaultElemText = false, maxLength = 27) => {
    for (let dropdown of dropdownElems) {
        let textElem = dropdown.querySelector(textSelector),
            items = dropdown.querySelectorAll(itemSelector),
            defaultText = defaultElemText ? defaultElemText : textElem.innerText,

            clearBtn = dropdown.querySelector(clearBtnSelector),

            itemsInfo = [],
            _counter = 0
        

        for (let item of items) {
            let addBtn = item.querySelector(addBtnSelector),
                removeBtn = item.querySelector(removeBtnSelector),
                nameElem = item.querySelector(nameSelector),
                valueElem = item.querySelector(valueSelector),

                itemNum = _counter

            itemsInfo.push({
                name: nameElem.innerText.toLowerCase(),
                value: Number(valueElem.innerText)
            })

            let sumOfValues = 0
            for (let i = 0; i <= itemsInfo.length - 1; i++) {
                sumOfValues += itemsInfo[i].value
            }
            if (sumOfValues === 0) {
                clearBtn.classList.add(clearBtnDisabledClass)
            }

            if (itemsInfo[itemNum].value === 0) {
                if (inactiveBtnClass) removeBtn.classList.add(inactiveBtnClass)
            }

            addBtn.onclick = () => {
                if (itemsInfo[itemNum].value >= 0) {
                    if (inactiveBtnClass) removeBtn.classList.remove(inactiveBtnClass)
                }

                itemsInfo[itemNum].value ++

                let fullText = ''
                for (let item of itemsInfo) {
                    if (item.value !== 0) {
                        fullText += item.value + ' ' + item.name + ', '
                    }
                }
                fullText = fullText.slice(0, -2)

                if (fullText === '') {
                    fullText = defaultText
                }

                changeValue(itemsInfo[itemNum].value, textElem, valueElem, fullText.toLowerCase(), maxLength)

                clearBtn.classList.remove(clearBtnDisabledClass)
            }
            removeBtn.onclick = () => {
                if (itemsInfo[itemNum].value === 0) return

                if (itemsInfo[itemNum].value === 1) {
                    if (inactiveBtnClass) removeBtn.classList.add(inactiveBtnClass)
                }

                itemsInfo[itemNum].value --

                let fullText = ''
                for (let item of itemsInfo) {
                    if (item.value !== 0) {
                        fullText += item.value + ' ' + item.name + ', '
                    }
                }
                fullText = fullText.slice(0, -2)

                if (fullText === '') {
                    fullText = defaultText
                }

                changeValue(itemsInfo[itemNum].value, textElem, valueElem, fullText, maxLength)

                let sumOfValues = 0
                for (let i = 0; i <= itemsInfo.length - 1; i++) {
                    sumOfValues += itemsInfo[i].value
                }
                if (sumOfValues === 0) {
                    clearBtn.classList.add(clearBtnDisabledClass)
                }
            }

            _counter ++
        }

        clearBtn.onclick = () => {
            _counter = 0
            for (let item of items) {
                let itemNum = _counter,
                    removeBtn = item.querySelector(removeBtnSelector),
                    valueElem = item.querySelector(valueSelector)

                itemsInfo[itemNum].value = 0

                if (inactiveBtnClass) removeBtn.classList.add(inactiveBtnClass)

                changeValue(itemsInfo[itemNum].value, textElem, valueElem, defaultText, maxLength)

                _counter ++
            }
            clearBtn.classList.add(clearBtnDisabledClass)
        }
    }

    function changeValue(newValue, textElem, valueElem, fullText, maxLength = 27) {
        if (fullText.length > maxLength) {
            fullText = (fullText.slice(0, maxLength) + '...').toLowerCase()
        }

        textElem.innerText = fullText
        valueElem.innerText = newValue
    }
}



$(document).ready(() => {
    dropdown($('.dropdown'), '.dropdown__popup',
        '.dropdown__input', 'dropdown_expanded', '.items-popup__confirm')

    countedItems($('.dropdown.facilities-dropdown'), '.dropdown__text', '.items-popup__item',
        '.items-popup__add-value', '.items-popup__remove-value',
        '.items-popup__title', '.items-popup__value h3',
        '.items-popup__clear', 'items-popup__clear_disabled',
        'items-popup__change-value_inactive')

    countedItems($('.dropdown:not(.facilities-dropdown)'), '.dropdown__text', '.items-popup__item',
        '.items-popup__add-value', '.items-popup__remove-value',
        '.items-popup__title', '.items-popup__value h3',
        '.items-popup__clear', 'items-popup__clear_disabled',
        'items-popup__change-value_inactive', 'Сколько гостей')

    dropdown($('.date-picker'), '.ui-datepicker-inline',
        '.date-picker__date', 'date-picker_expanded', false)
})