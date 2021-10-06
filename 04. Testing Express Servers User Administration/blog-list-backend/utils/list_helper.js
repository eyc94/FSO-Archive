const dummy = (blogs) => {
    console.log(blogs)
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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}