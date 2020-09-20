export const dropdown = (dropdownElems, popupSelector, inputSelector, classNameToToggle) => {
    window.onclick = evt => {
        for (let elem of dropdownElems) {
            let input = elem.querySelector(inputSelector),
                popup = elem.querySelector(popupSelector)

            if (evt.composedPath().includes(popup))
                return

            else if (evt.composedPath().includes(input))
                elem.classList.toggle(classNameToToggle)

            else
                elem.classList.remove(classNameToToggle)
        }
    }
}


export const countedItems = (dropdownElems, textSelector, itemSelector,
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