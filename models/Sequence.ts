/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-23 13:50:50
 * @modify date 2021-07-23 13:50:50
 * @desc [description]
 */
export interface SeqStat {
  Reads: number;
  Yield: number;
  GeeCee: number;
  MinLen: number;
  AvgLen: number;
  MaxLen: number;
  AvgQual: number;
  ErrQual: number;
  Ambiguous: number;
}

// export interface Sequence {
//   id: string;
//   TaxID: number;
//   ScientificName: string;
//   seqtype: string;
//   Experiment: string;
//   LibraryName: string;
//   LibraryStrategy: string;
//   LibrarySelection: string;
//   LibrarySource: string;
//   LibraryLayout: string;
//   InsertSize: number;
//   InsertDev: number;
//   Platform: string;
//   SequencerModel: string;
//   Projectid: string;
//   SampleName: string;
//   CenterName: string;
//   taxName_1: string;
//   taxFrac_1: number;
//   taxName_2: string;
//   taxFrac_2: number;
//   taxName_3: string;
//   taxFrac_3: number;
//   taxName_4: string;
//   taxFrac_4: number;
//   owner: string; // need to check
//   RawStats: Record<string, unknown>;
//   QcStats: Record<string, unknown>;
//   DateCreated: Date;
//   LastUpdate: Date;
//   Description: string;
// }

export interface FlatSequence {
  id: string;
  TaxID: number;
  ScientificName: string;
  seqtype: string;
  Experiment: string;
  LibraryName: string;
  LibraryStrategy: string;
  LibrarySelection: string;
  LibrarySource: string;
  LibraryLayout: string;
  InsertSize: number;
  InsertDev: number;
  Platform: string;
  SequencerModel: string;
  Projectid: string;
  SampleName: string;
  CenterName: string;
  taxName_1: string;
  taxFrac_1: number;
  taxName_2: string;
  taxFrac_2: number;
  taxName_3: string;
  taxFrac_3: number;
  taxName_4: string;
  taxFrac_4: number;
  owner: string; // need to check
  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
  RawStats__Reads: number;
  RawStats__Yield: number;
  RawStats__GeeCee: number;
  RawStats__MinLen: number;
  RawStats__AvgLen: number;
  RawStats__MaxLen: number;
  RawStats__AvgQual: number;
  RawStats__ErrQual: number;
  RawStats__Ambiguous: number;
  QcStats__Reads: number;
  QcStats__Yield: number;
  QcStats__GeeCee: number;
  QcStats__MinLen: number;
  QcStats__AvgLen: number;
  QcStats__MaxLen: number;
  QcStats__AvgQual: number;
  QcStats__ErrQual: number;
  QcStats__Ambiguous: number;
}

// export interface Sample {
//   sampleName?: string;
//   organism?: string;
//   strain?: string;
//   description?: string;
// }

// export interface Experiment {
//   libraryName?: string;
//   platform?: string;
//   instrument?: string;
//   library_strategy?: string;
//   librarySource?: string;
//   libraryLayout?: string;
//   librarySelection?: string;
//   description?: string;
// }

// export interface SeqStat {
//   reads?: number;
//   total_bp?: number;
//   minLen?: number;
//   avgLen?: number;
//   maxLen?: number;
//   avgQual?: number;
//   errQual?: number;
//   geecee?: number;
//   ambiguous?: number;
// }

// export interface Run {
//   id?: number; // need to check
//   run_name?: string;
//   study_id?: number; // need to check
//   sample?: Sample;
//   experiment?: Experiment;
//   stats_raw?: SeqStat;
//   stats_qc?: SeqStat;
//   date_created?: Date;
//   last_update?: Date;
//   owner_id?: string; // need to check
// }

// export interface FlatRun {
//   id: number;
//   run_name: string;
//   study_id: string;
//   sample__sampleName: string;
//   sample__organism: string;
//   sample__strain: string;
//   sample__description: string;
//   experiment__libraryName: string;
//   experiment__platform: string;
//   experiment__instrument: string;
//   experiment__library_strategy: string;
//   experiment__librarySource: string;
//   experiment__libraryLayout: string;
//   experiment__librarySelection: string;
//   experiment__description: string;
//   stats_raw__reads: number;
//   stats_raw__total_bp: number;
//   stats_raw__minLen: number;
//   stats_raw__avgLen: number;
//   stats_raw__maxLen: number;
//   stats_raw__avgQual: number;
//   stats_raw__errQual: number;
//   stats_raw__geecee: number;
//   stats_raw__ambiguous: number;
//   stats_qc__reads: number;
//   stats_qc__total_bp: number;
//   stats_qc__minLen: number;
//   stats_qc__avgLen: number;
//   stats_qc__maxLen: number;
//   stats_qc__avgQual: number;
//   stats_qc__errQual: number;
//   stats_qc__geecee: number;
//   stats_qc__ambiguous: number;
//   date_created: Date;
//   last_update: Date;
//   owner_id: string;
// }
