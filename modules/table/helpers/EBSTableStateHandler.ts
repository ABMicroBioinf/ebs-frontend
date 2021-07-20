/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-16 16:41:39
 * @modify date 2021-07-16 16:41:39
 * @desc [description]
 */
import _ from "lodash";
import { pick } from "../helpers/EBSGizmos";
import {
  EBSSortContext,
  EBSTableStateContext,
  EBSTableStateChainContext,
  EBSTabularDataContext,
  EBSTabularHeaderContext,
  EBSTabularRecordContext,
} from "../interfaces/EBSContexts";

/**
 * (preprocessing)
 */
function preProcessing(state: EBSTableStateContext) {
  return { ...state };
}

/**
 * Applying states and Pagination (postprocessing)
 */
function postProcessing(state: EBSTableStateContext) {
  const { headers, RECORDS_ORIGIN_REF, stateChain } = state;
  const { chainQueue, search, sort, pagination } = stateChain;
  const { page, pageSize } = pagination;

  let results: Array<EBSTabularRecordContext> = RECORDS_ORIGIN_REF.slice();

  console.log(headers);

  chainQueue.forEach((module) => {
    if (module !== null && module !== undefined) {
      switch (module) {
        case "search":
          results = results.filter((record) =>
            JSON.stringify(Object.values(record.data)).includes(search.keyword)
          );
          break;

        case "columns":
          results = results.map((record) => {
            return {
              ...record,
              data: pick(
                record.data,
                headers.filter((colState) => colState.display && colState)
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
}

/**
 * Get initial state of EBS Table
 * @param {EBSTabularDataContext} -
 * @returns {EBSTableStateContext} -
 */
function getEBSTableInitialState({
  title,
  headers,
  records,
}: EBSTabularDataContext): EBSTableStateContext {
  const CUSTOM_COLUMNS: Array<EBSTabularHeaderContext> = headers;
  const CUSTOM_ROWS: Array<EBSTabularRecordContext> = records.map(
    (obj, index) => ({ index: index, isSelected: false, data: obj })
  );

  return ((): EBSTableStateContext => {
    const DEFAULT_TITLE: string = title;
    const DEFAULT_RECORDS: Array<EBSTabularRecordContext> = CUSTOM_ROWS;
    const DEFAULT_PAGE: number = 1;
    const DEFAULT_PAGE_SIZE: number = 5;
    const DEFAULT_SEARCH_KEYWORD: string = "";
    const DEFAULT_SORT: EBSSortContext = {
      column: null,
      direction: null,
      dataType: "string",
    };
    const DEFAULT_HEADERS: Array<EBSTabularHeaderContext> = CUSTOM_COLUMNS;
    const DEFAULT_PAGE_COUNT: number = (() =>
      DEFAULT_RECORDS.length % DEFAULT_PAGE_SIZE > 0
        ? Math.floor(DEFAULT_RECORDS.length / DEFAULT_PAGE_SIZE) + 1
        : Math.floor(DEFAULT_RECORDS.length / DEFAULT_PAGE_SIZE))();

    const DEFAULT_TABLE_STATE_CHAIN: EBSTableStateChainContext = {
      chainQueue: [],
      search: { keyword: DEFAULT_SEARCH_KEYWORD },
      sort: DEFAULT_SORT,
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
        pageCount: DEFAULT_PAGE_COUNT,
      },
    };

    return postProcessing({
      title: DEFAULT_TITLE,
      stateChain: DEFAULT_TABLE_STATE_CHAIN,
      headers: DEFAULT_HEADERS.slice(),
      records: DEFAULT_RECORDS.slice(),
      HEADERS_ORIGIN_REF: DEFAULT_HEADERS,
      RECORDS_ORIGIN_REF: DEFAULT_RECORDS,
    });
  })();
}

/**
 * Reset EBSTableState
 * @param state
 * @returns
 */
function resetEBSTableState(state: EBSTableStateContext): EBSTableStateContext {
  const {
    HEADERS_ORIGIN_REF: cur_HEADERS_ORIGIN_REF,
    RECORDS_ORIGIN_REF: cur_RECORDS_ORIGIN_REF,
  } = state;
  return ((): EBSTableStateContext => {
    const DEFAULT_RECORDS: Array<EBSTabularRecordContext> =
      cur_RECORDS_ORIGIN_REF;
    const DEFAULT_PAGE: number = 1;
    const DEFAULT_PAGE_SIZE: number = 5;
    const DEFAULT_SEARCH_KEYWORD: string = "";
    const DEFAULT_SORT: EBSSortContext = {
      column: null,
      direction: null,
      dataType: "string",
    };
    const DEFAULT_HEADERS: Array<EBSTabularHeaderContext> =
      cur_HEADERS_ORIGIN_REF;
    const DEFAULT_PAGE_COUNT: number = (() =>
      DEFAULT_RECORDS.length % DEFAULT_PAGE_SIZE > 0
        ? Math.floor(DEFAULT_RECORDS.length / DEFAULT_PAGE_SIZE) + 1
        : Math.floor(DEFAULT_RECORDS.length / DEFAULT_PAGE_SIZE))();

    const DEFAULT_TABLE_STATE_CHAIN: EBSTableStateChainContext = {
      chainQueue: [],
      search: { keyword: DEFAULT_SEARCH_KEYWORD },
      sort: DEFAULT_SORT,
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
        pageCount: DEFAULT_PAGE_COUNT,
      },
    };

    return postProcessing({
      ...state,
      stateChain: DEFAULT_TABLE_STATE_CHAIN,
      headers: DEFAULT_HEADERS.slice(),
      records: DEFAULT_RECORDS.slice(),
      HEADERS_ORIGIN_REF: DEFAULT_HEADERS,
      RECORDS_ORIGIN_REF: DEFAULT_RECORDS,
    });
  })();
}

export {
  getEBSTableInitialState,
  resetEBSTableState,
  preProcessing,
  postProcessing,
};
