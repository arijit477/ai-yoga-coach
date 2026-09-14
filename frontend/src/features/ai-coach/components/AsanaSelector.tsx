import { useState, useMemo, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import type { Asana } from "../types/asana";

interface AsanaSelectorProps {
  asanas: Asana[];
  currentAsana: Asana;
  onSelectAsana: (asana: Asana) => void;
  disabled?: boolean;
  className?: string;
}

export function AsanaSelector({
  asanas,
  currentAsana,
  onSelectAsana,
  disabled = false,
  className = "",
}: AsanaSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    asanas.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ["all", ...Array.from(set)];
  }, [asanas]);

  const filteredAsanas = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return asanas.filter((a) => {
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        (a.sanskritName && a.sanskritName.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q);

      const matchesCat =
        selectedCategory === "all" ||
        a.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesQuery && matchesCat;
    });
  }, [asanas, searchQuery, selectedCategory]);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-white px-3.5 py-2 text-xs font-semibold text-emerald-950 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
          Asana:
        </span>
        <span className="font-bold text-emerald-950 truncate max-w-[140px] sm:max-w-[200px]">
          {currentAsana.name}
        </span>
        {currentAsana.sanskritName && (
          <span className="hidden md:inline text-[11px] text-emerald-700/80 font-normal italic">
            ({currentAsana.sanskritName})
          </span>
        )}
        <ChevronDown size={14} className={`text-emerald-700 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Searchable Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-emerald-100 bg-white p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`capitalize text-[10px] font-bold px-2.5 py-1 rounded-lg transition whitespace-nowrap ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-xs"
                      : "bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/70 border border-emerald-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative mb-2.5">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search asana by name or Sanskrit..."
              className="w-full rounded-xl border border-emerald-100 bg-emerald-50/30 pl-8 pr-3 py-1.5 text-xs text-emerald-950 placeholder-emerald-800/40 focus:border-emerald-500 focus:bg-white focus:outline-none"
              autoFocus
            />
          </div>

          {/* List */}
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
            {filteredAsanas.length === 0 ? (
              <p className="py-4 text-center text-xs text-slate-400">No asanas found</p>
            ) : (
              filteredAsanas.map((asana) => {
                const isSelected = asana.id === currentAsana.id;
                return (
                  <button
                    key={asana.id}
                    type="button"
                    onClick={() => {
                      onSelectAsana(asana);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`flex items-center justify-between w-full rounded-xl px-3 py-2 text-left text-xs transition ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-950 font-bold border border-emerald-200/70"
                        : "hover:bg-emerald-50/40 text-emerald-900 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {asana.imageUrl && (
                        <img
                          src={asana.imageUrl}
                          alt={asana.name}
                          className="h-8 w-8 rounded-lg object-contain bg-white p-0.5 border border-emerald-100 shrink-0"
                        />
                      )}
                      <div className="min-w-0 truncate">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate font-semibold text-emerald-950">{asana.name}</p>
                          {asana.difficulty && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded-md">
                              {asana.difficulty}
                            </span>
                          )}
                        </div>
                        {asana.sanskritName && (
                          <p className="truncate text-[10px] text-emerald-700/75 italic">
                            {asana.sanskritName}
                          </p>
                        )}
                      </div>
                    </div>
                    {isSelected && <Check size={14} className="text-emerald-700 shrink-0 ml-2" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
