var nameInput = document.getElementById("siteName")
var urlInput = document.getElementById("siteUrl")
var addButton = document.getElementById("submitButton")
var editButton = document.getElementById("editButton")
var searchInput = document.getElementById("searchInput")
let modal = document.getElementById("modal")
let closeIcon = document.getElementById("closeIcon")
let siteList = []
let siteIndex;
let urlregex = /^(https?:\/\/)?(w{3})?\.\w+\.[A-Za-z]{2,3}$/
let nameregex = /^[a-zA-z0-9_. ]{3,15}$/

if (localStorage.getItem("sitedata")) {
    siteList = JSON.parse(localStorage.getItem("sitedata"))
    displaySite()
    favouriteSite()
}
// add site
function addSite() {
    if (siteValidate(nameInput, nameregex) && siteValidate(urlInput, urlregex)) {

        var site = {
            siteName: nameInput.value,
            url: siteUrl.value
        }
        siteList.push(site)
        localStorage.setItem("sitedata", JSON.stringify(siteList))

        displaySite()
        clearForm()

    }
    else {
        modal.classList.replace("d-none", "d-flex")
    }
    favouriteSite()


}

addButton.addEventListener("click", addSite)
document.addEventListener("keyup", function (event) {
    if (event.key == "Enter" && addButton.classList.contains("d-block")) { addSite() }
    else if (event.key == "Enter" && editButton.classList.contains("d-block")) { editSite() };
});

// display
function displaySite() {
    var temp = ""
    for (var i = 0; i < siteList.length; i++) {
        temp += `
        
        <div class="mt-4 align-items-center site-card me-lg-4 ms-md-3" >
                <div class="star"><i class="fa-regular fa-star"></i></div>
                <h4 class=" ms-2 overflow-hidden ">${siteList[i].siteName}</h4>
                <div class="icon-box">
                    <a class="text-decoration-none" href="${siteList[i].url}" target="_blank"><i class="fa-solid fa-eye"></i></a>
                    <i class="fa-solid fa-pen-to-square" onclick="updateSite(${i})"></i>
                    <i class="fa-solid fa-trash" onclick="deleteSite(${i})"></i>
                </div>
        </div>
        `

    }


    document.getElementById("siteData").innerHTML = temp


}
// delete
function deleteSite(index) {

    deleted = siteList.splice(index, 1)
    localStorage.setItem("sitedata", JSON.stringify(siteList))

    displaySite()
    favouriteSite()
    return deleted

}
// update
function updateSite(index) {
    siteIndex = index
    nameInput.value = siteList[index].siteName
    urlInput.value = siteList[index].url
    document.getElementById("editButton").classList.replace("d-none", "d-block")
    document.getElementById("submitButton").classList.add("d-none")


}
// edit

editButton.addEventListener("click", editSite)
function editSite() {
    if (siteValidate(nameInput, nameregex) && siteValidate(urlInput, urlregex)) {
        siteList[siteIndex].siteName = nameInput.value
        siteList[siteIndex].url = urlInput.value
        localStorage.setItem("sitedata", JSON.stringify(siteList))
        document.getElementById("editButton").classList.add("d-none")
        document.getElementById("submitButton").classList.remove("d-none")
        displaySite()
        clearForm()
    } else {
        modal.classList.replace("d-none", "d-flex")
    }



}
// clear form
function clearForm() {
    nameInput.value = ""
    urlInput.value = ""
    nameInput.classList.remove("is-valid")
    urlInput.classList.remove("is-valid")
}
// search

searchInput.addEventListener("keyup", siteSearch)
function siteSearch() {
    var searchValue = searchInput.value.toLowerCase()
    var temp = ""
    for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].siteName.toLowerCase().startsWith(searchValue)) {
            temp += `
        <div class="mt-4  site-card me-lg-4 me-md-5" >
                <div class="star"><i class="fa-regular fa-star" ></i></div>
                <h4 class="ms-md-5 ms-2 overflow-hidden">${siteList[i].siteName}</h4>
                <div>
                    <a class="text-decoration-none" href="${siteList[i].url}" target="_blank"><i class="fa-solid fa-eye"></i></a>
                    <i class="fa-solid fa-pen-to-square" onclick="updateSite(${i})"></i>
                    <i class="fa-solid fa-trash" onclick="deleteSite(${i})"></i>
                </div>
        </div>
        `
        }

    }

    document.getElementById("siteData").innerHTML = temp

}
// validate

nameInput.addEventListener("input", function () {
    siteValidate(nameInput, nameregex)

})
urlInput.addEventListener("input", function () {
    siteValidate(urlInput, urlregex)
})
function siteValidate(input, regex) {
    if (regex.test(input.value)) {
        input.classList.add("is-valid")
        input.classList.remove("is-invalid")

        return true


    }
    else {
        input.classList.add("is-invalid")
        input.classList.remove("is-valid")
        return false


    }

}

// clear all
function clearAll() {
    siteList = []
    localStorage.setItem("sitedata", JSON.stringify(siteList))
    displaySite()
}


// add favourite
function favouriteSite() {
    myStar = document.querySelectorAll(".fa-star")
    for (let i = 0; i < myStar.length; i++) {
        myStar[i].addEventListener("click", function (event) {
            event.currentTarget.parentNode.parentNode.classList.toggle("first-element")
            if (event.target.classList.contains("fa-regular")) {
                event.target.classList.replace("fa-regular", "fa-solid")

            }
            else {
                event.target.classList.replace("fa-solid", "fa-regular")

            }

        })



    }
}










// close Modal
function closeModal() {
    modal.classList.replace("d-flex", "d-none")
}
closeIcon.addEventListener("click", closeModal)
document.addEventListener("keyup", function (event) {
    if (event.key == "Escape") closeModal();
});
modal.addEventListener("click", function (e) {
    if (e.target.getAttribute("id") == "modal") {
        closeModal();
    }
});
