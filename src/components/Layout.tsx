import { NavBar } from "./NavBar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <NavBar />
      <main className="container mx-auto mt-8 px-4">
        {children}
      </main>
    </div>
  );
}