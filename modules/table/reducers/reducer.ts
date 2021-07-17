/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-16 16:42:39
 * @modify date 2021-07-16 16:42:39
 * @desc [description]
 */
import _ from "lodash";
import {
  EBSTableAction,
  EBSTableStateInterface,
  EBSTabularRecord,
} from "../interfaces/EBSDataTypes";
import { resetEBSTableState } from "../helpers/EBSTableStateHandler";

/**
 * EBSTableStateReducer
 * @param {EBSTableState} state
 * @param action
 * @returns {EBSTableState}
 */
function EBSTableStateReducer(
  state: EBSTableStateInterface,
  action: EBSTableAction
): EBSTableStateInterface {
  const { RECORDS_ORIGIN_REF, stateChain } = state;
  const { chainQueue, search, columns, sort, pagination } = stateChain;
  const { page, pageSize } = pagination;

  let results: Array<EBSTabularRecord> = RECORDS_ORIGIN_REF.slice();
  switch (action.type) {
    case "RESET_DATA":
      return resetEBSTableState(state);

    case "SET_SELECTION":
      results.splice(action.record.index, 1, action.record);
      return {
        ...state,
        RECORDS_ORIGIN_REF: results,
      };

    case "SELECT_ALL_DATA":
      return {
        ...state,
        RECORDS_ORIGIN_REF: results.map(
          (obj): EBSTabularRecord => ({ ...obj, isSelected: true })
        ),
      };

    case "DESELECT_ALL_DATA":
      return {
        ...state,
        RECORDS_ORIGIN_REF: results.map(
          (obj): EBSTabularRecord => ({ ...obj, isSelected: false })
        ),
      };

    case "SET_STATE_CHAIN":
      return {
        ...state,
        stateChain: {
          chainQueue: action.module
            ? [...chainQueue, action.module]
            : chainQueue,
          search: action.search ? action.search : search,
          columns: action.columnsColumn
            ? columns.map((column) => {
                if (column.value === action.columnsColumn) {
                  return { ...column, display: !column.display };
                }
                return column;
              })
            : columns,
          sort: action.sortColumn
            ? sort.column === action.sortColumn
              ? {
                  ...sort,
                  dataType: action.sortDataType,
                  direction: sort.direction === "asc" ? "desc" : "asc",
                }
              : {
                  column: action.sortColumn,
                  dataType: action.sortDataType,
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

    case "APPLY_STATE_CHAIN":
      chainQueue.forEach((module) => {
        if (module !== null && module !== undefined) {
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
        records: results.slice(
          // pagination
          (page - 1) * pageSize,
          (page - 1) * pageSize + pageSize
        ),
        stateChain: {
          ...stateChain,
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
