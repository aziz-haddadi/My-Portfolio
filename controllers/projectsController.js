const { getAllPosts } = require('../models/postModel');

exports.index = (req, res) => {
  const projects = getAllPosts('projects');
  res.render('projects/index', {
    title: 'Projects | Pulgaa',
    projects
  });
};
