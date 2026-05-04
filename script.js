const myLibrary = JSON.parse(localStorage.getItem("library")) || [];

function saveLibrary() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

window.addEventListener("DOMContentLoaded", () => {
    updateList();
});

const cardsGrp = document.getElementById("project-cards-grp")

function updateList() {
    cardsGrp.innerHTML = "";
    dialogImg.innerHTML = "";
    for (const book of myLibrary) {
        cardsGrp.innerHTML += `
                <div class="project-card">
                    <div class="card-img">
                        <a href="${book.link}" target="_blank"><img src="${book.image}" alt="manga-cover"></a>
                    </div>
                    <a href="${book.link}" target="_blank">
                        <h3>${book.title}</h3>
                    </a>
                    <h4>${book.author}</h4>
                    <p>${book.desc}</p>
                    <div class="card-svg-grp">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="trash-svg" id="${book.id}"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="seen-svg" ><title>eye-plus-outline</title><path d="M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C12.36,19.5 12.72,19.5 13.08,19.45C13.03,19.13 13,18.82 13,18.5C13,18.14 13.04,17.78 13.1,17.42C12.74,17.46 12.37,17.5 12,17.5C8.24,17.5 4.83,15.36 3.18,12C4.83,8.64 8.24,6.5 12,6.5C15.76,6.5 19.17,8.64 20.82,12C20.7,12.24 20.56,12.45 20.43,12.68C21.09,12.84 21.72,13.11 22.29,13.5C22.56,13 22.8,12.5 23,12C21.27,7.61 17,4.5 12,4.5M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M18,14.5V17.5H15V19.5H18V22.5H20V19.5H23V17.5H20V14.5H18Z" /></svg>
                        <a href="${book.link}" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>open-in-new</title><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg>
                        </a>
                    </div>
                </div>
        `
    }
}




function Book(title, author, desc, image, link) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.desc = desc
    this.image = image;
    this.link = link
}

function addBookToLibrary(title, author = "null", desc = "null", image = "", link) {
  const newBook = new Book(title, author, desc, image, link);
  myLibrary.push(newBook);
  saveLibrary();
}



const newMangaBtn = document.getElementById("add-new-manga");
const formDialog = document.getElementById("form-dialog");

const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const descInput = document.getElementById("desc-input");
const imageLinkInput = document.getElementById("image-link-input");
const linkInput = document.getElementById("link-input")
const addFormBtn = document.getElementById("add-form-btn")
const dialogImg = document.getElementById("dialog-img");

newMangaBtn.addEventListener("click", () => {
    formDialog.showModal()
})

formDialog.addEventListener("click", e => {
  const dialogDimensions = formDialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    formDialog.close()
  }
})

addFormBtn.addEventListener("click", (e) => {
    e.preventDefault();

    addBookToLibrary(
        titleInput.value,
        authorInput.value,
        descInput.value,
        imageLinkInput.value,
        linkInput.value
    );
    formDialog.close();

    titleInput.value = "";
    authorInput.value = "";
    descInput.value = "";
    imageLinkInput.value = "";
    linkInput.value = "";

    updateList();
    console.log(myLibrary);
});


cardsGrp.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".trash-svg");
    if (!deleteBtn) return;

    const bookId = deleteBtn.id;

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === bookId) {
            myLibrary.splice(i, 1);
            break;
        }
    }

    saveLibrary();
    updateList();
});


cardsGrp.addEventListener("click", (e) => {
    const seenBtn = e.target.closest(".seen-svg");
    if (!seenBtn) return;

    const card = e.target.closest(".project-card");
    card.classList.toggle("read");
});


imageLinkInput.addEventListener("input", () => {
    dialogImg.innerHTML += `<img src="${imageLinkInput.value}">`
})