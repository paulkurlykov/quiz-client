import IconMaker from "./IconMaker/IconMaker";

function TopicIconBlock(props) {

    console.log(props);

    const {setClickedIcon, setColor, setHoveredColor, setHoverIcon, clickedIcon, defineColor} = props;
    return (
        <div className="bg-orange-300">
        <h4>Выбери тематику вопроса</h4>
        <div className="">
            <div
                name="html"
                onClick={() => {
                    setClickedIcon("html");
                    setColor("#e34c26");
                }}
                onMouseEnter={() => {
                    setHoveredColor("#e34c26");
                    setHoverIcon("html");
                }}
                onMouseLeave={() => {
                    setHoveredColor("unset");
                    setHoverIcon("");
                }}
                className={`${
                    clickedIcon === "html"
                        ? "yes"
                        : "no"
                }`}
                style={{
                    border: `2px solid ${defineColor("html")}`,
                }}>
                <IconMaker name="html" size="50" color={defineColor("html")} />
            </div>
            <div
                onClick={() => {
                    setClickedIcon("css");
                    setColor("#264de4");
                }}
                onMouseEnter={() => {
                    setHoveredColor("#264de4");
                    setHoverIcon("css");
                }}
                onMouseLeave={() => {
                    setHoveredColor("unset");
                    setHoverIcon("");
                }}
                className={`${
                    clickedIcon === "css"
                        ? "active"
                        : ""
                }`}
                style={{
                    border: `2px solid ${defineColor("css")}`,
                }}>
                <IconMaker name="css" size="50" color={defineColor("css")} />
            </div>{" "}
            <div
                onClick={() => {
                    setClickedIcon("js");
                    setColor("#f0db4f");
                }}
                onMouseEnter={() => {
                    setHoveredColor("#f0db4f");
                    setHoverIcon("js");
                }}
                onMouseLeave={() => {
                    setHoveredColor("unset");
                    setHoverIcon("");
                }}
                className={`${
                    clickedIcon === "js"
                        ? "active"
                        : ""
                }`}
                style={{
                    border: `2px solid ${defineColor("js")}`,
                }}>
                <IconMaker name="js" size="50" color={defineColor("js")} />
            </div>{" "}
            <div
                onClick={() => {
                    setClickedIcon("react");
                    setColor("#61DBFB");
                }}
                onMouseEnter={() => {
                    setHoveredColor("#61DBFB");
                    setHoverIcon("react");
                }}
                onMouseLeave={() => {
                    setHoveredColor("unset");
                    setHoverIcon("");
                }}
                className={`${
                    clickedIcon === "react"
                        ? "active"
                        : ""
                }`}
                style={{
                    border: `2px solid ${defineColor("react")}`,
                }}>
                <IconMaker
                    name="react"
                    size="50"
                    color={defineColor("react")}
                />
            </div>
        </div>
    </div>
    )
}

export default TopicIconBlock
