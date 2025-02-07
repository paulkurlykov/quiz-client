import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;

}

function Modal({ children, ...props }: ModalProps) {
  return (
    // overlay
    <div
      className={`fixed inset-0 z-10 flex min-h-screen w-screen items-center justify-center bg-black/75`}
      {...props}
    >
    {/* put popup as children */}
      <div >{children}</div>
    </div>
  );
}

export default Modal;
