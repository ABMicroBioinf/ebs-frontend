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

/**
 * URLHandler
 * @param uri - URI
 * @param query - field
 * @param module - seqtype
 * @param search - search
 * @param page - page
 * @param pageSize - page_size
 * @param ordering - ordering
 * @returns - See {@link JIYURLContext}
 */
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

/**
 * SequenceDataHandler
 * @param results - Array of FlatSequence. See {@link FlatSequence}
 * @returns - See {@link JIYTabularDataContext}
 */
export function SequencesDataHandler(
  results: Array<FlatSequence>,
  isSelected: boolean
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
      isSelected: isSelected,
      data: flatSequences,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}

/**
 * AssemblyDataHandler
 * @param results - Array of FlatAssembly. See {@link FlatAssembly}
 * @returns - See {@link JIYTabularDataContext}
 */
export function AssemblyDataHandler(
  results: Array<FlatAssembly>,
  isSelected: boolean
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
      isSelected: isSelected,
      data: flatAssembly,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}

/**
 * AnnotationDataHandler
 * @param results - Array of FlatAnnotation. See {@link FlatAnnotation}
 * @returns - See {@link JIYTabularDataContext}
 */
export function AnnotationDataHandler(
  results: Array<FlatAnnotation>,
  isSelected: boolean
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
      isSelected: isSelected,
      data: flatAnnotation,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}

/**
 *MLSTDataHandler
 * @param results - Array of FlatMLST. See {@link FlatMLST}
 * @returns - See {@link JIYTabularDataContext}
 */
export function MLSTDataHandler(
  results: Array<FlatMLST>,
  isSelected: boolean
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
      isSelected: isSelected,
      data: flatMLST,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}

/**
 *
 * @param results - Array of FlatResistome. See {@link FlatResistome}
 * @returns - See {@link JIYTabularDataContext}
 */
export function ResistomeDataHandler(
  results: Array<FlatResistome>,
  isSelected: boolean
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
      isSelected: isSelected,
      data: flatResistome,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}

/**
 * VirulomeDataHandler
 * @param results - Array of FlatVirulome. See {@link FlatVirulome}
 * @returns - See {@link JIYTabularDataContext}
 */
export function VirulomeDataHandler(
  results: Array<FlatVirulome>,
  isSelected: boolean
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
      isSelected: isSelected,
      data: flatVirulome,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}

/**
 * ProfileSummaryDataHandler
 * @param results - Array of FlatPSummary. See {@link FlatPSummary}
 * @returns - See {@link JIYTabularDataContext}
 */
export function ProfileSummaryDataHandler(
  results: Array<FlatPsummary>,
  isSelected: boolean
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
      isSelected: isSelected,
      data: flatPsummary,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}
