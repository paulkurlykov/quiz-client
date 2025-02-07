import CanvasBackground from "./CanvasBackground";
import NoiseCanvas from "./NoiseCanvas";

function AnimationLayer() {
  return (
    <div className="absolute inset-0" >
      <div className="relative w-[10rem] h-[10rem] ">
        <NoiseCanvas />
        <CanvasBackground />
      </div>
    </div>
  );
}

export default AnimationLayer;
