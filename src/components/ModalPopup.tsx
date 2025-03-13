import { forwardRef, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

type ModalPopupProps = {
  children: ReactNode;
  onClose: () => void;
};

const ModalPopup = forwardRef<HTMLDivElement, ModalPopupProps>(({ children, onClose }, ref) => {
  return (
    <div ref={ref} className="mt-32 flex max-h-[75vh] w-3/4 flex-col gap-12 overflow-y-scroll rounded-secondary bg-backgroundPrimary px-16 py-12 pb-16 text-textPrimary">
      <div className="flex h-[4rem] w-full justify-end flex-shrink-0">
        <IoClose
          onClick={onClose}
          className="h-full w-fit aspect-square cursor-pointer self-end transition hover:scale-125 hover:text-accent"
        />
      </div>

      <div>{children}</div>
    </div>
  );
});

ModalPopup.displayName = "ModalPopup";

export default ModalPopup;
