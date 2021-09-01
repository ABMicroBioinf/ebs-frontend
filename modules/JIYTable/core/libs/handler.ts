/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-23 16:06:40
 * @modify date 2021-07-23 16:06:40
 * @desc [description]
 */

import { API } from "../../../../config/apis";
import {
  CUSTOM_HEADER_ANNOTATION,
  CUSTOM_HEADER_ASSEMBLY,
  CUSTOM_HEADER_MLST,
  CUSTOM_HEADER_PSUMMARY,
  CUSTOM_HEADER_RESISTOME,
  CUSTOM_HEADER_SEQUENCE,
  CUSTOM_HEADER_VIRULOME,
} from "../../../../config/headers";
import {
  FlatAnnotation,
  FlatAssembly,
  FlatMLST,
  FlatPsummary,
  FlatResistome,
  FlatVirulome,
} from "../../../../models/Isolate";
import { FlatSequence } from "../../../../models/Sequence";
import {
  JIYHeaderContext,
  JIYHeaderDisplay,
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
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_SEQUENCE
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  // This is important to match the position of table header and data.
  const standard = schema.map((obj) => obj.value);
  const rearranged = results.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatSequence>> = rearranged.map(
    (flatSequences: FlatSequence): JIYRecordContext<FlatSequence> => ({
      isSelected: false,
      data: flatSequences,
    })
  );

  return {
    headers: schema,
    records: data,
  };
  // const sample: FlatSequence = results[0];
  // const schema: Array<JIYHeaderContext> = Object.keys(sample).map(
  //   (key, index): JIYHeaderContext => {
  //     const path = key.split("__");
  //     const name = path.pop();
  //     return {
  //       // parent: path.join("__"),
  //       name: name,
  //       value: key,
  //       alias: null,
  //       display: true,
  //       primary: index === 0,
  //     };
  //   }
  // );
  // const data: Array<JIYRecordContext<FlatSequence>> = results.map(
  //   (flatSequences: FlatSequence): JIYRecordContext<FlatSequence> => ({
  //     isSelected: false,
  //     data: flatSequences,
  //   })
  // );
  // return {
  //   headers: schema,
  //   records: data,
  // };
}

export function AssemblyDataHandler(
  results: Array<FlatAssembly>
): JIYTabularDataContext<FlatAssembly> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_ASSEMBLY
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  // This is important to match the position of table header and data.
  const standard = schema.map((obj) => obj.value);
  const rearranged = results.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatAssembly>> = rearranged.map(
    (flatAssembly: FlatAssembly): JIYRecordContext<FlatAssembly> => ({
      isSelected: false,
      data: flatAssembly,
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
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_ANNOTATION
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  // This is important to match the position of table header and data.
  const standard = schema.map((obj) => obj.value);
  const rearranged = results.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatAnnotation>> = rearranged.map(
    (flatAnnotation: FlatAnnotation): JIYRecordContext<FlatAnnotation> => ({
      isSelected: false,
      data: flatAnnotation,
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
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_MLST
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  // This is important to match the position of table header and data.
  const standard = schema.map((obj) => obj.value);
  const rearranged = results.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatMLST>> = rearranged.map(
    (flatMLST: FlatMLST): JIYRecordContext<FlatMLST> => ({
      isSelected: false,
      data: flatMLST,
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
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_RESISTOME
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  // This is important to match the position of table header and data.
  const standard = schema.map((obj) => obj.value);
  const rearranged = results.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatResistome>> = rearranged.map(
    (flatResistome: FlatResistome): JIYRecordContext<FlatResistome> => ({
      isSelected: false,
      data: flatResistome,
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
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_VIRULOME
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  // This is important to match the position of table header and data.
  const standard = schema.map((obj) => obj.value);
  const rearranged = results.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatVirulome>> = rearranged.map(
    (flatVirulome: FlatVirulome): JIYRecordContext<FlatVirulome> => ({
      isSelected: false,
      data: flatVirulome,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}

export function ProfileSummaryDataHandler(
  results: Array<FlatPsummary>
): JIYTabularDataContext<FlatPsummary> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_PSUMMARY
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  // This is important to match the position of table header and data.
  const standard = schema.map((obj) => obj.value);
  const rearranged = results.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatPsummary>> = rearranged.map(
    (flatPsummary: FlatPsummary): JIYRecordContext<FlatPsummary> => ({
      isSelected: false,
      data: flatPsummary,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}
