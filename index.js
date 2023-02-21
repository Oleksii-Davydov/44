const API = "https://jsonplaceholder.typicode.com";
const controller = (action, collbak) => fetch(action)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => collbak(data))
    .catch(error => alert(error))

const form = document.querySelector(".form")
const cardPublish = document.querySelector(".publish-container")

form.addEventListener("submit", e => {
    e.preventDefault()

    function getPost() {
        const inputValue = document.getElementById("tentacles").value;
        controller(`${API}/posts/${inputValue}`, publishPost)

    }

    getPost()

})
function ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}
function publishPost(post) {
    if (post === undefined) {
        return
    }
    const postTitle = document.createElement("h2");
    const postBody = document.createElement("p");
    const btnComments = document.createElement("button");
    btnComments.id = post.id
    const commentsContainer = document.createElement("div");
    commentsContainer.id = "comment-container" + post.id

    postTitle.classList.add("card-title");
    postBody.classList.add("card-body")
    btnComments.classList.add("card-btn")

    postTitle.innerText = ucFirst(post.title)
    postBody.innerText = ucFirst(post.body)
    btnComments.innerText = "Comments"

    cardPublish.append(postTitle)
    cardPublish.append(postBody)
    cardPublish.append(btnComments)
    cardPublish.append(commentsContainer)
    btnComments.addEventListener("click", e => {
        e.preventDefault()
        function getComments() {

            controller(`${API}/comments?postId=${e.target.id}`, addComments)

        }

        getComments()

        function addComments(comments) {
            comments.forEach(comment => {
                const authorComment = document.createElement("h4");
                const commentBody = document.createElement("p");

                authorComment.classList.add("author-comment");
                commentBody.classList.add("comment-body")

                authorComment.innerText = ucFirst(comment.name)
                commentBody.innerText = ucFirst(comment.body)

                commentsContainer.append(authorComment)
                commentsContainer.append(commentBody)

            })
        }
    })
}
