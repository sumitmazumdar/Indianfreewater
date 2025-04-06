document.addEventListener('DOMContentLoaded', function() {
    const blogContainer = document.getElementById('blog-posts-container');
    if (!blogContainer) {
        console.error('Blog post container not found!');
        return;
    }
    fetch('blogs.json')
        .then(response => response.json())
        .then(posts => {
            blogContainer.innerHTML = '';
            posts.forEach((post, index) => {
                const delay = (index % 3 + 1) * 0.2;
                const postElement = document.createElement('div');
                postElement.className = 'col-lg-6 col-xl-4 wow fadeInUp';
                postElement.setAttribute('data-wow-delay', `${delay}s`);
                postElement.innerHTML = `
                    <div class="blog-item">
                        <div class="blog-img">
                            <img src="${post.image || 'img/blog-1.jpg'}" class="img-fluid rounded-top w-100" alt="${post.title || 'Blog Image'}">
                            <div class="blog-date px-4 py-2"><i class="fa fa-calendar-alt me-1"></i> ${post.date}</div>
                        </div>
                        <div class="blog-content rounded-bottom p-4">
                            <a href="blog-post.html?id=${index}" class="h4 d-inline-block mb-3">${post.title}</a>
                            <p>${post.description || post.content.substring(0, 100) + '...'}</p>
                            <a href="blog-post.html?id=${index}" class="fw-bold text-secondary">Read More <i class="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                `;
                blogContainer.appendChild(postElement);
            });
            new WOW().init();
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            blogContainer.innerHTML = '<p class="text-center text-danger">Could not load blog posts. Please try again later.</p>';
        });
});

// Index page blog posts
document.addEventListener('DOMContentLoaded', function() {
    const blogContainer = document.getElementById('index-blog-posts-container');
    if (!blogContainer) {
        console.error('Blog post container not found!');
        return;
    }
    fetch('blogs.json')
        .then(response => response.json())
        .then(posts => {
            blogContainer.innerHTML = '';
            posts.forEach((post, index) => {
                const delay = (index % 3 + 1) * 0.2;
                const postElement = document.createElement('div');
                postElement.className = 'col-lg-6 col-xl-4 wow fadeInUp';
                postElement.setAttribute('data-wow-delay', `${delay}s`);
                postElement.innerHTML = `
                    <div class="blog-item">
                        <div class="blog-img">
                            <img src="${post.image || 'img/blog-1.jpg'}" class="img-fluid rounded-top w-100" alt="${post.title || 'Blog Image'}">
                            <div class="blog-date px-4 py-2"><i class="fa fa-calendar-alt me-1"></i> ${post.date}</div>
                        </div>
                        <div class="blog-content rounded-bottom p-4">
                            <a href="blog-post.html?id=${index}" class="h4 d-inline-block mb-3">${post.title}</a>
                            <p>${post.description || post.content.substring(0, 100) + '...'}</p>
                            <a href="blog-post.html?id=${index}" class="fw-bold text-secondary">Read More <i class="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                `;
                blogContainer.appendChild(postElement);
            });
            new WOW().init();
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            blogContainer.innerHTML = '<p class="text-center text-danger">Could not load blog posts. Please try again later.</p>';
        });
});
