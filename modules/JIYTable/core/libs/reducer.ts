/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-16 16:42:39
 * @modify date 2021-07-16 16:42:39
 * @desc [description]
 */
import _ from "lodash";

import {
  resetEBSTableState,
  postProcessing,
  preProcessing,
} from "../core/EBSTableStateHandler";

/**
 * EBSTableStateReducer
 * @param state -
 * @param action -
 * @returns -
 */
function EBSTableStateReducer(
  state: EBSTableStateContext,
  action: EBSTableActionContext
): EBSTableStateContext {
  const { headers, stateChain } = state;
  const { chainQueue, pagination } = stateChain;
  const { page, pageSize } = pagination;

  switch (action.type) {
    case "RESET_DATA":
      return resetEBSTableState(preProcessing(state));

    case "SELECT_ALL_RECORDS":
      return postProcessing({
        ...state,
        RECORDS_STATE_REF: state.RECORDS_STATE_REF.map(
          (obj): EBSTabularRecordContext => ({ ...obj, isSelected: true })
        ),
      });

    case "DESELECT_ALL_RECORDS":
      return postProcessing({
        ...state,
        RECORDS_STATE_REF: state.RECORDS_STATE_REF.map(
          (obj): EBSTabularRecordContext => ({ ...obj, isSelected: false })
        ),
      });

    case "SELECT_RECORD":
      state.RECORDS_STATE_REF.splice(action.record.index, 1, action.record);
      return postProcessing({
        ...state,
        RECORDS_STATE_REF: state.RECORDS_STATE_REF,
      });

    case "TOGGLE_HEADER":
      return postProcessing({
        ...state,
        stateChain: {
          ...stateChain,
          chainQueue: chainQueue.includes("columns")
            ? [...chainQueue]
            : [...chainQueue, "columns"],
        },
        headers: headers.map(
          (header: EBSTabularHeaderContext): EBSTabularHeaderContext => {
            if (header.value === action.header) {
              return { ...header, display: !header.display };
            }
            return header;
          }
        ),
      });

    case "SEARCH_KEYWORD":
      return postProcessing({
        ...state,
        stateChain: {
          ...stateChain,
          chainQueue: chainQueue.includes("search")
            ? [...chainQueue]
            : [...chainQueue, "search"],
          search: { keyword: action.keyword },
        },
      });

    case "TOGGLE_SORT":
      return postProcessing({
        ...state,
        stateChain: {
          ...stateChain,
          chainQueue: chainQueue.includes("sort")
            ? [...chainQueue]
            : [...chainQueue, "sort"],
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
      });

    case "SET_PAGE":
      return postProcessing({
        ...state,
        stateChain: {
          ...stateChain,
          pagination: {
            ...pagination,
            page: action.page ? action.page : page,
          },
        },
      });

    case "SET_PAGESIZE":
      return postProcessing({
        ...state,
        stateChain: {
          ...stateChain,
          pagination: {
            ...pagination,
            page: action.page ? action.page : page,
            pageSize: action.pageSize ? action.pageSize : pageSize,
          },
        },
      });

    default:
      throw new Error("Invalid Reducer Action");
  }
}

export { EBSTableStateReducer };
