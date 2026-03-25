interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <h1 className="text-xl font-bold">Orchestrator</h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        {children}
      </main>
    </div>
  );
}
