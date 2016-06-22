var descriptionDiv = document.getElementById("description-wrap");
var closeButton = descriptionDiv.firstElementChild;
closeButton.addEventListener("click", function (e) {
    e.preventDefault();
    descriptionDiv.parentElement.removeChild(descriptionDiv);
    return false;
});