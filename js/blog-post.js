document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (postId === null) {
        document.getElementById('blog-post-content').innerHTML = '<div class="text-center text-danger"><h3>Error: No post ID provided.</h3></div>';
        return;
    }
    fetch('blogs.json')
        .then(response => response.json())
        .then(posts => {
            const post = posts[postId];
            if (!post) {
                document.getElementById('blog-post-content').innerHTML = '<div class="text-center text-danger"><h3>Error: Post not found.</h3></div>';
                return;
            }
            
            // Format the content with proper spacing and indentation
            let formattedContent = post.content;
            
            // Replace markdown-style headers with proper HTML
            formattedContent = formattedContent.replace(/^## (.*$)/gim, '<h2 class="mt-4 mb-3">$1</h2>');
            formattedContent = formattedContent.replace(/^### (.*$)/gim, '<h3 class="mt-4 mb-3">$1</h3>');
            formattedContent = formattedContent.replace(/^#### (.*$)/gim, '<h4 class="mt-4 mb-3">$1</h4>');
            
            // Replace bold text
            formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            // Replace italic text
            formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
            
            // Replace line breaks with proper paragraph spacing
            formattedContent = formattedContent.replace(/\n\n/g, '</p><p class="mb-3">');
            
            // Replace single line breaks with <br>
            formattedContent = formattedContent.replace(/\n/g, '<br>');
            
            // Wrap in paragraph tags if not already wrapped
            if (!formattedContent.startsWith('<p>')) {
                formattedContent = '<p class="mb-3">' + formattedContent + '</p>';
            }
            
            // Replace list items
            formattedContent = formattedContent.replace(/^- (.*$)/gim, '<li class="mb-2">$1</li>');
            formattedContent = formattedContent.replace(/(<li.*<\/li>)/s, '<ul class="mb-3">$1</ul>');
            
            // Replace numbered lists
            formattedContent = formattedContent.replace(/^\d+\. (.*$)/gim, '<li class="mb-2">$1</li>');
            
            // Replace horizontal rules
            formattedContent = formattedContent.replace(/^---$/gim, '<hr class="my-4">');
            
            document.getElementById('blog-post-content').innerHTML = `
                <div class="blog-post-header mb-4">
                    <h1 class="display-4 mb-3">${post.title}</h1>
                    <div class="blog-meta text-muted mb-4">
                        <span class="me-3"><i class="fas fa-user me-2"></i>By ${post.author}</span>
                        <span><i class="fas fa-calendar-alt me-2"></i>${post.date}</span>
                    </div>
                    ${post.image ? `<img src="${post.image}" class="img-fluid rounded mb-4" alt="${post.title}">` : ''}
                </div>
                <div class="blog-post-content">
                    ${formattedContent}
                </div>
            `;
        })
        .catch(error => {
            console.error('Error loading blog post:', error);
            document.getElementById('blog-post-content').innerHTML = '<div class="text-center text-danger"><h3>Error: Could not load blog post.</h3></div>';
        });
});
