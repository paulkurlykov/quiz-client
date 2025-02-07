import { IoClose } from "react-icons/io5";
import Button from "./Button";
import Title from "./Title";
import {DetailedHTMLProps, HTMLAttributes, useEffect} from "react";
import { useQuestions } from "@/context/main.context";
import {toast} from "react-hot-toast"



interface DeleteConfirmPopupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  description: string;
  onClose?: () => void;
  action?: () => void;
}

function DeleteConfirmPopup({ title = "set title", description = "set description", onClose, action }: DeleteConfirmPopupProps) {

  return (
    <div
     onClick={(e) => e.stopPropagation()}
     className="flex flex-col gap-4 rounded-xl bg-inputBackground text-text px-16 pt-8 pb-12">
      <IoClose onClick={onClose} className="self-end mb-4 w-12 h-12 cursor-pointer transition hover:text-accent hover:scale-110 " />
      <Title tag="h4">{title}</Title>
      <span className="text-[1.2rem] min-h-24" >{description}</span>
      <div className="flex gap-4 justify-end" >
        <Button onClick={onClose} addClass="text-[1.4rem]" size="md" type="primary">Cancel</Button>
        <Button onClick={action} addClass="text-[1.4rem]" size="md" type="error">Delete</Button>
      </div>
    </div>
  );
}

export default DeleteConfirmPopup;
