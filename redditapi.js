export default {
    search: (searchTerm, serachLimit, searchBy) => {
        return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&limit=${serachLimit}&sort=${searchBy}`)
        .then(res=>res.json())
        .then(data => data.data.children.map(data=>data.data)
        )
        .catch((err)=>{
            console.log(err)
        })
    }
}