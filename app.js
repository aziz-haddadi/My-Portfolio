require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets (CSS, JS, images in public/)
app.use(express.static(path.join(__dirname, 'public')));

// Per-post image folders — content/<type>/<slug>/ served at /content-images/<type>/<slug>/
// Example: content/writeups/my-post/screenshot.png → /content-images/writeups/my-post/screenshot.png
app.use('/content-images', express.static(path.join(__dirname, 'content')));

// Routes
app.use('/', require('./routes/index'));
app.use('/writeups', require('./routes/writeups'));
app.use('/projects', require('./routes/projects'));

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: '404 — Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('404', { title: '500 — Server Error' });
});

app.listen(PORT, () => {
  console.log(`\x1b[32m[Pulgaa]\x1b[0m Server running at http://localhost:${PORT}`);
});
