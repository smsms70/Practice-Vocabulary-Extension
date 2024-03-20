import { useState, useEffect } from "react";
import { SetStateBoolean, DataInter, DataObject } from "./interfaces";
import { DataBoxElement, StrictModeDroppable } from "./section01";
import { TrashCan, AddBtn, Folder } from "../assets/icons";
import { DragDropContext, Draggable, DropResult} from 'react-beautiful-dnd';
import { Popup } from "./popup";

// HEADER-----
export function SectionHeader ({Param, Param2, setParam, setParam2, func, btnRef}: SetStateBoolean) {
  
  return(
    <header id="btns-container">
      <div id="section-btns-container">
        <button 
        className={Param ? "active-btn" : ""} 
        onClick={()=> setParam!(true)}>
          List
        </button>
        <button 
        className={!Param ? "active-btn" : ""} 
        onClick={()=> setParam!(false)}>
          FlashCards
        </button>
      </div>
      <div id="config-btns-container">
        <button 
        id="folder-btn" 
        className="IconBtn"
        ref={btnRef} 
        onClick={() => setParam2!(!Param2)}>
          <Folder/>
        </button>
        <button id="add-new" className="IconBtn" onClick={() => {
          if (Param) func!()
        }}>
          <AddBtn/>
        </button>
      </div>
    </header>
  )
}


// SECTION 01-----
interface Sec1 extends SetStateBoolean, DataInter {}
export function Section01 ({Param, Param2, setParam, data, setData, boxRef}: Sec1) {
  const [boxes, setBoxes] = useState(data);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const cleanIputs = (): void => {
    setInputValue1("");
    setInputValue2("");
    setParam!(false);
  }
  const addBoxHandler = (): void => {
    if (data) {
      setData([...data, {
        frase: inputValue1,
        meaning: inputValue2
      }])
    } else {
      setData([{
        frase: inputValue1,
        meaning: inputValue2
      }])
    }
    cleanIputs();
  }
  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) return;

    const newBoxes = [...boxes];
    const [removed] = newBoxes.splice(result.source.index, 1); 
    newBoxes.splice(result.destination.index, 0, removed); 

    setBoxes(newBoxes);
    setData(newBoxes);
  };

  useEffect((): void => {
    if (Param2) cleanIputs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Param2])
  useEffect((): void => {
    setBoxes(data);
  },[data]);
  return (
    <section id="data-container-1" className="data-container visible">
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="box-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="box-list">

              {boxes ? boxes.map((obj, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) =>(
                      <DataBoxElement
                      frase= {obj.frase} 
                      meaning= {obj.meaning }
                      index= {index}
                      data= {data}
                      setData= {setData}
                      setInput1= {setInputValue1}
                      setInput2= {setInputValue2}
                      setParam= {setParam!}
                      provided={provided}
                      boxRef={boxRef}
                      />
                    )}
                </Draggable>
              )) : '"Click in the Plus icon to add boxes"'}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>


      <div className={`box-element ${Param ? "" : "hidden"}`} id="adder-box" ref={boxRef}>
        <input 
        type="text" value={inputValue1}
        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
          setInputValue1(e.currentTarget.value);
        }}>
        </input>
        <input 
        type="text" value={inputValue2}
        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
          setInputValue2(e.currentTarget.value);
        }}>
        </input>
        <button className="IconBtn" onClick={addBoxHandler}>
          <AddBtn/>
        </button>
        <button id="delete-btn" className="IconBtn" onClick={cleanIputs}>
          <TrashCan/>
        </button>
      </div>
    </section>
  )
}
//  SECTION 02
export function Section02 ({data, setData}:DataInter) {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [newArr, setNewArr] = useState<DataObject[]>([]);
  const [index, setIndex] = useState<number>(0);

  const [easyArr, setEasyArr] = useState<DataObject[]>([]);
  const [goodArr, setGoodArr] = useState<DataObject[]>([]);
  const [badArr, setBadArr] = useState<DataObject[]>([]);

  const [completed, showCompleted] = useState<boolean>(false);
  const submitAnswerHandler = () => {
    setShowAnswers(false);
    (index + 1 < data.length) ? setIndex(index + 1) : setIndex(0)
  }
  const easyAnswerHandler = (): void => {
    setEasyArr([...easyArr, data[index]]);
    submitAnswerHandler()
  }
  const goodAnswerHandler = (): void => {
    setGoodArr([...goodArr, data[index]]);
    submitAnswerHandler()
  }
  const badAnswerHandler = (): void => {
    setBadArr([...badArr, data[index]]);
    console.log(badArr)
    submitAnswerHandler()
  }
  useEffect((): void => {
    if (newArr.length === data.length && data.length > 0) {
      setData(newArr)
      setNewArr([]);
      setEasyArr([]);
      setGoodArr([]);
      setBadArr([]);
      showCompleted(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newArr]);


  useEffect((): void => {
    setNewArr([...easyArr, ...goodArr, ...badArr]);
  }, [easyArr, goodArr, badArr])

  return(
    <>
    <section id="data-container-2" className="data-container visible">
      <div id="flashcard-word-container">
        {data[index] ? 
        (!showAnswers ? data[index].frase : data[index].meaning)
        : <span id="warning-message__flashcards-section">
          "Not data was found to display, go to the list section and add new boxes to set flashcards"
        </span>
        }
      </div>
      {data[index] && 
      (!showAnswers ? 
      <div id="show-answers-btn-container">
        <button 
        id="show-answers-btn" 
        onClick={() => {setShowAnswers(true)}}
        > 
          Show Answer
        </button>
      </div> : 
      <div id="answer-submition-container">
        <button onClick={badAnswerHandler}>Bad</button>
        <button onClick={goodAnswerHandler}>Good</button>
        <button onClick={easyAnswerHandler}>Easy</button>
      </div>)
      }

      {completed && (
        <Popup
          Param= {completed}
          setParam= {showCompleted}
        />
      )}
    </section>
    </>
  )
}


