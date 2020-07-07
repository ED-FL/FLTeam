import { BaseDriver } from "../../app/testingUtils/BaseDriver";
import { DriverDependency } from "../../app/testingUtils/DriverDependency";
import { DriverContext } from "../../app/testingUtils/DriverContext";

export class AlarmDriver extends BaseDriver {
  static dependencies: DriverDependency[] = [];

  private handleAction: ({ num: numMessages, type: type }) => void;

  constructor(driverContext: DriverContext, component?) {
    super(driverContext, AlarmDriver, component);
  }

  given = {};

  get = {
    controller: () => this.component.children().scope().$ctrl,
  };

  when = {
    created: () => {
      return this.whenReturnVal;
    },
    handleAction: (
      handleAction: ({ num: numMessages, type: type }) => void
    ) => {
      this.handleAction = handleAction;
      return this.givenReaturnVal;
    },
  };

  private whenReturnVal = { and: this.when, get: this.get };
  private givenReaturnVal = { and: this.given, then: this };
}
