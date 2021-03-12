export default function TextPage({ title, text }) {
  return (
    <div className="container">
      <h1>{title}</h1>
      {text}
      <button>Continue</button>
    </div>
  );
}
