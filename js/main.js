const elList = document.querySelector(".hero__wrap-list");
const temp = document.querySelector(".hero__wrap-temp").content;
const fragment = document.createDocumentFragment();
const btnList = document.querySelector(".site-header__btn-list");
const modalList = document.querySelector(".modal-body");
const modaltepm = document.querySelector(".modal-temp").content;
const serachForm = document.querySelector(".hero__form");

//  SEARCH : EPIZODE,CHARAKTER, LOCATION
function searchItem(arr, node,func) {
    node.innerHTML = "";
    serachForm.addEventListener("keyup", evt => {
        evt.preventDefault();
        const searchItemLetters = serachForm.children[0].value.toLowerCase();
        const searchedArr = arr.filter(item => item.name.toLowerCase().startsWith(searchItemLetters));
        func(searchedArr, node);
    })
}
// SEARCH : QUOTE
function searchItemForqupte(arr, node) {
    node.innerHTML = "";
    serachForm.addEventListener("keyup", evt => {
        evt.preventDefault();
        const searchItemLetters = serachForm.children[0].value.toLowerCase();
        const searchedArr = arr.filter(item => item.by.toLowerCase().startsWith(searchItemLetters));
        render4(searchedArr, node);
    })
}
//GETDATE BY EPIZODE
async function getDate(url) {
    try {
        const response = await fetch(url);
        const date = await response.json();
        searchItem(date,elList,render1)
        render1(date, elList);
    } catch (error) {
        console.log(error);
    }
}
getDate("https://finalspaceapi.com/api/v0/episode")
//GETDATE BY CHARACTER
async function getDate2(url) {
    try {
        const res = await fetch(url);
        const date = await res.json();
        searchItem(date,elList,render2)
        render2(date, elList)
        modalFind(date)
    } catch (error) {
      console.log(error);
    }
}
//GETDATE BY LOCATION
async function getDate3(url) {
    try {
        const res = await fetch(url);
        const date = await res.json();
        searchItem(date,elList,render3)
        render3(date, elList);
        modalFind(date)
    } catch (error) {
        console.log(error);
    }
}

//GETDATE BY QUOTE
async function getDate4(url) {
    try {
        const res = await fetch(url);
        const date = await res.json();
        searchItemForqupte(date,elList)
        render4(date, elList);
        modalFind(date)
    } catch (error) {
        console.log(error);
    }
}
//RENDER FOR EPIZODE
function render1(arr,node) {
    node.innerHTML = "";
    arr.forEach(item => {
        const tempClone = temp.cloneNode(true);
        tempClone.querySelector(".hero__item-img").src = item.img_url;
        tempClone.querySelector(".hero__item-title").textContent = item.name;
        tempClone.querySelector(".hero__item-auther").innerHTML =`<strong>writter:</strong> ${item.writer}`;
        tempClone.querySelector(".hero__item-director").innerHTML = `<strong>director:</strong> ${item.director}`;
        tempClone.querySelector(".hero__item-airdate").innerHTML = `<strong>air_date:</strong> ${item.air_date}`;
        fragment.appendChild(tempClone)
    });
    node.appendChild(fragment);
    
}
//RENDER FOR CHARACTER
function render2(arr,node) {
    node.innerHTML = "";
    arr.forEach(item => {
        const liElement = document.createElement("li");
        liElement.classList.add("hero__wrap-item");
        
        const imgElement = document.createElement("img");
        imgElement.classList.add("hero__item2-img");
        imgElement.src = item.img_url;
        imgElement.alt = item.name;

        const titleElement = document.createElement("strong");
        titleElement.classList.add("hero__item-title");
        titleElement.textContent = item.name;
        
        const modalBtn = document.createElement("button");
        modalBtn.textContent = "more";
        modalBtn.dataset.id = item.id;
        modalBtn.classList.add("hero__item-btn");
        modalBtn.setAttribute("data-bs-toggle", "modal");
        modalBtn.setAttribute("data-bs-target", "#exampleModal");
            
        liElement.append(imgElement, titleElement, modalBtn);
        fragment.append(liElement)
    })
    node.append(fragment);
}
//RENDER FOR LOCATION
function render3(arr,node) {
    node.innerHTML = "";
    arr.forEach(item => {
        const liElement = document.createElement("li");
        liElement.classList.add("hero__wrap-item","hero__wrap-item--location");

        const imgElement = document.createElement("img");
        imgElement.classList.add("hero__location-img");
        imgElement.src = item.img_url;
        imgElement.alt = item.name;
        
        const titleElement = document.createElement("strong");
        titleElement.classList.add("hero__location-title")
        titleElement.textContent = item.name;
        const typeElement = document.createElement("p");
        typeElement.classList.add("hero__location-type");
        typeElement.innerHTML = `<strong>type:</strong> ${item.type}`;

        liElement.append(imgElement,titleElement,typeElement)
        fragment.appendChild(liElement)
    });

    node.appendChild(fragment);
}
//RENDER FOR QUOTE
function render4(arr, node) {
    node.innerHTML = "";
    arr.filter(item => item.image).forEach(item => {
        // console.log(item);
        const liElement = document.createElement("li");
        liElement.classList.add("hero__wrap-item","hero__wrap-item--quote");

        const imgElement = document.createElement("img");
        imgElement.classList.add("hero__location-img","hero__item-qoute-img");
        imgElement.src = item.image;
        imgElement.alt = item.by;
        const userElement = document.createElement("p");
        userElement.classList.add("hero__location-type");
        userElement.innerHTML = `<strong>by:</strong> ${item.by}`;

        const btnElement = document.createElement("button");
        btnElement.textContent = "quote";
        btnElement.classList.add("hero__item-quote-btn");
        btnElement.setAttribute("data-bs-toggle", "modal");
        btnElement.setAttribute("data-bs-target", "#exampleModal");
        btnElement.dataset.id = item.id;

        liElement.append(imgElement,userElement,btnElement)
        fragment.appendChild(liElement)
    });
    node.appendChild(fragment)
}
//FIND ITEM FUNCTION FOR MODAL
function modalFind(arr) {
    elList.addEventListener("click", evt => {
        if (evt.target.matches(".hero__item-btn")) {
            modalList.innerHTML = "";
            const findItem = arr.find(item => item.id == evt.target.dataset.id);
            const modaltitle = document.querySelector(".modal-title").textContent = findItem.name;
            const modaltepmClone = modaltepm.cloneNode(true);
            modaltepmClone.querySelector(".js-species").innerHTML = `<strong>species:</strong> ${findItem.species}`;
            modaltepmClone.querySelector(".js-status").innerHTML = `<strong>status:</strong> ${findItem.status}`;
            modaltepmClone.querySelector(".js-gender").innerHTML = `<strong>gender:</strong> ${findItem.gender}`;
            modaltepmClone.querySelector(".js-hair").innerHTML = `<strong>hair:</strong> ${findItem.hair}`;
            modaltepmClone.querySelector(".js-origin").innerHTML = `<strong>origin:</strong> ${findItem.origin}`;

            modalList.appendChild(modaltepmClone)
        }
        if (evt.target.matches(".hero__item-quote-btn")) {
            console.log(45);
            modalList.innerHTML = "";
            const modaltitle = document.querySelector(".modal-title").textContent ="Quote:"
            const findItem = arr.find(item => item.id == evt.target.dataset.id);
            console.log(findItem);
            const descElement = document.createElement("p");
            descElement.innerHTML =findItem.quote
            modalList.appendChild(descElement)
        }
        
    })

}


//BTN LIST LISTENINIG
btnList.addEventListener("click", evt => {
    if (evt.target.matches(".js-btn-character")) {
        getDate2("https://finalspaceapi.com/api/v0/character")
    }
    if (evt.target.matches(".js-btn-episode")) {
        getDate("https://finalspaceapi.com/api/v0/episode")
    }
    if (evt.target.matches(".js-btn-location")) {
        getDate3("https://finalspaceapi.com/api/v0/location")
    }
    if (evt.target.matches(".js-btn-quote")) {
        getDate4("https://finalspaceapi.com/api/v0/quote")
    }
})