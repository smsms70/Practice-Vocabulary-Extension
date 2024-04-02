import { DraggableProvided } from "react-beautiful-dnd";

export interface SetStateBoolean {
  Param: boolean;
  setParam: React.Dispatch<React.SetStateAction<boolean>>;
  Param2?: boolean;
  setParam2?: React.Dispatch<React.SetStateAction<boolean>>;
  func?: () => void;
  btnRef?: React.RefObject<HTMLButtonElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
}
export interface DataObject {
  frase: string;
  meaning: string;
}
export interface DataInter {
  data: DataObject[];
  setData: React.Dispatch<React.SetStateAction<DataObject[]>>;
  boxRef?: React.RefObject<HTMLDivElement>;
}

export interface DataBox extends DataObject, DataInter{
  index: number;
  setInput1: React.Dispatch<React.SetStateAction<string>>;
  setInput2: React.Dispatch<React.SetStateAction<string>>;
  setParam: React.Dispatch<React.SetStateAction<boolean>>;
  provided: DraggableProvided;
}


// FILES Section
export interface FilesExtructure {
  isSectionVisible?: boolean;
  setDataFolderName: React.Dispatch<React.SetStateAction<string>>;
  setIsVisibleSection: React.Dispatch<React.SetStateAction<boolean>>;
  btnRef?: React.RefObject<HTMLButtonElement>;
}
export interface FolderBoxInter extends FilesExtructure{
  obj: string;
  setFiles: React.Dispatch<React.SetStateAction<string[]>>;
  localStorageToArray: () => string[];
}
