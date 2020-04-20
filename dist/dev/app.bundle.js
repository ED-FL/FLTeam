webpackJsonp([3],{

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(73);
var static_1 = __webpack_require__(30);
var app_module_1 = __webpack_require__(204);
var nameParser_service_1 = __webpack_require__(81);
var unreviewedTalk_component_1 = __webpack_require__(82);
var profile_component_1 = __webpack_require__(83);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule).then(function (platformRef) {
    // downgrades
    angular.module('app').factory('nameParser', static_1.downgradeInjectable(nameParser_service_1.NameParser))
        .directive('unreviewedTalk', static_1.downgradeComponent({
        component: unreviewedTalk_component_1.UnreviewedTalkComponent
    })).directive('profile', static_1.downgradeComponent({
        component: profile_component_1.ProfileComponent
    }));
    var upgrade = platformRef.injector.get(static_1.UpgradeModule);
    upgrade.bootstrap(document.documentElement, ['app']);
    console.log('hybrid app bootstrapped');
});


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var static_1 = __webpack_require__(30);
var platform_browser_1 = __webpack_require__(13);
var forms_1 = __webpack_require__(79);
var http_1 = __webpack_require__(74);
var app_component_1 = __webpack_require__(205);
var nameParser_service_1 = __webpack_require__(81);
var unreviewedTalk_component_1 = __webpack_require__(82);
var talkDuration_pipe_1 = __webpack_require__(207);
var profile_component_1 = __webpack_require__(83);
var toastr_service_1 = __webpack_require__(84);
var nav_component_1 = __webpack_require__(209);
function getLocation(angularOneInjector) {
    return angularOneInjector.get('$location');
}
function getCurrentIdentity(angularOneInjector) {
    return angularOneInjector.get('currentIdentity');
}
function getToastr() {
    return toastr;
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            static_1.UpgradeModule
        ],
        declarations: [
            app_component_1.AppComponent,
            unreviewedTalk_component_1.UnreviewedTalkComponent,
            talkDuration_pipe_1.TalkDurationPipe,
            profile_component_1.ProfileComponent,
            nav_component_1.NavComponent
        ],
        providers: [
            nameParser_service_1.NameParser,
            { provide: '$location', useFactory: getLocation, deps: ['$injector'] },
            { provide: 'currentIdentity', useFactory: getCurrentIdentity, deps: ['$injector'] },
            { provide: toastr_service_1.TOASTR_TOKEN, useFactory: getToastr }
        ],
        bootstrap: [
            app_component_1.AppComponent
        ],
        entryComponents: [
            unreviewedTalk_component_1.UnreviewedTalkComponent,
            profile_component_1.ProfileComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <div class=\"ng-view\"></div>\n  "
    })
], AppComponent);
exports.AppComponent = AppComponent;


/***/ }),

/***/ 206:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!!session\">\r\n  <div  class=\"panel panel-default\">\r\n    <div class=\"panel-heading\">\r\n      {{session.title}}\r\n    </div>\r\n    <div class=\"panel-body\">\r\n      <p><strong>{{session.length | talkDuration}}</strong></p>\r\n      <p>{{session.abstract}}</p>\r\n    </div>\r\n  </div>\r\n\r\n  <span>Are you interested in this session?</span>\r\n  <button class=\"btn btn-primary btn-xs\" (click)=\"yes()\">Yes</button>\r\n  <button class=\"btn btn-warning btn-xs\" (click)=\"no()\">No</button>\r\n</div>\r\n<div *ngIf=\"!session\" class=\"alert alert-success\" role=\"alert\"> \r\n  You have reviewed all the submitted sessions\r\n</div>";

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var TalkDurationPipe = (function () {
    function TalkDurationPipe() {
    }
    TalkDurationPipe.prototype.transform = function (duration) {
        return "Duration: " + duration + " minutes";
    };
    return TalkDurationPipe;
}());
TalkDurationPipe = __decorate([
    core_1.Pipe({ name: 'talkDuration' })
], TalkDurationPipe);
exports.TalkDurationPipe = TalkDurationPipe;


/***/ }),

/***/ 208:
/***/ (function(module, exports) {

module.exports = "<app-nav></app-nav>\r\n\r\n<h1>User Profile</h1>\r\n\r\n<form class=\"form-inline\" #form=\"ngForm\">\r\n  <label for=\"firstName\">First Name</label>\r\n  <input type=\"text\" id=\"firstName\" placeholder=\"First Name\" \r\n   class=\"form-control\" [ngModel]=\"currentIdentity.currentUser.firstName\" \r\n   name=\"firstName\">\r\n\r\n  <label for=\"lastName\">Last Name</label>\r\n  <input type=\"text\" id=\"lastName\" placeholder=\"Last Name\" \r\n   class=\"form-control\" [ngModel]=\"currentIdentity.currentUser.lastName\" \r\n   name=\"lastName\">\r\n\r\n  <br><br>\r\n  <button class=\"btn btn-primary btn-sm\" (click)=\"save(form.value)\">Save</button>\r\n  <button class=\"btn btn-warning btn-sm\" (click)=\"cancel()\">Cancel</button>\r\n</form>";

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var static_1 = __webpack_require__(30);
var NavComponent = (function (_super) {
    __extends(NavComponent, _super);
    function NavComponent(elementRef, injector) {
        return _super.call(this, 'nav', elementRef, injector) || this;
    }
    return NavComponent;
}(static_1.UpgradeComponent));
NavComponent = __decorate([
    core_1.Directive({
        selector: 'app-nav'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Injector])
], NavComponent);
exports.NavComponent = NavComponent;


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var NameParser = (function () {
    function NameParser() {
    }
    NameParser.prototype.parse = function (blobInput) {
        var lines = blobInput.split(/\r?\n/);
        lines.forEach(function (line, idx) {
            var pieces = line.split('|');
            lines[idx] = {
                email: pieces[0],
                firstName: pieces[1],
                lastName: pieces[2]
            };
        });
        return lines;
    };
    return NameParser;
}());
NameParser = __decorate([
    core_1.Injectable()
], NameParser);
exports.NameParser = NameParser;


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var UnreviewedTalkComponent = (function () {
    function UnreviewedTalkComponent() {
        this.voteYes = new core_1.EventEmitter();
        this.voteNo = new core_1.EventEmitter();
    }
    UnreviewedTalkComponent.prototype.yes = function () {
        this.voteYes.emit(null);
    };
    UnreviewedTalkComponent.prototype.no = function () {
        this.voteNo.emit(null);
    };
    return UnreviewedTalkComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UnreviewedTalkComponent.prototype, "session", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UnreviewedTalkComponent.prototype, "voteYes", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UnreviewedTalkComponent.prototype, "voteNo", void 0);
UnreviewedTalkComponent = __decorate([
    core_1.Component({
        selector: 'unreviewed-talk',
        template: __webpack_require__(206)
    })
], UnreviewedTalkComponent);
exports.UnreviewedTalkComponent = UnreviewedTalkComponent;


/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var toastr_service_1 = __webpack_require__(84);
var ProfileComponent = (function () {
    function ProfileComponent($location, currentIdentity, toastr) {
        this.$location = $location;
        this.currentIdentity = currentIdentity;
        this.toastr = toastr;
    }
    ProfileComponent.prototype.save = function (newProfile) {
        this.currentIdentity.updateUser(newProfile);
        this.toastr.success('Profile Saved!');
    };
    ProfileComponent.prototype.cancel = function () {
        this.$location.path('/home');
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        template: __webpack_require__(208),
    }),
    __param(0, core_1.Inject('$location')),
    __param(1, core_1.Inject('currentIdentity')),
    __param(2, core_1.Inject(toastr_service_1.TOASTR_TOKEN)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;


/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
exports.TOASTR_TOKEN = new core_1.InjectionToken('toastr');


/***/ })

},[203]);
//# sourceMappingURL=app.bundle.js.map