import { MoonLoader } from "react-spinners";

function Spinner() {
    return (
        <div className="w-full h-screen flex justify-center items-center" >
            <MoonLoader
            color={"#8DFFF9"}
            size={120}
            />
        </div>
    )
}

export default Spinner
