import { useState, useEffect } from "react";
import IconMaker from "./IconMaker";
import FormSection from "./FormSection";
import RadioInputGroup from "./RadioInputGroup";
import TextArea from "./TextArea";
import Button from "./Button";
import Motion from "./Motion";
import { AnimatePresence, motion } from "framer-motion";
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import RadioInput from "./RadioInput";
import { typeQuestionOptions, rightAswerOptions } from "../data/helperData";
import useCreateQuestion from "../hooks/useCreateQuestion";
import { useQuestions } from "../context/main.context";
import {
  QuestionFields,
  CompletedFormData,
  Question,
} from "@/types/main.types";
import Modal from "./Modal";
import SubmitPopup from "./SubmitPopup";
import Spinner from "./Spinner";
import TextInput from "./TextInput";
import Title from "./Title";
import TopicInputGroup from "./TopicInputGroup";
import AnswerOption from "./AnswerOption";
import useGetQuestion from "@/hooks/useGetQuestion";
import { TypeQuestionOption } from "@/data/helperData.types";
import useUpdateQuestion from "@/hooks/useUpdateQuestion";
import useGetQuestions from "@/hooks/useGetQuestions";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

type Props = {
  id?: Question["_id"];
  onClose?: () => void;
  setShowSubmitResultModal?: () => void;
};

function Form({ id, onClose, setShowSubmitResultModal }: Props) {
  const [questionType, setQuestionType] = useState<TypeQuestionOption['id']>("options");
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const { status, dispatch, question } = useQuestions();
  const [searchParams] = useSearchParams();



  useEffect(() => {
    if (id) {
      const getQuestionById = async () => {
        await useGetQuestion(dispatch, id);
      };
      getQuestionById();
    }
  }, [dispatch, id]);

  const defaultValues = question && id ? { ...question, _id: undefined } : undefined;

  console.log('FORM IS RENDERED');
  console.log(defaultValues);

  const textInputWrapperClass =
    "flex flex-col md:flex-row gap-4 md:gap-16 items-start md:items-center justify-start md:flex border border-solid border-borderPrimary p-6 rounded-mini";

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<QuestionFields>({ defaultValues });

  useEffect(() => {
    if (question) {
      setQuestionType(question?.answerType)
      reset(defaultValues);
      rightAswerOptions.map((option, index) => option.answer = defaultValues?.options[index])
    }

    return () => {
      reset();
    };
  }, [question, reset]);

  const completeDataObject = (data: QuestionFields): CompletedFormData => {
    // console.log(data);

    const {
      answerType,
      textAnswer,
      rightAnswer,
      option1,
      option2,
      option3,
      option4,
      question,
      topic,
      codeSnippet,
    } = data;
    let options: string[] | [] = [];
    const isTypeOptions = answerType === "options";

    if (isTypeOptions) {
      options = [option1, option2, option3, option4];
    }

    return {
      question,
      topic,
      options,
      textAnswer: isTypeOptions ? "" : textAnswer,
      rightAnswer: isTypeOptions ? rightAnswer : "",
      answerType,
      codeSnippet,
    };
  };



  const onSubmit: SubmitHandler<QuestionFields> = (data) => {
    console.log("submit");
    const finalData = completeDataObject(data);
    if(!id) {
      useCreateQuestion(finalData, dispatch);
    } else {
      useUpdateQuestion(id, finalData, dispatch);
      useGetQuestions(dispatch, searchParams);
      onClose && onClose();
    }
    reset();
    setShowSubmitResultModal && setShowSubmitResultModal();
    setShowResultModal(true);
    setQuestionType("options");
    console.log("submitted");
  };


  return (
    <>
      {status === "loading" && <Spinner />}
      {status !== "loading" && (
        <motion.div
          className="overflow-y-scroll"
          initial="hidden"
          whileInView="visible"
        >
          <Title tag="h1" className="my-24 pl-[4rem] font-bold">
            {id ? "Отредактировать вопрос" : "Добавь свой вопрос!"}
          </Title>

          <form
            className="text-3xl mb-64 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormSection title="Выбери тематику запроса">
              <TopicInputGroup control={control} defaultValue={defaultValues && defaultValues.topic}/>
            </FormSection>

            <FormSection title="Напиши свой вопрос тут">
              <Controller
                name="question"
                control={control}
                rules={{ required: "Вы не указали вопрос!" }}
                defaultValue={defaultValues && defaultValues.question}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    errorLabel={errors?.question?.message}
                    ref={null}
                  />
                )}
              />
            </FormSection>

            <FormSection title="Выбери тип вопроса">
              <RadioInputGroup
                control={control}
                defaultValue={defaultValues && defaultValues.answerType}
                name="answerType"
                options={typeQuestionOptions}
                addStyles="flex flex-col"
                handle={setQuestionType}
                render={null}
                hidden={null}
              />
            </FormSection>

            <AnimatePresence>
              {questionType === "options" && (
                <Motion>

                  <FormSection>
                    <div className="grid grid-flow-col grid-cols-1 grid-rows-4 gap-4 md:grid-cols-[minmax(max-content,_1fr),_3/4fr]">

                      {rightAswerOptions.map((option) => (

                        <AnswerOption key={option.id}>
                          <div className={textInputWrapperClass}>
                            <Controller
                              name={`option${option.id}`}
                              control={control}
                              rules={{ required: "Укажите вариант ответа!" }}
                              defaultValue={option.answer}
                              render={({ field }) => (
                                <TextInput
                                  {...field}
                                  label={`Вариант ${option.id}`}
                                  errorLabel={errors?.option1?.message}
                                  ref={null}
                                />
                              )}
                            />

                            <Controller
                              key={option.id}
                              name="rightAnswer"
                              control={control}
                              defaultValue={rightAswerOptions[0]?.id}
                              render={({ field: { onChange, value } }) => (
                                <RadioInput
                                  checked={value === option.id}
                                  id={option.id}
                                  value={option.id}
                                  onChange={onChange}
                                  label={option.label}
                                  addStyles="md:translate-y-5"
                                  handle={null}
                                >
                                  {value === option.id ? (
                                    <span className="text-[1.8rem] md:text-[2rem]">
                                      Правильный ответ
                                    </span>
                                  ) : (
                                    <span className="text-[1.4rem] opacity-50 md:text-[1.6rem]">
                                      Отметить ответ, как правильный
                                    </span>
                                  )}
                                </RadioInput>
                              )}
                            />
                          </div>
                        </AnswerOption>
                      ))}
                    </div>
                  </FormSection>
                </Motion>
              )}
            </AnimatePresence>

            {questionType === "text" && (
              <FormSection title="Напиши свой ответ тут">
                <Controller
                  name="textAnswer"
                  defaultValue=""
                  control={control}
                  rules={{ required: "Укажите ответ!" }}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      errorLabel={errors?.textAnswer?.message}
                      ref={null}
                    />
                  )}
                />
              </FormSection>
            )}

            <FormSection title="Укажи код здесь">
              <Controller
                name="codeSnippet"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextArea
                    errorLabel={errors?.codeSnippet?.message}
                    {...field}
                    ref={null}
                  />
                )}
              />
            </FormSection>

            <Button size="xl" addClass="self-center" type="primary">
              Отправить запрос!
            </Button>
          </form>
        </motion.div>
      )}
      {status !== "loading" && showResultModal && (

        <Modal onClose={() => setShowResultModal(false)}>
          {" "}
          <SubmitPopup
            action={() => console.log("action")}
            onClose={() => setShowResultModal(false)}
            type="success"
          />{" "}
        </Modal>
      )}
    </>
  );
}

export default Form;
