const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

eventListeners();

function eventListeners()
{
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded", function()
    {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
        console.log("Filmler Yüklendi");
    });

    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);

}

function addFilm(e)
{
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === "")
    {
        UI.displayMessage("Bütün boşluklar doldurulmalıdır","danger");
        console.log("hata");
    }
    else
    {
        
        const newFilm = new Film(title,director,url);
        UI.addFilmToUI(newFilm); //arayuze ekleme
        Storage.addFilmToStorage(newFilm);//storage ekleme
        UI.displayMessage("Kayıt Başarılı","success");
        console.log("Kayıt");
    }

    UI.clearInputs(titleElement,directorElement,urlElement);
    e.preventDefault();

}

function deleteFilm(e)
{
    // console.log(e.target);
    if(e.target.id ==="delete-film")
    {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessage("Silme Başarılı","info");
    }
    e.preventDefault();
}

function clearAllFilms(){
    if(confirm("Are You Sure"))
    {
        console.log("Hii");
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();

    };


}