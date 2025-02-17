import { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import "./App.css";

const generator = rough.generator();

function App() {
  const [elements, setElements] = useState<any[]>([]);
  console.log('ur elements', elements)
  const [drawing, setDrawing] = useState<boolean>(false);

  const createElement = (x1: number, y1: number, x2: number, y2: number) => {
    const roughElement = generator.line(x1, y1, x2, y2);
    return { x1, y1, x2, y2, roughElement };
  };

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(false); 
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);

    const { clientX, clientY } = event;
    const element = createElement(clientX, clientY, clientX, clientY);

    setElements((prevState) => [...prevState, element]);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;

    const { clientX, clientY } = event;
    const index = elements.length - 1; 
    const { x1, y1 } = elements[index]; 

    const updatedElement = createElement(x1, y1, clientX, clientY); 
    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement; 

    setElements(elementsCopy);
  };

  return (
    <>
      <div>
        {/* <h1>Aayush</h1> */}
        <canvas
          id="canvas"
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          Canvas
        </canvas>
      </div>
    </>
  );
}

export default App;
