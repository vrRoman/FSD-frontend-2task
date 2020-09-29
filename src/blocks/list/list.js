list($('.list'), '.list__checkboxes', '.list__title', 'list_expanded')




function list(dropdownElems, popupSelector, titleSelector, classNameToToggle) {
    let activeLists = []
    window.addEventListener('click', evt => {
        for (let elem of dropdownElems) {
            let inputs = elem.querySelectorAll(titleSelector)

            if (evt.composedPath().includes(inputs[0]) || evt.composedPath().includes(inputs[1]))
                if (!activeLists.includes(elem))
                    activeLists.push(elem)
        }
    })


    window.addEventListener('click', evt => {
        for (let elem of activeLists) {
            let inputs = elem.querySelectorAll(titleSelector),
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