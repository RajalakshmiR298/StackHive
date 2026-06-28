import { useState } from "react";

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
    if (!tag.trim()) return;

    if (!value.includes(tag)) {
      onChange([...value, tag]);
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
    <div style={{ marginBottom: "25px" }}>
      <label
        style={{
          color: "#ddd6fe",
          fontWeight: "600",
          display: "block",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>

      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "12px",
          padding: "12px",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        {/* Selected Tags */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          {value.map((tag) => (
            <span
              key={tag}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 14px",
                background:
                  "linear-gradient(135deg,#8b5cf6,#6d28d9)",
                color: "#fff",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {tag}

              <button
                type="button"
                onClick={() => removeTag(tag)}
                style={{
                  marginLeft: "8px",
                  background: "transparent",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Input */}

        <input
          type="text"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#fff",
            fontSize: "15px",
          }}
        />
      </div>

      {/* Suggestions */}

      {input && filteredSuggestions.length > 0 && (
        <div
          style={{
            marginTop: "8px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#1e1b4b",
            boxShadow: "0 12px 25px rgba(0,0,0,.35)",
            maxHeight: "220px",
            overflowY: "auto",
          }}
        >
          {filteredSuggestions.slice(0, 6).map((item) => (
            <div
              key={item}
              onClick={() => addTag(item)}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                color: "#fff",
                borderBottom:
                  "1px solid rgba(255,255,255,.05)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "#7c3aed")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "transparent")
              }
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;