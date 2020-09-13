function dropdown(elem, popup, className) {
    window.onclick = evt => {
        if (evt.composedPath().includes(popup)) return
        else if (evt.composedPath().includes(elem))
            popup.classList.toggle(className)
        else popup.classList.remove(className)
    }
}