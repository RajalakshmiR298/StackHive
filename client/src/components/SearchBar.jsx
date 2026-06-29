import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full">

      {/* Search Icon */}
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={20}
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search events..."
        className="
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-900/80
          py-3
          pl-12
          pr-12
          text-white
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/20
        "
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-slate-400
            transition
            hover:bg-slate-700
            hover:text-white
          "
        >
          <X size={18} />
        </button>
      )}

    </div>
  );
};

export default SearchBar;