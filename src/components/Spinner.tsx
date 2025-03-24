import { MoonLoader } from "react-spinners";

function Spinner({size = 120}: {size?: number}) {
    return (
        <div className="w-full flex justify-center items-center" >
            <MoonLoader
            color={"#3f7370"}
            size={size}
            />
        </div>
    )
}

export default Spinner
