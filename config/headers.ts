/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-25 14:52:52
 * @modify date 2021-07-25 14:52:52
 * @desc [description]
 */
export const HEADER_SEQS_RUN = {
  run_name: {
    name: "run_name",
    value: "run_name",
    alias: "RUN",
    display: true,
    primary: true,
  },
  "sample.organism": {
    name: "organism",
    value: "sample.organism",
    alias: "Organism",
    display: true,
    primary: false,
  },
  "experiment.instrument": {
    name: "instrument",
    value: "experiment.instrument",
    alias: "Instrument (EXP)",
    display: true,
    primary: false,
  },
  "experiment.platform": {
    name: "platform",
    alias: "Platform (EXP)",
    value: "experiment.platform",
    display: true,
    primary: false,
  },
  "experiment.libraryLayout": {
    name: "libraryLayout",
    value: "experiment.libraryLayout",
    alias: "Library Layout (EXP)",
    display: true,
    primary: false,
  },
  "experiment.librarySource": {
    name: "librarySource",
    value: "experiment.librarySource",
    alias: "Library Source (EXP)",
    display: true,
    primary: false,
  },
  "stats_qc.total_bp": {
    name: "total_bp",
    value: "stats_qc.total_bp",
    alias: "Total BP (QC)",
    display: true,
    primary: false,
  },
};
