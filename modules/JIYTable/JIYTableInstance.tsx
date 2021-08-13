/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-23 14:43:58
 * @modify date 2021-07-23 14:43:58
 * @desc [description]
 */

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../middleware/AuthProvider";

import {
  JIYHeaderContext,
  JIYOrderingContext,
  JIYRecordContext,
  JIYTableInstanceContext,
} from "./core/models/JIYContexts";
import JIYTable from "./core/components/JIYTable";

import TablePlaceholder from "../../components/global/TablePlaceholder";
import { URLHandler } from "./core/libs/handler";

function JIYTableInstance<T>({
  title,
  url,
  path,
  module,
  handler,
}: JIYTableInstanceContext<T>): JSX.Element {
  const { accessToken } = useAuth();

  const [next, setNext] = useState<string>(null);
  const [prev, setPrev] = useState<string>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [search, setSearch] = useState<string>("");
  const [headers, setHeaders] = useState<Array<JIYHeaderContext>>(null);
  const [records, setRecords] = useState<Array<JIYRecordContext<T>>>(null);
  const [ordering, setOrdering] = useState<JIYOrderingContext>(null);

  const [isLoading, setLoading] = useState<boolean>(false);

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
    fetchData(url.url);
  }, []);

  useEffect(() => {
    fetchData(
      URLHandler(url.uri, module, search, page, pageSize, ordering).url
    );
  }, [page, pageSize]);

  useEffect(() => {
    fetchData(URLHandler(url.uri, module, search, page, pageSize, null).url);
  }, [search]);

  useEffect(() => {
    fetchData(URLHandler(url.uri, module, null, page, pageSize, ordering).url);
  }, [ordering]);

  return (
    <>
      {headers && records && (
        <JIYTable
          title={title}
          path={path}
          prev={prev}
          next={next}
          total={total}
          page={page}
          pageSize={pageSize}
          search={search}
          ordering={ordering}
          headers={headers}
          records={records}
          isLoading={isLoading}
          setPage={setPage}
          setPageSize={setPageSize}
          setSearch={setSearch}
          setOrdering={setOrdering}
          setHeaders={setHeaders}
          setRecords={setRecords}
          setLoading={setLoading}
        />
      )}
      {/* // ) : (
      //   <TablePlaceholder />
      // )} */}
    </>
  );
}

export default JIYTableInstance;
