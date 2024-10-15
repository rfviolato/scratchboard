import { MorphingText } from "./MorphingText/MorphingText";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-full">
      <MorphingText initialText="Compile" endText="Code" />
    </div>
  );
}
