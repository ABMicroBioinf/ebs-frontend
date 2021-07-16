/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-16 16:42:39
 * @modify date 2021-07-16 16:42:39
 * @desc [description]
 */
import _ from "lodash";
import { EBSTableState } from "../interfaces/EBSDataTypes";
import { resetEBSTableState } from "../preprocess/EBSTableStateHandler";

/**
 * EBSTableStateReducer
 * @param {EBSTableState} state
 * @param action
 * @returns {EBSTableState}
 */
function EBSTableStateReducer(state: EBSTableState, action): EBSTableState {
  const { RECORDS_ORIGIN_REF, stateChain } = state;
  const { order, search, columns, sort, pagination } = stateChain;
  const { page, pageSize } = pagination;

  let results = RECORDS_ORIGIN_REF.slice();
  switch (action.type) {
    case "RESET_DATASET":
      return resetEBSTableState(state);

    case "SET_SELECTION":
      results.splice(action.row.index, 1, action.row);
      return {
        ...state,
        ORIGIN: results,
      };

    case "SELECT_ALL":
      return {
        ...state,
        ORIGIN: results.map((obj) => ({ ...obj, isSelected: true })),
      };

    case "DESELECT_ALL":
      return {
        ...state,
        ORIGIN: results.map((obj) => ({ ...obj, isSelected: false })),
      };

    case "SET_HISTORY":
      return {
        ...state,
        stateChain: {
          order: action.module ? [...order, action.module] : order,
          search: action.search ? action.search : search,
          columns: action.column
            ? columns.map((column) => {
                if (column.value === action.column) {
                  return { ...column, display: !column.display };
                }
                return column;
              })
            : columns,
          sort: action.sort
            ? sort.column === action.sort
              ? {
                  ...sort,
                  type: action.dataType,
                  direction: sort.direction === "asc" ? "desc" : "asc",
                }
              : {
                  column: action.sort,
                  type: action.dataType,
                  direction: "asc",
                }
            : sort,
          pagination: {
            ...pagination,
            page: action.page ? action.page : page,
            pageSize: action.pageSize ? action.pageSize : pageSize,
          },
        },
      };

    case "APPLY_HISTORY":
      order.forEach((module) => {
        if (module !== null && module !== undefined && module !== "") {
          switch (module) {
            case "search":
              results = results.filter((row) =>
                JSON.stringify(Object.values(row.data)).includes(search)
              );
              break;

            case "columns":
              results = results.map((row) => {
                return {
                  ...row,
                  data: pick(
                    row.data,
                    columns.filter((colState) => colState.display && colState)
                  ),
                };
              });
              break;

            case "sort":
              if (sort.dataType === "number") {
                results = _.orderBy(
                  results,
                  (obj) => {
                    return parseFloat(obj.data[sort.column]);
                  },
                  [sort.direction]
                );
              } else {
                results =
                  sort.direction === "asc"
                    ? _.sortBy(results, (obj) => {
                        return obj.data[sort.column];
                      })
                    : _.sortBy(results, (obj) => {
                        return obj.data[sort.column];
                      }).reverse();
              }
              break;

            default:
              throw new Error("Invalid History Action");
          }
        }
      });
      return {
        ...state,
        dataset: results.slice(
          // pagination
          (page - 1) * pageSize,
          (page - 1) * pageSize + pageSize
        ),
        history: {
          ...history,
          pagination: {
            ...pagination,
            pageCount:
              results.length % pageSize > 0
                ? Math.floor(results.length / pageSize) + 1
                : Math.floor(results.length / pageSize),
          },
        },
      };

    default:
      throw new Error("Invalid Reducer Action");
  }
}

export { EBSTableStateReducer };
