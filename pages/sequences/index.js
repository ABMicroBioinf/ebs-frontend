/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 11:08:05
 * @modify date 2021-07-15 11:23:05
 * @desc [description]
 */
import axios from "axios";
import withAuth from "../../middleware/withAuth";
import { useAuth } from "../../middleware/AuthProvider";
import { useCallback, useEffect, useState } from "react";

import SequencesMainView from "../../components/view/sequences/Main";

// #####################################################################
// Customize your table here
// 
// interface custom_fields {
//   name: string,
//   value: string,
//   alias: string,
//   display: boolean,
//   children: Object[],
// }
// #####################################################################
// 
// Add fields you want to display other than that will be disabled by default
// parent cannot be a primary and displayed n a flatMap
const CUSTOM_FIELDS = [
  {
    name: "run_name",
    value: "run_name",
    alias: "RUN",
    type: "string",
    display: true,
    primary: true,
    children: [],
  },
  {
    name: "sample",
    value: "sample",
    alias: null,
    type: "object",
    display: false,
    primary: false,
    children: [
      {
        name: "organism",
        value: "sample.organism",
        alias: "Organism",
        type: "string",
        display: true,
        primary: false,
        children: [],
      },
    ],
  },
  {
    name: "experiment",
    value: "experiment",
    alias: null,
    type: "object",
    display: false,
    primary: false,
    children: [
      {
        name: "instrument",
        value: "experiment.instrument",
        alias: "Instrument (EXP)",
        type: "string",
        display: true,
        primary: false,
        children: [],
      },
      {
        name: "platform",
        alias: "Platform (EXP)",
        value: "experiment.platform",
        type: "string",
        display: true,
        primary: false,
        children: [],
      },
      {
        name: "libraryLayout",
        value: "experiment.libraryLayout",
        alias: "Library Layout (EXP)",
        type: "string",
        display: true,
        primary: false,
        children: [],
      },
      {
        name: "librarySource",
        value: "experiment.librarySource",
        alias: "Library Source (EXP)",
        type: "string",
        display: true,
        primary: false,
        children: [],
      },
    ],
  },
  {
    name: "stats_qc",
    value: "stats_qc",
    alias: "Stats QC",
    type: "object",
    display: false,
    primary: false,
    children: [
      {
        name: "total_bp",
        value: "stats_qc.total_bp",
        alias: "Total BP (QC)",
        type: "number",
        display: true,
        primary: false,
        children: [],
      },
    ],
  },
];

/**
 * Helper functions
 */
// expected return array of column objects
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
        display: false,
        primary: false,
        children: [],
      });
    }
  }
  return scheme;
};

// expected returns True or false
const validateCustomFields = (origin, custom) => {
  const getFieldStructure = (obj) => {
    if (obj.children.length > 0) {
      return obj.children.map((child) => obj.name + "." + child.name);
    } else {
      return obj.name;
    }
  };
  try {
    return custom
      .flatMap(getFieldStructure)
      .every((field) => origin.flatMap(getFieldStructure).includes(field));
  } catch {
    throw Error("Invalid fields are selected");
  }
};

// // expected returns flatten { cols1, cols2, cols3 ... }
const applyCutomFields = (origin, custom) => {
  const base = Object.assign([], origin);
  return base.map((obj) => custom.find((o) => o.value === obj.value) || obj);
};

const flatColumns = (arr) => {
  return arr.flatMap((obj) => {
    if (obj.children.length > 0) {
      return obj.children.map((child) => child);
    } else {
      return obj;
    }
  });
};

const flatRows = (arr) => {
  const pullout = (obj, prefix = "") => {
    return Object.entries(obj).flatMap(([key, value]) => {
      if (value === Object(value) && value !== null && value !== undefined) {
        return pullout(value, `${prefix}${key}.`);
      } else {
        return [[`${prefix}${key}`, value]];
      }
    });
    // .reduce((res, o) => Object.assign(res, o), {});
  };

  return arr.map((item) => Object.fromEntries(pullout(item)));
};

/**
 * 
 * @returns {React.ReactElement|null} 
 */
function Sequences() {
  const { accessToken } = useAuth();

  const [data, setData] = useState({ headers: [], rows: [] });

  const fetchData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    await axios
      .get("http://localhost:8000/api/seq/run", config)
      .then((res) => {
        // IMPORTANT
        //
        // Since the backend doesn't resturn dataset with scheme,
        // we assume that every data fields are ALWAYS consistent.
        // If the above assumption is possible,
        // we can use a scheme of the first data row to represent the rest of data scheme
        const DEFAULT_SCHEME = getSchemeDefault(res.data[0]);
        const CUSTOMIZED_SCHEME = applyCutomFields(
          flatColumns(DEFAULT_SCHEME),
          flatColumns(CUSTOM_FIELDS)
        );

        if (validateCustomFields(DEFAULT_SCHEME, CUSTOM_FIELDS)) {
          setData({
            headers: CUSTOMIZED_SCHEME,
            rows: flatRows(res.data),
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    data.rows.length > 0 && <SequencesMainView data={data} setData={setData} />
  );
}

export default withAuth(Sequences);
