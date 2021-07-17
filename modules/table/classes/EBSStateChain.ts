/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-17 15:09:15
 * @modify date 2021-07-17 15:09:15
 * @desc [description]
 */
import {
  EBSPaginationContext,
  EBSSortContext,
  EBSTableStateChainInterface,
  EBSTabularHeader,
} from "../interfaces/EBSDataTypes";

/**
 * EBSTableStateChain
 */
class EBSTableStateChain implements EBSTableStateChainInterface {
  moduleQueue: Array<"columns" | "search" | "sort">;
  search: string;
  columns: Array<EBSTabularHeader>;
  sort: EBSSortContext;
  pagination: EBSPaginationContext;

  constructor() {}
}
