const { getAllPosts, getPostBySlug, getAllTags, getAllCategories } = require('../models/postModel');

exports.index = (req, res) => {
  let posts = getAllPosts('writeups');
  const allTags = getAllTags('writeups');
  const allCategories = getAllCategories('writeups');

  const activeTag = req.query.tag || '';
  const activeCategory = req.query.category || '';

  if (activeTag) {
    posts = posts.filter((p) => p.tags.includes(activeTag));
  }
  if (activeCategory) {
    posts = posts.filter((p) => p.category === activeCategory);
  }

  res.render('writeups/index', {
    title: 'CTF Writeups | Pulgaa',
    posts,
    allTags,
    allCategories,
    activeTag,
    activeCategory
  });
};

exports.show = (req, res) => {
  const post = getPostBySlug('writeups', req.params.slug);
  if (!post) {
    return res.status(404).render('404', { title: '404 — Writeup Not Found' });
  }

  // Related posts logic: Find posts with overlapping tags
  const allPosts = getAllPosts('writeups');
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug) // Exclude current post
    .filter((p) => p.tags.some((tag) => post.tags.includes(tag))) // Map tags
    .slice(0, 3);

  // If not enough related posts, just take the latest ones
  if (relatedPosts.length < 2) {
    const latest = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
    relatedPosts.push(...latest.filter((p) => !relatedPosts.find((rp) => rp.slug === p.slug)));
  }

  res.render('writeups/post', {
    title: `${post.title} | Pulgaa`,
    post,
    relatedPosts: relatedPosts.slice(0, 3)
  });
};
