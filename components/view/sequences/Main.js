/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import _ from "lodash";
import { useCallback, useReducer, useState } from "react";
import EBSTableData from "../../table/EBSTableData";
import Filters from "./Filters";
import { SequencesTotalCount } from "./Statistics";

import TopNav from "../../TopNav";
import {
  Dimmer,
  Loader,
  Grid,
  Header,
  Icon,
  Placeholder,
} from "semantic-ui-react";

// interface
// const EBSDataContext = createContext({
//   columnData: [],
//   rowData: {},
//   setRowData: () => {},
// });

export default function SequencesMainView(props) {
  const { data } = props;
  const { headers, rows } = data;

  const CUSTOM_COLUMNS = headers.slice();
  const CUSTOM_ROWS = rows
    .slice()
    .map((obj, index) => ({ index: index, isSelected: false, data: obj }));

  const initialDatasetState = (() => {
    const DEFAULT_DATASET = CUSTOM_ROWS;
    const DEFAULT_PAGE = 1;
    const DEFAULT_PAGE_SIZE = 5;
    const DEFAULT_SEARCH_KEYWORD = "";
    const DEFAULT_SORT = { column: null, direction: null, dataType: "string" };
    const DEFALUT_COLUMNS = CUSTOM_COLUMNS;
    const DEFAULT_PAGE_COUNT = (() =>
      DEFAULT_DATASET.length % DEFAULT_PAGE_SIZE > 0
        ? Math.floor(DEFAULT_DATASET.length / DEFAULT_PAGE_SIZE) + 1
        : Math.floor(DEFAULT_DATASET.length / DEFAULT_PAGE_SIZE))();

    let history = {
      order: [],
      search: DEFAULT_SEARCH_KEYWORD,
      columns: DEFALUT_COLUMNS,
      sort: DEFAULT_SORT,
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
        pageCount: DEFAULT_PAGE_COUNT,
      },
    };

    let dataset = DEFAULT_DATASET;
    const ORIGIN = DEFAULT_DATASET;

    return {
      ORIGIN: ORIGIN,
      history: history,
      dataset: dataset,
    };
  })();

  const dataReducer = useCallback((state, action) => {
    const { ORIGIN, history } = state;
    const { order, search, columns, sort, pagination } = history;
    const { page, pageSize } = pagination;

    // const pick = (obj, keys) => {
    //   return keys
    //     .map((k) => (k in obj ? { [k]: obj[k] } : {}))
    //     .reduce((res, o) => Object.assign(res, o), {});
    // };

    const pick = (obj, keys) => {
      return keys
        .map((k) => (k.value in obj ? { [k.value]: obj[k.value] } : {}))
        .reduce((res, o) => Object.assign(res, o), {});
    };

    let results = ORIGIN.slice();
    switch (action.type) {
      case "RESET_DATASET":
        return initialDatasetState;

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
          history: {
            // order: action.module
            //   ? order.includes(action.module)
            //     ? [...order]
            //     : [...order, action.module]
            //   : order,
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
  }, []);

  const [columnData] = useState(CUSTOM_COLUMNS);
  const [rowData, setRowData] = useReducer(dataReducer, initialDatasetState);

  const [wideView, setWideView] = useState(false);

  return (
    <>
      <TopNav />
      <div
        className={`${
          wideView
            ? "ebs-left-side-content-wide-frame"
            : "ebs-left-side-content-frame"
        }`}
      >
        {CUSTOM_ROWS.length > 0 ? (
          <Filters
            rowData={rowData}
            wideView={wideView}
            setRowData={setRowData}
            setWideView={setWideView}
          />
        ) : (
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        )}
      </div>
      <div
        className={`${
          wideView
            ? "ebs-main-content-with-left-side-wide-frame"
            : "ebs-main-content-with-left-side-frame"
        }`}
      >
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Header size="large">Statistic</Header>
              {CUSTOM_ROWS.length > 0 ? (
                <SequencesTotalCount rowData={rowData} />
              ) : (
                <Dimmer active>
                  <Loader>Loading</Loader>
                </Dimmer>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {CUSTOM_COLUMNS.length > 0 && CUSTOM_ROWS.length > 0 ? (
                <EBSTableData
                  tableTitle="Run"
                  columnData={columnData}
                  rowData={rowData}
                  setRowData={setRowData}
                />
              ) : (
                <>
                  <Placeholder fluid>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Grid>
                      <Grid.Column textAlign="center">
                        <Header icon>
                          <Icon name="table" />
                        </Header>
                      </Grid.Column>
                    </Grid>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder>
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                </>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

// export function useEBSData() {
//   const context = useContext(EBSDataContext);
//   if (context === undefined) {
//     throw new Error("useEBSData must be used within an EBSDataProvider");
//   }
//   return context;
// }
