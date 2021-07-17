/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-17 14:59:51
 * @modify date 2021-07-17 14:59:51
 * @desc [description]
 */
import _ from "lodash";
import {
  EBSSortContext,
  EBSTableStateChainInterface,
  EBSTableStateInterface,
  EBSTabularHeader,
  EBSTabularRecord,
} from "../interfaces/EBSDataTypes";

/**
 * EBSTableState
 */
class EBSTableState implements EBSTableStateInterface {
  /**
   * Interface
   */
  title: string;
  headers: Array<EBSTabularHeader>;
  records: Array<EBSTabularRecord>;
  stateChain: EBSTableStateChainInterface;
  readonly HEADERS_ORIGIN_REF: Array<EBSTabularHeader>;
  readonly RECORDS_ORIGIN_REF: Array<EBSTabularRecord>;

  /**
   * Constructor
   * @param title
   * @param headers
   * @param records
   */
  constructor(
    title: string,
    headers: Array<EBSTabularHeader>,
    records: Array<EBSTabularRecord>
  ) {
    const CUSTOM_COLUMNS: Array<EBSTabularHeader> = headers;
    const CUSTOM_ROWS: Array<EBSTabularRecord> = records.map((obj, index) => ({
      index: index,
      isSelected: false,
      data: obj,
    }));

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

    this.title = title;
    this.headers = DEFAULT_HEADERS;
    this.records = DEFAULT_RECORDS;
    this.stateChain = DEFAULT_TABLE_STATE_CHAIN;
    this.HEADERS_ORIGIN_REF = DEFAULT_HEADERS;
    this.RECORDS_ORIGIN_REF = DEFAULT_RECORDS;
  }

  #update() {
    let results: Array<EBSTabularRecord> = this.RECORDS_ORIGIN_REF;
    const preProcessing = (results): void => {};
    const mainProcessing = () => {
      this.stateChain.chainQueue.forEach((module) => {
        if (module !== null && module !== undefined) {
          switch (module) {
            case "search":
              results = results.filter((row) =>
                JSON.stringify(Object.values(row.data)).includes(
                  this.stateChain.search
                )
              );
              break;

            case "columns":
              results = results.map((row) => {
                return {
                  ...row,
                  data: pick(
                    row.data,
                    this.stateChain.columns.filter(
                      (colState) => colState.display && colState
                    )
                  ),
                };
              });
              break;

            case "sort":
              if (this.stateChain.sort.dataType === "number") {
                results = _.orderBy(
                  results,
                  (obj) => {
                    return parseFloat(obj.data[this.stateChain.sort.column]);
                  },
                  [this.stateChain.sort.direction]
                );
              } else {
                results =
                  this.stateChain.sort.direction === "asc"
                    ? _.sortBy(results, (obj) => {
                        return obj.data[this.stateChain.sort.column];
                      })
                    : _.sortBy(results, (obj) => {
                        return obj.data[this.stateChain.sort.column];
                      }).reverse();
              }
              break;

            default:
              throw new Error("Invalid History Action");
          }
        }
      });
    };
    const postProcessing = () => {};

    this.records = results;
  }

  sort() {}

  columns() {}

  search(keyword: string) {}

  reset() {
    const DEFAULT_PAGE: number = 1;
    const DEFAULT_PAGE_SIZE: number = 5;
    const DEFAULT_SEARCH_KEYWORD: string = "";

    const DEFAULT_SORT: EBSSortContext = {
      column: null,
      direction: null,
      dataType: "string",
    };

    const DEFAULT_PAGE_COUNT: number = (() =>
      this.RECORDS_ORIGIN_REF.length % DEFAULT_PAGE_SIZE > 0
        ? Math.floor(this.RECORDS_ORIGIN_REF.length / DEFAULT_PAGE_SIZE) + 1
        : Math.floor(this.RECORDS_ORIGIN_REF.length / DEFAULT_PAGE_SIZE))();

    const DEFAULT_TABLE_STATE_CHAIN: EBSTableStateChainInterface = {
      chainQueue: [],
      search: DEFAULT_SEARCH_KEYWORD,
      columns: this.HEADERS_ORIGIN_REF,
      sort: DEFAULT_SORT,
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
        pageCount: DEFAULT_PAGE_COUNT,
      },
    };

    this.headers = this.HEADERS_ORIGIN_REF;
    this.records = this.RECORDS_ORIGIN_REF;
    this.stateChain = DEFAULT_TABLE_STATE_CHAIN;
  }
}
