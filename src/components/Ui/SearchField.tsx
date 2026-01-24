import { Search } from "lucide-react";

type SearchFieldProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
  label?: string;
};

export const SearchField = ({
  searchQuery,
  setSearchQuery,
  placeholder,
  label,
}: SearchFieldProps) => {
  return (
    <>
      <div className="flex-1">
        {label && (
        <label className="block text-sm font-semibold text-slate-600 mb-2">
          {label}
        </label>
      )}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder={placeholder }
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};
