import * as angular from "angular";
import { exampleObject } from "./SearchTreeImplement"
import { ISearchTreeAction } from "../actions/ISearchTreeAction";

angular.module('app').component('searchTreePerent', {
  templateUrl: './searchTreePerent.html',
  bindings: {},
  controller: function () {
    this.tree = exampleObject;

    var $ctrl = this;

    $ctrl.handleAction = (action: ISearchTreeAction): void => {
      console.log('handleAction functiom');
      
      return action.visit()
      .then((data) => {
        this.tree = data;
        console.log('on perent: ', data);
      })
      .catch((error) => {
        console.log('error - perent', error);
      })
    };
  }
})