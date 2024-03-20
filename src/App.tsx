import { useState, useEffect, useRef } from "react";
import { Section01, Section02, SectionHeader } from "./components/sections";
import { FilesSection } from "./components/files-section";
import { DataObject } from "./components/interfaces";
import "./styles/section02-style.css"

export function App() {
  const selected = localStorage.getItem("folderSelected");
  const [dataFolderName, setDataFolderName] = useState(selected ? selected : "new folder"); 
  const [data, setData] = useState(localStorage.getItem(dataFolderName));
  const [currentData, setCurrentData] = useState<DataObject[]>(JSON.parse(data!));

  const [visibleSection, setVisibleSection] = useState<boolean>(true);
  const [addBox, setAddBox] = useState<boolean>(false);
  const [filesSection, setFilesSection] = useState<boolean>(false);
  const adderBoxRef = useRef<HTMLDivElement>(null);
  const folderBtnRef = useRef<HTMLButtonElement>(null);

  useEffect((): void => {
    setData(localStorage.getItem(dataFolderName));
    setCurrentData(JSON.parse(data!));
    localStorage.setItem("folderSelected", dataFolderName);
  },[dataFolderName, data]);

  useEffect((): void => {
    localStorage.setItem(dataFolderName, JSON.stringify(currentData));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData])


  const addItemHandler = (): void => {
    if (filesSection) return;
    setAddBox(!addBox);
    setTimeout(() => {
      adderBoxRef.current!.scrollIntoView({ behavior: "smooth"});
    }, 30);
  }
  return (
    <div id="App">
      <main id="main-container">
        <SectionHeader
          Param= {visibleSection}
          Param2= {filesSection}
          setParam= {setVisibleSection}
          setParam2= {setFilesSection}
          func= {addItemHandler}
          btnRef= {folderBtnRef}
        />
        {visibleSection ? <Section01 
          Param= {addBox}
          Param2= {filesSection}
          setParam={setAddBox}
          data={currentData}
          setData={setCurrentData}
          boxRef= {adderBoxRef}
        /> : 
        <Section02
          data={currentData}
          setData={setCurrentData}
        />
        }
        {filesSection && <FilesSection
          setDataFolderName={setDataFolderName}
          isSectionVisible={filesSection}
          setIsVisibleSection={setFilesSection}
          btnRef= {folderBtnRef}
        />}
      </main>
    </div>
  )
}
