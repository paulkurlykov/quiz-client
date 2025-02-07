import { DifficultOption } from '@/data/helperData.types'
import DifficultLevelItem from './DifficultLevelItem'
import { motion } from 'framer-motion';

interface DifficultLevelListProps {
    options: DifficultOption[];
    addStyles?: string;
}

const diffLevelsAnimationVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.75,
      },
    },
  };

function DiffucultLevelList({options, addStyles = ""}: DifficultLevelListProps) {

    return (
        <ul 
        className={`w-full rounded-[20px] p-8 md:p-16 transition-all duration-300 grid grid-cols-1 md:grid-rows-1 md:grid-cols-4 justify-center  gap-8 cursor-pointer ${addStyles}`} >
            {options.map(option => {
                return <DifficultLevelItem key={option.level} difficultLevel={option.level} emoji={option.emoji} questionsNum={option.questionsNum}/>
            })}

        </ul>
    )
}

export default DiffucultLevelList
