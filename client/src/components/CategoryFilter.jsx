import { Filter } from "lucide-react";

const CategoryFilter = ({ selectedCategory, onChange }) => {
  const categories = [
    "All",
    "Workshop",
    "Hackathon",
    "Seminar",
    "Competition",
    "Meetup",
    "Networking",
    "Internship",
  ];

  return (
    <div className="relative w-full">

      {/* Filter Icon */}
      <Filter
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />

      <select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          appearance-none
          rounded-2xl
          border
          border-slate-700
          bg-slate-900/80
          py-3
          pl-12
          pr-10
          text-white
          outline-none
          transition-all
          duration-300
          cursor-pointer
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/20
        "
      >
        {categories.map((category) => (
          <option
            key={category}
            value={category}
            className="bg-slate-900"
          >
            {category === "All" ? "All Categories" : category}
          </option>
        ))}
      </select>

      {/* Dropdown Arrow */}
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
        ▼
      </div>

    </div>
  );
};

export default CategoryFilter;