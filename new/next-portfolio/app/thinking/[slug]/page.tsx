export default function ThinkingDetailPage({ params }: { params: { slug: string } }) {
  return (
    <section className="page container">
      <h1>{params.slug.replace(/-/g, " ")}</h1>
      <p>Thinking detail route scaffolded.</p>
    </section>
  );
}
