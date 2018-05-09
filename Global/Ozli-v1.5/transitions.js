function openPage(clickedElement) {
    console.log(clickedElement);
    pageContainer = clickedElement.firstElementChild;
    mainContentContainer = clickedElement.parentElement;
    console.log(mainContentContainer);

    pageContainer.classList.add("show");

    mainContentContainer.setAttribute("data-grid", "col-12 stack-3");

    clickedElement.setAttribute("data-grid", "col-12");
    clickedElement.classList.add("spanGridWidth");
}