import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { u as useGame, D as DIFFICULTY_LABELS, a as DEFAULT_WORDS } from "./router-uik1IF-k.js";
import { useState } from "react";
function SettingsPage() {
  const {
    customWords,
    addWord,
    removeWord
  } = useGame();
  const [newWord, setNewWord] = useState("");
  const [newDiff, setNewDiff] = useState("easy");
  const [tab, setTab] = useState("easy");
  const [error, setError] = useState("");
  const handleAdd = () => {
    const w = newWord.trim().toLowerCase();
    if (!w) {
      setError("Введи слово");
      return;
    }
    if (w.length < 2) {
      setError("Слово слишком короткое");
      return;
    }
    const exists = DEFAULT_WORDS[newDiff].includes(w) || customWords.some((c) => c.word === w && c.difficulty === newDiff);
    if (exists) {
      setError("Такое слово уже есть");
      return;
    }
    addWord(w, newDiff);
    setNewWord("");
    setError("");
    setTab(newDiff);
  };
  const difficulties = ["easy", "medium", "hard"];
  const tabWords = customWords.filter((w) => w.difficulty === tab);
  const defaultTabWords = DEFAULT_WORDS[tab];
  return /* @__PURE__ */ jsxs("div", { className: "app-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "btn-ghost btn-small", children: "← Назад" }),
      /* @__PURE__ */ jsx("h1", { className: "page-title", children: "Слова" }),
      /* @__PURE__ */ jsx("div", { style: {
        width: 60
      } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-title", children: "Добавить слово" }),
      /* @__PURE__ */ jsx("div", { className: "button-group", style: {
        marginBottom: 12
      }, children: difficulties.map((d) => /* @__PURE__ */ jsx("button", { onClick: () => setNewDiff(d), className: `toggle-btn ${newDiff === d ? "toggle-btn--active" : ""}`, children: DIFFICULTY_LABELS[d] }, d)) }),
      /* @__PURE__ */ jsxs("div", { className: "input-row", children: [
        /* @__PURE__ */ jsx("input", { type: "text", value: newWord, onChange: (e) => {
          setNewWord(e.target.value);
          setError("");
        }, onKeyDown: (e) => e.key === "Enter" && handleAdd(), placeholder: "Новое слово...", className: "text-input" }),
        /* @__PURE__ */ jsx("button", { onClick: handleAdd, className: "btn-primary btn-small", children: "+" })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "error-text", children: error })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsx("div", { className: "button-group", style: {
        marginBottom: 12
      }, children: difficulties.map((d) => /* @__PURE__ */ jsx("button", { onClick: () => setTab(d), className: `toggle-btn ${tab === d ? "toggle-btn--active" : ""}`, children: DIFFICULTY_LABELS[d] }, d)) }),
      tabWords.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { className: "hint-text", children: [
          "Мои слова (",
          tabWords.length,
          ")"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "word-list word-list--scrollable", children: tabWords.map((w) => /* @__PURE__ */ jsxs("div", { className: "word-list-item", children: [
          /* @__PURE__ */ jsx("span", { className: "word-list-word", children: w.word }),
          /* @__PURE__ */ jsx("button", { onClick: () => removeWord(w.id), className: "btn-danger btn-tiny", children: "✕" })
        ] }, w.id)) }),
        /* @__PURE__ */ jsx("div", { className: "divider" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "hint-text", children: [
        "Стандартные слова (",
        defaultTabWords.length,
        ")"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "word-list word-list--compact", children: defaultTabWords.map((w) => /* @__PURE__ */ jsx("div", { className: "word-list-item word-list-item--muted", children: /* @__PURE__ */ jsx("span", { className: "word-list-word", children: w }) }, w)) })
    ] })
  ] });
}
export {
  SettingsPage as component
};
