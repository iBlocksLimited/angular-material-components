import { DateAdapter } from '@angular/material/core';

export abstract class NgxMatDateAdapter<D> extends DateAdapter<D> {
  /**
 * Gets the hour component of the given date.
 * @param date The date to extract the month from.
 * @returns The hour component.
 */
  abstract getHour(date: D): number;

  /**
* Gets the minute component of the given date.
* @param date The date to extract the month from.
* @returns The minute component.
*/
  abstract getMinute(date: D): number;

  /**
  * Gets the second component of the given date.
  * @param date The date to extract the month from.
  * @returns The second component.
  */
  abstract getSecond(date: D): number;

  /**
   * Creates a copy of the date with the specified hour, minute and second values.
   * @param date
   * @param hour
   * @param minute
   * @param second
   */
  abstract createDateWithTime(date: D, hour: number, minute: number, second: number): D;

  /**
   * Check if two date have same time
   * @param a Date 1
   * @param b Date 2
   */
  isSameTime(a: D, b: D): boolean {
    if (a == null || b == null) return true;
    return this.getHour(a) === this.getHour(b)
      && this.getMinute(a) === this.getMinute(b)
      && this.getSecond(a) === this.getSecond(b);
  }

  /**
 * Compares two dates.
 * @param first The first date to compare.
 * @param second The second date to compare.
 * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
 *     a number greater than 0 if the first date is later.
 */
  compareDateWithTime(first: D, second: D, showSeconds?: boolean): number {
    let res = super.compareDate(first, second) ||
      this.getHour(first) - this.getHour(second) ||
      this.getMinute(first) - this.getMinute(second);
    if (showSeconds) {
      res = res || this.getSecond(first) - this.getSecond(second);
    }
    return res;
  }

  /**
   * Creates a copy of the date with the time specified by the passed default values
   * @param defaultTime List default values [hour, minute, second]
   */
  createDateWithDefaultTime(date: D, defaultTime: number[]): D {
    if (!Array.isArray(defaultTime)) {
      throw Error('@Input DefaultTime should be an array');
    }
    return this.createDateWithTime(date, defaultTime[0] || 0, defaultTime[1] || 0, defaultTime[2] || 0);
  }

}
