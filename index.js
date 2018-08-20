import reddit from './redditapi'
import url from './images/reddit.jpg'

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const truncateText = (text, limit) => {
    const shortened = text.indexOf(' ', limit)
    if(shortened == -1)return text
    else return text.substring(0, shortened)
}

const showMessage = (message, className) => {
    const div = document.createElement('div')

    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))
    const searchContainer = document.getElementById('search-container')
    const search = document.getElementById('search')

    searchContainer.insertBefore(div,search)

    setTimeout(()=>{
        document.querySelector('.alert').remove()
    },3000)
}

searchForm.addEventListener('submit', (e)=>{
   
    const searchTerm = searchInput.value
    const sortBy = document.querySelector('input[name="sortby"]:checked').value
    const searchLimit = document.querySelector('#limit').value

    if(searchTerm === ''){
        showMessage('Please adda a serach term ', 'alert-danger')
    }

    searchInput.value=''

    reddit.search(searchTerm, searchLimit, sortBy)
        .then((results) => {
            console.log(results)
            let output = `<div class="card-columns">`
            results.forEach((post)=>{

                let image = post.preview ? post.preview.images[0].source.url : url

                if(!post.preview){
                    console.log(image)
                }

                output += `
                <div class="card">
                    <img class="card-img-top" src="${image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${truncateText(post.selftext, 100)}</p>
                        <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
                    </div>
                </div>`
            })
            output += '</div>'
            document.getElementById('results').innerHTML = output
        })

    e.preventDefault() 
    
})


