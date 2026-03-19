# Inkwell — Premium Blog Platform

A production-ready, multi-page blogging website with dark/light mode, animations, admin dashboard, and full responsiveness.

## 🗂 Project Structure

```
inkwell/
├── index.html              ← Home page
├── README.md
├── css/
│   └── style.css           ← All styles (dark/light theme, components)
├── js/
│   └── main.js             ← All JavaScript (interactions, search, admin)
├── pages/
│   ├── blog.html           ← Blog listing with search + filters
│   ├── blog-post.html      ← Single post with TOC, comments, share
│   ├── about.html          ← About page with stats + services
│   ├── contact.html        ← Contact form + FAQ accordion
│   └── admin.html          ← Admin dashboard (frontend)
└── assets/
    ├── images/             ← Drop your images here
    └── icons/              ← Drop your icons/SVGs here
```

## 🚀 Running Locally

### Option 1 — VS Code Live Server (Recommended)
1. Open the `inkwell/` folder in VS Code
2. Install the **Live Server** extension (ritwickdey.LiveServer)
3. Right-click `index.html` → **Open with Live Server**
4. Browser opens at `http://127.0.0.1:5500`

### Option 2 — Python HTTP Server
```bash
cd inkwell
python3 -m http.server 8080
# Open http://localhost:8080
```

### Option 3 — Node.js HTTP Server
```bash
npm install -g http-server
cd inkwell
http-server -p 8080
# Open http://localhost:8080
```

## ✨ Features

| Feature | Status |
|---|---|
| Dark / Light mode (persisted) | ✅ |
| Sticky glassmorphism nav | ✅ |
| Page loader animation | ✅ |
| Scroll reveal animations | ✅ |
| Blog search + category filter | ✅ |
| Mobile responsive menu | ✅ |
| Single post sticky TOC | ✅ |
| Live comment posting | ✅ |
| Share buttons (Twitter/LinkedIn/Copy) | ✅ |
| Contact form validation | ✅ |
| Admin dashboard (frontend) | ✅ |
| Tag pill input system | ✅ |
| Word count + reading time | ✅ |
| Back-to-top button | ✅ |
| Toast notifications | ✅ |

## 🎨 Design System

- **Fonts:** Playfair Display (headings) + DM Sans (body) + DM Mono (code)
- **Accent:** Gold `#c9a84c`
- **Background (light):** Warm off-white `#fafaf8`
- **Background (dark):** Deep ink `#0e0e0c`
- **Text:** `#1a1916` / `#f0efe8`

## 📄 Pages

- **Home** (`index.html`) — Hero, featured posts, categories, testimonials, newsletter
- **Blog** (`pages/blog.html`) — Grid listing, search, category tabs, pagination
- **Post** (`pages/blog-post.html`) — Full article, sidebar TOC, comments
- **About** (`pages/about.html`) — Bio, stats, services, press logos
- **Contact** (`pages/contact.html`) — Form, FAQ accordion, social links
- **Admin** (`pages/admin.html`) — Dashboard, post table, rich text editor

## 🛒 Delivering to a Client

1. Replace placeholder text and images in `/assets/images/`
2. Update author name, bio, and social links throughout
3. Connect newsletter form to Mailchimp / ConvertKit embed
4. Connect contact form to Formspree or your backend
5. Deploy to **Netlify** (drag & drop the `inkwell/` folder) or Vercel

