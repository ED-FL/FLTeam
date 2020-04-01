enum ALARMS_ICONS {
  LAST_ALARM = "alarm",
  NO_ALARMS = "alarm_off",
  ALL_ALARMS = "alarm_add"
}

angular.module("app").component("messagesAlerts", {
  templateUrl: "./messagesAlerts.html",
  bindings: {},
  controller: function() {
    this.alarmsIcons = [
      ALARMS_ICONS.LAST_ALARM,
      ALARMS_ICONS.ALL_ALARMS,
      ALARMS_ICONS.NO_ALARMS
    ];
    this.currentIcon = ALARMS_ICONS.LAST_ALARM;
    this.currentAlerts;
    this.originatorEv;

    this.$onInit = function() {};

    this.openMenu = function($mdMenu, ev) {
      this.originatorEv = ev;
      $mdMenu.open(ev);
    };
    this.activeateButton = function() {};

    this.showLastMessage = function() {
      this.currentIcon = ALARMS_ICONS.LAST_ALARM;
    };
    this.showAllMessages = function() {
      this.currentIcon = ALARMS_ICONS.ALL_ALARMS;
    };
    this.dontShowMessages = function() {
      this.currentIcon = ALARMS_ICONS.NO_ALARMS;
    };

    this.clearScrean = function() {};
    this.addAlert = function() {};
  }
});
