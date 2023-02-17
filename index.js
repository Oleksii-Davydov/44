
const API = "https://jsonplaceholder.typicode.com";
const controller = action => fetch(action)
    .then(data => data.json())
    .catch(error => alert(error.message))

const form = document.querySelector(".form")
const cardPublish = document.querySelector(".publish-container")
const commentsContainer = document.querySelector(".comments-container")


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
    btnComments.addEventListener("click", () => {
        addComments()
    })

    // добавляем со внутрь
    cardPublish.append(postTitle)
    cardPublish.append(postBody)
    cardPublish.append(btnComments)

///
    function getCommit() {
        const inputValue = document.getElementById("tentacles").value;
        console.log(inputValue)
        controller(`${API}/comments/${inputValue}`)
            .then(data => addComments(data) )
            .catch(error => alert(error.message))
    }

    getCommit()

}

function addComments(comments) {

    const authorComment = document.createElement("h4");
    const commentBody = document.createElement("p");

    authorComment.classList.add("author-comment");
    commentBody.classList.add("comment-body")

    authorComment.innerText = ucFirst(comments.name)
    commentBody.innerText = ucFirst(comments.body)

    commentsContainer.append(authorComment)
    commentsContainer.append(commentBody)
}

