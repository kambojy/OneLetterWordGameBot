import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { u as useGame, D as DIFFICULTY_LABELS } from "./router-uik1IF-k.js";
import "react";
function Home() {
  const {
    settings,
    updateSettings,
    startGame,
    history
  } = useGame();
  const navigate = useNavigate();
  const difficulties = ["easy", "medium", "hard"];
  const timers = [30, 60, 90, 120];
  const handleStart = () => {
    startGame();
    navigate({
      to: "/game"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "app-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "app-header", children: [
      /* @__PURE__ */ jsx("h1", { className: "app-title", children: "Буква!" }),
      /* @__PURE__ */ jsx("p", { className: "app-subtitle", children: "Объясни слово одной буквой" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-title", children: "Сложность" }),
      /* @__PURE__ */ jsx("div", { className: "button-group", children: difficulties.map((d) => /* @__PURE__ */ jsx("button", { onClick: () => updateSettings({
        difficulty: d
      }), className: `toggle-btn ${settings.difficulty === d ? "toggle-btn--active" : ""}`, children: DIFFICULTY_LABELS[d] }, d)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-title", children: "Режим таймера" }),
      /* @__PURE__ */ jsxs("div", { className: "button-group", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => updateSettings({
          timerMode: "countdown"
        }), className: `toggle-btn ${settings.timerMode === "countdown" ? "toggle-btn--active" : ""}`, children: "⏱ Обратный отсчет" }),
        /* @__PURE__ */ jsx("button", { onClick: () => updateSettings({
          timerMode: "stopwatch"
        }), className: `toggle-btn ${settings.timerMode === "stopwatch" ? "toggle-btn--active" : ""}`, children: "⏱ Секундомер" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "hint-text", style: {
        marginTop: 8
      }, children: settings.timerMode === "countdown" ? "Таймер отсчитывает время до конца раунда" : "Таймер считает время вперед — видишь, сколько объясняешь слово" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-title", children: "Время раунда" }),
      /* @__PURE__ */ jsx("div", { className: "button-group", children: timers.map((t) => /* @__PURE__ */ jsxs("button", { onClick: () => updateSettings({
        timerDuration: t
      }), className: `toggle-btn ${settings.timerDuration === t ? "toggle-btn--active" : ""}`, children: [
        t,
        "с"
      ] }, t)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-title", children: "Слов за ход" }),
      /* @__PURE__ */ jsx("div", { className: "button-group", children: [3, 5, 7, 10].map((n) => /* @__PURE__ */ jsx("button", { onClick: () => updateSettings({
        wordsPerRound: n
      }), className: `toggle-btn ${settings.wordsPerRound === n ? "toggle-btn--active" : ""}`, children: n }, n)) })
    ] }),
    /* @__PURE__ */ jsx("button", { onClick: handleStart, className: "btn-primary btn-large", children: "Начать игру" }),
    /* @__PURE__ */ jsxs("div", { className: "nav-row", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/history", className: "nav-link", children: [
        "📋 История",
        history.length > 0 && /* @__PURE__ */ jsx("span", { className: "badge", children: history.length })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/settings", className: "nav-link", children: "⚙️ Слова" })
    ] })
  ] });
}
export {
  Home as component
};
