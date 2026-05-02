import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { u as useGame, D as DIFFICULTY_LABELS } from "./router-uik1IF-k.js";
import { useState } from "react";
function HistoryPage() {
  const {
    history,
    removeHistory,
    updateHistoryEntry,
    clearHistory
  } = useGame();
  const [filter, setFilter] = useState("all");
  const [showConfirm, setShowConfirm] = useState(false);
  const filtered = filter === "all" ? history : history.filter((h) => h.difficulty === filter);
  const guessedCount = filtered.filter((h) => h.guessed).length;
  const handleClear = () => {
    clearHistory();
    setShowConfirm(false);
  };
  const toggleStatus = (id, current) => {
    updateHistoryEntry(id, !current);
  };
  return /* @__PURE__ */ jsxs("div", { className: "app-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "btn-ghost btn-small", children: "← Назад" }),
      /* @__PURE__ */ jsx("h1", { className: "page-title", children: "История" }),
      history.length > 0 && /* @__PURE__ */ jsx("button", { onClick: () => setShowConfirm(true), className: "btn-danger btn-small", children: "Очистить" })
    ] }),
    history.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsx("div", { className: "big-emoji", children: "📋" }),
      /* @__PURE__ */ jsx("p", { children: "История пуста" }),
      /* @__PURE__ */ jsx("p", { className: "hint-text", children: "Сыграй пару раундов и слова появятся здесь" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "button-group", style: {
        marginBottom: 16
      }, children: ["all", "easy", "medium", "hard"].map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(f), className: `toggle-btn ${filter === f ? "toggle-btn--active" : ""}`, children: f === "all" ? `Все (${history.length})` : DIFFICULTY_LABELS[f] }, f)) }),
      /* @__PURE__ */ jsxs("div", { className: "stats-row", children: [
        /* @__PURE__ */ jsxs("span", { className: "stat", children: [
          "✓ ",
          guessedCount,
          " угадано"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "stat", children: [
          "✗ ",
          filtered.length - guessedCount,
          " пропущено"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "word-list", children: filtered.map((h) => /* @__PURE__ */ jsxs("div", { className: `word-list-item ${h.guessed ? "word-list-item--green" : "word-list-item--red"}`, children: [
        /* @__PURE__ */ jsx("span", { className: "word-list-letter", children: h.letter }),
        /* @__PURE__ */ jsxs("div", { className: "word-list-info", children: [
          /* @__PURE__ */ jsx("span", { className: "word-list-word", children: h.word }),
          /* @__PURE__ */ jsxs("span", { className: "word-list-meta", children: [
            DIFFICULTY_LABELS[h.difficulty],
            " · ",
            new Date(h.timestamp).toLocaleDateString("ru")
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => toggleStatus(h.id, h.guessed), className: "btn-ghost btn-tiny", title: h.guessed ? "Отметить как пропущенное" : "Отметить как угаданное", children: h.guessed ? "✓" : "✗" }),
        /* @__PURE__ */ jsx("button", { onClick: () => removeHistory(h.id), className: "btn-ghost btn-tiny", children: "✕" })
      ] }, h.id)) })
    ] }),
    showConfirm && /* @__PURE__ */ jsx("div", { className: "modal-overlay", children: /* @__PURE__ */ jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ jsx("p", { children: "Очистить всю историю?" }),
      /* @__PURE__ */ jsxs("div", { className: "action-row", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setShowConfirm(false), className: "btn-ghost", children: "Отмена" }),
        /* @__PURE__ */ jsx("button", { onClick: handleClear, className: "btn-danger", children: "Очистить" })
      ] })
    ] }) })
  ] });
}
export {
  HistoryPage as component
};
