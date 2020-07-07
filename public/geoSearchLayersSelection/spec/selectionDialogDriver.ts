import { DriverDependency } from "../../app/testingUtils/DriverDependency";
import { BaseDriver } from "../../app/testingUtils/BaseDriver";
import { DriverContext } from "../../app/testingUtils/DriverContext";

export class SelectionDialogDriver extends BaseDriver {
  static dependencies: DriverDependency[] = [];

  constructor(driverContext: DriverContext, component?) {
    super(driverContext, SelectionDialogDriver, component);
  }

  get = {
    controller: () => this.component.children().scope().$ctrl,
  };

  given = {};

  when = {
    created: () => {
      return this.whenReturnVal;
    },
    clickOnSaveButton: () => {
      this.getElementByDataHook("").click();
      return this.whenReturnVal;
    },
    clickOnCancleButton: () => {
      this.getElementByDataHook("").click();
      return this.whenReturnVal;
    },
    clickOnSelectAllButton: () => {
      this.getElementByDataHook("").click();
      return this.whenReturnVal;
    },
    clickOnClearAllButton: () => {
      this.getElementByDataHook("").click();
      return this.whenReturnVal;
    },
    typeOnTextInput: () => {
      this.getElementByDataHook("").click();
      return this.whenReturnVal;
    },
  };

  private whenReturnVal = { and: this.when, get: this.get };
  private givenReaturnVal = { and: this.given, then: this };
}
