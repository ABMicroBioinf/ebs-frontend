/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";
import { useEffect, useState } from "react";

import TBMainView from "../../components/view/analysis/Main";
import { TBPROFILER } from "./tbprofiler";

const getSchemeDefault = (sample, parent = null) => {
  let scheme = [];
  for (const [key, value] of Object.entries(sample)) {
    if (value === Object(value) && value !== null && value !== undefined) {
      scheme.push({
        name: key,
        value: key,
        alias: null,
        type: "object",
        display: false,
        primary: false,
        children: getSchemeDefault(value, key),
      });
    } else {
      scheme.push({
        name: key,
        value: parent === null ? key : parent + "." + key,
        alias: null,
        type: "string",
        display: true,
        primary: false,
        children: [],
      });
    }
  }
  return scheme;
};

function TBAnalysis() {
  const [data, setData] = useState({ headers: [], rows: [] });

  useEffect(() => {
    const converted = Object.entries(TBPROFILER).map(([key, value]) => {
      let obj = {};
      obj["sample"] = key;
      if (value === Object(value) && value !== null && value !== undefined) {
        Object.entries(value).map(([k, v]) => {
          obj[k] = v;
        });
      }
      return obj;
    });

    setData({
      headers: getSchemeDefault(converted[0]),
      rows: converted,
    });
  }, []);

  return data.rows.length > 0 && <TBMainView data={data} />;
}

export default withAuth(TBAnalysis);
