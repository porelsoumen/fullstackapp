const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.reduce((sum, current) => {
        return sum + current.likes
    }, 0)
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    let uniqAuthors = []
    for (let a of authors) {
        if (!uniqAuthors.includes(a)) {
            uniqAuthors.push(a)
        }
    }
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
    const maxAuthor = authorsBlogs.find(author => author.blogs === maxblogs)
    return maxAuthor
}
module.exports = {
    dummy,
    totalLikes,
    mostBlogs
}

