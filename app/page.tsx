import WordForm from "./components/word-form";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1
        className="text-5xl font-bold"
        style={{ fontFamily: "var(--font-jersey)" }}
      >
        hints
      </h1>
      <WordForm />
    </div>
  );
}
