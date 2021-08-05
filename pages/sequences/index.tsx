/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 11:08:05
 * @modify date 2021-07-15 13:16:57
 * @desc [description]
 */
import axios from "axios";
import withAuth from "../../middleware/withAuth";
import { useAuth } from "../../middleware/AuthProvider";
import { useCallback, useEffect, useState } from "react";

import { CUSTOM_FIELDS } from "../../components/views/sequences/settings";
import {
  getSchemeDefault,
  validateCustomFields,
  applyCustomFields,
  flatColumns,
  flatRows,
} from "../../modules/table/helpers/EBSTabularDataHandler";

import SequencesMainView from "../../components/views/sequences/Main";

/**
 * Sequence Page
 * @returns - Sequence Main View Component
 */
function Sequences(): JSX.Element {
  const { accessToken } = useAuth();

  const [ebsTabularData, setEBSTabularData] = useState({
    title: "",
    placementURI: "",
    headers: [],
    records: [],
  });

  const fetchData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    await axios
      .get("http://10.44.113.22/api/seq/run", config)
      .then((res) => {
        // IMPORTANT
        //
        // Since the backend doesn't return dataset with scheme,
        // we assume that every data fields are ALWAYS consistent.
        // If the above assumption is possible,
        // we can use a scheme of the first data row to represent the rest of data scheme
        const DEFAULT_SCHEME = getSchemeDefault(res.data[0]);
        const CUSTOMIZED_SCHEME = applyCustomFields(
          flatColumns(DEFAULT_SCHEME),
          flatColumns(CUSTOM_FIELDS)
        );

        if (validateCustomFields(DEFAULT_SCHEME, CUSTOM_FIELDS)) {
          setEBSTabularData({
            title: "Sequence",
            placementURI: "sequences",
            headers: CUSTOMIZED_SCHEME,
            records: flatRows(res.data),
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    ebsTabularData.headers.length > 0 &&
    ebsTabularData.records.length > 0 && (
      <SequencesMainView
        ebsTabularData={ebsTabularData}
        setEBSTabularData={setEBSTabularData}
      />
    )
  );
}

export default withAuth(Sequences);
