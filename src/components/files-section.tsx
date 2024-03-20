import { useState, useEffect, useRef } from "react";
import { AddBtn, Folder, TrashCan } from "../assets/icons.tsx";
import { FilesExtructure, FolderBox } from "./interfaces.ts";

import "../styles/files-section.css";


export function FilesSection ({setDataFolderName, isSectionVisible, setIsVisibleSection, btnRef}: FilesExtructure):JSX.Element{
  const [inputValue, setInputValue] = useState("");
  const [files, setFiles] = useState(localStorageToArray());
  const folderSection = useRef<HTMLDivElement>(null);

  const addFolder = ():void => {
    if (!inputValue || !inputValue.trim()) return;
    localStorage.setItem(inputValue, "null");
    setDataFolderName(inputValue);
    setFiles(localStorageToArray());
    setInputValue("");
  }
  function localStorageToArray () {
    const arr = [];
    const storage = {...localStorage};
    for (const key in storage) {
      arr.push(key);
    }
    return arr;
  }
  useEffect(() => {
    setFiles(localStorageToArray());
    const handleClickOutside = (event: MouseEvent) => {
      if (folderSection.current && 
        !btnRef!.current!.contains(event.target as Node) && 
        !folderSection.current.contains(event.target as Node)) {
        setIsVisibleSection(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSectionVisible, setIsVisibleSection, btnRef]);


  return(
    <section id="files-section" ref={folderSection}>
    <main id="files-box-container">
      <Folder
        name="folder-icon__folder-section"
      />
        {files && files.map((obj, index) => (  
          <div key={index}>
            {obj !== "folderSelected" &&
            <FolderBox   
            obj={obj}
            localStorageToArray={localStorageToArray}
            setFiles={setFiles}
            setDataFolderName={setDataFolderName}
            setIsVisibleSection={setIsVisibleSection}
            />
            }
          </div>
        ))}
      <div id="adder-box__folder-section">
        <input 
          type="text" value={inputValue}
          onChange={(e): void => {
            setInputValue(e.currentTarget.value);
          }}>
        </input>
        <button onClick={addFolder} id="add-button__folder-section">
          <AddBtn/>
        </button>
      </div>
    </main>
    </section>
  )
}


export function FolderBox ({obj, setDataFolderName, setIsVisibleSection, setFiles, localStorageToArray}: FolderBox) {
  const [edit, setEdit] = useState<boolean>(false);
  const [inputvalue, setInputValue] = useState<string>("")

  const changeFolderName = (): void => {
    const oldFolder = localStorage.getItem(obj);
    localStorage.setItem(inputvalue, oldFolder!);
    localStorage.removeItem(obj);
    setEdit(false);
    setFiles(localStorageToArray());
  }
  return(      
    <div id="folder-box">
      {!edit ? 
        <span id="text__folder-box" onClick={() => {
          setDataFolderName(obj);
          setIsVisibleSection(false);
        }}> {obj} 
        </span>
        : 
        <input 
        type="text" value={inputvalue}
        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
          setInputValue(e.currentTarget.value);
        }}>
        </input>
      }

      {!edit ?
        <div id="btns-container__folder-box">
        <button id="delete-btn__folder-box" onClick={() => {
          localStorage.removeItem(obj);
          setFiles(localStorageToArray());
        }}>
          <TrashCan/>
        </button>
        <button onClick={() => setEdit(true)}>
          Edit
        </button>
      </div>
      :
      <button onClick={changeFolderName}>save</button>
      }
    </div>
  )
}