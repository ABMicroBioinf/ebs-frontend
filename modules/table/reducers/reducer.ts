/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-16 16:42:39
 * @modify date 2021-07-16 16:42:39
 * @desc [description]
 */
import _ from "lodash";
import {
  EBSTableActionContext,
  EBSTableStateContext,
  EBSTabularHeaderContext,
  EBSTabularRecordContext,
} from "../interfaces/EBSContexts";
import { resetEBSTableState } from "../helpers/EBSTableStateHandler";

/**
 * EBSTableStateReducer
 * @param {EBSTableStateContext} state -
 * @param {EBSTableActionContext} action -
 * @returns {EBSTableStateContext} -
 */
function EBSTableStateReducer(
  state: EBSTableStateContext,
  action: EBSTableActionContext
): EBSTableStateContext {
  const { headers, records, stateChain } = state;
  const { chainQueue, pagination } = stateChain;
  const { page, pageSize } = pagination;

  switch (action.type) {
    case "RESET_DATA":
      return resetEBSTableState(state);

    case "SELECT_ALL_RECORDS":
      return {
        ...state,
        records: records.map(
          (obj): EBSTabularRecordContext => ({ ...obj, isSelected: true })
        ),
      };

    case "DESELECT_ALL_RECORDS":
      return {
        ...state,
        records: records.map(
          (obj): EBSTabularRecordContext => ({ ...obj, isSelected: false })
        ),
      };

    case "SELECT_RECORD":
      records.splice(action.record.index, 1, action.record);
      return {
        ...state,
        records: records,
      };

    case "TOGGLE_HEADER":
      return {
        ...state,
        stateChain: {
          ...stateChain,
          chainQueue: !chainQueue.includes("columns") && [
            ...chainQueue,
            "columns",
          ],
        },
        headers: headers.map(
          (header: EBSTabularHeaderContext): EBSTabularHeaderContext => {
            if (header.value === action.header.value) {
              return { ...header, display: !header.display };
            }
            return header;
          }
        ),
      };

    case "SEARCH_KEYWORD":
      return {
        ...state,
        stateChain: {
          ...stateChain,
          chainQueue: !chainQueue.includes("search") && [
            ...chainQueue,
            "search",
          ],
          search: { keyword: action.keyword },
        },
      };

    case "TOGGLE_SORT":
      return {
        ...state,
        stateChain: {
          ...stateChain,
          chainQueue: !chainQueue.includes("sort") && [...chainQueue, "sort"],
          sort:
            stateChain.sort.column === action.sortColumn
              ? {
                  ...stateChain.sort,
                  dataType: action.sortDataType,
                  direction:
                    stateChain.sort.direction === "asc" ? "desc" : "asc",
                }
              : {
                  column: action.sortColumn,
                  dataType: action.sortDataType,
                  direction: "asc",
                },
        },
      };

    case "SET_PAGE":
      return {
        ...state,
        stateChain: {
          ...stateChain,
          pagination: {
            ...pagination,
            page: action.page ? action.page : page,
          },
        },
      };

    case "SET_PAGESIZE":
      return {
        ...state,
        stateChain: {
          ...stateChain,
          pagination: {
            ...pagination,
            pageSize: action.pageSize ? action.pageSize : pageSize,
          },
        },
      };

    default:
      throw new Error("Invalid Reducer Action");
  }
}

export { EBSTableStateReducer };
