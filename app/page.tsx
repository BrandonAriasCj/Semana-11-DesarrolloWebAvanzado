import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Dashboard shadcn/ui
        </h1>
        <Link 
          href="/dashboard" 
          className="inline-block bg-slate-900 text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition-colors"
        >
          Ver Dashboard
        </Link>
      </div>
    </div>
  );
}