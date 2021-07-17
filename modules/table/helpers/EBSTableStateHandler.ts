/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-16 16:41:39
 * @modify date 2021-07-16 16:41:39
 * @desc [description]
 */
import {
  EBSSortContext,
  EBSTableStateInterface,
  EBSTableStateChainInterface,
  EBSTabularData,
  EBSTabularHeader,
  EBSTabularRecord,
} from "../interfaces/EBSDataTypes";

/**
 * Get initial state of EBS Table
 * @param {EBSTabularData} -
 * @returns {EBSTableState} -
 */
function getEBSTableInitialState({
  title,
  headers,
  records,
}: EBSTabularData): EBSTableStateInterface {
  const CUSTOM_COLUMNS: Array<EBSTabularHeader> = headers.slice();
  const CUSTOM_ROWS: Array<EBSTabularRecord> = records
    .slice()
    .map((obj, index) => ({ index: index, isSelected: false, data: obj }));

  return ((): EBSTableStateInterface => {
    const DEFAULT_TITLE: string = title;
    const DEFAULT_RECORDS: Array<EBSTabularRecord> = CUSTOM_ROWS;
    const DEFAULT_PAGE: number = 1;
    const DEFAULT_PAGE_SIZE: number = 5;
    const DEFAULT_SEARCH_KEYWORD: string = "";
    const DEFAULT_SORT: EBSSortContext = {
      column: null,
      direction: null,
      dataType: "string",
    };
    const DEFAULT_HEADERS: Array<EBSTabularHeader> = CUSTOM_COLUMNS;
    const DEFAULT_PAGE_COUNT: number = (() =>
      DEFAULT_RECORDS.length % DEFAULT_PAGE_SIZE > 0
        ? Math.floor(DEFAULT_RECORDS.length / DEFAULT_PAGE_SIZE) + 1
        : Math.floor(DEFAULT_RECORDS.length / DEFAULT_PAGE_SIZE))();

    const DEFAULT_TABLE_STATE_CHAIN: EBSTableStateChainInterface = {
      chainQueue: [],
      search: DEFAULT_SEARCH_KEYWORD,
      columns: DEFAULT_HEADERS,
      sort: DEFAULT_SORT,
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
        pageCount: DEFAULT_PAGE_COUNT,
      },
    };

    return {
      HEADERS_ORIGIN_REF: DEFAULT_HEADERS,
      RECORDS_ORIGIN_REF: DEFAULT_RECORDS,
      title: DEFAULT_TITLE,
      headers: DEFAULT_HEADERS,
      records: DEFAULT_RECORDS,
      stateChain: DEFAULT_TABLE_STATE_CHAIN,
    };
  })();
}

/**
 * Reset EBSTableState
 * @param state
 * @returns
 */
function resetEBSTableState(
  state: EBSTableStateInterface
): EBSTableStateInterface {
  const {
    HEADERS_ORIGIN_REF: cur_HEADERS_ORIGIN_REF,
    RECORDS_ORIGIN_REF: cur_RECORDS_ORIGIN_REF,
  } = state;
  return ((): EBSTableStateInterface => {
    const DEFAULT_RECORDS: Array<EBSTabularRecord> = cur_RECORDS_ORIGIN_REF;
    const DEFAULT_PAGE: number = 1;
    const DEFAULT_PAGE_SIZE: number = 5;
    const DEFAULT_SEARCH_KEYWORD: string = "";
    const DEFAULT_SORT: EBSSortContext = {
      column: null,
      direction: null,
      dataType: "string",
    };
    const DEFAULT_HEADERS: Array<EBSTabularHeader> = cur_HEADERS_ORIGIN_REF;
    const DEFAULT_PAGE_COUNT: number = (() =>
      DEFAULT_RECORDS.length % DEFAULT_PAGE_SIZE > 0
        ? Math.floor(DEFAULT_RECORDS.length / DEFAULT_PAGE_SIZE) + 1
        : Math.floor(DEFAULT_RECORDS.length / DEFAULT_PAGE_SIZE))();

    const DEFAULT_TABLE_STATE_CHAIN: EBSTableStateChainInterface = {
      chainQueue: [],
      search: DEFAULT_SEARCH_KEYWORD,
      columns: DEFAULT_HEADERS,
      sort: DEFAULT_SORT,
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
        pageCount: DEFAULT_PAGE_COUNT,
      },
    };

    return {
      ...state,
      headers: DEFAULT_HEADERS,
      records: DEFAULT_RECORDS,
      stateChain: DEFAULT_TABLE_STATE_CHAIN,
    };
  })();
}

export { getEBSTableInitialState, resetEBSTableState };
