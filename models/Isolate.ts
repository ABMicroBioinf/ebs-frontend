/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-08-25 08:49:44
 * @modify date 2021-08-25 08:49:44
 * @desc [description]
 */

export interface Pipeline {
  assembler: string;
  variant_caller: string;
}

export interface FlatAssembly {
  id: string;
  sequence: string;
  owner: string;
  sequence__project__id: string;
  sequence__project__title: string;
  sequence__LibrarySource: string;
  sequence__LibraryLayout: string;
  sequence__SequencerModel: string;
  sequence__CenterName: string;
  seqtype: string;
  count: number;
  bp: number;
  Ns: number;
  gaps: number;
  min: number;
  max: number;
  avg: number;
  N50: number;
  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
}

export interface Allele {
  locus: string;
  allele: string;
}

export interface FlatMLST {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; //need to check
  assembly__sequence__project__title: null; //need to check
  assembly__sequence__LibrarySource: null; //need to check
  assembly__sequence__LibraryLayout: null; //need to check
  assembly__sequence__SequencerModel: null; //need to check
  assembly__sequence__CenterName: null; //need to check
  seqtype: string;
  scheme: string;
  st: number;
  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
  // Dynamical attributes below
  // need to figure out
  profile__locus_0: string;
  profile__allele_0: string;
  profile__locus_1: string;
  profile__allele_1: string;
  profile__locus_2: string;
  profile__allele_2: string;
  profile__locus_3: string;
  profile__allele_3: string;
  profile__locus_4: string;
  profile__allele_4: string;
  profile__locus_5: string;
  profile__allele_5: string;
  profile__locus_6: string;
  profile__allele_6: string;
  profile__locus_7: string;
  profile__allele_7: string;
}

export interface StaticFlatMLST {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; //need to check
  assembly__sequence__project__title: null; //need to check
  assembly__sequence__LibrarySource: null; //need to check
  assembly__sequence__LibraryLayout: null; //need to check
  assembly__sequence__SequencerModel: null; //need to check
  assembly__sequence__CenterName: null; //need to check
  seqtype: string;
  scheme: string;
  st: number;
  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
  // Dynamical attributes below
  // need to figure out
  etc: string;
}

export interface Gene {
  geneName: string;
  pctCoverage: number;
}

export interface Virulence {}

export interface FlatResistome {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; //need to check
  assembly__sequence__project__title: string; //need to check
  assembly__sequence__LibrarySource: string;
  assembly__sequence__LibraryLayout: string;
  assembly__sequence__SequencerModel: string;
  assembly__sequence__CenterName: string;
  seqtype: string;
  num_found: number;
  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
  profile__geneName_0: string;
  profile__pctCoverage_0: number;
  profile__geneName_1: string;
  profile__pctCoverage_1: number;
  profile__geneName_2: string;
  profile__pctCoverage_2: number;
}

export interface StaticFlatResistome {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; //need to check
  assembly__sequence__project__title: string; //need to check
  assembly__sequence__LibrarySource: string;
  assembly__sequence__LibraryLayout: string;
  assembly__sequence__SequencerModel: string;
  assembly__sequence__CenterName: string;
  seqtype: string;
  num_found: number;
  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
  etc: string;
}

export interface FlatVirulome {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; //need to check
  assembly__sequence__project__title: string; //need to check
  assembly__sequence__LibrarySource: string;
  assembly__sequence__LibraryLayout: string;
  assembly__sequence__SequencerModel: string;
  assembly__sequence__CenterName: string;
  seqtype: string;
  num_found: number;
  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
  profile__geneName_0: string;
  profile__pctCoverage_0: number;
  profile__geneName_1: string;
  profile__pctCoverage_1: number;
  profile__geneName_2: string;
  profile__pctCoverage_2: number;
  profile__geneName_3: string;
  profile__pctCoverage_3: number;
  profile__geneName_4: string;
  profile__pctCoverage_4: number;
  profile__geneName_5: string;
  profile__pctCoverage_5: number;
  profile__geneName_6: string;
  profile__pctCoverage_6: number;
  profile__geneName_7: string;
  profile__pctCoverage_7: number;
  profile__geneName_8: string;
  profile__pctCoverage_8: number;
  profile__geneName_9: string;
  profile__pctCoverage_9: number;
  profile__geneName_10: string;
  profile__pctCoverage_10: number;
  profile__geneName_11: string;
  profile__pctCoverage_11: number;
  profile__geneName_12: string;
  profile__pctCoverage_12: number;
  profile__geneName_13: string;
  profile__pctCoverage_13: number;
  profile__geneName_14: string;
  profile__pctCoverage_14: number;
  profile__geneName_15: string;
  profile__pctCoverage_15: number;
  profile__geneName_16: string;
  profile__pctCoverage_16: number;
  profile__geneName_17: string;
  profile__pctCoverage_17: number;
  profile__geneName_18: string;
  profile__pctCoverage_18: number;
  profile__geneName_19: string;
  profile__pctCoverage_19: number;
  profile__geneName_20: string;
  profile__pctCoverage_20: number;
  profile__geneName_21: string;
  profile__pctCoverage_21: number;
  profile__geneName_22: string;
  profile__pctCoverage_22: number;
  profile__geneName_23: string;
  profile__pctCoverage_23: number;
  profile__geneName_24: string;
  profile__pctCoverage_24: number;
  profile__geneName_25: string;
  profile__pctCoverage_25: number;
  profile__geneName_26: string;
  profile__pctCoverage_26: number;
  profile__geneName_27: string;
  profile__pctCoverage_27: number;
  profile__geneName_28: string;
  profile__pctCoverage_28: number;
  profile__geneName_29: string;
  profile__pctCoverage_29: number;
  profile__geneName_30: string;
  profile__pctCoverage_30: number;
  profile__geneName_31: string;
  profile__pctCoverage_31: number;
  profile__geneName_32: string;
  profile__pctCoverage_32: number;
  profile__geneName_33: string;
  profile__pctCoverage_33: number;
  profile__geneName_34: string;
  profile__pctCoverage_34: number;
  profile__geneName_35: string;
  profile__pctCoverage_35: number;
  profile__geneName_36: string;
  profile__pctCoverage_36: number;
  profile__geneName_37: string;
  profile__pctCoverage_37: number;
  profile__geneName_38: string;
  profile__pctCoverage_38: number;
  profile__geneName_39: string;
  profile__pctCoverage_39: number;
  profile__geneName_40: string;
  profile__pctCoverage_40: number;
  profile__geneName_41: string;
  profile__pctCoverage_41: number;
  profile__geneName_42: string;
  profile__pctCoverage_42: number;
  profile__geneName_43: string;
  profile__pctCoverage_43: number;
  profile__geneName_44: string;
  profile__pctCoverage_44: number;
  profile__geneName_45: string;
  profile__pctCoverage_45: number;
  profile__geneName_46: string;
  profile__pctCoverage_46: number;
  profile__geneName_47: string;
  profile__pctCoverage_47: number;
  profile__geneName_48: string;
  profile__pctCoverage_48: number;
  profile__geneName_49: string;
  profile__pctCoverage_49: number;
  profile__geneName_50: string;
  profile__pctCoverage_50: number;
  profile__geneName_51: string;
  profile__pctCoverage_51: number;
  profile__geneName_52: string;
  profile__pctCoverage_52: number;
  profile__geneName_53: string;
  profile__pctCoverage_53: number;
  profile__geneName_54: string;
  profile__pctCoverage_54: number;
  profile__geneName_55: string;
  profile__pctCoverage_55: number;
  profile__geneName_56: string;
  profile__pctCoverage_56: number;
  profile__geneName_57: string;
  profile__pctCoverage_57: number;
  profile__geneName_58: string;
  profile__pctCoverage_58: number;
  profile__geneName_59: string;
  profile__pctCoverage_59: number;
  profile__geneName_60: string;
  profile__pctCoverage_60: number;
  profile__geneName_61: string;
  profile__pctCoverage_61: number;
  profile__geneName_62: string;
  profile__pctCoverage_62: number;
  profile__geneName_63: string;
  profile__pctCoverage_63: number;
  profile__geneName_64: string;
  profile__pctCoverage_64: number;
  profile__geneName_65: string;
  profile__pctCoverage_65: number;
}

export interface StaticFlatVirulome {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; //need to check
  assembly__sequence__project__title: string; //need to check
  assembly__sequence__LibrarySource: string;
  assembly__sequence__LibraryLayout: string;
  assembly__sequence__SequencerModel: string;
  assembly__sequence__CenterName: string;
  seqtype: string;
  num_found: number;
  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
  etc: string;
}

export interface TagValue {
  tag: string;
  value: string;
}

export interface FlatAnnotation {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; // need to check
  assembly__sequence__project__title: string; // need to check
  assembly__sequence__LibrarySource: string;
  assembly__sequence__LibraryLayout: string;
  assembly__sequence__SequencerModel: string;
  assembly__sequence__CenterName: string;
  seqid: string;
  source: string;
  ftype: string;
  start: number;
  end: number;
  score: string;
  strand: string;
  phase: string;
  attr: Array<TagValue>;
  seqtype: string;
  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
  // Dynamical attributes below
  // need to figure out
  attr__tag_0: string;
  attr__value_0: string;
  attr__tag_1: string;
  attr__value_1: string;
  attr__tag_2: string;
  attr__value_2: string;
  attr__tag_3: string;
  attr__value_3: string;
  attr__tag_4: string;
  attr__value_4: string;
}

export interface StaticFlatAnnotation {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; // need to check
  assembly__sequence__project__title: string; // need to check
  assembly__sequence__LibrarySource: string;
  assembly__sequence__LibraryLayout: string;
  assembly__sequence__SequencerModel: string;
  assembly__sequence__CenterName: string;
  seqid: string;
  source: string;
  ftype: string;
  start: number;
  end: number;
  score: string;
  strand: string;
  phase: string;
  attr: Array<TagValue>;
  seqtype: string;
  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
  // Dynamical attributes below
  // need to figure out
  etc: string;
}

export interface FlatPsummary {
  id: string;
  sequence: string;
  owner: string;

  project__id: string;
  project__title: string;
  sequence__LibrarySource: string;
  sequence__LibraryLayout: string;
  sequence__SequencerModel: string;
  sequence__CenterName: string;

  pct_reads_mapped: number;
  num_reads_mapped: number;
  main_lin: string;
  sublin: string;
  num_dr_variants: number;
  num_other_variants: number;
  drtype: string;

  //Drugs
  rifampicin: string;
  isoniazid: string;
  pyrazinamide: string;
  ethambutol: string;
  streptomycin: string;
  fluoroquinolones: string;
  moxifloxacin: string;
  ofloxacin: string;
  levofloxacin: string;
  ciprofloxacin: string;
  aminoglycosides: string;
  amikacin: string;
  kanamycin: string;
  capreomycin: string;
  ethionamide: string;
  para_aminosalicylic_acid: string;
  cycloserine: string;
  linezolid: string;
  bedaquiline: string;
  clofazimine: string;
  delamanid: string;

  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
}

export interface Lineage {
  lin: string;
  frac: string;
  family: string;
  spoligotype: string;
  rd: string;
}

export interface Variant {
  chr: string;
  genome_pos: string;
  type: string;
  change: string;
  freq: number;
  nucleotide_change: string;
  locus_tag: string;
  gene: string;
  _internal_change: string;
}

export interface Resistance {
  drug: string;
  mutations: string;
}

export interface Profile {
  id: string;
  sequence: string;
  pct_reads_mapped: number;
  num_reads_mapped: number;
  main_lin: string;
  sublin: string;
  num_dr_variants: number;
  num_other_variants: number;
  drtype: string;
  lineage: Array<Lineage>;
  dr_resistances: Array<Resistance>;
  dr_variants: Array<Variant>;
  other_variants: Array<Variant>;
  owner: string;
  DateCreated: Date;
  LastUpdate: Date;
  Description: string;
}
