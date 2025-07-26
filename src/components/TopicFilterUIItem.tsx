import IconMaker from "./IconMaker";
import { TopicOption } from "@/data/helperData.types";
import { useState, useEffect } from "react";
import { useFilterContext } from "@/context/filter.context";
import { baseTopicsCount } from "@/data/helperData";

function TopicFilterUIItem({
  topic,
  isAllTopicsChosen,
}: {
  topic: TopicOption;
  isAllTopicsChosen: boolean;
}) {
  const { filteredTopics, dispatch } = useFilterContext();
  const [isActive, setIsActive] = useState<boolean>(false);

  const setFilteredTopic = (id: TopicOption["id"]) => {
    if (filteredTopics.length < baseTopicsCount) {
      filteredTopics.includes(id)
      // deleting this id from filteredTopics
        ? dispatch({
            type: "SET_FILTERED_TOPICS",
            payload: filteredTopics.filter((topic) => topic !== id),
          })
      // adding this id to filteredTopics
        : dispatch({
            type: "SET_FILTERED_TOPICS",
            payload: filteredTopics.concat(id),
          });

    } else {
        // replace all filteredTopics to this id
      dispatch({ type: "SET_FILTERED_TOPICS", payload: [id] });
    }
    setIsActive((st) => !st);
  };

  useEffect(() => {
    isAllTopicsChosen ? setIsActive(false) : setIsActive(filteredTopics.includes(topic.id))
  }, [isAllTopicsChosen]);


  return (
    <li
      onClick={() => {
        setFilteredTopic(topic.id);
      }}
      className={`grid cursor-pointer ${isActive ? "outline-4 outline-accentHover" : "none"} grid-cols-[3.2rem,_1fr] grid-rows-1 items-center justify-center gap-4 rounded-[15px] p-4 shadow-xl outline transition-all hover:outline-4 hover:outline-accentHover active:translate-y-1`}
    >
      <div>{<IconMaker size="100%" color={isActive ? topic.color : "grey"} name={topic.id} />}</div>
      <span className="text-[2rem]" >{topic.id}</span>
    </li>
  );
}

export default TopicFilterUIItem;
