/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-23 16:06:40
 * @modify date 2021-07-23 16:06:40
 * @desc [description]
 */

import { API } from "../../../../config/apis";
import { DATE_FORMAT } from "../../../../config/etc";
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
  StaticFlatAnnotation,
  StaticFlatMLST,
  StaticFlatResistome,
  StaticFlatVirulome,
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
  invertSelection: boolean
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

  const customized = results.map((obj) => {
    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
    } as FlatSequence;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatSequence>> = rearranged.map(
    (flatSequences: FlatSequence): JIYRecordContext<FlatSequence> => ({
      isSelected: invertSelection,
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
  invertSelection: boolean
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

  const customized = results.map((obj) => {
    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
    } as FlatAssembly;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    );
  });

  const data: Array<JIYRecordContext<FlatAssembly>> = rearranged.map(
    (flatAssembly: FlatAssembly): JIYRecordContext<FlatAssembly> => ({
      isSelected: invertSelection,
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
  invertSelection: boolean
): JIYTabularDataContext<StaticFlatAnnotation> {
  // ): JIYTabularDataContext<FlatAnnotation> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_ANNOTATION
  )
    .filter(([k]) => !k.includes("attr__tag"))
    .filter(([k]) => !k.includes("attr__value"))
    .map(([, value]) => {
      return {
        name: value.name,
        value: value.value,
        alias: value.alias,
        display: value.display as JIYHeaderDisplay,
        primary: value.primary,
      };
    });

  schema.push({
    name: "etc",
    value: "etc",
    alias: "Attributes",
    display: "visible" as JIYHeaderDisplay,
    primary: false,
  });

  const customized = results.map((obj) => {
    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
    } as FlatAnnotation;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<StaticFlatAnnotation>> = rearranged.map(
    (
      flatAnnotation: FlatAnnotation
    ): JIYRecordContext<StaticFlatAnnotation> => {
      const dynamicTags = Object.fromEntries(
        Object.entries(flatAnnotation).filter(([k]) => k.includes("attr__tag"))
      );
      const dynamicValues = Object.fromEntries(
        Object.entries(flatAnnotation).filter(([k]) =>
          k.includes("attr__value")
        )
      );
      let stringifiedField = "";
      for (let i = 0; i < Object.keys(dynamicTags).length; i++) {
        stringifiedField +=
          dynamicTags[`attr__tag_${i}`] +
          "=" +
          dynamicValues[`attr__value_${i}`];
        stringifiedField +=
          i === Object.keys(dynamicTags).length - 1 ? "" : ";";
      }
      const staticFlatAnnotation = Object.fromEntries(
        Object.entries(flatAnnotation)
          .filter(([k]) => !k.includes("attr__tag"))
          .filter(([k]) => !k.includes("attr__value"))
      );

      return {
        isSelected: invertSelection,
        data: {
          ...staticFlatAnnotation,
          etc: stringifiedField,
        } as StaticFlatAnnotation,
      };
    }
  );

  // const data: Array<JIYRecordContext<FlatAnnotation>> = rearranged.map(
  //   (flatAnnotation: FlatAnnotation): JIYRecordContext<FlatAnnotation> => ({
  //     isSelected: invertSelection,
  //     data: flatAnnotation,
  //   })
  // );

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
  invertSelection: boolean
  // ): JIYTabularDataContext<FlatMLST> {
): JIYTabularDataContext<StaticFlatMLST> {
  const schema: Array<JIYHeaderContext> = Object.entries(CUSTOM_HEADER_MLST)
    .filter(([k]) => !k.includes("profile__locus"))
    .filter(([k]) => !k.includes("profile__allele"))
    .map(([, value]) => {
      return {
        name: value.name,
        value: value.value,
        alias: value.alias,
        display: value.display as JIYHeaderDisplay,
        primary: value.primary,
      };
    });

  schema.push({
    name: "etc",
    value: "etc",
    alias: "Alleles",
    display: "visible" as JIYHeaderDisplay,
    primary: false,
  });

  const customized = results.map((obj) => {
    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
    } as FlatMLST;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<StaticFlatMLST>> = rearranged.map(
    (flatMLST: FlatMLST): JIYRecordContext<StaticFlatMLST> => {
      // const dynamicLocus = Object.fromEntries(
      //   Object.entries(flatMLST).filter(([k]) => k.includes("profile__locus"))
      // );
      const dynamicAllele = Object.fromEntries(
        Object.entries(flatMLST).filter(([k]) => k.includes("profile__allele"))
      );
      let stringifiedField = "";
      for (let i = 0; i < Object.keys(dynamicAllele).length; i++) {
        stringifiedField +=
          // dynamicLocus[`profile__locus_${i}`] +
          // "=" +
          dynamicAllele[`profile__allele_${i}`];
        stringifiedField +=
          i === Object.keys(dynamicAllele).length - 1 ? "" : ";";
      }
      const StaticFlatMLST = Object.fromEntries(
        Object.entries(flatMLST)
          .filter(([k]) => !k.includes("profile__locus"))
          .filter(([k]) => !k.includes("profile__allele"))
      );

      return {
        isSelected: invertSelection,
        data: { ...StaticFlatMLST, etc: stringifiedField } as StaticFlatMLST,
      };
    }
  );

  // const data: Array<JIYRecordContext<FlatMLST>> = rearranged.map(
  //   (flatMLST: FlatMLST): JIYRecordContext<FlatMLST> => ({
  //     isSelected: invertSelection,
  //     data: flatMLST,
  //   })
  // );

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
  invertSelection: boolean
  // ): JIYTabularDataContext<FlatResistome> {
): JIYTabularDataContext<StaticFlatResistome> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_RESISTOME
  )
    .filter(([k]) => !k.includes("profile__geneName"))
    .filter(([k]) => !k.includes("profile__pctCoverage"))
    .map(([, value]) => {
      return {
        name: value.name,
        value: value.value,
        alias: value.alias,
        display: value.display as JIYHeaderDisplay,
        primary: value.primary,
      };
    });

  schema.push({
    name: "etc",
    value: "etc",
    alias: "Genes(Coverage%)",
    display: "visible" as JIYHeaderDisplay,
    primary: false,
  });

  const customized = results.map((obj) => {
    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
    } as FlatResistome;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<StaticFlatResistome>> = rearranged.map(
    (flatResistome: FlatResistome): JIYRecordContext<StaticFlatResistome> => {
      const dynamicGeneName = Object.fromEntries(
        Object.entries(flatResistome).filter(([k]) =>
          k.includes("profile__geneName")
        )
      );
      const dynamicCoverage = Object.fromEntries(
        Object.entries(flatResistome).filter(([k]) =>
          k.includes("profile__pctCoverage")
        )
      );
      let stringifiedField = "";
      for (let i = 0; i < Object.keys(dynamicGeneName).length; i++) {
        stringifiedField +=
          dynamicGeneName[`profile__geneName_${i}`] +
          "(" +
          dynamicCoverage[`profile__pctCoverage_${i}`] +
          "%)";
        stringifiedField +=
          i === Object.keys(dynamicGeneName).length - 1 ? "" : ";";
      }
      const StaticFlatResistome = Object.fromEntries(
        Object.entries(flatResistome)
          .filter(([k]) => !k.includes("profile__geneName"))
          .filter(([k]) => !k.includes("profile__pctCoverage"))
      );

      return {
        isSelected: invertSelection,
        data: {
          ...StaticFlatResistome,
          etc: stringifiedField,
        } as StaticFlatResistome,
      };
    }
  );

  // const data: Array<JIYRecordContext<FlatResistome>> = rearranged.map(
  //   (flatResistome: FlatResistome): JIYRecordContext<FlatResistome> => ({
  //     isSelected: invertSelection,
  //     data: flatResistome,
  //   })
  // );

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
  invertSelection: boolean
): JIYTabularDataContext<StaticFlatVirulome> {
  // ): JIYTabularDataContext<FlatVirulome> {
  const schema: Array<JIYHeaderContext> = Object.entries(CUSTOM_HEADER_VIRULOME)
    .filter(([k]) => !k.includes("profile__geneName"))
    .filter(([k]) => !k.includes("profile__pctCoverage"))
    .map(([, value]) => {
      return {
        name: value.name,
        value: value.value,
        alias: value.alias,
        display: value.display as JIYHeaderDisplay,
        primary: value.primary,
      };
    });

  schema.push({
    name: "etc",
    value: "etc",
    alias: "Genes(Coverage%)",
    display: "visible" as JIYHeaderDisplay,
    primary: false,
  });

  const customized = results.map((obj) => {
    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
    } as FlatVirulome;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<StaticFlatVirulome>> = rearranged.map(
    (flatVirulome: FlatVirulome): JIYRecordContext<StaticFlatVirulome> => {
      const dynamicGeneName = Object.fromEntries(
        Object.entries(flatVirulome).filter(([k]) =>
          k.includes("profile__geneName")
        )
      );
      const dynamicCoverage = Object.fromEntries(
        Object.entries(flatVirulome).filter(([k]) =>
          k.includes("profile__pctCoverage")
        )
      );
      let stringifiedField = "";
      for (let i = 0; i < Object.keys(dynamicGeneName).length; i++) {
        stringifiedField +=
          dynamicGeneName[`profile__geneName_${i}`] +
          "(" +
          dynamicCoverage[`profile__pctCoverage_${i}`] +
          "%)";
        stringifiedField +=
          i === Object.keys(dynamicGeneName).length - 1 ? "" : ";";
      }
      const staticFlatVirulome = Object.fromEntries(
        Object.entries(flatVirulome)
          .filter(([k]) => !k.includes("profile__geneName"))
          .filter(([k]) => !k.includes("profile__pctCoverage"))
      );

      return {
        isSelected: invertSelection,
        data: {
          ...staticFlatVirulome,
          etc: stringifiedField,
        } as StaticFlatVirulome,
      };
    }
  );

  // const data: Array<JIYRecordContext<FlatVirulome>> = rearranged.map(
  //   (flatVirulome: FlatVirulome): JIYRecordContext<FlatVirulome> => ({
  //     isSelected: invertSelection,
  //     data: flatVirulome,
  //   })
  // );

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
  invertSelection: boolean
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

  const customized = results.map((obj) => {
    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        undefined,
        DATE_FORMAT
      ),
    } as FlatPsummary;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatPsummary>> = rearranged.map(
    (flatPsummary: FlatPsummary): JIYRecordContext<FlatPsummary> => ({
      isSelected: invertSelection,
      data: flatPsummary,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}
