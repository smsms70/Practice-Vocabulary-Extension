import {DataBox } from "./interfaces";
import { EditBtn, DotsConfig, TrashCan } from "../assets/icons";
import { useState, useEffect, useRef  } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";



export function DataBoxElement ({frase, meaning, index, data, setData, setInput1, setInput2, setParam, provided, boxRef}: DataBox) {
  const [configBtns, showConfigBtns] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const configBtnRef = useRef<HTMLDivElement>(null);


  const showBtnsHandler = (): void => {
    showConfigBtns(!configBtns);
  }
  const editDataHandler = (): void => {
    setInput1(frase);
    setInput2(meaning);
    setParam(true);
    setData(data.filter(obj => obj !== data[index]));
    setTimeout(() => {
      boxRef!.current!.scrollIntoView({ behavior: "smooth"});
    }, 30);
  }
  const deleteBoxHandler = (): void => {
    setData(data.filter(obj => obj !== data[index]));
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && 
        !popupRef.current.contains(event.target as Node) && 
        !configBtnRef.current!.contains(event.target as Node)) {
        showConfigBtns(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  },[configBtns])

  return(
        <div className="box-element" 
        {...provided.draggableProps} 
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
        <span>{frase}</span>
        <span>{meaning}</span>
        <div onClick={showBtnsHandler} id="show-config-btns" ref={configBtnRef}>
          <DotsConfig/>
          {configBtns && 
            <div className="edit-box-element" ref={popupRef}>
              <button onClick={editDataHandler} className="IconBtn">
                Edit
                <EditBtn/>
              </button>
              <button onClick={deleteBoxHandler} className="IconBtn">
                Delete
                <TrashCan/>
              </button>
            </div>
          }
        </div>    
      </div>

  )
}


export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

