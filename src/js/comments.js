
const commentSection = (count, comments) => `<header>
    <h2>${count} Comments</h2>
    <div class="sortContainer">
        <span>Sort</span>
        <ul>
            <li class="likesBtn" tabindex="0" role="button">Likes</li>
        </ul>
    </div>
</header>
${comments}`;



const comment = ({ name, body, likes }) => `<article>
<section>
    <h3>${name}</h3>
    <span class="comment">${body}</span>
</section>
<span class="likes">${likes} Likes</span>
</article>`;


class Comments {

    constructor(container) {
        this.container = container;
        this.comments = [];
    }

    sortComments() {

        this.sort = this.sort === "date" ? "likes" : "date";
        this.comments = this.comments.sort((a, b) => {
            if (this.sort === "date") {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            return b.likes - a.likes;
        });
    }


    listComments() {

        const comments = this.comments;

        const count = comments.length;

        const commentsStr = comments.map(cmt => comment(cmt)).join('');

        const commentSectionStr = commentSection(count, commentsStr);

        this.container.innerHTML = commentSectionStr;

    }

    renderSortBtn() {
        const sortBtn = this.container.querySelector(".likesBtn");
        sortBtn.addEventListener("click", this.render.bind(this));
        if (this.sort === 'likes') {
            sortBtn.classList.add('selected');
        }
        else {
            sortBtn.classList.remove('selected');
        }
    }

    render() {
        this.sortComments();
        this.listComments();
        this.renderSortBtn(); // TODO: binding this listener everytime needs to be avoided. Only comments needs to be re-rendered.
    }

    setComments(comments) {
        this.comments = comments;
    }

    load() {
        return fetch('https://my-json-server.typicode.com/telegraph/frontend-exercise/comments')
            .then(response => response.json())
            .then(data => data)
            .catch(err => {
                console.log("Some error occured!", err);
            });
    }

    initialise() {

        this.load()
            .then(comments => {
                this.setComments(comments);
                this.render();
            });
    }

}

module.exports = Comments;