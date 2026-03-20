/* ============================================
   INKWELL — Main JavaScript
   ============================================ */

'use strict';

/* ─── DOM READY ─── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initNav();
  initScrollReveal();
  initBackToTop();
  initActiveNav();
});

/* ─── PAGE LOADER ─── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
  // Fallback
  setTimeout(() => loader && loader.classList.add('hidden'), 2500);
}

/* ─── THEME ─── */
function initTheme() {
  const saved = localStorage.getItem('inkwell-theme') || 'light';
  setTheme(saved);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
}
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('inkwell-theme', theme);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
  });
}

/* ─── NAVIGATION ─── */
function initNav() {
  const nav = document.getElementById('mainNav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Scroll effect
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ─── ACTIVE NAV LINK ─── */
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop();
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ─── SCROLL REVEAL ─── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

/* ─── BACK TO TOP ─── */
function initBackToTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── TOAST ─── */
function showToast(msg, type = '') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast'; toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>${msg}`;
  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('visible'), 3500);
}

/* ─── NEWSLETTER FORM ─── */
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (!input?.value || !/^[^@]+@[^@]+\.[^@]+$/.test(input.value)) {
      showToast('Please enter a valid email address.', 'error'); return;
    }
    showToast('You\'ve been subscribed! 🎉', 'success');
    input.value = '';
  });
});

/* ─── SEARCH (blog.html) ─── */
window.initBlogSearch = function () {
  const searchInput = document.getElementById('blogSearch');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.blog-card[data-category]');
  const noResults = document.getElementById('noResults');
  let activeCategory = 'all';
  let searchQuery = '';

  function filterCards() {
    let visible = 0;
    cards.forEach(card => {
      const cat = card.dataset.category || '';
      const text = card.textContent.toLowerCase();
      const matchCat = activeCategory === 'all' || cat === activeCategory;
      const matchSearch = !searchQuery || text.includes(searchQuery);
      const show = matchCat && matchSearch;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
    // Pagination visibility
    const pager = document.getElementById('pagination');
    if (pager) pager.style.display = visible === 0 ? 'none' : '';
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterCards();
    });
  }
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.filter;
      filterCards();
    });
  });
};

/* ─── CONTACT FORM ─── */
window.initContactForm = function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const success = document.getElementById('formSuccess');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[data-required]').forEach(field => {
      const group = field.closest('.form-group');
      const val = field.value.trim();
      const isEmail = field.type === 'email';
      const ok = val && (!isEmail || /^[^@]+@[^@]+\.[^@]+$/.test(val));
      group?.classList.toggle('has-error', !ok);
      if (!ok) valid = false;
    });
    if (!valid) { showToast('Please fill all required fields correctly.', 'error'); return; }
    if (success) { form.style.display = 'none'; success.classList.add('visible'); }
    showToast('Message sent! We\'ll be in touch soon.', 'success');
  });
  // Live validation removal
  form.querySelectorAll('[data-required]').forEach(field => {
    field.addEventListener('input', () => field.closest('.form-group')?.classList.remove('has-error'));
  });
};

/* ─── COMMENT FORM ─── */
window.initComments = function () {
  const form = document.getElementById('commentForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[data-required]').forEach(field => {
      const group = field.closest('.form-group');
      if (!field.value.trim()) { group?.classList.add('has-error'); valid = false; }
    });
    if (!valid) return;
    // Inject new comment
    const name = form.querySelector('#cName').value.trim();
    const msg = form.querySelector('#cMsg').value.trim();
    const list = document.getElementById('commentsList');
    const html = `
      <div class="comment">
        <div class="comment-avatar">${name.charAt(0).toUpperCase()}</div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-name">${escapeHTML(name)}</span>
            <span class="comment-date">Just now</span>
          </div>
          <p>${escapeHTML(msg)}</p>
          <div class="comment-reply">↩ Reply</div>
        </div>
      </div>`;
    if (list) list.insertAdjacentHTML('afterbegin', html);
    form.reset();
    showToast('Comment posted!', 'success');
    // Update count
    const countEl = document.getElementById('commentCount');
    if (countEl) countEl.textContent = parseInt(countEl.textContent || 0) + 1;
  });
  form.querySelectorAll('[data-required]').forEach(f =>
    f.addEventListener('input', () => f.closest('.form-group')?.classList.remove('has-error'))
  );
};

/* ─── TABLE OF CONTENTS (blog-post.html) ─── */
window.initTOC = function () {
  const toc = document.getElementById('toc');
  const headings = document.querySelectorAll('.post-content h2, .post-content h3');
  if (!toc || !headings.length) return;
  headings.forEach((h, i) => { if (!h.id) h.id = `heading-${i}`; });
  const items = toc.querySelectorAll('.toc-item');
  const onScroll = () => {
    let current = '';
    headings.forEach(h => {
      if (window.scrollY >= h.offsetTop - 120) current = h.id;
    });
    items.forEach(item => item.classList.toggle('active', item.dataset.target === current));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  items.forEach(item => {
    item.addEventListener('click', () => {
      const target = document.getElementById(item.dataset.target);
      if (target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
    });
  });
};

/* ─── ADMIN DASHBOARD ─── */
window.initAdmin = function () {
  // Nav switching
  const navItems = document.querySelectorAll('.admin-nav-item');
  const panels = document.querySelectorAll('.admin-panel');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const panel = item.dataset.panel;
      if (!panel) return;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      panels.forEach(p => p.classList.toggle('hidden', p.id !== `panel-${panel}`));
    });
  });

  // Delete rows
  document.querySelectorAll('.action-btn.delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.table-row');
      if (confirm('Delete this post?')) {
        row.style.opacity = '0'; row.style.transform = 'translateX(16px)';
        row.style.transition = 'all 0.3s';
        setTimeout(() => row.remove(), 300);
        showToast('Post deleted.', 'success');
      }
    });
  });

  // Editor tools
  document.querySelectorAll('.editor-tool').forEach(t => {
    t.addEventListener('click', () => t.classList.toggle('active'));
  });

  // Cover upload placeholder
  const coverUpload = document.getElementById('coverUpload');
  if (coverUpload) {
    coverUpload.addEventListener('click', () => showToast('File picker would open here.'));
  }

  // Publish button
  const publishBtn = document.getElementById('publishBtn');
  if (publishBtn) {
    publishBtn.addEventListener('click', () => {
      const title = document.getElementById('postTitle')?.value;
      if (!title?.trim()) { showToast('Please add a post title.', 'error'); return; }
      showToast('Post published successfully! 🎉', 'success');
    });
  }

  // Word count
  const editorArea = document.getElementById('editorArea');
  const wordCount = document.getElementById('wordCount');
  if (editorArea && wordCount) {
    editorArea.addEventListener('input', () => {
      const words = editorArea.value.trim().split(/\s+/).filter(Boolean).length;
      wordCount.textContent = `${words} words`;
    });
  }
};

/* ─── HELPERS ─── */
function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
