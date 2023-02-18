
const API = "https://jsonplaceholder.typicode.com";
const controller = action => fetch(action)
    .then(data => data.json())
    .catch(error => alert(error.message))

const form = document.querySelector(".form")
const cardPublish = document.querySelector(".publish-container")
const btnComments = document.createElement("button");




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
    // const btnComments = document.createElement("button");
    // добавляем классы к елементам
    postTitle.classList.add("card-title");
    postBody.classList.add("card-body")
    btnComments.classList.add("card-btn")
    btnComments.id = "btn-com"
    // что именно лежит в елементе
    postTitle.innerText = ucFirst(post.title)
    postBody.innerText = ucFirst(post.body)
    btnComments.innerText = "Comments"
    // btnComments.addEventListener("click", () => {
    //     addComments()
    // })

    // добавляем со внутрь
    cardPublish.append(postTitle)
    cardPublish.append(postBody)
    cardPublish.append(btnComments)



}



function addComments(comments) {
   // const btnComments = document.createElement("button");
    btnComments.addEventListener("click", () => {

        const authorComment = document.createElement("h4");
        const commentBody = document.createElement("p");

        authorComment.classList.add("author-comment");
        commentBody.classList.add("comment-body")

        authorComment.innerText = ucFirst(comments.name)
        commentBody.innerText = ucFirst(comments.body)

        cardPublish.append(authorComment)
        cardPublish.append(commentBody)
    })


}

function getCommit() {
    const inputValue = document.getElementById("tentacles").value
    controller(`${API}/comments?postId=3`)//.then(data => addComments(data) )
        .then(data => {
            data.forEach(comment => addComments(comment));
        })
        .catch(error => alert(error.message))
}

getCommit()



