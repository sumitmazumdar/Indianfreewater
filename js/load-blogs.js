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
                postElement.className = 'col-lg-6 col-xl-4 wow fadeInUp mb-4';
                postElement.setAttribute('data-wow-delay', `${delay}s`);
                postElement.innerHTML = `
                    <a href="blog-post.html?id=${index}" class="text-decoration-none text-reset d-block">
                        <div class="blog-item shadow-sm rounded overflow-hidden h-100">
                            <div class="blog-img position-relative">
                                <img src="${post.image || 'img/blog-1.jpg'}" class="img-fluid w-100" style="height: 200px; object-fit: cover;" alt="${post.title || 'Blog Image'}">
                                <div class="blog-date position-absolute top-0 start-0 bg-primary text-white px-3 py-2 rounded-bottom-end">
                                    <i class="fa fa-calendar-alt me-1"></i> ${post.date}
                                </div>
                            </div>
                            <div class="blog-content p-4 d-flex flex-column h-100">
                                <h4 class="h5 mb-3 text-dark">${post.title}</h4>
                                <p class="text-muted mb-3 flex-grow-1">${post.description || (post.content ? post.content.substring(0, 120) + '...' : '')}</p>
                                <div class="blog-meta d-flex justify-content-between align-items-center">
                                    <span class="text-primary fw-bold">Read More <i class="fa fa-angle-right"></i></span>
                                    <small class="text-muted"><i class="fas fa-user me-1"></i>${post.author}</small>
                                </div>
                            </div>
                        </div>
                    </a>
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
            posts.slice(0, 3).forEach((post, index) => {
                const delay = (index % 3 + 1) * 0.2;
                const postElement = document.createElement('div');
                postElement.className = 'col-lg-6 col-xl-4 wow fadeInUp mb-4';
                postElement.setAttribute('data-wow-delay', `${delay}s`);
                postElement.innerHTML = `
                    <a href="blog-post.html?id=${index}" class="text-decoration-none text-reset d-block">
                        <div class="blog-item shadow-sm rounded overflow-hidden h-100">
                            <div class="blog-img position-relative">
                                <img src="${post.image || 'img/blog-1.jpg'}" class="img-fluid w-100" style="height: 200px; object-fit: cover;" alt="${post.title || 'Blog Image'}">
                                <div class="blog-date position-absolute top-0 start-0 bg-primary text-white px-3 py-2 rounded-bottom-end">
                                    <i class="fa fa-calendar-alt me-1"></i> ${post.date}
                                </div>
                            </div>
                            <div class="blog-content p-4 d-flex flex-column h-100">
                                <h4 class="h5 mb-3 text-dark">${post.title}</h4>
                                <p class="text-muted mb-3 flex-grow-1">${post.description || (post.content ? post.content.substring(0, 120) + '...' : '')}</p>
                                <div class="blog-meta d-flex justify-content-between align-items-center">
                                    <span class="text-primary fw-bold">Read More <i class="fa fa-angle-right"></i></span>
                                    <small class="text-muted"><i class="fas fa-user me-1"></i>${post.author}</small>
                                </div>
                            </div>
                        </div>
                    </a>
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
