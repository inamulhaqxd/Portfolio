export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <main>
      <h1>Project: {slug}</h1>
    </main>
  )
}
