import * as angular from "angular";
import { exampleObject } from "./SearchTreeImplement"
import { ISearchTreeAction } from "../actions/ISearchTreeAction";

angular.module('app').component('searchTreePerent', {
  templateUrl: './searchTreePerent.html',
  bindings: {},
  controller: function () {
    this.tree = exampleObject;

    var $ctrl = this;

    $ctrl.handleAction = async (action: ISearchTreeAction): Promise<any> => {
      let tree = await action.visit();
      console.log(tree);
      $ctrl.tree = tree;
    };
  }
})