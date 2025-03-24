import useOutsideClick from "@/hooks/useOutsideClick";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useRef,
} from "react";
import ModalPopup from "./ModalPopup";
import { createPortal } from "react-dom";

interface ModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
}



function Modal({ children, onClose }: ModalProps) {

  const layoutEl = document.querySelector('.LAYOUT');
  // console.log("modal is rendered...");

  const popupRef = useRef<HTMLDivElement>(null);

  useOutsideClick(onClose, popupRef);

  if(!layoutEl) return null;

  return createPortal(
    // overlay
    <div
      className={`fixed inset-0 z-1000 flex min-h-screen w-screen items-center justify-center bg-black/75`}
    >
      <ModalPopup ref={popupRef} onClose={onClose}>
        {children}
      </ModalPopup>
    </div>,
    // layoutEl
    document.body
  );
}

export default Modal;
