/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 00:09:39
 * @modify date 2021-07-15 13:09:41
 * @desc [description]
 */
import withAuth from "../../../middleware/withAuth";
import { useEffect, useState } from "react";

import TBMainView from "../../../components/views/analysis/Main";
import { TBPROFILER } from "./tbprofiler";
import {
  applyCustomFields,
  flatColumns,
  flatRows,
  getSchemeDefault,
} from "../../../modules/table/helpers/EBSTabularDataHandler";

/**
 * TBAnalysis
 * @returns - TB Main View Component
 */
function TBAnalysis() {
  const [ebsTabularData, setEBSTabularData] = useState({
    title: "",
    placementURI: "",
    headers: [],
    records: [],
  });

  useEffect(() => {
    const converted = Object.entries(TBPROFILER).map(([key, value]) => {
      const obj = {};
      obj["sample"] = key;
      if (value === Object(value) && value !== null && value !== undefined) {
        Object.entries(value).map(([k, v]) => {
          obj[k] = v;
        });
      }
      return obj;
    });

    const DEFAULT_SCHEME = getSchemeDefault(converted[0]);
    const CUSTOMIZED_SCHEME = applyCustomFields(flatColumns(DEFAULT_SCHEME));

    setEBSTabularData({
      title: "TBProfiler",
      placementURI: "analysis/tb",
      headers: CUSTOMIZED_SCHEME,
      records: flatRows(converted),
    });
  }, []);

  return (
    ebsTabularData.headers.length > 0 &&
    ebsTabularData.records.length > 0 && (
      <TBMainView
        ebsTabularData={ebsTabularData}
        setEBSTabularData={setEBSTabularData}
      />
    )
  );
}

export default withAuth(TBAnalysis);
