import { FilteredTopics } from "@/context/context.types";
import { useState, useEffect } from "react";
import { TopicOption } from "@/data/helperData.types";
import { Level } from "@/types/main.types";
import { Dispatch, SetStateAction } from "react";
import IconMaker from "./IconMaker";
import TopicFilterUIItem from "./TopicFilterUIItem";
import { topicOptions } from "@/data/helperData";
import { useFilterContext } from "@/context/filter.context";

function TopicFilterUI({
  data
}: {
  data: TopicOption[];
  filteredTopics: FilteredTopics;
}) {

  const [isAllTopicsChosen, setIsAllTopicsChosen] = useState<boolean>(true);

  const {filteredTopics, dispatch} = useFilterContext();

  useEffect(() => {
    if(filteredTopics && filteredTopics.length === 4) {
      setIsAllTopicsChosen(true);
    } else {
      setIsAllTopicsChosen(false);
    }
  },[filteredTopics])



  return (
    <ul className="flex md:h-[10rem] flex-wrap justify-start w-full gap-8 py-8 text-textDark dark:text-textLight">
      <li
      onClick={() => dispatch({type: "SET_FILTERED_TOPICS", payload: topicOptions.map(option => option.id)}) }
      className={` ${isAllTopicsChosen ? "outline-4 outline-accentHover" : "none"} flex cursor-pointer items-center justify-center rounded-[15px] p-4 shadow-xl outline transition-all hover:outline-4 hover:outline-accentHover active:translate-y-1`}>
        <span className="text-[2rem]" >⭐️ все</span>
      </li>
      {data && data.map((topic) => {
        return <TopicFilterUIItem isAllTopicsChosen={isAllTopicsChosen} key={topic.id}  topic={topic} />;
      })}
    </ul>
  );
}

export default TopicFilterUI;
