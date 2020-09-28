const dropdown = (dropdownElems, popupSelector, inputSelector, classNameToToggle) => {
    window.addEventListener('click', evt => {
        for (let elem of dropdownElems) {
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
}


const countedItems = (dropdownElems, textSelector, itemSelector,
                             addBtnSelector, removeBtnSelector,
                             nameSelector, valueSelector, inactiveBtnClass = '', maxLength = 27) => {
    for (let dropdown of dropdownElems) {
        let textElem = dropdown.querySelector(textSelector),
            items = dropdown.querySelectorAll(itemSelector),
            defaultText = textElem.innerText,

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
            }

            _counter ++
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
        '.dropdown__input', 'dropdown_expanded')

    countedItems($('.dropdown'), '.dropdown__text', '.items-popup__item',
        '.items-popup__add-value', '.items-popup__remove-value',
        '.items-popup__title', '.items-popup__value h3', 'items-popup__change-value_inactive')

    dropdown($('.date-picker'), '.ui-datepicker-inline',
        '.date-picker__date', 'date-picker_expanded')
})