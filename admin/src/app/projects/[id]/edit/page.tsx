export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main>
      <h1>Edit Project: {id}</h1>
    </main>
  )
}
