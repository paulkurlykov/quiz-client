import IconMaker from "./IconMaker";
import { useState } from "react";
import {Level} from "../types/main.types"


// function TopicRadioInput({ id, name, selectedValue, setSelectedValue, ...field }) {



// const defineColor = (tag: Level):string => {

//     // const colors = {
//     //     html: "text-blue-800",
//     //     css: "text-sky-800",
//     //     js: "text-yellow-800",
//     //     react: "text-cyan-600"
//     // }

//         const colors = {
//         html: "#dc2626",
//         css: "#3b82f6",
//         js: "#fcd34d",
//         react: "#22d3ee"
//     }

//     return colors[tag];


//     // return id === "html" ? "text-blue-800"
//     // : id === "css" ? "text-sky-800"
//     // : id === "js" ? "text-yellow-800"
//     // : "text-cyan-600"
// };

//   return (
//     <li>
//       <label
//         htmlFor={id}
//         className="inline-flex w-full cursor-pointer flex-col items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
//       >
//         <input
//           checked={selectedValue === id}
//           type="radio"
//           id={id}
//           name={name}
//           value={options.id}
//           className="peer hidden"
//           onChange={(e) => field.onChange(e.target.checked)
          
//           }
//         />
//         <IconMaker
//         className={`peer-checked:${id === "html" ? "text-blue-200"
//         : id === "css" ? "text-sky-800"
//         : id === "js" ? "text-yellow-800"
//         : "text-cyan-600"}`}
//           name={id}
//           size="50"
//           color={selectedValue !== id ? "black" : defineColor(id)}
//         />
//         <span className="text-xl font-semibold peer-checked:text-sky-300 peer-hover:text-zinc-200 ">{id.toUpperCase()}</span>
//       </label>
//     </li>
//   );
// }

// export default TopicRadioInput;
