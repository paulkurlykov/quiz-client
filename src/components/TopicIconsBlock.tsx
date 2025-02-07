import IconMaker from "./IconMaker";
import { useState } from "react";

function TopicIconsBlock() {
  const [color, setColor] = useState("#e34c26");
  const [hoveredColor, setHoveredColor] = useState("black");
  const [clickedIcon, setClickedIcon] = useState("html");
  const [hoverIcon, setHoverIcon] = useState("html");

  function defineColor(tag: string) {
    return clickedIcon === tag
      ? color
      : hoverIcon === tag
        ? hoveredColor
        : "black";
  }

  function resetColors() {
    setColor("#e34c26");
    setHoveredColor("black");
    setClickedIcon("html");
    setHoverIcon("html");
  }

  return (
    <div className="bg-orange-300">
      
      <div className="flex justify-start gap-4">
        <div
          // name="html"
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
          className={`${clickedIcon === "html" ? "yes" : "no"}`}
          style={{
            border: `2px solid ${defineColor("html")}`,
          }}
        >
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
          className={`${clickedIcon === "css" ? "active" : ""}`}
          style={{
            border: `2px solid ${defineColor("css")}`,
          }}
        >
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
          className={`${clickedIcon === "js" ? "active" : ""}`}
          style={{
            border: `2px solid ${defineColor("js")}`,
          }}
        >
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
          className={`${clickedIcon === "react" ? "active" : ""}`}
          style={{
            border: `2px solid ${defineColor("react")}`,
          }}
        >
          <IconMaker name="react" size="50" color={defineColor("react")} />
        </div>
      </div>
    </div>
  );
}

export default TopicIconsBlock;
