import { ReactNode } from "react";
import Title from "./Title";
import { GoCheckCircleFill } from "react-icons/go";
import { IoCloseCircle, IoClose } from "react-icons/io5";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface SubmitPopupProps {
  type: "success" | "error";
  action: () => void;
  onClose: () => void;
}

interface SubmitPopupContentOption {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  btnText: string;
}

function SubmitPopup({ type, action, onClose }: SubmitPopupProps) {
  const navigate = useNavigate();

  const submitPopupContentOptions: Record<
    SubmitPopupProps["type"],
    SubmitPopupContentOption
  > = {
    success: {
      title: "Вопрос был загружен успешно!",
      subtitle: "Теперь вы можете чтонибудь сделать еще",
      icon: <GoCheckCircleFill className="h-52 w-52 text-green-400" />,
      btnText: "Отправить еще",
    },
    error: {
      title: "Что-то пошло не так",
      subtitle: "Сдлеайте что-нибудь!",
      icon: <IoCloseCircle className="text-error" />,
      btnText: "Попробовать еще раз",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 rounded-secondary bg-backgroundPrimary px-40 py-28">
      <IoClose
        onClick={() => onClose()}
        className="h-20 w-20 -translate-y-20 translate-x-32 cursor-pointer self-end text-accent transition-all hover:scale-105 hover:text-accentHover"
      />

      <div>{submitPopupContentOptions[type].icon}</div>
      <div className="flex flex-col gap-4">
        <Title tag="h1">{submitPopupContentOptions[type].title}</Title>
        <Title tag="h4">{submitPopupContentOptions[type].subtitle}</Title>
      </div>
      <div className="mt-16 flex gap-8">
        <Button onClick={() => onClose()}  size="md" type="primary">
          {submitPopupContentOptions[type].btnText}
        </Button>
        <Button onClick={() => {
            navigate('/');
            onClose();
        }} size="md" type="primary">
          На главную
        </Button>
      </div>
    </div>
  );
}

export default SubmitPopup;
