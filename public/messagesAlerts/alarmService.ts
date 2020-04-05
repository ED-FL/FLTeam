import * as angular from "angular";

export enum ALARM_TYPE {
  LAST,
  NO,
  ALL,
}

const alarms = {
  [ALARM_TYPE.ALL]: {
    icon: "alarm_add",
    numMessages: 7,
  },
  [ALARM_TYPE.NO]: {
    icon: "alarm_off",
    numMessages: 0,
  },
  [ALARM_TYPE.LAST]: {
    icon: "alarm",
    numMessages: 1,
  },
};

angular.module("app").service(
  "alarmsService",
  class AlarmsService {
    getAlarms = function () {
      return [ALARM_TYPE.LAST, ALARM_TYPE.NO, ALARM_TYPE.ALL];
      // for (let value in ALARM_TYPE) {
      //   alarms.push(value);
      // }
    };

    getAlarmIcon = function (type: ALARM_TYPE) {
      return alarms[type].icon;
    };

    getAlarmNumMessages = function (type: ALARM_TYPE) {
      return alarms[type].numMessages;
    };
  }
);
