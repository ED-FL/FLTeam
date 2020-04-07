angular.module("app").component("singleMessage", {
  templateUrl: "./singleMessage.html",
  bindings: {
    visibility: "<",
    content: "<",
    icon: "<",
  },
  controller: function () {},
});
