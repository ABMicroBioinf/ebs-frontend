/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:17:45
 * @modify date 2021-07-15 13:17:50
 * @desc [description]
 */

import { EBSTabularHeaderContext } from "../interfaces/EBSContexts";

/**
 * EBSTabularDataHandler
 * @module EBSTabularDataHandler
 */

/**
 * Get Scheme of data (sample single row)
 * @param sample - Sample object
 * @returns - See {@link EBSTabularHeaderContext}
 */
function getSchemeDefault(sample: object): Array<EBSTabularHeaderContext> {
  const getScheme = (sample, parent = null): Array<EBSTabularHeaderContext> => {
    const scheme = [];
    for (const [key, value] of Object.entries(sample)) {
      if (value === Object(value) && value !== null && value !== undefined) {
        scheme.push({
          name: key,
          value: key,
          alias: null,
          type: "object",
          display: false,
          primary: false,
          children: getScheme(value, key),
        });
      } else {
        scheme.push({
          name: key,
          value: parent === null ? key : parent + "." + key,
          alias: null,
          type: "string",
          display: false,
          primary: false,
          children: [],
        });
      }
    }
    return scheme;
  };
  return getScheme(sample);
}

/**
 * Validate Custom Fields
 * @returns - True, if custom field list is written in proper format.
 */
function validateCustomFields(
  origin: Array<EBSTabularHeaderContext>,
  custom: Array<EBSTabularHeaderContext>
): boolean {
  const getFieldStructure = (obj) => {
    if (obj.children.length > 0) {
      return obj.children.map((child) => obj.name + "." + child.name);
    } else {
      return obj.name;
    }
  };
  try {
    return custom
      .flatMap(getFieldStructure)
      .every((field) => origin.flatMap(getFieldStructure).includes(field));
  } catch {
    throw Error("Invalid fields are selected");
  }
}

/**
 * Apply Custom Fields
 * @param origin -
 * @param custom -
 * @returns - Columns when display is true in the custom field definition
 */
function applyCustomFields(
  origin: Array<EBSTabularHeaderContext>,
  custom: Array<EBSTabularHeaderContext> = null
): Array<EBSTabularHeaderContext> {
  const base: Array<EBSTabularHeaderContext> = Object.assign([], origin);
  return custom
    ? base.map((obj) => custom.find((o) => o.value === obj.value) || obj)
    : base.map(
        (
          obj: EBSTabularHeaderContext,
          index: number
        ): EBSTabularHeaderContext =>
          index === 0
            ? {
                ...obj,
                primary: true,
                display: true,
              }
            : { ...obj, display: true }
      );
}

/**
 * Flatten Multi Dimensional Array for column
 * @param arr - Hierarchical Header Structure
 * @returns - Flatten Array of EBSTabularHeaderContext
 */
function flatColumns(
  arr: Array<EBSTabularHeaderContext>
): Array<EBSTabularHeaderContext> {
  return arr.flatMap((obj) => {
    if (obj.children.length > 0) {
      return obj.children.map((child) => child);
    } else {
      return obj;
    }
  });
}

/**
 * Flatten Multi Dimensional Array for row
 * @param arr -
 * @returns - Flatten Array of Object
 */
function flatRows(arr): Array<object> {
  const pullout = (obj, prefix = "") => {
    return Object.entries(obj).flatMap(([key, value]) => {
      if (value === Object(value) && value !== null && value !== undefined) {
        return pullout(value, `${prefix}${key}.`);
      } else {
        return [[`${prefix}${key}`, value]];
      }
    });
    // .reduce((res, o) => Object.assign(res, o), {});
  };

  return arr.map((item) => Object.fromEntries(pullout(item)));
}

export {
  getSchemeDefault,
  validateCustomFields,
  applyCustomFields,
  flatColumns,
  flatRows,
};
