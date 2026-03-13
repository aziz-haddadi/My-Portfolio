const { getAllPosts } = require('../models/postModel');

exports.index = (req, res) => {
  const latestWriteups = getAllPosts('writeups').slice(0, 3);
  const projects = getAllPosts('projects');

  res.render('index', {
    title: 'Mohamed Aziz Haddadi | Cybersecurity Portfolio',
    latestWriteups,
    projects
  });
};
