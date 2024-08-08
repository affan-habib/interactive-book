import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ZoomControls from "../ZoomControls/ZoomControls";
import Accessibility from "../../components/Accessibility";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import NotesControl from "../NotesControl/NotesControl";

const Controls = () => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
   const [isTablet,setIsTablet] = useState(window.innerWidth > 1100);
   const [isOpen, setIsOpen] = useState(false);
   const [isZoomControlsVisible, setIsZoomControlVisible] = useState(false);
   const [isNoteControlsVisible, setIsNoteControlVisible] = useState(false);

   const ZoomControlsRef = useRef(null);
   const notesControlsRef = useRef(null);

   useOnClickOutside(ZoomControlsRef, () => setIsZoomControlVisible(false));
   useOnClickOutside(notesControlsRef, () => setIsNoteControlVisible(false));

   const handleZoomControls = () => {
      setIsZoomControlVisible(!isZoomControlsVisible);
   };
   const handleNotesControls = () => {
      setIsNoteControlVisible(!isNoteControlsVisible);
   };

   const openModal = () => setIsOpen(true);
   const closeModal = () => setIsOpen(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 768);
         setIsTablet(window.innerWidth > 1100);
      };

      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   return (
      <div>
         <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            <Accessibility isMobile={isMobile} />
            <Button
               icon="ion:camera-sharp"
               text="Screenshot"
               onClick={() => console.log("Screenshot")}
               isMobile={isMobile}
            />
            <div className="relative" ref={notesControlsRef}>
               {isNoteControlsVisible && (
                  <NotesControl />
               )}
               <Button
                  onClick={handleNotesControls}
                  icon="solar:notes-bold"
                  text="Notes"
                  isMobile={isMobile}
               />
            </div>
            <Button
               icon="material-symbols-light:folder"
               text="Gallery"
               isMobile={isMobile}
               onClick={openModal}
            />
            <Button
               icon="material-symbols-light:home-outline"
               text="Home"
               isMobile={isMobile}
               onClick={() => console.log("Home")}
            />
            <Button
               icon="ooui:arrow-previous-ltr"
               text="Previous"
               onClick={() => console.log("Previous")}
               isMobile={isMobile}
            />
            <Button
               icon="material-symbols-light:volume-off"
               text="Stop"
               isMobile={isMobile}
               onClick={() => console.log("Stop")}
            />
            <Button icon="ph:file-pdf" text="PDF" isMobile={isMobile} onClick={() => console.log("PDF")} />
            <Button
               icon="mdi:reload"
               text="Reload"
               isMobile={isMobile}
               onClick={() => console.log("Reload")}
            />
            <div className="relative" ref={ZoomControlsRef}>
               {isZoomControlsVisible && (
                  <ZoomControls />
               )}
               {isTablet && <Button
                  icon="ic:round-zoom-in"
                  text="Zoom In"
                  isMobile={isMobile}
                  onClick={() => handleZoomControls()}
               />}
            </div>
            <Button
               icon="mdi:fullscreen"
               text="Fullscreen"
               isMobile={isMobile}
               onClick={() => console.log("Fullscreen")}
            />
         </div>
         <Modal isOpen={isOpen} onClose={closeModal} />
      </div>
   );
};

export default Controls;
