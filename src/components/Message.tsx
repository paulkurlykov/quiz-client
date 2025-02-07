import Button from "./Button";
import IconMaker from "./IconMaker"


interface MessageProps {
    type: string;
    setIsMessageTime: (state: boolean) => void;
    isMessageTime: boolean;
}

function Message({type, setIsMessageTime}: MessageProps) {

    const returnAddQuestionHandler = () => {
        setIsMessageTime(false);
    }
    return (

        <>
        
        {{
            questionSent: (

            <>
            <IconMaker name="html" size="100px" color="green" />
            <h3>Ваш вопрос был успешно отправлен!</h3>
            <Button size="md" type="primary" handler={returnAddQuestionHandler} >Вернутся обратно</Button>
            </>
            )
        }[type]}
        </>

    )
        

    
}

export default Message
