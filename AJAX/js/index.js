const myAPI = 'https://jsonplaceholder.typicode.com/';
const usersAPI = `${myAPI}users/`;
const usersListUl = document.querySelector('.users_list');
const infoUserBlock = document.querySelector('.info');
const input = document.querySelector('.input');
const loader = document.querySelector('.loader');
const postItems = document.querySelector('.posts');
let li;
let allUsers = [];
let userInfo = {};
let confirmID;
const oneThousand = 1000;

async function getUsersList(usersAPI) {
    spinner();

    await fetch(usersAPI)
        .then(response => response.json())
        .then(users => {
            users.forEach((item) => {
                allUsers.push(item);
            });
        }).catch(err => console.log(err));

    renderUsersList(allUsers);
}

function renderUsersList(allUsers) {
    allUsers.forEach(item => {
        usersListUl.insertAdjacentHTML('beforeend', `
    <li class='li' id=${item.id} style='width: fit-content;'>
        ${item.name}
        <a href='#' class='edit'>Edit</a>
        <span>or</span>
        <a href='#' class='delete'>Delete</a>
    </li>
    `)
    })
    li = document.querySelectorAll('.li');
}

usersListUl.addEventListener('click', (event) => {
    const rows = document.querySelectorAll('.row');
    const buttons = document.querySelector('.buttons');
    const target = event.target;

    if (target.className === 'users_list') {
        return;
    } 
    if(target.tagName === 'SPAN') {
        return;
    }

    const elementId = target.closest('li').id;
    const user = allUsers[elementId - 1];

    spinner();

    if (target.className === 'edit') {
        if (rows.length) {
            rows.forEach(item => item.remove())
            buttons.remove();
        }

        removePostsAndComments()
        renderUserInfo(user);
        addButtons();
        confirmID = user.id;

    } else if (target.className === 'delete') {
        target.closest('li').remove();

        fetch(`${usersAPI}${user.id}`, {
            method: 'DELETE'
        }).catch(err => console.log(err));

    } else if (target.id) {

        if (rows.length) {
            rows.forEach(item => item.remove())
            buttons.remove();
        }
        getPostsAndComments(target.id);
    }
    return;
})

function getPostsAndComments(id) {
    let prom = Promise.all([
        fetch(`${myAPI}posts/`),
        fetch(`${myAPI}comments/`)
    ])

    let allPosts = [];
    let allComments = [];
    let readyResp1 = false;
    let readyResp2 = false;

    prom.then(allResponses => allResponses[0].json())
        .then(posts => {
            posts.forEach(post => allPosts.push(post));
            readyResp1 = true;
            if(readyResp1 && readyResp2) {
                renderPostsAndComments(allPosts, allComments, id);
            }
        }).catch(err => console.log(err));

    prom.then(allResponses => allResponses[1].json())
        .then(comments => {
            comments.forEach(comment => allComments.push(comment))

            readyResp2 = true;
            if(readyResp1 && readyResp2) {
                renderPostsAndComments(allPosts, allComments, id);
            }

        }).catch(err => console.log(err));
}

function removePostsAndComments() {
    const renderClass = document.querySelectorAll('.render');
    if (renderClass) {
        renderClass.forEach(item => item.remove())
    }
}

function renderPostsAndComments(posts, comments, id) {
    const renderClass = document.querySelectorAll('.render');

    if (renderClass) {
        renderClass.forEach(item => item.remove());
    }

    posts.forEach(post => {

        if (post.userId === Number(id)) {
            postItems.insertAdjacentHTML('beforeend', `
                <div class='render'>
                <hr>
                <h2>Post</h2>
                <h5>Post's id: ${post.id}</h5>
                <h4>${post.title}</h4>
                <p>${post.body}</p>
                <h3>Comments</h3>
                </div>
            `)

            comments.forEach(comment => {
                if (comment.postId === post.id) {
                    postItems.insertAdjacentHTML('beforeend', `
                    <div class='render'>
                        <h5>Comment's id: ${comment.id}</h5>
                        <h4>${comment.name}</h4>
                        <span>${comment.email}</span>
                        <p>${comment.body}</p>
                    </div>
                    `)
                }
            })
        }
    })
}

function renderUserInfo(obj) {
    // eslint-disable-next-line guard-for-in
    for (let key in obj) {
        let value = obj[key];

        if (typeof value === 'object') {
            renderUserInfo(value);
        }

        if (typeof value !== 'object') {
            userInfo[key] = value;

            infoUserBlock.insertAdjacentHTML('beforeend', `
                <tr class='row'>
                    <td style='padding: 0 50px;'>${key}</td>
                    <td>
                        <input class='input' id='${key}' onchange='editUserInfo(this.id, this.value)' value='${value}'>
                    </td>
                </tr>
                `)
        }
    }
}

function editUserInfo(key, value) {
    userInfo[key] = value;
}

function addButtons() {
    infoUserBlock.insertAdjacentHTML('beforeend', ` 
    <div class='buttons' style='padding-left: 50px;'>
        <button class='confirm'>CONFIRM</button>
        <button class='cancel'>CANCEL</button>
    </div>
    `)
}

infoUserBlock.addEventListener('click', event => {

    if (event.target.className === 'confirm') {
        allUsers.map(item => {
            if (item.id === confirmID) {
                item.name = userInfo.name;
            }

            return item;
        })

        li.forEach(item => item.remove());
        renderUsersList(allUsers);
        spinner()
        updateUserInfo();
        hideUserInfo()

    } else if (event.target.className === 'cancel') {
        hideUserInfo()
    }
})

function updateUserInfo() {
    fetch(`${usersAPI}${confirmID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    }).catch(err => console.log(err));
}

function hideUserInfo() {
    const rows = document.querySelectorAll('.row');
    const buttons = document.querySelector('.buttons');
    buttons.remove();
    rows.forEach(item => item.remove());
}

function spinner() {
    loader.classList.add('show-spinner');
    setTimeout(() => loader.classList.remove('show-spinner'), oneThousand);
}

let result = getUsersList(usersAPI)


// 1) получить список пользователей GET / users
// 2) Отображать их в виде списка с возможностью редактирования.

// 3) По завершении редактирования обновите пользователя на сервере (вызовите метод PUT)
//   PUT / пользователь / $ {id}
// 4) Добавить возможность удаления пользователя DELETE / user / $ {id}
// 5) Показывать счетчик при каждом вызове запроса
// 6) Когда вы нажимаете на имя пользователя, перенаправляйте и отображайте сообщения пользователей с его
//   комментарий (необходимо сделать 2 параллельных вызова) GET / posts и GET / comments. И
//   показать это.
