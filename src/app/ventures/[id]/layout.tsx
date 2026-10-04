import { VentureNav } from "~/components/venture-nav";

export default async function VentureLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <VentureNav id={id} />
      {children}
    </>
  );
}
