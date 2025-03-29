document.addEventListener('DOMContentLoaded', function() {
    const blogContainer = document.getElementById('blog-posts-container');

    if (!blogContainer) {
        console.error('Blog post container not found!');
        return;
    }

    fetch('blogs.json') // Fetch the JSON data file
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            if (!Array.isArray(posts)) {
                throw new Error('Invalid data format: Expected an array of posts.');
            }
            
            blogContainer.innerHTML = ''; // Clear any existing content (like placeholders)

            posts.forEach((post, index) => {
                // Calculate animation delay based on index (0.2s, 0.4s, 0.6s, then repeat)
                const delay = (index % 3 + 1) * 0.2; 

                const postElement = document.createElement('div');
                postElement.className = 'col-lg-6 col-xl-4 wow fadeInUp';
                postElement.setAttribute('data-wow-delay', `${delay}s`);

                postElement.innerHTML = `
                    <div class="blog-item">
                        <div class="blog-img">
                            <img src="${post.image}" class="img-fluid rounded-top w-100" alt="${post.title || 'Blog Image'}">
                            <div class="blog-date px-4 py-2"><i class="fa fa-calendar-alt me-1"></i> ${post.date}</div>
                        </div>
                        <div class="blog-content rounded-bottom p-4">
                            <a href="${post.link}" class="h4 d-inline-block mb-3">${post.title}</a>
                            <p>${post.description}</p>
                            <a href="${post.link}" class="fw-bold text-secondary">Read More <i class="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                `;
                blogContainer.appendChild(postElement);
            });

            // Initialize WOW.js after dynamically adding content
            if (typeof WOW === 'function') {
                new WOW().init(); 
            }
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            blogContainer.innerHTML = '<p class="text-center text-danger">Could not load blog posts. Please try again later.</p>';
        });
});
