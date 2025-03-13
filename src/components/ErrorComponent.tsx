import { BiSolidErrorAlt } from "react-icons/bi";
import Button from "./Button";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorComponent({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex justify-center align-middle">

    <div className="flex flex-col gap-8 mt-[15rem]">
      <div className="h-[20rem] w-[20rem]">
        <BiSolidErrorAlt className="h-full w-full text-red-700" />
      </div>
      <Title tag="h1">Произошла чудовищная ошибка!</Title>
      <p>Какая ошибка, мы, конечно же, не знаем</p>
      <p className="text-tertiary" >Да ладно, знаем: {error.message}</p>

      <Button
        addClass="self-center"
        size="md"
        type="primary"
        onClick={resetErrorBoundary}
        >
        На главную
      </Button>
    </div>
        </div>
  );
}

export default ErrorComponent;
