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
import {
  topicOptions,
  typeQuestionOptions,
  rightAswerOptions,
} from "../data/helperData";
import useCreateQuestion from "../hooks/useCreateQuestion";
import { useQuestions } from "../context/main.context";
import { MyFormData, CompletedFormData } from "@/types/main.types";
import Modal from "./Modal";
import SubmitPopup from "./SubmitPopup";
import Spinner from "./Spinner";
import TextInput from "./TextInput";
import Title from "./Title";
import TopicInputGroup from "./TopicInputGroup";
import AnswerOption from "./AnswerOption";

function Form() {
  const [questionType, setQuestionType] = useState("options");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { status, message, dispatch, questions } = useQuestions();

  const textInputWrapperClass =
    "flex flex-col md:flex-row gap-4 md:gap-16 items-start md:items-center justify-start border border-solid border-borderPrimary p-6 rounded-mini";

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
    reset,
    control,
  } = useForm<MyFormData>();

  const completeDataObject = (data: MyFormData): CompletedFormData => {
    console.log(data);

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

  console.log(status);

  const onSubmit: SubmitHandler<MyFormData> = (data) => {
    console.log(data);
    console.log("submit");
    const finalData = completeDataObject(data);
    console.log(finalData);
    useCreateQuestion(finalData, dispatch);
    reset();
    setShowModal(true);
    setQuestionType("options");
    console.log("submitted");
  };

  const onError: SubmitErrorHandler<MyFormData> = (errors) => {
    console.log(errors);
  };

  const headerAnimation = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: (custom = 1) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2, duration: custom },
    }),
  };

  return (
    <>
      {status === "loading" && <Spinner />}
      {status !== "loading" && (
        <motion.div initial="hidden" whileInView="visible">
          <Title tag="h1" className="my-24 pl-[4rem] font-bold">
            Добавь свой вопрос!
          </Title>

          <form
            className="mb-64 flex flex-col gap-8 text-3xl"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <FormSection title="Выбери тематику запроса">
              <TopicInputGroup control={control} addStyles="" />
            </FormSection>

            <FormSection title="Напиши свой вопрос тут">
              <Controller
                name="question"
                defaultValue=""
                control={control}
                rules={{ required: "Вы не указали вопрос!" }}
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
                        <AnswerOption
                        key={option.id}
                        >
                          <div className={textInputWrapperClass}  >
                            <Controller
                              name={`option${option.id}`}
                              control={control}
                              rules={{ required: "Укажите вариант ответа!" }}
                              defaultValue={""}
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
                                    <span className="text-[1.8rem] md:text-[2rem]" >Правильный ответ</span>
                                  ) : (
                                    <span className="text-[1.4rem] md:text-[1.6rem] opacity-50" >Отметить ответ, как правильный</span>
                                  )}
                                </RadioInput>
                              )}
                            />
                          </div>
                        </AnswerOption>
                      ))}

                      {/* <div className={textInputWrapperClass}>
                        <Controller
                          name="option2"
                          control={control}
                          rules={{ required: "Укажи вариант ответа!" }}
                          defaultValue={""}
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              label="Вариант 2"
                              errorLabel={errors?.option2?.message}
                              ref={null}
                            />
                          )}
                        />
                      </div>

                      <div className={textInputWrapperClass}>
                        <Controller
                          name="option3"
                          control={control}
                          rules={{ required: "Укажи вариант ответа!" }}
                          defaultValue={""}
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              label="Вариант 3"
                              errorLabel={errors?.option3?.message}
                              ref={null}
                            />
                          )}
                        />
                      </div>

                      <div className={textInputWrapperClass}>
                        <Controller
                          name="option4"
                          control={control}
                          rules={{ required: "Укажи вариант ответа!" }}
                          defaultValue={""}
                          render={({ field }) => (
                            <TextInput
                              {...field}
                              label="Вариант 4"
                              errorLabel={errors?.option4?.message}
                              ref={null}
                            />
                          )}
                        />
                      </div> */}

                      {/* {rightAswerOptions.map((option) => (
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
                              addStyles="flex-col"
                              handle={null}
                            >
                              {value === option.id && (
                                <span>Правильный ответ</span>
                              )}
                            </RadioInput>
                          )}
                        />
                      ))} */}
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
      {status !== "loading" && showModal && (
        <Modal>
          {" "}
          <SubmitPopup
            action={() => console.log("action")}
            onClose={() => setShowModal(false)}
            type="success"
          />{" "}
        </Modal>
      )}
    </>
  );
}

export default Form;
