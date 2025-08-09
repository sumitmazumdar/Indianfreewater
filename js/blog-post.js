document.addEventListener('DOMContentLoaded', () => {
    function formatPostContent(raw) {
        if (!raw) return '';
        let text = raw;
        // Horizontal rule
        text = text.replace(/^---$/gm, '<hr/>');
        // Headings ## and ###
        text = text.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
        text = text.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
        // Bold **text**
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Lists: lines starting with - or *
        text = text.replace(/(^|\n)(?:[-*])\s+(.+)(?=\n(?![-*]\s)|$)/g, (m) => m);
        // Convert list blocks
        text = text.replace(/(?:^|\n)((?:[-*]\s+.+\n?)+)/g, (match, group) => {
            const items = group.trim().split(/\n/).map(l => l.replace(/^[-*]\s+/, '').trim());
            const lis = items.map(i => `<li>${i}</li>`).join('');
            return `\n<ul>${lis}</ul>`;
        });
        // Paragraphs: split on double newlines, preserve single line breaks
        const parts = text.split(/\n\n+/).map(p => {
            if (/^<h[23]>/.test(p) || /^<ul>/.test(p) || /^<hr\/>$/.test(p)) return p; 
            return `<p>${p.replace(/\n/g, '<br>')}</p>`;
        });
        return parts.join('\n');
    }
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
                ${post.image ? `<img src="${post.image}" alt="${post.title}" class="img-fluid rounded mb-4 w-100">` : ''}
                <h1 class="mb-3">${post.title}</h1>
                <p class="text-muted mb-4">By ${post.author || 'Admin'} on ${post.date || ''}</p>
                <div class="post-body">${formatPostContent(post.content)}</div>
            `;
        })
        .catch(error => {
            console.error('Error loading blog post:', error);
            document.getElementById('blog-post-content').innerHTML = 'Error: Could not load blog post.';
        });
});
