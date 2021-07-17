/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:17:45
 * @modify date 2021-07-15 13:17:50
 * @desc [description]
 */

/**
 * EBSTabularDataHandler
 * @module EBSTabularDataHandler
 */

/**
 * Get Scheme of data (sample single row)
 * @param {Object} sample - Sample object
 * @returns {EBSTableScheme} - See {@link TableScheme}
 */
function getSchemeDefault(sample) {
  const getScheme = (sample, parent = null) => {
    let scheme = [];
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
 * @param {Object}
 * @param {Array<>}
 */
function validateCustomFields(origin, custom) {
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
 * @param {Object} origin -
 * @param {Array<>} custom -
 * @returns {Array<>} - Columns when display is true in the custom field definition
 */
function applyCustomFields(origin, custom) {
  const base = Object.assign([], origin);
  return base.map((obj) => custom.find((o) => o.value === obj.value) || obj);
}

/**
 * Flatten Multi Dimensional Array for column
 * @param {Array<>} arr -
 * @returns {Array<Object>} - Flatten Array of Object
 */
function flatColumns(arr) {
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
 * @param {Array<>} arr -
 * @returns {Array<Object>} - Flatten Array of Object
 */
function flatRows(arr) {
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
