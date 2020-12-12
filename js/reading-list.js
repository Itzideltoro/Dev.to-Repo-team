//Request de GET a AJAX
const getTheJson = () => {
    $.ajax({
        url: "https://desafio-esp-js-default-rtdb.firebaseio.com/post/.json",
        method: "GET",
        success: data => {
            getReadingPost(data)
        },
        error: error => {
            console.log(error)
        },
    });
}


//Getting ReadingSave
const getReadingPost = (theJson) => {
    $.ajax({
        url: "https://desafio-esp-js-default-rtdb.firebaseio.com/readinglist/.json",
        method: "GET",
        success: data => {
            fillReadingTable(data,theJson)
            console.log(data)
        },
        error: "",
    });
}

const fillReadingTable = (savedPost,allPost) => {
    $(".container-reading").empty()
    let i = 10
    for(key2 in savedPost) {
        let thePost = savedPost[key2]
        let theObject = allPost[thePost]
        let { title, username, datetime, tags } = theObject
        tags = tags.split(",")
        let post = `
            <div class="imgh mb-4 pd-4 mt-4">
                <a class="htext hover d-flex">
                    <img class="imag-user2 img-fluid rounded-circle mr-3" src="https://picsum.photos/id/${i}/200" alt="" />
                    <div class="postread">
                        <h5 class="post1i mb-1">${title}</h5>
                        <p class="post2i">${username} - ${datetime} ${tags[0]} ${tags[1]} ${tags[2]}</p>
                    </div>
                    </a>
                    </div>
                    `
        $(".container-reading").append(post)
        i++
    }
}

getTheJson()