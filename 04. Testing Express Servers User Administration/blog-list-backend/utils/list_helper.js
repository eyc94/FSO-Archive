const dummy = (blogs) => {
    if (blogs.length !== 0) {
        return 1
    }
    return 1
}

const totalLikes = (blogs) => {
    const add = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(add, 0)
}

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null
    }

    const max = blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current
    })

    const favBlog = {
        title: max.title,
        author: max.author,
        likes: max.likes
    }

    return favBlog
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)

    if (!authors || authors.length === 0) {
        return null
    }

    const countBlogsByAuthor = authors.reduce((acc, curr) => {
        acc[curr] ? acc[curr]++ : (acc[curr] = 1)

        return acc
    }, {})

    const authorWithMostBlogsArray = Object.entries(countBlogsByAuthor).reduce((a, b) => (
        countBlogsByAuthor[a[0]] > countBlogsByAuthor[a[1]]
            ? a
            : b
    ))

    const authorWithMostBlogs = {
        author: authorWithMostBlogsArray[0],
        blogs: authorWithMostBlogsArray[1]
    }

    return authorWithMostBlogs
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}