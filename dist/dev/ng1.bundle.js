webpackJsonp([2],Array(156).concat([
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(162);
__webpack_require__(164);
__webpack_require__(166);
__webpack_require__(168);
__webpack_require__(170);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(180);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(186);
__webpack_require__(188);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(196);
__webpack_require__(198);
__webpack_require__(200);


/***/ }),
/* 157 */
/***/ (function(module, exports) {

(function () {
    var toastrModule = angular.module('toastr', []);
    toastr.options.timeOut = 1000;
    toastrModule.value('toastr', toastr);
}());


/***/ }),
/* 158 */
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
/* 159 */
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
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('adminLogin', {
    template: __webpack_require__(161),
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
/* 161 */
/***/ (function(module, exports) {

module.exports = "<h1>Admin Login</h1>\r\n\r\n<form class=\"form\">\r\n  <div class=\"row\">\r\n  <div class=\"form-group col-sm-6\">\r\n    <input type=\"text\" autofocus placeholder=\"Email Address\" ng-model=\"$ctrl.email\" class=\"form-control\">\r\n  </div>\r\n  </div>\r\n  <div class=\"row\">\r\n  <div class=\"form-group col-sm-6\">\r\n    <input type=\"password\" placeholder=\"Password\" ng-model=\"$ctrl.password\" class=\"form-control\">\r\n  </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n    <button class=\"btn btn-primary\" ng-click=\"$ctrl.login()\">Login</button>\r\n    </div>\r\n  </div>\r\n</form>";

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('results', {
    template: __webpack_require__(163),
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
/* 163 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n<h1>Results</h1>\r\n\r\n<session-detail-with-votes session=\"session\" ng-repeat=\"session in $ctrl.sessionsByVoteDesc\"></session-detail-with-votes>\r\n\r\n";

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('createUsers', {
    template: __webpack_require__(165),
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
/* 165 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n\r\n<h1>Create Users</h1>\r\n<p>Enter Email Addresses here. One on each line, First and Last Name Pipe Separated</p>\r\n<textarea name=\"emailAddresses\" id=\"\" cols=\"30\" rows=\"10\" class=\"form-control\" \r\n  placeholder=\"Email Addresses\" ng-model=\"$ctrl.namesblob\"></textarea>\r\n<br>\r\n<button class=\"btn btn-primary\" ng-click=\"$ctrl.import()\">Create Users</button>\r\n";

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('userList', {
    template: __webpack_require__(167),
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
/* 167 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n<h1>User List</h1>\r\n\r\n<a ng-href=\"#/admin/users/{{user.id}}\" zoom-in \r\n  class=\"btn btn-primary btn-spaced\" \r\n  ng-repeat=\"user in $ctrl.users\">\r\n  {{user.firstName}}\r\n  {{user.lastName}}\r\n</a>\r\n";

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('userDetails', {
    template: __webpack_require__(169),
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
/* 169 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n<div class=\"jumbotron\">\r\n  <h1>{{$ctrl.user.firstName}} {{$ctrl.user.lastName}}\r\n    <span class=\"badge\" ng-show=\"$ctrl.user.isAdmin\">Admin</span>\r\n  </h1>\r\n  <p>{{$ctrl.user.email}}</p>\r\n</div>";

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('nav', {
    template: __webpack_require__(171),
    bindings: {},
    controller: function (currentIdentity, sessions, unreviewedSessionCount) {
        this.currentUser = currentIdentity.currentUser;
        unreviewedSessionCount.updateUnreviewedSessionCount();
        this.unreviewedSessionCount = unreviewedSessionCount;
    }
});


/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports = "<div \r\n  class=\"navbar navbar-fixed-top navbar-inverse\">\r\n  <div class=\"container\">\r\n    <div class=\"navbar-header\"><a href=\"/\" class=\"navbar-brand\">Lightning Talks</a></div>\r\n    <div class=\"navbar-collapse collapse\">\r\n      <ul class=\"nav navbar-nav\">\r\n        <li><a href=\"#/\">Home <span class=\"badge\">{{$ctrl.unreviewedSessionCount.value}}</span> </a></li>\r\n        <li><a href=\"#/createsession\">Create Session</a></li>\r\n        <li><a href=\"#/profile\">Profile</a></li>\r\n        <li><a href=\"#/admin/createusers\" ng-show=\"$ctrl.currentUser.isAdmin\">Create Users</a></li>\r\n        <li><a href=\"#/admin/results\" ng-show=\"$ctrl.currentUser.isAdmin\">Results</a></li>\r\n        <li><a href=\"#/users\" ng-show=\"$ctrl.currentUser.isAdmin\">Users</a></li>\r\n        <li><a href=\"#/searchTree\">Search Tree</a></li>\r\n        <li><a href=\"#/logout\">Logout</a></li>\r\n      </ul>\r\n      \r\n      <ul class=\"nav navbar-right navbar nav\">\r\n        <li class=\"navbar-text\">\r\n          Welcome {{$ctrl.currentUser.firstName}} {{$ctrl.currentUser.lastName}}\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n";

/***/ }),
/* 172 */
/***/ (function(module, exports) {

angular.module('app').component('logout', {
    controller: function ($location, auth) {
        auth.logout();
        $location.path('/login');
    }
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('login', {
    template: __webpack_require__(174),
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
/* 174 */
/***/ (function(module, exports) {

module.exports = "<h1>Please Login</h1>\r\n\r\n<p>Enter your attendee email address</p>\r\n<form class=\"form\">\r\n  <div class=\"row\">\r\n    <div class=\"form-group col-sm-6\">\r\n      <input type=\"text\" autofocus placeholder=\"Email Address\" ng-model=\"$ctrl.email\" class=\"form-control\">\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n      <md-button ng-click=\"$ctrl.login()\">Login</md-button>\r\n    </div>\r\n  </div>\r\n</form>";

/***/ }),
/* 175 */
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
/* 176 */
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
/* 177 */
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
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('home', {
    template: __webpack_require__(179),
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
/* 179 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n\r\n<h2 style=\"margin-top:30px\">Unreviewed Sessions</h2>\r\n<unreviewed-talk [session]=\"$ctrl.currentSessionToReview\" (vote-no)=\"$ctrl.voteNo()\" (vote-yes)=\"$ctrl.voteYes()\"></unreviewed-talk>\r\n<hr style=\"margin-top:20px\">\r\n<h3>Your Sessions\r\n<a zoom-in class=\"btn btn-primary btn-xs\" href=\"#/createsession\">Create a New Session</a>\r\n</h3>\r\n\r\n<div ng-repeat=\"session in $ctrl.userSessions\">\r\n  <session-detail session=\"session\" initial-collapsed=\"true\"></session-detail>\r\n</div>\r\n";

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('createNewSession', {
    template: __webpack_require__(181),
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
/* 181 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n\r\n<h1>Create New Session</h1>\r\n\r\n<form class=\"form\">\r\n  <div class=\"form-group\">\r\n    Give your session a title\r\n    <input required type=\"text\" placeholder=\"Title\" ng-model=\"$ctrl.title\" class=\"form-control\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    Enter a length, from 2 minutes to 30 minutes\r\n    <input required type=\"number\" placeholder=\"Length in Minutes\" \r\n      ng-model=\"$ctrl.length\" class=\"form-control\" min=\"2\" max=\"30\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    Describe your session\r\n    <textarea required name=\"\" id=\"\" cols=\"30\" rows=\"4\" \r\n      ng-model=\"$ctrl.abstract\" class=\"form-control\"\r\n      placeholder=\"Abstract\"></textarea>\r\n  </div>\r\n  \r\n  <div class=\"row\">\r\n    <div class=\"col-sm-3\">\r\n      <button class=\" btn btn-primary btn-sm\" ng-click=\"$ctrl.create()\">Create</button>\r\n    </div>\r\n  </div>\r\n</form>\r\n\r\n<h2>Your Other Sessions</h2>\r\n<div ng-repeat=\"session in $ctrl.userSessions\">\r\n  <session-detail session=\"session\" initial-collapsed=\"false\"></session-detail>\r\n</div>";

/***/ }),
/* 182 */
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
/* 183 */
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
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('sessionDetail', {
    template: __webpack_require__(185),
    bindings: {
        session: '=',
        initialCollapsed: '@'
    },
    controller: function () {
    }
});


/***/ }),
/* 185 */
/***/ (function(module, exports) {

module.exports = "<detail-panel collapsed=\"{{$ctrl.initialCollapsed}}\" title=\"{{$ctrl.session.title}}\">\r\n  <strong>{{$ctrl.session.length | talkDuration}}</strong>\r\n  <p><small>{{$ctrl.session.abstract}}</small></p>  \r\n</detail-panel>\r\n";

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('sessionDetailWithVotes', {
    template: __webpack_require__(187),
    bindings: {
        session: '=',
        initialCollapsed: '@'
    },
    controller: function () {
    }
});


/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = "<detail-panel collapsed=\"{{$ctrl.initialCollapsed}}\" title=\"{{$ctrl.session.title}}\">\r\n  <strong>{{$ctrl.session.voteCount}} votes</strong>\r\n  <p>{{$ctrl.session.length | talkDuration}}</p>\r\n  <p><small>{{$ctrl.session.abstract}}</small></p>  \r\n</detail-panel>\r\n";

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('detailPanel', {
    transclude: true,
    template: __webpack_require__(189),
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
/* 189 */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-primary\">\r\n  <div class=\"panel-heading pointable\" ng-click=\"$ctrl.collapse()\">\r\n    <span>{{$ctrl.title}}</span>\r\n  </div>\r\n  <div class=\"panel-body\" ng-hide=\"$ctrl.collapsed\" ng-transclude>\r\n  </div>\r\n</div>";

/***/ }),
/* 190 */
/***/ (function(module, exports) {

angular.module('app').filter('talkDuration', function () {
    return function (duration) {
        return "Duration: " + duration + " minutes";
    };
});


/***/ }),
/* 191 */
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
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(193);
var SearchTreeImplement_1 = __webpack_require__(194);
angular.module('app').component('searchTreePerent', {
    template: __webpack_require__(195),
    bindings: {},
    controller: function () {
        this.tree = SearchTreeImplement_1.exampleObject;
        var $ctrl = this;
        $ctrl.handleAction = function (action) {
            action.visit();
        };
    }
});


/***/ }),
/* 193 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SearchTree = (function () {
    function SearchTree(folderId, folderName, owner, parentFolderId, folders, tags, collapsed) {
        this.folderId = folderId;
        this.folderName = folderName;
        this.owner = owner;
        this.parentFolderId = parentFolderId;
        this.folders = folders;
        this.tags = tags;
        this.collapsed = collapsed;
    }
    return SearchTree;
}());
exports.SearchTree = SearchTree;
var NewTag = (function () {
    function NewTag(tagId, tagName, queryId, extraInfo, type, parentFolderId, collapsed) {
        this.tagId = tagId;
        this.tagName = tagName;
        this.queryId = queryId;
        this.extraInfo = extraInfo;
        this.type = type;
        this.parentFolderId = parentFolderId;
        this.collapsed = collapsed;
    }
    return NewTag;
}());
exports.NewTag = NewTag;
exports.exampleObject = new SearchTree("1", "mainFolder-1", "yuval", null, [new SearchTree("2-1", "innerFolder-2-1", "yuval", "1", [new SearchTree("3-1", "innerFolder-3-1", "yuval", "2-1", [], [new NewTag("tag-3-1", "innerTag-3-1", "extraInfo", null, null, "3-1", true),
            new NewTag("tag-3-2", "innerTag-3-2", "extraInfo", null, null, "3-2", true)], true)], [new NewTag("tag-2-1", "innerTag-2-1", "extraInfo", null, null, "2-1", true)], true), new SearchTree("2-2", "innerFolder-2-2", "yuval", "1", [], [], true)], [new NewTag("tag-1", "tag-1", "extraInfo", null, null, "1", true)], true);


/***/ }),
/* 195 */
/***/ (function(module, exports) {

module.exports = "<search-tree tree=\"$ctrl.tree\" handle-action=\"$ctrl.handleAction\"></search-tree>\r\n";

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('searchTree', {
    template: __webpack_require__(197),
    bindings: {
        tree: '=',
        handleAction: "&"
    },
    controller: function () { }
});


/***/ }),
/* 197 */
/***/ (function(module, exports) {

module.exports = "<ul> \r\n    <li>\r\n        <folder-handling tree=\"$ctrl.tree\" handle-action=\"$ctrl.handleAction(action)\"></folder-handling>\r\n    </li>\r\n</ul>";

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(193);
var deleteFolderAction_1 = __webpack_require__(209);
angular.module('app')
    .component('folderHandling', {
    template: __webpack_require__(199),
    bindings: {
        tree: '=',
        handleAction: "="
    },
    controller: function () {
        var _this = this;
        var $ctrl = this;
        $ctrl.onFolderClicked = function (folder) {
            // this.onFolderDeleted(folder);
            folder.folders.forEach(function (folder) {
                folder.collapsed = !folder.collapsed;
            });
            folder.tags.forEach(function (tag) {
                tag.collapsed = !tag.collapsed;
            });
        };
        $ctrl.onFolderDeleted = function (folder) {
            _this.handleAction(new deleteFolderAction_1.deleteFolderAction(folder.folderId));
        };
    }
});


/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports = "<span class=\"tree-item\" ng-click=\"$ctrl.onFolderClicked($ctrl.tree)\"><span class=\"material-icons\">folder</span> {{$ctrl.tree.folderName}}</span> \r\n<ul>\r\n    <li ng-repeat=\"folder in $ctrl.tree.folders track by folder.folderId\" ng-hide=\"folder.collapsed\">\r\n        <folder-handling tree=\"folder\"></folder-handling>\r\n    </li>\r\n    <tags-handling tree=\"$ctrl.tree\"></tags-handling>\r\n</ul>\r\n";

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app')
    .component('tagsHandling', {
    template: __webpack_require__(201),
    bindings: {
        tree: '='
    },
    controller: function () {
        var $ctrl = this;
        $ctrl.onTagClicked = function (tag) {
            console.log('go to tag link: ', tag);
        };
    }
});


/***/ }),
/* 201 */
/***/ (function(module, exports) {

module.exports = "<span class=\"tree-item\" ng-click=\"$ctrl.onTagClicked($ctrl.tree)\"> {{$ctrl.tree.tagName}}</span> \r\n\r\n<li ng-repeat=\"tag in $ctrl.tree.tags track by tag.tagId\" ng-hide=\"tag.collapsed\">\r\n    <tags-handling tree=\"tag\"></tags-handling>\r\n</li>";

/***/ }),
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var deleteFolderAction = (function () {
    function deleteFolderAction(folderId) {
        this.folderId = folderId;
    }
    deleteFolderAction.prototype.visit = function () {
        console.log('folder deleted: ' + this.folderId);
    };
    return deleteFolderAction;
}());
exports.deleteFolderAction = deleteFolderAction;


/***/ })
]),[156]);
//# sourceMappingURL=ng1.bundle.js.map