import WordForm from "./components/word-form";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/3">
        <h1
          className="text-5xl font-bold text-gray-700 text-center"
          style={{ fontFamily: "var(--font-jersey)" }}
        >
          hints
        </h1>
        <WordForm />
      </div>
    </div>
  );
}
