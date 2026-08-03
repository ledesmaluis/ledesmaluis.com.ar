fetch('content.json')
  .then(res => res.json())
  .then(data => {
    renderHero(data.hero);
    renderPosts(data.posts);
    renderGallery(data.gallery);
  })
  .catch(err => console.error('No se pudo cargar content.json:', err));

function renderHero(hero) {
  const eyebrow = document.querySelector('.hero-eyebrow');
  const title = document.querySelector('.hero-inner h1');
  const desc = document.querySelector('.hero-inner p:not(.hero-eyebrow)');
  const tagsWrap = document.querySelector('.hero-tags');

  if (eyebrow) eyebrow.textContent = hero.eyebrow;
  if (title) title.innerHTML = `${hero.title_normal} <em>${hero.title_em}</em>`;
  if (desc) desc.textContent = hero.description;
  if (tagsWrap) {
    tagsWrap.innerHTML = hero.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');
  }
}

function renderPosts(posts) {
  const container = document.querySelector('.posts');
  if (!container) return;

  container.innerHTML = posts.map(post => `
    <a class="post-card" href="#">
      <div>
        ${post.image ? `<img src="${post.image}" alt="${post.title}" style="width:100%;border-radius:8px;margin-bottom:0.5rem;" />` : ''}
        ${post.highlight ? `<p style="font-size:0.75rem;color:var(--accent2);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.6rem;">${post.highlight}</p>` : ''}
        <p class="post-cat">${post.category}</p>
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <p class="post-meta">${post.meta}</p>
      </div>
      <span class="post-arrow">→</span>
    </a>
  `).join('');
}

function renderGallery(gallery) {
  const container = document.querySelector('.gallery');
  if (!container) return;

  container.innerHTML = gallery.map(item => `
    <div class="gallery-item">
      <img src="${item.image}" alt="${item.caption}" />
      <p class="gallery-caption">${item.caption}</p>
    </div>
  `).join('');
}
