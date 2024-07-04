function getPost() {
    const postId = document.getElementById('inputNum').value;

    if(postId >= 1 && postId <= 100) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`HTTP errpr! status: ${response.status}`);
                }
                return response.json();
            })
            .then((post) => {
                const postContainer = document.getElementById('postContainer');
                postContainer.innerHTML=`
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <button onclick="getComments(${post.id})">Get Comments</button>
                `;
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        console.log('Невірний id поста! Введіть число від 1 до 100');
    }
}

function getComments(postId){
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`HTTP errpr! status: ${response.status}`);
                }
                return response.json();
            })
            .then((comments) => {
                const commentsContainer = document.createElement('div');
                commentsContainer.innerHTML=`
                <h3>Comments: </h3>
                <ul>
                    ${comments.map((comment) => `<li>${comment.name}: ${comment.body}</li>`).join('')}
                </ul>
                `;
                const postContainer = document.getElementById('postContainer');
                postContainer.appendChild(commentsContainer);
            })
            .catch((error) => {
                console.log(error);
            });
}