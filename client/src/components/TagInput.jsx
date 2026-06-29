import { useState } from "react";
import { X, Plus, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TagInput = ({
  label,
  placeholder,
  suggestions,
  value,
  onChange,
}) => {
  const [input, setInput] = useState("");

  const filteredSuggestions = suggestions.filter(
    (item) =>
      item.toLowerCase().includes(input.toLowerCase()) &&
      !value.includes(item)
  );

  const addTag = (tag) => {
    const newTag = tag.trim();

    if (!newTag) return;

    if (!value.includes(newTag)) {
      onChange([...value, newTag]);
    }

    setInput("");
  };

  const removeTag = (tag) => {
    onChange(value.filter((item) => item !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    }
  };

  return (
    <div className="space-y-3">

      <label className="block text-sm font-semibold text-slate-300">

        {label}

      </label>

      <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">

        {/* Selected Tags */}

        <div className="mb-4 flex flex-wrap gap-3">

          <AnimatePresence>

            {value.map((tag) => (

              <motion.div
                key={tag}
                initial={{ scale: .8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: .8, opacity: 0 }}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-md"
              >

                {tag}

                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="rounded-full p-1 transition hover:bg-white/20"
                >

                  <X size={14} />

                </button>

              </motion.div>

            ))}

          </AnimatePresence>

        </div>

        {/* Search Input */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={input}
            placeholder={placeholder}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          />

        </div>

      </div>

      {/* Suggestions */}

      <AnimatePresence>

        {input && filteredSuggestions.length > 0 && (

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
          >

            {filteredSuggestions.slice(0, 6).map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => addTag(item)}
                className="flex w-full items-center justify-between border-b border-slate-800 px-5 py-3 text-left text-slate-200 transition last:border-none hover:bg-blue-600"
              >

                <span>{item}</span>

                <Plus size={16} />

              </button>

            ))}

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default TagInput;