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
  DateCreated: string;
  LastUpdate: string;
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
  DateCreated: string;
  LastUpdate: string;
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
  DateCreated: string;
  LastUpdate: string;
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
  DateCreated: string;
  LastUpdate: string;
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
  DateCreated: string;
  LastUpdate: string;
  Description: string;
  etc: string;
}

export interface GeneCoverage {
  geneName: string;
  pctCoverage: number;
}

export interface FlatVirulomeWithProfile {
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
  DateCreated: string;
  LastUpdate: string;
  Description: string;
  profile: Array<GeneCoverage>;
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
  DateCreated: string;
  LastUpdate: string;
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
  DateCreated: string;
  LastUpdate: string;
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
  DateCreated: string;
  LastUpdate: string;
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

  DateCreated: string;
  LastUpdate: string;
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
  DateCreated: string;
  LastUpdate: string;
  Description: string;
}
