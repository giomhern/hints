import WordForm from "./components/word-form";

export default function Home() {
  return (
    <div className="min-h-screen">
      <h1
        className="text-5xl font-bold text-gray-700"
        style={{ fontFamily: "var(--font-jersey)" }}
      >
        hints
      </h1>
      <WordForm />
    </div>
  );
}
