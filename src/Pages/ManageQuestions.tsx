import { useQuestions } from "../context/main.context";
import Title from "../components/Title";
import { ChangeEvent, useState, useEffect } from "react";
import MotionPage from "@/components/MotionPage";
import SearchBar from "@/components/SearchBar";
import { Question } from "@/types/main.types";
import Modal from "@/components/Modal";
import DeleteConfirmPopup from "@/components/DeleteConfirmPopup";
import { toast } from "react-hot-toast";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
import QuestionItemPopup from "@/components/QuestionItemPopup";
import QuestionsGrid from "@/components/QuestionsGrid";
import Filter from "@/components/Filter";
import { Level } from "@/types/main.types";
import useQuestionManageFilter from "@/hooks/useQuestionManageFilter";
import Switch from "@mui/material/Switch";
import useRandomizer from "@/hooks/useRandomizer";
import usePagination from "@/hooks/usePagination";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import useGetQuestions from "@/hooks/useGetQuestions";
import useSearch from "@/hooks/useSearch";
import Form from "@/components/Form";
import SubmitPopup from "@/components/SubmitPopup";

function ManageQuestions(): JSX.Element | null {
  const [showDeletingPopup, setShowDeletingPopup] = useState<
    Question["_id"] | null
  >(null);
  const [showItemPopup, setShowItemPopup] = useState<Question["_id"] | null>(
    null,
  );
  const [showEditingPopup, setShowEditingPopup] = useState<
    Question["_id"] | null
  >(null);
  const [isRandomizerOn, setIsRandomizerOn] = useState<boolean>(false);
  const [filteredTopics, setFilteredTopics] = useState<Level[]>([
    "html",
    "css",
    "js",
    "react",
    "vue",
  ]);
  const [query, setQuery] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  // DATA ENTRYPOINT
  const {
    pagination,
    status,
    dispatch,
    showSubmitResultModal,
    setShowSubmitResultModal,
  } = useQuestions();

  useEffect(() => {
    if (!searchParams.has("page") && !searchParams.has("limit")) {
      searchParams.set("page", "1");
      searchParams.set("limit", "10");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  useEffect(() => {
    const getPaginatedQuestions = async () => {
      searchParams.set("topicFilter", filteredTopics.join(","));
      setSearchParams(searchParams);
      await useGetQuestions(dispatch, searchParams);
    };
    getPaginatedQuestions();
  }, [dispatch, filteredTopics]);

  useEffect(() => {
    const setQueryParams = () => {
      if (query) {
        searchParams.set("queryFilter", query);
        setSearchParams(searchParams);
      } else {
        searchParams.delete("queryFilter");
        setSearchParams(searchParams);
      }
    };

    const getFilteredByQueryQuestions = async () => {
      await useGetQuestions(dispatch, searchParams);
    }

    if(query.length >= 3) {
      getFilteredByQueryQuestions()
    }

    setQueryParams();
  }, [query]);

  // getting RawQuestions, 10 questions by default (already filtered and paginated by backend)
  const {
    data: rawQuestions,
    totalCount,
    totalPages,
    filteredCount,
    filteredPages,
  } = pagination;

  const { currentPage, previousPage, nextPage, goToPage } = usePagination(
    filteredCount,
    ITEMS_PER_PAGE,
  );

  if (!rawQuestions) return null;

  // Randomizer
  const randomizedQuestions = useRandomizer(rawQuestions, isRandomizerOn);

  // finally questions
  const questions = randomizedQuestions;

  const deleteHandle = async (id: Question["_id"]) => {
    setShowDeletingPopup(null);
    await useDeleteQuestion(
      id,
      dispatch,
      () => toast.success("Товар успешно удален!"),
      (error) => toast.error(`Не получилось удалить вопрос! ${error.message}`),
    );
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsRandomizerOn(event?.target.checked);
  };

  const filterClickHandler = (topic: Level) => {
    if (filteredTopics.includes(topic)) {
      setFilteredTopics((st) => st.filter((item) => item !== topic));
    } else {
      setFilteredTopics((st) => [...st, topic]);
    }
  };

  return (
    <MotionPage>
      <div className="flex flex-col gap-16 px-8 pt-24">
        <div className="flex justify-between">
          <div className="mb-8 flex flex-col gap-8">
            <Title tag="h1" className="text-textPrimary">
              Управление вопросами
            </Title>

            <Title className="font-normal" tag="h4">
              Всего вопросов:{" "}
              <span className="font-secondary">{totalCount}</span>
            </Title>
            <Title className="font-normal" tag="h4">
              Отфильтровано вопросов:{" "}
              <span className="font-secondary">{filteredCount}</span>
            </Title>
            <Title className="font-normal" tag="h4">
              На странице вопросов:{" "}
              <span className="font-secondary">{questions.length}</span>
            </Title>
          </div>

          <div className="flex flex-col gap-4">
            <Filter onClick={filterClickHandler} options={filteredTopics} />

            <div className="flex gap-2">
              <span>Randomize it!</span>
              <Switch
                checked={isRandomizerOn}
                onChange={handleSwitchChange}
                inputProps={{ "aria-label": "controlled" }}
                color="primary"
              />
            </div>
          </div>
        </div>
        <SearchBar status={status} query={query} setQuery={setQuery} />

        <QuestionsGrid
          questions={questions}
          setShowItemPopup={setShowItemPopup}
          setShowDeletingPopup={setShowDeletingPopup}
          setShowEditingPopup={setShowEditingPopup}
          status={status}
        />

        <Pagination
          currentPage={currentPage}
          pagesNum={filteredPages}
          nextPage={nextPage}
          previousPage={previousPage}
          goToPage={goToPage}
        />

        {showDeletingPopup && (
          <Modal onClose={() => setShowDeletingPopup(null)}>
            {" "}
            <DeleteConfirmPopup
              onClose={() => setShowDeletingPopup(null)}
              action={() => deleteHandle(showDeletingPopup)}
              title="Вы точно хотите удалить вопрос?"
              description="Это действие нельзя будет отменить!"
            />{" "}
          </Modal>
        )}

        {showItemPopup && (
          <Modal onClose={() => setShowItemPopup(null)}>
            <QuestionItemPopup id={showItemPopup} />
          </Modal>
        )}

        {showEditingPopup && (
          <Modal onClose={() => setShowEditingPopup(null)}>
            <Form
              id={showEditingPopup}
              onClose={() => setShowEditingPopup(null)}
              setShowSubmitResultModal={() => setShowSubmitResultModal(true)}
            />
          </Modal>
        )}

        {status !== "loading" && showSubmitResultModal && (
          <Modal onClose={() => setShowSubmitResultModal(false)}>
            {" "}
            <SubmitPopup
              action={() => console.log("action")}
              onClose={() => setShowSubmitResultModal(false)}
              type="success"
            />{" "}
          </Modal>
        )}
      </div>
    </MotionPage>
  );
}

export default ManageQuestions;
