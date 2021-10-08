const Utils = require('./utils');
const Comments = require('./comments');

new Utils();

const container = document.querySelector("#comments");
const comments = new Comments(container);
comments.initialise();