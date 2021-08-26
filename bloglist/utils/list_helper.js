const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.reduce((sum, current) => {
        return sum + current.likes
    }, 0)
}
const getUniqueAuthors = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    let uniqAuthors = []
    for (let a of authors) {
        if (!uniqAuthors.includes(a)) {
            uniqAuthors.push(a)
        }
    }
    return uniqAuthors
}
const mostBlogs = (blogs) => {
    const uniqAuthors = getUniqueAuthors(blogs)
    let authorsBlogs = []
    for (let a of uniqAuthors) {
        const blogCnt = blogs.filter(blog => blog.author === a).length
        const obj = {
            author: a,
            blogs: blogCnt 
        }
        authorsBlogs.push(obj)
    }
    const maxblogs = Math.max.apply(Math, authorsBlogs.map(o => o.blogs))
    return authorsBlogs.find(author => author.blogs === maxblogs)
}

const mostLikes = (blogs) => {
    const uniqAuthors = getUniqueAuthors(blogs)
    let authorLikes = []
    for (let a of uniqAuthors) {
        let totalLikes = 0

        const totalLikesArray = blogs.filter(blog => blog.author === a)
        totalLikes = totalLikesArray.reduce((sum, x) =>  { return sum + x.likes}, 0) 
        
        const obj = {
            author: a,
            likes: totalLikes
        }
        authorLikes.push(obj)
    }
    const maxLikes = Math.max.apply(Math, authorLikes.map(o => o.likes))
    return authorLikes.find(author => author.likes === maxLikes) 
}
module.exports = {
    dummy,
    totalLikes,
    mostBlogs,
    mostLikes
}

