document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (postId === null) {
        document.getElementById('blog-post-content').innerHTML = 'Error: No post ID provided.';
        return;
    }
    fetch('blogs.json')
        .then(response => response.json())
        .then(posts => {
            const post = posts[postId];
            if (!post) {
                document.getElementById('blog-post-content').innerHTML = 'Error: Post not found.';
                return;
            }
            document.getElementById('blog-post-content').innerHTML = `
                <h1>${post.title}</h1>
                <p>By ${post.author} on ${post.date}</p>
                <div>${post.content}</div>
            `;
        })
        .catch(error => {
            console.error('Error loading blog post:', error);
            document.getElementById('blog-post-content').innerHTML = 'Error: Could not load blog post.';
        });
});
