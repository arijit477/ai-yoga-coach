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

  const filteredAsanas = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return asanas;
    return asanas.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        (a.sanskritName && a.sanskritName.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q),
    );
  }, [asanas, searchQuery]);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
          Asana:
        </span>
        <span className="font-bold text-slate-900 truncate max-w-[140px] sm:max-w-[200px]">
          {currentAsana.name}
        </span>
        {currentAsana.sanskritName && (
          <span className="hidden md:inline text-[11px] text-slate-500 font-normal italic">
            ({currentAsana.sanskritName})
          </span>
        )}
        <ChevronDown size={14} className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Searchable Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Input */}
          <div className="relative mb-2">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search asana by name or Sanskrit..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none"
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
                        ? "bg-emerald-50 text-emerald-900 font-bold"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {asana.imageUrl && (
                        <img
                          src={asana.imageUrl}
                          alt={asana.name}
                          className="h-8 w-8 rounded-lg object-contain bg-slate-100 p-0.5 border border-slate-200/60 shrink-0"
                        />
                      )}
                      <div className="min-w-0 truncate">
                        <p className="truncate font-semibold text-slate-900">{asana.name}</p>
                        {asana.sanskritName && (
                          <p className="truncate text-[10px] text-slate-500 italic">
                            {asana.sanskritName}
                          </p>
                        )}
                      </div>
                    </div>
                    {isSelected && <Check size={14} className="text-emerald-600 shrink-0 ml-2" />}
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
