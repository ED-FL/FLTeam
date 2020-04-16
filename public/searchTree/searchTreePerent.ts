import * as angular from "angular";
import {exampleObject} from "./SearchTreeImplement"

angular.module('app').component('searchTreePerent', {
    templateUrl: './searchTreePerent.html',
    bindings: {},
    controller: function() {
      this.tree = exampleObject;
    }
})