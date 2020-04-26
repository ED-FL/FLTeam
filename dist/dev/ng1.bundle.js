webpackJsonp([2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SearchTree = (function () {
    function SearchTree(folderId, folderName, owner, parentFolderId, folders, tags, collapsed, isSharedFolder, isMainTree) {
        this.folderId = folderId;
        this.folderName = folderName;
        this.owner = owner;
        this.parentFolderId = parentFolderId;
        this.folders = folders;
        this.tags = tags;
        this.collapsed = collapsed;
        this.isSharedFolder = isSharedFolder;
        this.isMainTree = isMainTree;
    }
    return SearchTree;
}());
exports.SearchTree = SearchTree;
var NewTag = (function () {
    function NewTag(tagId, tagName, queryId, extraInfo, type, parentFolderId, collapsed, isRule, isRuleStopped, hasKml, isSharedTag) {
        this.tagId = tagId;
        this.tagName = tagName;
        this.queryId = queryId;
        this.extraInfo = extraInfo;
        this.type = type;
        this.parentFolderId = parentFolderId;
        this.collapsed = collapsed;
        this.isRule = isRule;
        this.isRuleStopped = isRuleStopped;
        this.hasKml = hasKml;
        this.isSharedTag = isSharedTag;
    }
    return NewTag;
}());
exports.NewTag = NewTag;
exports.exampleObject = new SearchTree("1", "mainFolder-1", "yuval", null, [new SearchTree("2-1", "innerFolder-2-1", "yuval", "1", [new SearchTree("3-1", "innerFolder-3-1", "yuval", "2-1", [], [new NewTag("tag-3-1", "innerTag-3-1", "extraInfo", null, null, "3-1", true, true, false, false, true),
            new NewTag("tag-3-2", "innerTag-3-2", "extraInfo", null, null, "3-2", true, false, false, false, true)], true, true, false)], [new NewTag("tag-2-1", "innerTag-2-1", "extraInfo", null, null, "2-1", true, false, false, true, false)], true, false, false), new SearchTree("2-2", "innerFolder-2-2", "yuval", "1", [], [], true, false, false)], [new NewTag("tag-1", "tag-1", "extraInfo", null, null, "1", true, true, true, true, false)], true, false, true);


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actionFolderTypes_1 = __webpack_require__(20);
var SearchTreeImplement_1 = __webpack_require__(5);
var searchFolderService = (function () {
    function searchFolderService(actionType) {
        this.actionType = actionType;
        this.isfolderFound = false;
    }
    searchFolderService.prototype.executeAction = function (id, tree, newfolderName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.updateTree(id, tree, newfolderName);
            if (_this.isfolderFound) {
                resolve(tree);
            }
            else {
                reject('error- item not found');
            }
        });
    };
    searchFolderService.prototype.updateTree = function (id, tree, newFolderName, currentFolders, index) {
        var _this = this;
        if (tree.folderId === id) {
            this.isfolderFound = true;
            switch (this.actionType) {
                case actionFolderTypes_1.actionFolderTypes.Edit:
                    this.editFolder(tree, newFolderName);
                    break;
                case actionFolderTypes_1.actionFolderTypes.Delete:
                    this.deleteFolder(currentFolders, index);
                    break;
                case actionFolderTypes_1.actionFolderTypes.AddFolder:
                    this.addNewFolder(tree, newFolderName, id);
                    break;
                case actionFolderTypes_1.actionFolderTypes.AddTag:
                    this.addNewTag(tree, newFolderName, id);
                    break;
                case actionFolderTypes_1.actionFolderTypes.Duplicte:
                    this.duplicteFolder(currentFolders, index);
                    break;
                default:
                    console.log('actionType no match: ', this.actionType);
                    break;
            }
        }
        if (!this.isfolderFound) {
            tree.folders.forEach(function (folder, index, currentFolders) {
                _this.updateTree(id, folder, newFolderName, currentFolders, index);
            });
        }
    };
    searchFolderService.prototype.editFolder = function (tree, newFolderName) {
        tree.folderName = newFolderName;
    };
    searchFolderService.prototype.deleteFolder = function (arrayFolders, index) {
        arrayFolders.splice(index, 1);
    };
    searchFolderService.prototype.addNewFolder = function (tree, newFolderName, perentId) {
        var collapsedNewFolder = false;
        collapsedNewFolder = this.checkForCollapsedDisplay(tree);
        tree.folders.push(new SearchTreeImplement_1.SearchTree("adeed-1" + Math.random(), newFolderName, 'owner', perentId, [], [], collapsedNewFolder, false, false));
    };
    searchFolderService.prototype.duplicteFolder = function (currentFolders, index) {
        var duplictedFolder = this.cloneObject(currentFolders[index]);
        duplictedFolder.folderId = Math.floor(Math.random() * 100).toString();
        currentFolders.push(duplictedFolder);
    };
    searchFolderService.prototype.addNewTag = function (tree, newTagName, perentId) {
        var collapsedNewTag = false;
        collapsedNewTag = this.checkForCollapsedDisplay(tree);
        tree.tags.push(new SearchTreeImplement_1.NewTag(Math.floor(Math.random() * 100).toString(), newTagName, "extraInfo", null, null, perentId, collapsedNewTag, true, false, false, false));
    };
    searchFolderService.prototype.checkForCollapsedDisplay = function (tree) {
        if (tree.folders.length > 0) {
            if (tree.folders[0].collapsed) {
                return true;
            }
        }
        if (tree.tags.length > 0) {
            if (tree.tags[0].collapsed) {
                return true;
            }
        }
        return false;
    };
    searchFolderService.prototype.cloneObject = function (obj) {
        var copy;
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj)
            return obj;
        // Handle Date
        // if (obj instanceof Date) {
        //     copy = new Date();
        //     copy.setTime(obj.getTime());
        //     return copy;
        // }
        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.cloneObject(obj[i]);
            }
            return copy;
        }
        // Handle Object
        if (obj instanceof Object) {
            if (obj instanceof SearchTreeImplement_1.SearchTree) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr))
                        copy[attr] = this.cloneObject(obj[attr]);
                }
                var dup = new SearchTreeImplement_1.SearchTree(Math.floor(Math.random() * 100).toString(), copy.folderName, copy.owner, copy.parentFolderId, copy.folders, copy.tags, copy.collapsed, copy.isSharedFolder, false);
                return dup;
            }
            if (obj instanceof SearchTreeImplement_1.NewTag) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr))
                        copy[attr] = this.cloneObject(obj[attr]);
                }
                var dup = new SearchTreeImplement_1.NewTag(Math.floor(Math.random() * 100).toString(), copy.tagName, copy.queryId, copy.extraInfo, copy.type, copy.parentFolderId, copy.collapsed, copy.isRule, copy.isRuleStopped, copy.hasKml, copy.isSharedTag);
                return dup;
            }
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    };
    return searchFolderService;
}());
exports.searchFolderService = searchFolderService;


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actionFolderTypes;
(function (actionFolderTypes) {
    actionFolderTypes[actionFolderTypes["AddFolder"] = 0] = "AddFolder";
    actionFolderTypes[actionFolderTypes["Edit"] = 1] = "Edit";
    actionFolderTypes[actionFolderTypes["Delete"] = 2] = "Delete";
    actionFolderTypes[actionFolderTypes["Duplicte"] = 3] = "Duplicte";
    actionFolderTypes[actionFolderTypes["AddTag"] = 4] = "AddTag";
})(actionFolderTypes = exports.actionFolderTypes || (exports.actionFolderTypes = {}));


/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var typesActionTag;
(function (typesActionTag) {
    typesActionTag[typesActionTag["Edit"] = 0] = "Edit";
    typesActionTag[typesActionTag["Delete"] = 1] = "Delete";
    typesActionTag[typesActionTag["Duplicte"] = 2] = "Duplicte";
})(typesActionTag = exports.typesActionTag || (exports.typesActionTag = {}));


/***/ }),
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var typesActionTag_1 = __webpack_require__(34);
var SearchTreeImplement_1 = __webpack_require__(5);
var searchTagService = (function () {
    function searchTagService(actionType) {
        this.actionType = actionType;
    }
    searchTagService.prototype.executeAction = function (id, tree, newTagName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.updateTree(id, tree, newTagName);
            if (_this.isTagFound) {
                resolve(tree);
            }
            else {
                reject('error- item not found');
            }
        });
    };
    searchTagService.prototype.updateTree = function (id, tree, newTagName) {
        var _this = this;
        tree.tags.forEach(function (tag, index, currentTags) {
            if (tag.tagId === id) {
                _this.isTagFound = true;
                switch (_this.actionType) {
                    case typesActionTag_1.typesActionTag.Edit:
                        _this.editTag(newTagName, currentTags, index);
                        break;
                    case typesActionTag_1.typesActionTag.Delete:
                        _this.deleteTag(currentTags, index);
                        break;
                    case typesActionTag_1.typesActionTag.Duplicte:
                        _this.duplicteTag(currentTags, index);
                        break;
                    default:
                        console.log('actionType no match: ', _this.actionType);
                        break;
                }
            }
        });
        if (!this.isTagFound) {
            tree.folders.forEach(function (folder) {
                _this.updateTree(id, folder, newTagName);
            });
        }
    };
    searchTagService.prototype.editTag = function (newTagName, currentTags, index) {
        currentTags[index].tagName = newTagName;
    };
    searchTagService.prototype.deleteTag = function (arrayTags, index) {
        arrayTags.splice(index, 1);
    };
    searchTagService.prototype.duplicteTag = function (currentTags, index) {
        var duplictedTag = new SearchTreeImplement_1.NewTag(Math.floor(Math.random() * 100).toString(), currentTags[index].tagName, currentTags[index].queryId, currentTags[index].extraInfo, currentTags[index].type, currentTags[index].parentFolderId, currentTags[index].collapsed, currentTags[index].isRule, currentTags[index].isRuleStopped, currentTags[index].hasKml, currentTags[index].isSharedTag);
        currentTags.push(duplictedTag);
    };
    return searchTagService;
}());
exports.searchTagService = searchTagService;


/***/ }),
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(168);
__webpack_require__(170);
__webpack_require__(172);
__webpack_require__(174);
__webpack_require__(176);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(186);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(192);
__webpack_require__(194);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(200);
__webpack_require__(202);
__webpack_require__(213);


/***/ }),
/* 163 */
/***/ (function(module, exports) {

(function () {
    var toastrModule = angular.module('toastr', []);
    toastr.options.timeOut = 1000;
    toastrModule.value('toastr', toastr);
}());


/***/ }),
/* 164 */
/***/ (function(module, exports) {

var app = angular.module('app', ['ngRoute', 'toastr', 'ngMaterial']);
app.run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function (e, next, prev, err) {
        if (err === "AUTH_REQUIRED") {
            $location.path("/login");
        }
        if (err === 'NOT_AUTHORIZED') {
            $location.path("/home");
        }
    });
});
app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);


/***/ }),
/* 165 */
/***/ (function(module, exports) {

angular.module('app').config(function ($routeProvider) {
    var routeResolvers = {
        loggedIn: function (auth) {
            return auth.requireLogin();
        },
        waitForAuth: function (auth) {
            return auth.waitForAuth();
        },
        requireAdmin: function (auth) {
            return auth.requireAdmin();
        },
        userSessions: function (sessions, currentIdentity, auth) {
            return auth.requireLogin().then(function () {
                return sessions.getSessionsByUser(currentIdentity.currentUser.id);
            });
        },
        allSessions: function (sessions, auth) {
            return auth.requireLogin().then(function () {
                return sessions.getAllSessions();
            });
        },
        allUsers: function (users, auth) {
            return auth.requireLogin().then(function () {
                return users.getAllUsers();
            });
        }
    };
    $routeProvider
        .when('/admin/login', {
        template: '<admin-login></admin-login>',
        resolve: {
            currentAuth: routeResolvers.waitForAuth
        }
    })
        .when('/admin/results', {
        template: '<results all-sessions="$resolve.allSessions"></results>',
        resolve: {
            admin: routeResolvers.requireAdmin,
            allSessions: routeResolvers.allSessions
        }
    })
        .when('/admin/users/:id', {
        template: '<user-details all-users="$resolve.allUsers"></user-details>',
        resolve: {
            admin: routeResolvers.requireAdmin,
            allUsers: routeResolvers.allUsers
        }
    })
        .when('/users', {
        template: '<user-list all-users="$resolve.allUsers"></user-list>',
        resolve: {
            admin: routeResolvers.requireAdmin,
            allUsers: routeResolvers.allUsers
        }
    })
        .when('/admin/createusers', {
        template: '<create-users></create-users>',
        resolve: {
            admin: routeResolvers.requireAdmin
        }
    })
        .when('/home', {
        template: '<home user-sessions="$resolve.userSessions"></home>',
        resolve: {
            login: routeResolvers.loggedIn,
            userSessions: routeResolvers.userSessions
        }
    })
        .when('/profile', {
        template: '<profile></profile>',
        resolve: {
            userProfile: routeResolvers.loggedIn,
        }
    })
        .when('/createsession', {
        template: '<create-new-session user-sessions="$resolve.userSessions"></create-new-user>',
        resolve: {
            userSessions: routeResolvers.userSessions,
        }
    })
        .when('/login', {
        template: '<login></login>',
        resolve: {
            currentAuth: routeResolvers.waitForAuth
        }
    })
        .when('/searchTree', {
        template: '<search-tree-perent></search-tree-perent>',
        resolve: {}
    })
        .when('/logout', {
        template: '<logout></logout>'
    })
        .otherwise('/home');
});


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('adminLogin', {
    template: __webpack_require__(167),
    bindings: {},
    controller: function ($location, currentIdentity, auth, toastr) {
        this.loggedIn = currentIdentity.authenticated();
        if (this.loggedIn) {
            $location.path('/home');
        }
        this.login = function () {
            auth.login({
                username: this.email,
                password: this.password
            }).then(function () {
                $location.path('/home');
            }, function (err) {
                toastr.error(err);
            });
        };
    }
});


/***/ }),
/* 167 */
/***/ (function(module, exports) {

module.exports = "<h1>Admin Login</h1>\r\n\r\n<form class=\"form\">\r\n  <div class=\"row\">\r\n  <div class=\"form-group col-sm-6\">\r\n    <input type=\"text\" autofocus placeholder=\"Email Address\" ng-model=\"$ctrl.email\" class=\"form-control\">\r\n  </div>\r\n  </div>\r\n  <div class=\"row\">\r\n  <div class=\"form-group col-sm-6\">\r\n    <input type=\"password\" placeholder=\"Password\" ng-model=\"$ctrl.password\" class=\"form-control\">\r\n  </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n    <button class=\"btn btn-primary\" ng-click=\"$ctrl.login()\">Login</button>\r\n    </div>\r\n  </div>\r\n</form>";

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('results', {
    template: __webpack_require__(169),
    bindings: {
        sessionsByVoteDesc: '=allSessions'
    },
    controller: function () {
        this.$onInit = function () {
            this.sessionsByVoteDesc.sort(function (session1, session2) {
                // reverse order
                return session2.voteCount - session1.voteCount;
            });
        };
    }
});


/***/ }),
/* 169 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n<h1>Results</h1>\r\n\r\n<session-detail-with-votes session=\"session\" ng-repeat=\"session in $ctrl.sessionsByVoteDesc\"></session-detail-with-votes>\r\n\r\n";

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('createUsers', {
    template: __webpack_require__(171),
    bindings: {},
    controller: function (nameParser, users, toastr) {
        this.import = function () {
            var people = nameParser.parse(this.namesblob);
            people.forEach((function (person) {
                users.createNewUser({
                    email: person.email,
                    password: "pass",
                    firstName: person.firstName,
                    lastName: person.lastName
                }).catch(function (error) {
                    toastr.error("User already exists: " + person.email);
                }.bind(this));
            }).bind(this));
            toastr.success("Users Created!");
        };
    }
});


/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n\r\n<h1>Create Users</h1>\r\n<p>Enter Email Addresses here. One on each line, First and Last Name Pipe Separated</p>\r\n<textarea name=\"emailAddresses\" id=\"\" cols=\"30\" rows=\"10\" class=\"form-control\" \r\n  placeholder=\"Email Addresses\" ng-model=\"$ctrl.namesblob\"></textarea>\r\n<br>\r\n<button class=\"btn btn-primary\" ng-click=\"$ctrl.import()\">Create Users</button>\r\n";

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('userList', {
    template: __webpack_require__(173),
    bindings: {
        users: '=allUsers'
    },
    controller: function () {
        this.$onInit = function () {
            this.users.sort(function (user1, user2) {
                if (user1.firstName < user2.firstName)
                    return -1;
                if (user1.firstName === user2.firstName)
                    return 0;
                if (user1.firstName > user2.firstName)
                    return 1;
            });
        };
    }
});


/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n<h1>User List</h1>\r\n\r\n<a ng-href=\"#/admin/users/{{user.id}}\" zoom-in \r\n  class=\"btn btn-primary btn-spaced\" \r\n  ng-repeat=\"user in $ctrl.users\">\r\n  {{user.firstName}}\r\n  {{user.lastName}}\r\n</a>\r\n";

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('userDetails', {
    template: __webpack_require__(175),
    bindings: {
        allUsers: '='
    },
    controller: function ($routeParams) {
        this.$onInit = function () {
            this.user = this.allUsers.find(function (user) {
                return user.id === parseInt($routeParams.id);
            });
        };
    }
});


/***/ }),
/* 175 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n<div class=\"jumbotron\">\r\n  <h1>{{$ctrl.user.firstName}} {{$ctrl.user.lastName}}\r\n    <span class=\"badge\" ng-show=\"$ctrl.user.isAdmin\">Admin</span>\r\n  </h1>\r\n  <p>{{$ctrl.user.email}}</p>\r\n</div>";

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('nav', {
    template: __webpack_require__(177),
    bindings: {},
    controller: function (currentIdentity, sessions, unreviewedSessionCount) {
        this.currentUser = currentIdentity.currentUser;
        unreviewedSessionCount.updateUnreviewedSessionCount();
        this.unreviewedSessionCount = unreviewedSessionCount;
    }
});


/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = "<div \r\n  class=\"navbar navbar-fixed-top navbar-inverse\">\r\n  <div class=\"container\">\r\n    <div class=\"navbar-header\"><a href=\"/\" class=\"navbar-brand\">Lightning Talks</a></div>\r\n    <div class=\"navbar-collapse collapse\">\r\n      <ul class=\"nav navbar-nav\">\r\n        <li><a href=\"#/\">Home <span class=\"badge\">{{$ctrl.unreviewedSessionCount.value}}</span> </a></li>\r\n        <li><a href=\"#/createsession\">Create Session</a></li>\r\n        <li><a href=\"#/profile\">Profile</a></li>\r\n        <li><a href=\"#/admin/createusers\" ng-show=\"$ctrl.currentUser.isAdmin\">Create Users</a></li>\r\n        <li><a href=\"#/admin/results\" ng-show=\"$ctrl.currentUser.isAdmin\">Results</a></li>\r\n        <li><a href=\"#/users\" ng-show=\"$ctrl.currentUser.isAdmin\">Users</a></li>\r\n        <li><a href=\"#/searchTree\">Search Tree</a></li>\r\n        <li><a href=\"#/logout\">Logout</a></li>\r\n      </ul>\r\n      \r\n      <ul class=\"nav navbar-right navbar nav\">\r\n        <li class=\"navbar-text\">\r\n          Welcome {{$ctrl.currentUser.firstName}} {{$ctrl.currentUser.lastName}}\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n";

/***/ }),
/* 178 */
/***/ (function(module, exports) {

angular.module('app').component('logout', {
    controller: function ($location, auth) {
        auth.logout();
        $location.path('/login');
    }
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('login', {
    template: __webpack_require__(180),
    bindings: {},
    controller: (function () {
        function LoginCtrl($location, currentIdentity, auth, toastr) {
            this.$location = $location;
            this.auth = auth;
            this.toastr = toastr;
            if (currentIdentity.authenticated()) {
                $location.path('/home');
            }
        }
        LoginCtrl.prototype.login = function () {
            var _this = this;
            this.auth.login({
                username: this.email,
                password: "pass"
            }).then(function () {
                _this.$location.path('/home');
            }, function (err) {
                _this.toastr.error(err);
            });
        };
        return LoginCtrl;
    }())
});


/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = "<h1>Please Login</h1>\r\n\r\n<p>Enter your attendee email address</p>\r\n<form class=\"form\">\r\n  <div class=\"row\">\r\n    <div class=\"form-group col-sm-6\">\r\n      <input type=\"text\" autofocus placeholder=\"Email Address\" ng-model=\"$ctrl.email\" class=\"form-control\">\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n      <md-button ng-click=\"$ctrl.login()\">Login</md-button>\r\n    </div>\r\n  </div>\r\n</form>";

/***/ }),
/* 181 */
/***/ (function(module, exports) {

angular.module('app').service('auth', (function () {
    function Auth($q, $http, currentIdentity) {
        this.$q = $q;
        this.$http = $http;
        this.currentIdentity = currentIdentity;
    }
    Auth.prototype.login = function (credentials) {
        var _this = this;
        var dfd = this.$q.defer();
        this.$http.post('/api/login', credentials).then(function (response) {
            _this.currentIdentity.setUser(response.data.user);
            dfd.resolve();
        }, function (response) {
            dfd.reject("Invalid Credentials");
        });
        return dfd.promise;
    };
    Auth.prototype.logout = function () {
        var _this = this;
        var dfd = this.$q.defer();
        this.$http.post('/api/logout').then(function (response) {
            _this.currentIdentity.clearUser();
            dfd.resolve();
        }, function (response) {
            dfd.reject("Error Logging Out");
        });
        return dfd.promise;
    };
    Auth.prototype.waitForAuth = function () {
        var _this = this;
        var dfd = this.$q.defer();
        this.$http.get('/api/currentIdentity').then(function (response) {
            if (!!response.data) {
                _this.currentIdentity.setUser(response.data);
            }
            dfd.resolve(_this.currentIdentity);
        });
        return dfd.promise;
    };
    Auth.prototype.requireLogin = function () {
        var _this = this;
        return this.waitForAuth().then(function () {
            if (_this.currentIdentity.authenticated()) {
                return true;
            }
            else {
                return _this.$q.reject('AUTH_REQUIRED');
            }
        });
    };
    Auth.prototype.requireAdmin = function () {
        var _this = this;
        return this.waitForAuth().then(function () {
            if (_this.currentIdentity.authenticated() && _this.currentIdentity.currentUser.isAdmin) {
                return true;
            }
            else {
                return _this.$q.reject('AUTH_REQUIRED');
            }
        });
    };
    return Auth;
}()));


/***/ }),
/* 182 */
/***/ (function(module, exports) {

angular.module('app').service('currentIdentity', (function () {
    function CurrentIdentity($http, $q) {
        this.$http = $http;
        this.$q = $q;
        this.currentUser = null;
    }
    CurrentIdentity.prototype.setUser = function (user) {
        this.currentUser = user;
    };
    CurrentIdentity.prototype.clearUser = function () {
        this.currentUser = null;
    };
    CurrentIdentity.prototype.authenticated = function () {
        return !!this.currentUser;
    };
    CurrentIdentity.prototype.updateUser = function (newUserObj) {
        var _this = this;
        var dfd = this.$q.defer();
        this.$http.put('/api/users/' + this.currentUser.id, newUserObj).then(function (response) {
            _this.currentUser.firstName = newUserObj.firstName;
            _this.currentUser.lastName = newUserObj.lastName;
            dfd.resolve();
        }, function (response) {
            dfd.reject("Error Logging Out");
        });
        return dfd.promise;
    };
    return CurrentIdentity;
}()));


/***/ }),
/* 183 */
/***/ (function(module, exports) {

angular.module('app').service('users', (function () {
    function Users($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }
    Users.prototype.createNewUser = function (newUser) {
        return this.$http.post('/api/users', newUser);
    };
    Users.prototype.getAllUsers = function () {
        var dfd = this.$q.defer();
        this.$http.get('/api/users').then(function (response) {
            dfd.resolve(response.data);
        });
        return dfd.promise;
    };
    return Users;
}()));


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('home', {
    template: __webpack_require__(185),
    bindings: {
        userSessions: '='
    },
    controller: function (currentIdentity, sessions, toastr, unreviewedSessionCount) {
        this.currentUser = currentIdentity.currentUser;
        this.setNextSessionToReview = function () {
            var _this = this;
            sessions.getNextUnreviewedSession(currentIdentity.currentUser.id).then(function (response) {
                _this.currentSessionToReview = response.data;
            });
        };
        this.setNextSessionToReview();
        this.voteYes = function () {
            var _this = this;
            sessions.incrementVote(this.currentSessionToReview.id)
                .then(function () { return sessions.addReviewedSession(_this.currentUser.id, _this.currentSessionToReview.id); })
                .then(function () {
                this.setNextSessionToReview();
                // pull updated value
                unreviewedSessionCount.updateUnreviewedSessionCount();
            }.bind(this));
        };
        this.voteNo = function () {
            sessions.addReviewedSession(this.currentUser.id, this.currentSessionToReview.id)
                .then(function () {
                this.setNextSessionToReview();
                // pull updated value
                unreviewedSessionCount.updateUnreviewedSessionCount();
            }.bind(this));
        };
    }
});


/***/ }),
/* 185 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n\r\n<h2 style=\"margin-top:30px\">Unreviewed Sessions</h2>\r\n<unreviewed-talk [session]=\"$ctrl.currentSessionToReview\" (vote-no)=\"$ctrl.voteNo()\" (vote-yes)=\"$ctrl.voteYes()\"></unreviewed-talk>\r\n<hr style=\"margin-top:20px\">\r\n<h3>Your Sessions\r\n<a zoom-in class=\"btn btn-primary btn-xs\" href=\"#/createsession\">Create a New Session</a>\r\n</h3>\r\n\r\n<div ng-repeat=\"session in $ctrl.userSessions\">\r\n  <session-detail session=\"session\" initial-collapsed=\"true\"></session-detail>\r\n</div>\r\n";

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('createNewSession', {
    template: __webpack_require__(187),
    bindings: {
        userSessions: '='
    },
    controller: function (toastr, currentIdentity, sessions) {
        this.create = function () {
            var newUserSession = {
                title: this.title,
                length: parseInt(this.length),
                abstract: this.abstract,
                userFirstName: currentIdentity.currentUser.firstName,
                userLastName: currentIdentity.currentUser.lastName,
                userId: currentIdentity.currentUser.id,
            };
            sessions.createNewSession(newUserSession).then(function (response) {
                this.userSessions.push(response.data);
            }.bind(this));
        };
    }
});


/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n\r\n<h1>Create New Session</h1>\r\n\r\n<form class=\"form\">\r\n  <div class=\"form-group\">\r\n    Give your session a title\r\n    <input required type=\"text\" placeholder=\"Title\" ng-model=\"$ctrl.title\" class=\"form-control\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    Enter a length, from 2 minutes to 30 minutes\r\n    <input required type=\"number\" placeholder=\"Length in Minutes\" \r\n      ng-model=\"$ctrl.length\" class=\"form-control\" min=\"2\" max=\"30\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    Describe your session\r\n    <textarea required name=\"\" id=\"\" cols=\"30\" rows=\"4\" \r\n      ng-model=\"$ctrl.abstract\" class=\"form-control\"\r\n      placeholder=\"Abstract\"></textarea>\r\n  </div>\r\n  \r\n  <div class=\"row\">\r\n    <div class=\"col-sm-3\">\r\n      <button class=\" btn btn-primary btn-sm\" ng-click=\"$ctrl.create()\">Create</button>\r\n    </div>\r\n  </div>\r\n</form>\r\n\r\n<h2>Your Other Sessions</h2>\r\n<div ng-repeat=\"session in $ctrl.userSessions\">\r\n  <session-detail session=\"session\" initial-collapsed=\"false\"></session-detail>\r\n</div>";

/***/ }),
/* 188 */
/***/ (function(module, exports) {

angular.module('app').service('sessions', (function () {
    function Sessions($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }
    Sessions.prototype.getSessionsByUser = function (userId) {
        var dfd = this.$q.defer();
        this.$http.get('/api/sessions/user/' + userId).then(function (response) {
            dfd.resolve(response.data);
        }, function () {
            dfd.reject();
        });
        return dfd.promise;
    };
    Sessions.prototype.getAllSessions = function () {
        var dfd = this.$q.defer();
        this.$http.get('/api/sessions').then(function (response) {
            dfd.resolve(response.data);
        }, function () {
            dfd.reject();
        });
        return dfd.promise;
    };
    Sessions.prototype.createNewSession = function (newSession) {
        return this.$http.post('/api/sessions', newSession);
    };
    Sessions.prototype.getNextUnreviewedSession = function (userId) {
        return this.$http.get("/api/users/" + userId + "/randomUnreviewedSession");
    };
    Sessions.prototype.addReviewedSession = function (userId, sessionId) {
        return this.$http.post('/api/users/' + userId + '/reviewSession/' + sessionId);
    };
    Sessions.prototype.incrementVote = function (sessionId) {
        return this.$http.put('/api/sessions/' + sessionId + '/incrementVote/');
    };
    Sessions.prototype.getUnreviewedCount = function (userId) {
        return this.$http.get('/api/users/' + userId + '/unreviewedSessionCount');
    };
    return Sessions;
}()));


/***/ }),
/* 189 */
/***/ (function(module, exports) {

angular.module('app').service('unreviewedSessionCount', (function () {
    function UnreviewedSessionCount(sessions, currentIdentity) {
        this.value = 0;
        this.sessions = sessions;
        this.currentIdentity = currentIdentity;
    }
    UnreviewedSessionCount.prototype.updateUnreviewedSessionCount = function () {
        var _this = this;
        this.sessions.getUnreviewedCount(this.currentIdentity.currentUser.id)
            .then(function (response) {
            _this.value = response.data.count;
        });
    };
    return UnreviewedSessionCount;
}()));


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('sessionDetail', {
    template: __webpack_require__(191),
    bindings: {
        session: '=',
        initialCollapsed: '@'
    },
    controller: function () {
    }
});


/***/ }),
/* 191 */
/***/ (function(module, exports) {

module.exports = "<detail-panel collapsed=\"{{$ctrl.initialCollapsed}}\" title=\"{{$ctrl.session.title}}\">\r\n  <strong>{{$ctrl.session.length | talkDuration}}</strong>\r\n  <p><small>{{$ctrl.session.abstract}}</small></p>  \r\n</detail-panel>\r\n";

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('sessionDetailWithVotes', {
    template: __webpack_require__(193),
    bindings: {
        session: '=',
        initialCollapsed: '@'
    },
    controller: function () {
    }
});


/***/ }),
/* 193 */
/***/ (function(module, exports) {

module.exports = "<detail-panel collapsed=\"{{$ctrl.initialCollapsed}}\" title=\"{{$ctrl.session.title}}\">\r\n  <strong>{{$ctrl.session.voteCount}} votes</strong>\r\n  <p>{{$ctrl.session.length | talkDuration}}</p>\r\n  <p><small>{{$ctrl.session.abstract}}</small></p>  \r\n</detail-panel>\r\n";

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('detailPanel', {
    transclude: true,
    template: __webpack_require__(195),
    bindings: {
        title: '@',
        initialCollapsed: '@collapsed'
    },
    controller: function () {
        this.collapsed = (this.initialCollapsed === 'true');
        this.collapse = function () {
            this.collapsed = !this.collapsed;
        };
    }
});


/***/ }),
/* 195 */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-primary\">\r\n  <div class=\"panel-heading pointable\" ng-click=\"$ctrl.collapse()\">\r\n    <span>{{$ctrl.title}}</span>\r\n  </div>\r\n  <div class=\"panel-body\" ng-hide=\"$ctrl.collapsed\" ng-transclude>\r\n  </div>\r\n</div>";

/***/ }),
/* 196 */
/***/ (function(module, exports) {

angular.module('app').filter('talkDuration', function () {
    return function (duration) {
        return "Duration: " + duration + " minutes";
    };
});


/***/ }),
/* 197 */
/***/ (function(module, exports) {

angular.module('app').directive('zoomIn', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            el.on('mouseenter', function () {
                el[0].style.transform = "scale(1.1,1.1)";
            });
            el.on('mouseleave', function () {
                el[0].style.transform = "scale(1,1)";
            });
        }
    };
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(57);
var SearchTreeImplement_1 = __webpack_require__(5);
angular.module('app').component('searchTreePerent', {
    template: __webpack_require__(199),
    bindings: {},
    controller: function () {
        var _this = this;
        this.tree = SearchTreeImplement_1.exampleObject;
        var $ctrl = this;
        $ctrl.handleAction = function (action) {
            console.log('handleAction functiom');
            return action.visit()
                .then(function (tree) {
                _this.tree = tree;
                console.log('on perent: ', tree);
            })
                .catch(function (error) {
                console.log('error - perent', error);
            });
        };
    }
});


/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports = "<search-tree tree=\"$ctrl.tree\" handle-action=\"$ctrl.handleAction\"></search-tree>\r\n";

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('searchTree', {
    template: __webpack_require__(201),
    bindings: {
        tree: '=',
        handleAction: "&"
    },
    controller: function () { }
});


/***/ }),
/* 201 */
/***/ (function(module, exports) {

module.exports = "<div class=\"tree-container\">    \r\n    <ul> \r\n        <li>\r\n            <folder-handling tree=\"$ctrl.tree\" handle-action=\"$ctrl.handleAction(action)\"></folder-handling>\r\n        </li>\r\n    </ul>\r\n</div>";

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(57);
var editFolderAction_1 = __webpack_require__(203);
var deleteFolderAction_1 = __webpack_require__(204);
var shareFolderAction_1 = __webpack_require__(205);
var duplicateFolderAction_1 = __webpack_require__(206);
var removeSharingFolderAction_1 = __webpack_require__(207);
var sharingInfoFolderAction_1 = __webpack_require__(208);
var addNewFolderAction_1 = __webpack_require__(209);
var removeAllLayersFolderAction_1 = __webpack_require__(210);
var addNewTagFolderAction_1 = __webpack_require__(211);
angular.module('app')
    .component('folderHandling', {
    template: __webpack_require__(212),
    bindings: {
        tree: '=',
        handleAction: "="
    },
    controller: function ($mdDialog) {
        var _this = this;
        var $ctrl = this;
        $ctrl.onFolderClicked = function (tree) {
            tree.folders.forEach(function (folder) {
                folder.collapsed = !folder.collapsed;
            });
            tree.tags.forEach(function (tag) {
                tag.collapsed = !tag.collapsed;
            });
        };
        $ctrl.openMenu = function ($mdMenu, event) {
            $mdMenu.open(event);
        };
        $ctrl.showDeleteConfirm = function (event, folder) {
            var confirm = $mdDialog.confirm()
                .title('?האם אתה בטוח שברצונך למחוק את התיקייה')
                .textContent('כל התיקיות והתגים בתוך תיקייה זו ימחקו לצמיתות')
                .ok('מחק')
                .cancel('ביטול');
            $mdDialog.show(confirm).then(function () {
                onFolderDeleted(folder);
            }, function () { });
        };
        $ctrl.showRemoveSharingConfirm = function (event, folder) {
            var confirm = $mdDialog.confirm()
                .title('?האם אתה בטוח שברצונך להסיר שיתוף תיקייה ')
                .textContent(' התיקיות והתגיות בתיקייה זו לא יהיו נגישים יותר')
                .ok('הסר שיתוף')
                .cancel('ביטול');
            $mdDialog.show(confirm).then(function () {
                onRemoveSharing(folder);
            }, function () { });
        };
        $ctrl.showAddingFolderDialog = function (ev, folder) {
            var confirm = $mdDialog.prompt()
                .title('הכנס שם תיקייה')
                .placeholder('שם תיקייה')
                .required(true)
                .ok('צור תיקייה')
                .cancel('בטל');
            $mdDialog.show(confirm).then(function (result) {
                onAddingFolder(folder, result);
            }, function () { });
        };
        $ctrl.showAddingTagDialog = function (ev, folder) {
            var confirm = $mdDialog.prompt()
                .title('הכנס שם תגית')
                .placeholder('שם תגית')
                .required(true)
                .ok('צור תגית')
                .cancel('בטל');
            $mdDialog.show(confirm).then(function (result) {
                onAddingTag(folder, result);
            }, function () { });
        };
        $ctrl.showEditFolderDialog = function (ev, folder) {
            var confirm = $mdDialog.prompt()
                .title('הכנס שם חדש')
                .placeholder('שם תיקייה')
                .required(true)
                .ok('עדכן שם')
                .cancel('בטל');
            $mdDialog.show(confirm).then(function (result) {
                onFolderEdited(folder, result);
            }, function () { });
        };
        var onFolderDeleted = function (folder) {
            $ctrl.handleAction(new deleteFolderAction_1.deleteFolderAction(folder.folderId));
        };
        var onRemoveSharing = function (folder) {
            _this.handleAction(new removeSharingFolderAction_1.removeSharingFolderAction(folder.folderId));
        };
        var onAddingFolder = function (folder, newFolderName) {
            console.log(folder, newFolderName);
            _this.handleAction(new addNewFolderAction_1.addNewFolderAction(folder.folderId, newFolderName));
        };
        var onFolderEdited = function (folder, newFolderName) {
            console.log(folder, newFolderName);
            _this.handleAction(new editFolderAction_1.editFolderAction(folder.folderId, newFolderName));
        };
        var onAddingTag = function (folder, newTagName) {
            $ctrl.handleAction(new addNewTagFolderAction_1.addNewTagFolderAction(folder.folderId, newTagName));
        };
        $ctrl.onFolderShared = function (folder) {
            _this.handleAction(new shareFolderAction_1.shareFolderAction(folder.folderId));
        };
        $ctrl.onFolderDuplicated = function (folder) {
            _this.handleAction(new duplicateFolderAction_1.duplicateFolderAction(folder.folderId));
        };
        $ctrl.onSharedInfo = function (folder) {
            _this.handleAction(new sharingInfoFolderAction_1.sharingInfoFolderAction(folder.folderId));
        };
        $ctrl.removeAllLayers = function (folder) {
            $ctrl.handleAction(new removeAllLayersFolderAction_1.removeAllLayersFolderAction(folder.folderId));
        };
    }
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var searchFolderService_1 = __webpack_require__(15);
var actionFolderTypes_1 = __webpack_require__(20);
var SearchTreeImplement_1 = __webpack_require__(5);
var editFolderAction = (function () {
    function editFolderAction(folderId, newFolderName) {
        this.folderId = folderId;
        this.newFolderName = newFolderName;
    }
    editFolderAction.prototype.visit = function () {
        var searchService = new searchFolderService_1.searchFolderService(actionFolderTypes_1.actionFolderTypes.Edit);
        return searchService.executeAction(this.folderId, SearchTreeImplement_1.exampleObject, this.newFolderName);
    };
    return editFolderAction;
}());
exports.editFolderAction = editFolderAction;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SearchTreeImplement_1 = __webpack_require__(5);
var searchFolderService_1 = __webpack_require__(15);
var actionFolderTypes_1 = __webpack_require__(20);
var deleteFolderAction = (function () {
    function deleteFolderAction(folderId) {
        this.folderId = folderId;
    }
    deleteFolderAction.prototype.visit = function () {
        var searchService = new searchFolderService_1.searchFolderService(actionFolderTypes_1.actionFolderTypes.Delete);
        return searchService.executeAction(this.folderId, SearchTreeImplement_1.exampleObject);
    };
    return deleteFolderAction;
}());
exports.deleteFolderAction = deleteFolderAction;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var shareFolderAction = (function () {
    function shareFolderAction(folderId) {
        this.folderId = folderId;
    }
    shareFolderAction.prototype.visit = function () {
        console.log('folder shared: ' + this.folderId);
        return new Promise(function (res, rej) { });
    };
    return shareFolderAction;
}());
exports.shareFolderAction = shareFolderAction;


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var searchFolderService_1 = __webpack_require__(15);
var SearchTreeImplement_1 = __webpack_require__(5);
var actionFolderTypes_1 = __webpack_require__(20);
var duplicateFolderAction = (function () {
    function duplicateFolderAction(folderId) {
        this.folderId = folderId;
    }
    duplicateFolderAction.prototype.visit = function () {
        console.log('folder duplicated: ' + this.folderId);
        var searchService = new searchFolderService_1.searchFolderService(actionFolderTypes_1.actionFolderTypes.Duplicte);
        return searchService.executeAction(this.folderId, SearchTreeImplement_1.exampleObject);
    };
    return duplicateFolderAction;
}());
exports.duplicateFolderAction = duplicateFolderAction;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var removeSharingFolderAction = (function () {
    function removeSharingFolderAction(folderId) {
        this.folderId = folderId;
    }
    removeSharingFolderAction.prototype.visit = function () {
        console.log('folder sharing removed: ' + this.folderId);
        return new Promise(function (res, rej) { });
    };
    return removeSharingFolderAction;
}());
exports.removeSharingFolderAction = removeSharingFolderAction;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sharingInfoFolderAction = (function () {
    function sharingInfoFolderAction(folderId) {
        this.folderId = folderId;
    }
    sharingInfoFolderAction.prototype.visit = function () {
        console.log('folder sharing info: ' + this.folderId);
        return new Promise(function (res, rej) { });
    };
    return sharingInfoFolderAction;
}());
exports.sharingInfoFolderAction = sharingInfoFolderAction;


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SearchTreeImplement_1 = __webpack_require__(5);
var searchFolderService_1 = __webpack_require__(15);
var actionFolderTypes_1 = __webpack_require__(20);
var addNewFolderAction = (function () {
    function addNewFolderAction(folderId, newFolderName) {
        this.folderId = folderId;
        this.newFolderName = newFolderName;
    }
    addNewFolderAction.prototype.visit = function () {
        var searchService = new searchFolderService_1.searchFolderService(actionFolderTypes_1.actionFolderTypes.AddFolder);
        return searchService.executeAction(this.folderId, SearchTreeImplement_1.exampleObject, this.newFolderName);
    };
    return addNewFolderAction;
}());
exports.addNewFolderAction = addNewFolderAction;


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var searchFolderService_1 = __webpack_require__(15);
var removeAllLayersFolderAction = (function () {
    function removeAllLayersFolderAction(folderId) {
        this.folderId = folderId;
    }
    removeAllLayersFolderAction.prototype.visit = function () {
        console.log('removeAllLayersFolderAction: ', this.folderId);
        var searchService = new searchFolderService_1.searchFolderService(null);
        return new Promise(function (res, rej) { });
    };
    return removeAllLayersFolderAction;
}());
exports.removeAllLayersFolderAction = removeAllLayersFolderAction;


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SearchTreeImplement_1 = __webpack_require__(5);
var searchFolderService_1 = __webpack_require__(15);
var actionFolderTypes_1 = __webpack_require__(20);
var addNewTagFolderAction = (function () {
    function addNewTagFolderAction(folderId, newTagName) {
        this.folderId = folderId;
        this.newTagName = newTagName;
    }
    addNewTagFolderAction.prototype.visit = function () {
        var searchService = new searchFolderService_1.searchFolderService(actionFolderTypes_1.actionFolderTypes.AddTag);
        return searchService.executeAction(this.folderId, SearchTreeImplement_1.exampleObject, this.newTagName);
    };
    return addNewTagFolderAction;
}());
exports.addNewTagFolderAction = addNewTagFolderAction;


/***/ }),
/* 212 */
/***/ (function(module, exports) {

module.exports = "<div ng-cloak>       \r\n    <md-menu>\r\n        <div class=\"md-icon-button tree-item\" ng-click=\"$ctrl.onFolderClicked($ctrl.tree)\">         \r\n            <div class=\"tree-item\">\r\n                <span class=\"material-icons\" ng-show=\"$ctrl.tree.isSharedFolder && ($ctrl.tree.folders[0].collapsed || $ctrl.tree.tags[0].collapsed)\">folder_shared</span>\r\n                <span class=\"material-icons\" ng-show=\"!$ctrl.tree.isSharedFolder && ($ctrl.tree.folders[0].collapsed || $ctrl.tree.tags[0].collapsed)\">folder</span>\r\n                <span class=\"material-icons\" ng-show=\"!$ctrl.tree.folders[0].collapsed && !$ctrl.tree.tags[0].collapsed\">folder_open</span> \r\n                {{$ctrl.tree.folderName}}\r\n                <span class=\"material-icons menu-icon\" ng-click=\"$ctrl.openMenu($mdMenu, $event)\">more_vert</span>\r\n            </div>\r\n        </div>\r\n        <md-menu-content>\r\n            <md-menu-item ng-if=\"!$ctrl.tree.isSharedFolder && !$ctrl.tree.isMainTree\">\r\n                <md-button ng-click=\"$ctrl.showEditFolderDialog($event, $ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">edit</span>\r\n                    עריכה\r\n                </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item ng-if=\"!$ctrl.tree.isSharedFolder && !$ctrl.tree.isMainTree\">\r\n                <md-button ng-click=\"$ctrl.showDeleteConfirm($event, $ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">delete_outline</span>\r\n                    מחיקה\r\n                </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item ng-if=\"!$ctrl.tree.isSharedFolder\">\r\n                <md-button ng-click=\"$ctrl.onFolderShared($ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">share</span>\r\n                    שיתוף\r\n                </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item ng-if=\"!$ctrl.tree.isSharedFolder && !$ctrl.tree.isMainTree\">\r\n                <md-button ng-click=\"$ctrl.onFolderDuplicated($ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">filter_none</span>\r\n                    שכפול\r\n                </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item ng-if=\"$ctrl.tree.isSharedFolder\">\r\n                <md-button ng-click=\"$ctrl.onSharedInfo($ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">info</span>\r\n                    מי שיתף איתי\r\n                </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item ng-if=\"$ctrl.tree.isSharedFolder\">\r\n                <md-button ng-click=\"$ctrl.showRemoveSharingConfirm($event, $ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">delete_outline</span>\r\n                    הסר שיתוף\r\n                </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item ng-if=\"!$ctrl.tree.isSharedFolder\">\r\n                <md-button ng-click=\"$ctrl.showAddingFolderDialog($event, $ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">add_circle_outline</span>\r\n                    הוספת תיקייה\r\n                  </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item ng-if=\"!$ctrl.tree.isSharedFolder\">\r\n                <md-button ng-click=\"$ctrl.showAddingTagDialog($event, $ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">local_offer</span>\r\n                    הוספת תגית\r\n                </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item ng-if=\"!$ctrl.tree.isSharedFolder\">\r\n                <md-button ng-click=\"$ctrl.removeAllLayers($ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">delete</span>\r\n                    הסר את כל השכבות מהמפה\r\n                    </md-button>\r\n            </md-menu-item>\r\n        </md-menu-content>\r\n    </md-menu>\r\n</div>\r\n<ul>\r\n    <li ng-repeat=\"folder in $ctrl.tree.folders track by folder.folderId\" ng-hide=\"folder.collapsed\">\r\n        <folder-handling tree=\"folder\" handle-action=\"$ctrl.handleAction\"></folder-handling>\r\n    </li>\r\n    <tags-handling tree=\"$ctrl.tree\" handle-action=\"$ctrl.handleAction\"></tags-handling>\r\n</ul>";

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(57);
var editTagAction_1 = __webpack_require__(214);
var deleteTagAction_1 = __webpack_require__(215);
var exportTagAction_1 = __webpack_require__(216);
var displayKMLTagAction_1 = __webpack_require__(217);
var startRuleTagAction_1 = __webpack_require__(218);
var stopRuleTagAction_1 = __webpack_require__(219);
var dupicateTagAction_1 = __webpack_require__(220);
angular.module('app')
    .component('tagsHandling', {
    template: __webpack_require__(221),
    bindings: {
        tree: '=',
        handleAction: '='
    },
    controller: function ($mdDialog) {
        var _this = this;
        var $ctrl = this;
        $ctrl.checkboxKML = false;
        $ctrl.showEditTagDialog = function (ev, folder) {
            var confirm = $mdDialog.prompt()
                .title('הכנס שם חדש')
                .placeholder('שם תגית')
                .required(true)
                .ok('עדכן שם')
                .cancel('בטל');
            $mdDialog.show(confirm).then(function (newTagName) {
                onTagEdited(folder, newTagName);
            }, function () { });
        };
        $ctrl.showDeleteConfirm = function (event, folder) {
            var confirm = $mdDialog.confirm()
                .title('?האם אתה בטוח שברצונך למחוק את התגית')
                .textContent('התגית תמחק לצמיתות')
                .ok('מחק')
                .cancel('ביטול');
            $mdDialog.show(confirm).then(function () {
                onTagDeleted(folder);
            }, function () { });
        };
        var onTagEdited = function (tag, newTagName) {
            var getNewTag = $ctrl.handleAction(new editTagAction_1.editTagAction(tag.tagId, newTagName));
        };
        var onTagDeleted = function (tag) {
            var getNewTag = $ctrl.handleAction(new deleteTagAction_1.deleteTagAction(tag.tagId));
        };
        $ctrl.onTagClicked = function (tag) {
            console.log('go to tag link: ', tag);
        };
        $ctrl.openMenu = function ($mdMenu, event) {
            $mdMenu.open(event);
        };
        $ctrl.onTagExported = function (tag) {
            _this.handleAction(new exportTagAction_1.exportTagAction(tag.tagId));
        };
        $ctrl.onDisplayKmlTag = function (tag) {
            _this.handleAction(new displayKMLTagAction_1.displayKMLTagAction(tag.tagId));
            $ctrl.checkboxKML = !$ctrl.checkboxKML;
        };
        $ctrl.onTagRuleStarted = function (tag) {
            _this.handleAction(new startRuleTagAction_1.startRuleTagAction(tag.tagId));
            tag.isRuleStopped = !tag.isRuleStopped;
        };
        $ctrl.onTagRuleStoped = function (tag) {
            _this.handleAction(new stopRuleTagAction_1.stopRuleTagAction(tag.tagId));
            tag.isRuleStopped = !tag.isRuleStopped;
        };
        $ctrl.onTagDuplicated = function (tag) {
            $ctrl.handleAction(new dupicateTagAction_1.duplicteTagAction(tag.tagId));
        };
    }
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SearchTreeImplement_1 = __webpack_require__(5);
var searchTagService_1 = __webpack_require__(58);
var typesActionTag_1 = __webpack_require__(34);
var editTagAction = (function () {
    function editTagAction(tagId, newTagName) {
        this.tagId = tagId;
        this.newTagName = newTagName;
    }
    editTagAction.prototype.visit = function () {
        var searchService = new searchTagService_1.searchTagService(typesActionTag_1.typesActionTag.Edit);
        return searchService.executeAction(this.tagId, SearchTreeImplement_1.exampleObject, this.newTagName);
    };
    return editTagAction;
}());
exports.editTagAction = editTagAction;


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var searchTagService_1 = __webpack_require__(58);
var SearchTreeImplement_1 = __webpack_require__(5);
var typesActionTag_1 = __webpack_require__(34);
var deleteTagAction = (function () {
    function deleteTagAction(tagId) {
        this.tagId = tagId;
    }
    deleteTagAction.prototype.visit = function () {
        var searchService = new searchTagService_1.searchTagService(typesActionTag_1.typesActionTag.Delete);
        return searchService.executeAction(this.tagId, SearchTreeImplement_1.exampleObject);
    };
    return deleteTagAction;
}());
exports.deleteTagAction = deleteTagAction;


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var exportTagAction = (function () {
    function exportTagAction(tagId) {
        this.tagId = tagId;
    }
    exportTagAction.prototype.visit = function () {
        console.log('tag exported: ' + this.tagId);
        return new Promise(function (res, rej) { });
    };
    return exportTagAction;
}());
exports.exportTagAction = exportTagAction;


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var displayKMLTagAction = (function () {
    function displayKMLTagAction(tagId) {
        this.tagId = tagId;
    }
    displayKMLTagAction.prototype.visit = function () {
        console.log('tag kml displayd: ' + this.tagId);
        return new Promise(function (res, rej) { });
    };
    return displayKMLTagAction;
}());
exports.displayKMLTagAction = displayKMLTagAction;


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var startRuleTagAction = (function () {
    function startRuleTagAction(tagId) {
        this.tagId = tagId;
    }
    startRuleTagAction.prototype.visit = function () {
        console.log('tag rule sterted: ' + this.tagId);
        return new Promise(function (res, rej) { });
    };
    return startRuleTagAction;
}());
exports.startRuleTagAction = startRuleTagAction;


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var stopRuleTagAction = (function () {
    function stopRuleTagAction(tagId) {
        this.tagId = tagId;
    }
    stopRuleTagAction.prototype.visit = function () {
        console.log('tag rule stoped: ' + this.tagId);
        return new Promise(function (res, rej) { });
    };
    return stopRuleTagAction;
}());
exports.stopRuleTagAction = stopRuleTagAction;


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var searchTagService_1 = __webpack_require__(58);
var typesActionTag_1 = __webpack_require__(34);
var SearchTreeImplement_1 = __webpack_require__(5);
var duplicteTagAction = (function () {
    function duplicteTagAction(tagId) {
        this.tagId = tagId;
    }
    duplicteTagAction.prototype.visit = function () {
        console.log('tag duplicted: ' + this.tagId);
        var searchService = new searchTagService_1.searchTagService(typesActionTag_1.typesActionTag.Duplicte);
        return searchService.executeAction(this.tagId, SearchTreeImplement_1.exampleObject);
    };
    return duplicteTagAction;
}());
exports.duplicteTagAction = duplicteTagAction;


/***/ }),
/* 221 */
/***/ (function(module, exports) {

module.exports = "<div ng-cloak>       \r\n    <md-menu>\r\n        <div class=\"tree-item\">  \r\n            <span ng-if=\"$ctrl.tree.tagName && !$ctrl.tree.isSharedTag\" class=\"material-icons menu-icon\" ng-click=\"$ctrl.openMenu($mdMenu, $event)\">more_vert</span>\r\n            <apan ng-if=\"$ctrl.tree.isRule\">\r\n                <span ng-if=\"$ctrl.tree.isRuleStopped\" class=\"material-icons play-icon\" ng-click=\"$ctrl.onTagRuleStarted($ctrl.tree)\" title=\"הפעל חוק\">\r\n                    play_circle_filled\r\n                </span>\r\n                <span ng-if=\"!$ctrl.tree.isRuleStopped\" class=\"material-icons pause-icon\" ng-click=\"$ctrl.onTagRuleStoped($ctrl.tree)\" title=\"הפסק חוק\">\r\n                        pause_circle_filled\r\n                </span>\r\n            </apan>\r\n            <div ng-click=\"$ctrl.onTagClicked($ctrl.tree)\">{{$ctrl.tree.tagName}}</div> \r\n        </div> \r\n\r\n        <md-menu-content>\r\n            <md-menu-item>\r\n                    <md-button ng-click=\"$ctrl.showEditTagDialog($event, $ctrl.tree)\">\r\n                        <span class=\"material-icons action-icon\">edit</span>\r\n                        עריכה\r\n                    </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item>\r\n                <md-button ng-click=\"$ctrl.showDeleteConfirm($event, $ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">delete_outline</span>\r\n                    מחיקה\r\n                </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item ng-if=\"!$ctrl.tree.isSharedTag\">\r\n                <md-button ng-click=\"$ctrl.onTagDuplicated($ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">filter_none</span>\r\n                    שכפול\r\n                </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item>\r\n                <md-button ng-click=\"$ctrl.onTagExported($ctrl.tree)\">\r\n                    <span class=\"material-icons action-icon\">reply</span>\r\n                    ייצוא לרמזור\r\n                </md-button>\r\n            </md-menu-item>\r\n            <md-menu-item ng-if=\"$ctrl.tree.hasKml\">\r\n                <md-checkbox ng-checked=\"$ctrl.checkboxKML\" ng-click=\"$ctrl.onDisplayKmlTag($ctrl.tree)\" aria-label=\"checkboxKML\">\r\n                    הצג ישויות\r\n                </md-checkbox>\r\n            </md-menu-item>\r\n        </md-menu-content>\r\n    </md-menu>\r\n</div>\r\n<li ng-repeat=\"tag in $ctrl.tree.tags track by tag.tagId\" ng-hide=\"tag.collapsed\">\r\n    <tags-handling tree=\"tag\" handle-action=\"$ctrl.handleAction\"></tags-handling>\r\n</li>";

/***/ })
],[162]);
//# sourceMappingURL=ng1.bundle.js.map