/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-23 16:06:40
 * @modify date 2021-07-23 16:06:40
 * @desc [description]
 */

import { API } from "../../../../config/apis";
import { FlatSequence } from "../../../../models/Sequence";
import {
  JIYHeaderContext,
  JIYOrderingContext,
  JIYRecordContext,
  JIYTabularDataContext,
  JIYURLContext,
} from "../models/JIYContexts";

export function URLHandler(
  uri: string,
  query?: string,
  module?: string,
  search?: string,
  page?: number,
  pageSize?: number,
  ordering?: JIYOrderingContext
): JIYURLContext {
  const URI = uri + "?";

  let url = API + URI;

  if (query !== undefined && query !== null && query !== "") {
    url = url + query;
  }
  if (module !== undefined && module !== null && module !== "") {
    url = url + "&seqtype=" + module;
  }
  if (search !== undefined && search !== null && search !== "") {
    url = url + "&search=" + search;
  }
  if (page !== undefined && page !== null && page !== 0) {
    url = url + "&page=" + page;
  }
  if (pageSize !== undefined && page !== null && pageSize !== 0) {
    url = url + "&page_size=" + pageSize;
  }
  if (ordering !== undefined && ordering !== null) {
    // const orderingOn = ordering.column.replace(".", "__");
    const orderingOn = ordering.column;
    if (ordering.direction === "ascending") {
      url = url + "&ordering=" + orderingOn;
    } else {
      url = url + "&ordering=-" + orderingOn;
    }
  }

  return {
    api: API,
    uri: uri,
    url: url,
  };
}

export function SequencesDataHandler(
  results: Array<FlatSequence>
): JIYTabularDataContext<FlatSequence> {
  const sample: FlatSequence = results[0];
  const schema: Array<JIYHeaderContext> = Object.keys(sample).map(
    (key, index): JIYHeaderContext => {
      const path = key.split("__");
      const name = path.pop();
      return {
        parent: path.join("__"),
        name: name,
        value: key,
        alias: null,
        display: true,
        primary: index === 0,
      };
    }
  );
  const data: Array<JIYRecordContext<FlatSequence>> = results.map(
    (flatSequences: FlatSequence): JIYRecordContext<FlatSequence> => ({
      isSelected: false,
      data: flatSequences,
    })
  );
  return {
    headers: schema,
    records: data,
  };
}

// export function RunDataHandler(
//   results: Array<Run>
// ): JIYTabularDataContext<Run> {
//   const flatResults = results.map((run) => Object.fromEntries(pull(run)));
//   const sample: Run = flatResults[0];
//   const schema: Array<JIYHeaderContext> = Object.keys(sample).map(
//     (key, index): JIYHeaderContext => {
//       const path = key.split("__");
//       const name = path.pop();
//       return {
//         parent: path.join("__"),
//         name: name,
//         value: key,
//         alias: null,
//         display: true,
//         primary: index === 0,
//       };
//     }
//   );
//   const data: Array<JIYRecordContext<Run>> = flatResults.map(
//     (run: Run): JIYRecordContext<Run> => ({ isSelected: false, data: run })
//   );
//   return {
//     headers: schema,
//     records: data,
//   };
// }
