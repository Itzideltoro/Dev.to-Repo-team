

let post = {
    title: "",
    username: "",
    datetime:"",
    tags:""
}

//Listener para botones Save
const addBtnListener = () => {
    let buttons = document.querySelectorAll(".botonsave")
    console.log(buttons)
    buttons.forEach( button => {
        button.addEventListener("click", event => {
            console.log(event)
            console.log(event.target)
            console.log(event.target.dataset)
            console.log(event.target.dataset.entryKey)
        
            let entryKey = event.target.dataset.entryKey
            savePost(entryKey)
        })
    })
}

const savePost = savedPosts => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //xhttp.responseText;
           let response = JSON.parse(xhttp.response);
           console.log(response)
           /*getItems()*/
        }
    };
    // xhttp.open("POST", "https://ajaxclass-1ca34.firebaseio.com/carlosv/koders/.json ",true);
    xhttp.open("POST", "https://desafio-esp-js-default-rtdb.firebaseio.com/readinglist/.json ",true);
    xhttp.send( JSON.stringify( savedPosts ) );
}

const printPosts = posts => {
    let dataTable = document.getElementById("posts-table")
    dataTable.innerHTML = ""
    for( post in posts ){
        let postObject = posts[post]
        let { title, username, datetime, tags } = postObject
        let dataTable = document.getElementById("posts-table")
        currentContent = dataTable.innerHTML
        let newContent = `
                <tr>
                    <td>${title}</td></td>
                    <td>${username}</td>
                    <td>${datetime}</td>
                    <td>${tags}</td>
                    <td>
                        <div id="archive-button" class="btn btn-danger btn-archive" data-entry-key=${post}>Archive</div>
                    </td>
                </tr>
            `
        dataTable.innerHTML = currentContent + newContent
    }
    addBtnListenerArchive()
}
/* GET */
const getPosts = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //xhttp.responseText;
           let response = JSON.parse(xhttp.response);
           console.log(response)
           printPosts( response )
        }
    };
    // xhttp.open("GET", "https://ajaxclass-1ca34.firebaseio.com/carlosv/koders/.json ",true);
    xhttp.open("GET", `https://desafio-esp-js-default-rtdb.firebaseio.com/readinglist/.json `,true);
    xhttp.send();
}


//Listener para botones Archive
const addBtnListenerArchive = () => {
    let buttons = document.querySelectorAll(".btn-archive")
    console.log(buttons)
    buttons.forEach( button => {
        button.addEventListener("click", event => {
            console.log(event)
            console.log(event.target)
            console.log(event.target.dataset)
            console.log(event.target.dataset.entryKey)
        
            let entryKey = event.target.dataset.entryKey
            archivePost(entryKey)
        })
    })
}

/* DELETE */
const archivePost = entryKey => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //xhttp.responseText;
           let response = JSON.parse(xhttp.response);
           console.log(response)
           getPosts()
        }
    };
    // xhttp.open("DELETE", "https://ajaxclass-1ca34.firebaseio.com/carlosv/koders/.json ",true);
    xhttp.open("DELETE", `https://desafio-esp-js-default-rtdb.firebaseio.com/readinglist/${entryKey}/.json `,true);
    xhttp.send();
}
document.getElementById("archive-button").addEventListener("click", archivePost )
/*----*/
    getPosts()
