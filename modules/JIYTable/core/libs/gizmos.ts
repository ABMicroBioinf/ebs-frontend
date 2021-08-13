/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-16 16:42:17
 * @modify date 2021-07-16 16:42:17
 * @desc [description]
 */

/**
 * Pull properties out from multi dimensioned array
 */
export function pull(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    if (value === Object(value) && value !== null && value !== undefined) {
      return pull(value, `${prefix}${key}__`);
    } else {
      return [[`${prefix}${key}`, value]];
    }
  });
}

/**
 * Pick an item if the item is a member of array of second argument
 */
export function pick(obj, keys) {
  return keys
    .map((k) => (k.value in obj ? { [k.value]: obj[k.value] } : {}))
    .reduce((res, o) => Object.assign(res, o), {});
}
