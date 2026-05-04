const myLibrary = [];

function Book(title, author, desc, image, link) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }

    this.title = title;
    this.author = author;
    this.desc = desc
    this.image = image;
    this.link = link
}

function addBookToLibrary(obj) {
  myLibrary.push(obj)
}

const newMangaBtn = document.getElementById("add-new-manga");
const formDialog = document.getElementById("form-dialog");

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