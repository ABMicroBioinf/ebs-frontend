/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-16 16:42:17
 * @modify date 2021-07-16 16:42:17
 * @desc [description]
 */

/**
 * Pick an item if the item is a member of array of second argument
 * @param obj
 * @param keys
 * @returns {Array<Object>}
 */
const pick = (obj, keys) => {
  return keys
    .map((k) => (k.value in obj ? { [k.value]: obj[k.value] } : {}))
    .reduce((res, o) => Object.assign(res, o), {});
};
// const pick = (obj, keys) => {
//   return keys
//     .map((k) => (k in obj ? { [k]: obj[k] } : {}))
//     .reduce((res, o) => Object.assign(res, o), {});
// };
