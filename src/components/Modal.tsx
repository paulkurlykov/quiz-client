import useOutsideClick from "@/hooks/useOutsideClick";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import ModalPopup from "./ModalPopup";

interface ModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  console.log("modal is rendered...");

  const popupRef = useRef<HTMLDivElement>(null);

  useOutsideClick(onClose, popupRef);

  return (
    // overlay
    <div
      className={`fixed inset-0 z-10 flex min-h-screen w-screen items-center justify-center bg-black/75`}
    >
      <ModalPopup ref={popupRef} onClose={onClose}>
        {children}
      </ModalPopup>
    </div>
  );
}

export default Modal;
