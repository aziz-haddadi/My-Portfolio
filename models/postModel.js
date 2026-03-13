const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const hljs = require('highlight.js');

// Configure marked with highlight.js for syntax highlighting
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (e) {}
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true
});

const contentDir = path.join(__dirname, '..', 'content');

/**
 * Calculate estimated reading time for a given content string
 */
function getReadingTime(content) {
  const wordsPerMinute = 200;
  const noOfWords = content.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

/**
 * Get all posts of a given type (writeups, walkthroughs, projects)
 * Returns sorted array by date descending
 */
function getAllPosts(type) {
  const dir = path.join(contentDir, type);

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        category: data.category || '',
        tags: data.tags || [],
        difficulty: data.difficulty || '',
        cover: data.cover || '',
        description: data.description || '',
        stats: data.stats || '',
        readingTime: getReadingTime(content)
      };
    })
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });
}

/**
 * Get single post by slug and type, with rendered HTML body
 */
function getPostBySlug(type, slug) {
  const filePath = path.join(contentDir, type, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const htmlContent = marked(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    category: data.category || '',
    tags: data.tags || [],
    difficulty: data.difficulty || '',
    cover: data.cover || '',
    description: data.description || '',
    stats: data.stats || '',
    readingTime: getReadingTime(content),
    content: htmlContent
  };
}

/**
 * Get all unique tags across a content type
 */
function getAllTags(type) {
  const posts = getAllPosts(type);
  const tagSet = new Set();
  posts.forEach((post) => {
    (post.tags || []).forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Get all unique categories across a content type
 */
function getAllCategories(type) {
  const posts = getAllPosts(type);
  const catSet = new Set();
  posts.forEach((post) => {
    if (post.category) catSet.add(post.category);
  });
  return Array.from(catSet).sort();
}

module.exports = {
  getAllPosts,
  getPostBySlug,
  getAllTags,
  getAllCategories,
  getReadingTime
};
