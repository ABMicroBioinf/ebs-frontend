/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 11:08:05
 * @modify date 2021-07-15 13:16:57
 * @desc [description]
 */
import withAuth from "../../../middleware/withAuth";
import { useCallback, useEffect, useState } from "react";

import TopNav from "../../../components/global/TopNav";
import { Grid } from "semantic-ui-react";
import SequencesVizView from "../../../components/views/sequences/VizView";
import SequencesSideMenu from "../../../components/views/sequences/SideMenu";
import { useAuth } from "../../../middleware/AuthProvider";
import {
  JIYHeaderContext,
  JIYOrderingContext,
  JIYRecordContext,
} from "../../../modules/JIYTable/core/models/JIYContexts";
import {
  URLHandler,
  SequencesDataHandler as handler,
} from "../../../modules/JIYTable/core/libs/handler";

import axios from "axios";
import { API_SEQUENCE } from "../../../config/apis";
import { FlatSequence } from "../../../models/Sequence";

/**
 * Sequence Page
 * @returns - Sequence Main View Component
 */
function SequenceTB(): JSX.Element {
  const MODULE = "TB";
  const URL = URLHandler(API_SEQUENCE);

  const { accessToken } = useAuth();

  const [next, setNext] = useState<string>(null);
  const [prev, setPrev] = useState<string>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [ordering, setOrdering] = useState<JIYOrderingContext>(null);
  const [headers, setHeaders] = useState<Array<JIYHeaderContext>>(null);
  const [records, setRecords] =
    useState<Array<JIYRecordContext<FlatSequence>>>(null);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSelectedAll, setSelectedAll] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] =
    useState<Array<JIYRecordContext<FlatSequence>>>(null);
  const [wideView, setWideView] = useState(false);

  const fetchData = useCallback(async (reqURL: string) => {
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    setLoading(true);
    await axios
      .get(reqURL, config)
      .then((res) => {
        if (res.status === 200) {
          const { headers: cols, records: rows } = handler(res.data.results);
          setNext(res.data.links.next);
          setPrev(res.data.links.previous);
          setTotal(Number(res.data.total));
          setPage(Number(res.data.page));
          setPageSize(Number(res.data.page_size));
          setHeaders(cols);
          setRecords(rows);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData(
      URLHandler(URL.uri, query, MODULE, search, page, pageSize, ordering).url
    );
  }, [page, pageSize, search, ordering, query]);

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
        {headers && records && (
          <SequencesSideMenu
            module={MODULE}
            query={query}
            wideView={wideView}
            setQuery={setQuery}
            setWideView={setWideView}
          />
        )}
      </div>
      <div
        className={`${
          wideView
            ? "ebs-main-content-with-left-side-wide-frame"
            : "ebs-main-content-with-left-side-frame"
        }`}
      >
        {headers && records && (
          <Grid padded>
            <Grid.Row>
              <Grid.Column>
                <SequencesVizView
                  title={MODULE}
                  path={"/sequences/tb"}
                  prev={prev}
                  next={next}
                  total={total}
                  page={page}
                  pageSize={pageSize}
                  query={query}
                  search={search}
                  ordering={ordering}
                  headers={headers}
                  records={records}
                  isLoading={isLoading}
                  isSelectedAll={isSelectedAll}
                  selectedItems={selectedItems}
                  setPage={setPage}
                  setPageSize={setPageSize}
                  setQuery={setQuery}
                  setSearch={setSearch}
                  setOrdering={setOrdering}
                  setHeaders={setHeaders}
                  setRecords={setRecords}
                  setLoading={setLoading}
                  setSelectedAll={setSelectedAll}
                  setSelectedItems={setSelectedItems}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    </>
  );
}

export default withAuth(SequenceTB);
