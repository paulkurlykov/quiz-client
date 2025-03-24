import { topicOptions } from "@/data/helperData"
import { Divider } from "antd"
import { Level } from "@/types/main.types";

type Props = {
    onClick: (id: Level) => void;
    options: Level[];
}

function Filter({onClick, options}: Props) {

    return (
        <ul className="flex text-secondary gap-4" >
            {topicOptions.map(item => <li onClick={() => onClick(item.id)} className={`py-4 px-6 rounded-middle cursor-pointer transition-all border border-solid border-1 border-borderPrimary hover:bg-accentHover hover:text-gray-500 ${options.includes(item.id) ? 'bg-accentHover text-gray-950' : "text-gray-500"} active:scale-110 `} key={item.id} >{item.id}</li>)}
        </ul>
    )
}

export default Filter;
