export enum EFileType {
  FOLDER = 'FOLDER',
  DOCUMENT = 'DOCUMENT',
}
export enum EFileKind {
  FOLDER = 'Folder',
  JS = 'JavaScript script',
  JSON = 'JSON',
}
export interface TFile {
  dateModified: string;
  kind: Exclude<EFileKind, EFileKind.FOLDER>;
  name: string;
  size: string;
  type: Exclude<EFileType, EFileType.FOLDER>;
}
export interface TFolder {
  dateModified: string;
  name: string;
  size: string;
  kind: EFileKind.FOLDER;
  type: EFileType.FOLDER;
  files: (TFile | TFolder)[];
}
export interface TFinderItemProperty {
  expand: boolean;
  level: number;
  path: string;
  tabindex: number;
  visible: boolean;
}
export type TFinderFileItem = TFile & TFinderItemProperty;
export type TFinderFolderItem = TFolder & TFinderItemProperty;
export type TFinderFileList = (TFinderFileItem | TFinderFolderItem)[];
