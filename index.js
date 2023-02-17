const API = "https://jsonplaceholder.typicode.com"
const controller = action => fetch(action)
    .then(data => data.json())
    .catch(error => alert(error.message))

const form = document.querySelector(".form")
const cardPublish = document.querySelector(".publish-container")

form.addEventListener("submit", e => {
    e.preventDefault()

    function getPost() {
        const inputValue = document.getElementById("tentacles").value;
        console.log(inputValue)
        controller(`${API}/posts/${inputValue}`)
            .then(data => publishPost(data));
    }

    getPost()

})

// функция первая буква заглавная
function ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}

// функция опубликовать на странице пост
function publishPost(post) {
    // создаем елементы
    const postTitle = document.createElement("h2");
    const postBody = document.createElement("p");
    const btnComments = document.createElement("button");
    // добавляем классы к елементам
    postTitle.classList.add("card-title");
    postBody.classList.add("card-body")
    btnComments.classList.add("card-btn")
    btnComments.id = "btn-com"
    // что именно лежит в елементе
    postTitle.innerText = ucFirst(post.title)
    postBody.innerText = ucFirst(post.body)
    btnComments.innerText = "Comments"
    // добавляем со внутрь
    cardPublish.append(postTitle)
    cardPublish.append(postBody)
    cardPublish.append(btnComments)


    function getCommit() {
        const inputValueCommit = document.getElementById("btn-com").value;
        ;
        console.log(inputValueCommit)
        controller(`${API}/commit`)
            .then(data => console.log(data))
            .catch(error => alert(error.message))
    }

    getCommit()

}


// function requestData(method, action, callback) {
//     const xml = new XMLHttpRequest();
//     xml.open(method, action);
//     xml.send();
//     let parse = response => JSON.parse(response);
//     xml.addEventListener("readystatechange", () => {
//         if (xml.readyState === 4 && xml.status === 200) {
//             const response = parse(xml.responseText).children;
//             data = data.concat(response);
//             //if (typeof callback === 'function') {
//                 callback(data);
//             //}
//         }
//     })
// }
//
// const renderElem = function (response) {
//     console.log(response);
// }
//
// requestData("GET", `${"request/data.json"}`);
// requestData("GET", "request/data2.json", renderElem);

