/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Utils = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\nconst Comments = __webpack_require__(/*! ./comments */ \"./src/js/comments.js\");\n\nnew Utils();\n\nconst container = document.querySelector(\"#comments\");\nconst comments = new Comments(container);\ncomments.initialise();\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/comments.js":
/*!****************************!*\
  !*** ./src/js/comments.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst commentSection = (count, comments) => `<header>\n    <h2>${count} Comments</h2>\n    <div class=\"sortContainer\">\n        <span>Sort</span>\n        <ul>\n            <li class=\"likesBtn\" tabindex=\"0\" role=\"button\">Likes</li>\n        </ul>\n    </div>\n</header>\n${comments}`;\n\n\n\nconst comment = ({ name, body, likes }) => `<article>\n<section>\n    <h3>${name}</h3>\n    <span class=\"comment\">${body}</span>\n</section>\n<span class=\"likes\">${likes} Likes</span>\n</article>`;\n\n\nclass Comments {\n\n    constructor(container) {\n        this.container = container;\n        this.comments = [];\n    }\n\n    sortComments() {\n\n        this.sort = this.sort === \"date\" ? \"likes\" : \"date\";\n        this.comments = this.comments.sort((a, b) => {\n            if (this.sort === \"date\") {\n                return new Date(a.date).getTime() - new Date(b.date).getTime();\n            }\n            return b.likes - a.likes;\n        });\n    }\n\n\n    listComments() {\n\n        const comments = this.comments;\n\n        const count = comments.length;\n\n        const commentsStr = comments.map(cmt => comment(cmt)).join('');\n\n        const commentSectionStr = commentSection(count, commentsStr);\n\n        this.container.innerHTML = commentSectionStr;\n\n    }\n\n    renderSortBtn() {\n        const sortBtn = this.container.querySelector(\".likesBtn\");\n        sortBtn.addEventListener(\"click\", this.render.bind(this));\n        if (this.sort === 'likes') {\n            sortBtn.classList.add('selected');\n        }\n        else {\n            sortBtn.classList.remove('selected');\n        }\n    }\n\n    render() {\n        this.sortComments();\n        this.listComments();\n        this.renderSortBtn(); // TODO: binding this listener everytime needs to be avoided. Only comments needs to be re-rendered.\n    }\n\n    setComments(comments) {\n        this.comments = comments;\n    }\n\n    load() {\n        return fetch('https://my-json-server.typicode.com/telegraph/frontend-exercise/comments')\n            .then(response => response.json())\n            .then(data => data)\n            .catch(err => {\n                console.log(\"Some error occured!\", err);\n            });\n    }\n\n    initialise() {\n\n        this.load()\n            .then(comments => {\n                this.setComments(comments);\n                this.render();\n            });\n    }\n\n}\n\nmodule.exports = Comments;\n\n//# sourceURL=webpack:///./src/js/comments.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Dummy utility class to demonstrate a basic JS\n * structure and assoiciated test\n * @param {Object} params - containing:\n * @param {String} homePagePath - the pathname of the homepage (defaults to '/')\n */\nclass Utils {\n\tconstructor(params) {\n\t\tthis.params = Object.assign({\n\t\t\thomePagePath: '/'\n\t\t}, params);\n\t}\n\n\t/**\n\t * Is the user on the hompage\n\t * @return {Boolean}\n\t */\n\tisHomePage() {\n\t\treturn document.location.pathname === this.params.homePagePath;\n\t}\n}\n\nmodule.exports = Utils;\n\n\n//# sourceURL=webpack:///./src/js/utils.js?");

/***/ })

/******/ });