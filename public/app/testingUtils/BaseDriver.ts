import { DriverDependency } from "./DriverDependency";
import { DriverContext } from "./DriverContext";
import * as angular from "angular";

export abstract class BaseDriver {
  static dependencies: DriverDependency[] = [];
  static drivers: typeof BaseDriver[] = [];
  protected component;

  protected constructor(
    protected driverContext: DriverContext,
    driver: typeof BaseDriver,
    component?
  ) {
    if (component) {
      this.component = angular.element(component);
    }

    this.driverContext.initModule(driver);
  }

  public abstract given: Dictionery<
    (...args: any[]) => { and; then } | Promise<{ and; then }>
  >;
  public abstract when: Dictionery<
    (...args: any[]) => { and; then } | Promise<{ and; then }>
  >;
  public abstract get: Dictionery<
    (...args: any[]) => { and; then } | Promise<{ and; then }>
  >;

  protected getElementByDataHook(
    value: string,
    parantElement = this.component
  ) {
    return parantElement.find(`[data-t-id] = ' ${value}']`);
  }
}
