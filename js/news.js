async function loadPosts(page = 1, category = '', query = '') {
    try {
        const response = await fetch('/posts.json');
        if (!response.ok) throw new Error('Không thể tải posts.json');
        let posts = await response.json();
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = '';

        const converter = new showdown.Converter({ metadata: true });
        const postsPerPage = 6;

        // Lọc bài viết
        posts = posts.filter(async postFile => {
            try {
                const postResponse = await fetch(`/posts/${postFile}`);
                const markdown = await postResponse.text();
                converter.makeHtml(markdown);
                const metadata = converter.getMetadata();
                const matchesStatus = metadata.status === 'Công khai';
                const matchesCategory = !category || metadata.category === category;
                const matchesQuery = !query || 
                    (metadata.title.toLowerCase().includes(query.toLowerCase()) || 
                     (metadata.excerpt && metadata.excerpt.toLowerCase().includes(query.toLowerCase())));
                return matchesStatus && matchesCategory && matchesQuery;
            } catch (error) {
                console.error(`Lỗi kiểm tra bài viết: ${postFile}`, error);
                return false;
            }
        });

        // Phân trang
        const totalPages = Math.ceil(posts.length / postsPerPage);
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const paginatedPosts = posts.slice(start, end);

        if (!paginatedPosts.length) {
            postsContainer.innerHTML = '<p>Không tìm thấy bài viết nào.</p>';
            renderPagination(0, page);
            return;
        }

        const postPromises = paginatedPosts.map(async postFile => {
            try {
                const postResponse = await fetch(`/posts/${postFile}`);
                const markdown = await postResponse.text();
                converter.makeHtml(markdown);
                const metadata = converter.getMetadata();

                const postElement = document.createElement('div');
                postElement.className = 'news-item';
                postElement.setAttribute('data-modal', `modal-${postFile}`);
                postElement.innerHTML = `
                    <img src="${metadata.thumbnail || 'https://via.placeholder.com/300x200'}" alt="${metadata.title}" loading="lazy">
                    <div class="news-item-content">
                        <h3>${metadata.title}</h3>
                        <div class="date">${new Date(metadata.date).toLocaleDateString('vi-VN')}</div>
                        <p>${metadata.excerpt || 'Chưa có tóm tắt'}</p>
                        ${metadata.tags ? `<div class="tags">${metadata.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}</div>` : ''}
                        ${metadata.author ? `<div class="author">Tác giả: ${metadata.author}</div>` : ''}
                        <a href="#" class="btn-readmore">Đọc Thêm</a>
                    </div>
                `;

                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.id = `modal-${postFile}`;
                modal.innerHTML = `
                    <div class="modal-content">
                        <button class="btn-close">×</button>
                        <h2>${metadata.title}</h2>
                        <div class="date">${new Date(metadata.date).toLocaleDateString('vi-VN')}</div>
                        ${metadata.thumbnail ? `<img src="${metadata.thumbnail}" alt="${metadata.title}" loading="lazy">` : ''}
                        ${metadata.tags ? `<div class="tags">${metadata.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}</div>` : ''}
                        ${metadata.author ? `<div class="author">Tác giả: ${metadata.author}</div>` : ''}
                        ${converter.makeHtml(markdown)}
                    </div>
                `;
                document.body.appendChild(modal);

                return postElement;
            } catch (error) {
                console.error(`Lỗi khi tải bài viết: ${postFile}`, error);
                return null;
            }
        });

        const postElements = await Promise.all(postPromises);
        postElements.forEach(el => el && postsContainer.appendChild(el));

        // Khởi tạo modal
        document.querySelectorAll('.news-item').forEach(item => {
            item.querySelector('.btn-readmore').addEventListener('click', e => {
                e.preventDefault();
                const modalId = item.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                modal.style.display = 'flex';
            });
        });

        document.querySelectorAll('.btn-close').forEach(button => {
            button.addEventListener('click', () => {
                button.closest('.modal').style.display = 'none';
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', e => {
                if (e.target === modal) modal.style.display = 'none';
            });
        });

        // Render phân trang
        renderPagination(totalPages, page);
    } catch (error) {
        console.error('Lỗi tải posts.json:', error);
        document.getElementById('posts').innerHTML = '<p>Hiện chưa có bài viết nào.</p>';
        renderPagination(0, 1);
    }
}

function renderPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = i;
        if (i === currentPage) link.classList.add('active');
        link.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.pagination a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
            loadPosts(i, document.getElementById('category-filter').value, document.querySelector('.search-form input').value);
        });
        paginationContainer.appendChild(link);
    }
}

// Xử lý tìm kiếm
document.querySelector('.search-form').addEventListener('submit', e => {
    e.preventDefault();
    const query = e.target.querySelector('input').value;
    loadPosts(1, document.getElementById('category-filter').value, query);
});

// Xử lý lọc danh mục
document.getElementById('category-filter').addEventListener('change', e => {
    loadPosts(1, e.target.value, document.querySelector('.search-form input').value);
});

// Tải bài viết khi trang mở
window.addEventListener('load', () => loadPosts(1));