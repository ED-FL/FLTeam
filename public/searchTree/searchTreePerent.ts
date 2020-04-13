const SearchTree = require('./SearchTreeExample').SearchTree;
const NewTag = require('./SearchTreeExample').NewTag;

angular.module('app').component('searchTreePerent', {
    templateUrl: './searchTreePerent.html',
    bindings: {},
    controller: function() {
      this.tree = exampleObject;
    }
})

let exampleObject = new SearchTree(
  "1",
  "mainFolder-1",
  "yuval",
  null,
  [new SearchTree(
    "2-1",
    "innerFolder-2-1",
    "yuval",
    "1",
    [new SearchTree(
      "3-1",
      "innerFolder-3-1",
      "yuval",
      "2-1",
      [],
      [new NewTag("tag-3-1", "innerTag-3-1", "extraInfo", null, null, "3-1"), 
      new NewTag("tag-3-2", "innerTag-3-2", "extraInfo", null, null, "3-2")]
    )],
    [new NewTag("tag-2-1", "innerTag-2-1", "extraInfo", null, null, "2-1")]
  ), new SearchTree(
    "2-2",
    "innerFolder-2-2",
    "yuval",
    "1",
    [],
    []
  )],
  [new NewTag("tag-1", "tag-1", "extraInfo", null, null, "1")]
);