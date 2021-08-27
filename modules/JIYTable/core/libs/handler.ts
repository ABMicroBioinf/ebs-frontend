/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-23 16:06:40
 * @modify date 2021-07-23 16:06:40
 * @desc [description]
 */

import { API } from "../../../../config/apis";
import {
  FlatAnnotation,
  FlatAssembly,
  FlatMLST,
  FlatResistome,
  FlatVirulome,
} from "../../../../models/Isolate";
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

export function AssemblyDataHandler(
  results: Array<FlatAssembly>
): JIYTabularDataContext<FlatAssembly> {
  const sample: FlatAssembly = results[0];
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
  const data: Array<JIYRecordContext<FlatAssembly>> = results.map(
    (flatSequences: FlatAssembly): JIYRecordContext<FlatAssembly> => ({
      isSelected: false,
      data: flatSequences,
    })
  );
  return {
    headers: schema,
    records: data,
  };
}

export function AnnotationDataHandler(
  results: Array<FlatAnnotation>
): JIYTabularDataContext<FlatAnnotation> {
  const sample: FlatAnnotation = results[0];
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
  const data: Array<JIYRecordContext<FlatAnnotation>> = results.map(
    (flatSequences: FlatAnnotation): JIYRecordContext<FlatAnnotation> => ({
      isSelected: false,
      data: flatSequences,
    })
  );
  return {
    headers: schema,
    records: data,
  };
}

export function MLSTDataHandler(
  results: Array<FlatMLST>
): JIYTabularDataContext<FlatMLST> {
  const sample: FlatMLST = results[0];
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
  const data: Array<JIYRecordContext<FlatMLST>> = results.map(
    (flatSequences: FlatMLST): JIYRecordContext<FlatMLST> => ({
      isSelected: false,
      data: flatSequences,
    })
  );
  return {
    headers: schema,
    records: data,
  };
}

export function ResistomeDataHandler(
  results: Array<FlatResistome>
): JIYTabularDataContext<FlatResistome> {
  const sample: FlatResistome = results[0];
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
  const data: Array<JIYRecordContext<FlatResistome>> = results.map(
    (flatSequences: FlatResistome): JIYRecordContext<FlatResistome> => ({
      isSelected: false,
      data: flatSequences,
    })
  );
  return {
    headers: schema,
    records: data,
  };
}

export function VirulomeDataHandler(
  results: Array<FlatVirulome>
): JIYTabularDataContext<FlatVirulome> {
  const sample: FlatVirulome = results[0];
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
  const data: Array<JIYRecordContext<FlatVirulome>> = results.map(
    (flatSequences: FlatVirulome): JIYRecordContext<FlatVirulome> => ({
      isSelected: false,
      //
      data: flatSequences,
    })
  );
  return {
    headers: schema,
    records: data,
  };
}
