import { useEffect, useRef } from "react";
import { SetStateBoolean } from "./interfaces";
import "../styles/popup.css"

export const Popup = ({Param, setParam}: SetStateBoolean) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && 
        !contentRef!.current!.contains(event.target as Node)) {
          setParam(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [Param, setParam, contentRef]);

  return (
    <div id="popup-container">
      <div ref={contentRef} id="content__popup">
        <span> Flascards Completed </span>
        <button onClick={(): void => setParam(false)}>Close</button>
      </div>
    </div>
  )
}