/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../middleware/AuthProvider";
import withAuth from "../../middleware/withAuth";

import EBSDatatable from "../../components/table/EBSDataTable";
import Filters from "../../components/Filters";
import TopNav from "../../components/TopNav";

function Sequences() {
  const { accessToken } = useAuth();

  const [data, setData] = useState();

  const primary = useState(0);

  const fetchData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    await axios
      .get("http://localhost:8000/api/seq/run", config)
      .then((res) => {
        const result = res.data.map(
          ({ run_name, study, sample, experiment, stats_qc, stats_raw }) => {
            const { sampleName, organism, strain } = sample;
            const {
              reads: qcReads,
              total_bp: qcTotal_bp,
              avgLen: qcAvgLen,
              avgQual: qcAvgQual,
              geecee: qcGeecee,
            } = stats_qc;
            const {
              reads: rawReads,
              total_bp: rawTotal_bp,
              avgLen: rawAvgLen,
              avgQual: rawAvgQual,
              geecee: rawGeecee,
            } = stats_raw;
            const {
              libraryName,
              platform,
              instrument,
              librarySource,
              libraryLayout,
              librarySelection,
            } = experiment;

            return {
              run_name,
              study,
              sampleName,
              organism,
              strain,
              libraryName,
              platform,
              instrument,
              librarySource,
              libraryLayout,
              librarySelection,
              qcReads,
              qcTotal_bp,
              qcAvgLen,
              qcAvgQual,
              qcGeecee,
              rawReads,
              rawTotal_bp,
              rawAvgLen,
              rawAvgQual,
              rawGeecee,
            };
          }
        );
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const getEBSDatatable = () => {
    const dataset = { headers: Object.keys(data[0]), rows: data };
    return <EBSDatatable data={dataset} primary={primary} />;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TopNav />
      <div className="ebs-side-section-left">
        <div className="ebs-scrollable-inner">
          <Filters />
        </div>
      </div>
      <div className="ebs-section-main">
        {data ? getEBSDatatable() : <p>table placeholder</p>}
      </div>
    </>
  );
}

// export async function getServerSideProps(context) {
//   // Temporary
//   // token needs to be checked in a custom authenticate function in backend
//   // because token is always in cookie if a user successfully login to the system.
//   const token =
//     "access_token" in context.req.cookies
//       ? context.req.cookies.access_token
//       : "";

//   const config = {
//     headers: {
//       Authorization: "Bearer " + token.toString(),
//       "Content-Type": "application/json",
//       accept: "application/json",
//       withCredentials: true,
//     },
//   };

//   const res = await axios.get("http://localhost:8000/api/seq/run/", config);

//   if (res.length > 0) {
//     const result = res.data.map(
//       ({ run_name, study, sample, experiment, stats_qc, stats_raw }) => {
//         const { sampleName, organism, strain } = sample;
//         const {
//           reads: qcReads,
//           total_bp: qcTotal_bp,
//           avgLen: qcAvgLen,
//           avgQual: qcAvgQual,async function getServerSideProps(context) {
//   // Temporary
//   // token needs to be checked in a custom authenticate function in backend
//   // because token is always in cookie if a user successfully login to the system.
//   const token =
//     "access_token" in context.req.cookies
//       ? context.req.cookies.access_token
//       : "";

//   const config = {
//     headers: {
//       Authorization: "Bearer " + token.toString(),
//       "Content-Type": "application/json",
//       accept: "application/json",
//       withCredentials: true,
//     },
//   };

//   const res = await axios.get("http://localhost:8000/api/seq/run/", config);

//   if (res.length > 0) {
//     const result = res.data.map(
//       ({ run_name, study, sample, experiment, stats_qc, stats_raw }) => {
//         const { sampleName, organism, strain } = sample;
//         const {
//           reads: qcReads,
//           total_bp: qcTotal_bp,
//           avgLen: qcAvgLen,
//           avgQual: qcAvgQual,
//           geecee: qcGeecee,
//         } = stats_qc;
//         const {
//           reads: rawReads,
//           total_bp: rawTotal_bp,
//           avgLen: rawAvgLen,
//           avgQual: rawAvgQual,
//           geecee: rawGeecee,
//         } = stats_raw;
//         const {
//           libraryName,
//           platform,
//           instrument,
//           librarySource,
//           libraryLayout,
//           librarySelection,
//         } = experiment;

//         return {
//           run_name,
//           study,
//           sampleName,
//           organism,
//           strain,
//           libraryName,
//           platform,
//           instrument,
//           librarySource,
//           libraryLayout,
//           librarySelection,
//           qcReads,
//           qcTotal_bp,
//           qcAvgLen,
//           qcAvgQual,
//           qcGeecee,
//           rawReads,
//           rawTotal_bp,
//           rawAvgLen,
//           rawAvgQual,
//           rawGeecee,
//         };
//       }
//     );

//     if (res.status === 401 && !context.req) {
//       return {
//         redirect: {
//           destination: "/login",
//           statusCode: 401,
//         },
//       };
//     }

//     if (res.status === 401 && context.req) {
//       return {
//         redirect: {
//           destination: "/login",
//           statusCode: 302,
//         },
//       };
//     }

//     return {
//       props: {
//         data: result,
//         primary: 0,
//       },
//     };
//   } else {
//     return {
//       props: {
//         data: [],
//         primary: 0,
//         verified: true,
//       },
//     };
//   }
// }

// export default Sequences;

//           avgLen: rawAvgLen,
//           avgQual: rawAvgQual,
//           geecee: rawGeecee,
//         } = stats_raw;
//         const {
//           libraryName,
//           platform,
//           instrument,
//           librarySource,
//           libraryLayout,
//           librarySelection,
//         } = experiment;

//         return {
//           run_name,
//           study,
//           sampleName,
//           organism,
//           strain,
//           libraryName,
//           platform,
//           instrument,
//           librarySource,
//           libraryLayout,
//           librarySelection,
//           qcReads,
//           qcTotal_bp,
//           qcAvgLen,
//           qcAvgQual,
//           qcGeecee,
//           rawReads,
//           rawTotal_bp,
//           rawAvgLen,
//           rawAvgQual,
//           rawGeecee,
//         };
//       }
//     );

//     if (res.status === 401 && !context.req) {
//       return {
//         redirect: {
//           destination: "/login",
//           statusCode: 401,
//         },
//       };
//     }

//     if (res.status === 401 && context.req) {
//       return {
//         redirect: {
//           destination: "/login",
//           statusCode: 302,
//         },
//       };
//     }

//     return {
//       props: {
//         data: result,
//         primary: 0,
//       },
//     };
//   } else {
//     return {
//       props: {
//         data: [],
//         primary: 0,
//         verified: true,
//       },
//     };
//   }
// }

export default withAuth(Sequences);
