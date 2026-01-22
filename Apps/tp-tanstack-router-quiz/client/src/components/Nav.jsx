import { Link } from "@tanstack/react-router";

export default function Nav() {
  const base =
    "text-sm font-medium text-slate-700 hover:text-slate-900 transition";
  const active = "text-slate-900 font-semibold";

  return (
    <nav className="w-full">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className={base}
          activeProps={{ className: `${base} ${active}` }}
        >
          Accueil
        </Link>
        <Link
          to="/quiz"
          className={base}
          activeProps={{ className: `${base} ${active}` }}
        >
          Quiz
        </Link>
        <Link
          to="/about"
          className={base}
          activeProps={{ className: `${base} ${active}` }}
        >
          About
        </Link>
      </div>
    </nav>
  );
}
