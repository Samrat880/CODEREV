import { requireUnauth } from "@/features/Auth/actions";

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
    await requireUnauth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
