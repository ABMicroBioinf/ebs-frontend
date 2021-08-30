/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-25 16:19:49
 * @modify date 2021-07-25 16:19:49
 * @desc [description]
 */
export const API = "http://localhost:8000";

// Account
export const API_LOGIN = "/api/account/login";
export const API_LOGOUT = "/api/account/logout";
export const API_REGISTER = "/api/account/register";

// Sequence
export const API_SEQUENCE = "/api/seq/sequence";
export const API_SEQUENCE_METADATA = "/api/seq/sequence/metadata";

// Isolate
export const API_ASSEMBLY = "/api/isolate/gbase/assembly";
export const API_ANNOTATION = "/api/isolate/gbase/annot";
export const API_MLST = "/api/isolate/gbase/mlst";
export const API_RESISTOME = "/api/isolate/gbase/resistome";
export const API_VIRULOME = "/api/isolate/gbase/virulome";
export const API_TB_SUMMARY = "/api/isolate/tb/summary";
export const API_TB_PROFILE = "/api/isolate/tb/profile";
