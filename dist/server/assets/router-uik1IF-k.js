import { createRootRoute, HeadContent, Outlet, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, createContext, useContext } from "react";
const DIFFICULTY_LABELS = {
  easy: "Лёгкий",
  medium: "Средний",
  hard: "Сложный"
};
const LETTER_POOLS = {
  easy: ["Б", "В", "Г", "Д", "К", "Л", "М", "Н", "П", "Р", "С", "Т"],
  medium: ["А", "Б", "В", "Г", "Д", "З", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Х", "Ч", "Ш"],
  hard: ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Э", "Ю", "Я"]
};
const DEFAULT_WORDS = {
  easy: [
    "кошка",
    "собака",
    "дом",
    "стол",
    "стул",
    "машина",
    "книга",
    "дерево",
    "солнце",
    "луна",
    "рыба",
    "птица",
    "хлеб",
    "молоко",
    "вода",
    "огонь",
    "небо",
    "земля",
    "гора",
    "река",
    "море",
    "лес",
    "цветок",
    "снег",
    "дождь",
    "мяч",
    "яблоко",
    "морковь",
    "кот",
    "пёс",
    "мышь",
    "конь",
    "нос",
    "рот",
    "глаз",
    "рука",
    "нога",
    "голова",
    "ухо",
    "зуб",
    "мама",
    "папа",
    "друг",
    "школа",
    "парк",
    "магазин",
    "улица",
    "кровать",
    "подушка",
    "окно",
    "дверь",
    "ключ",
    "замок",
    "лампа",
    "тарелка",
    "ложка",
    "вилка",
    "чашка",
    "нож",
    "суп",
    "каша",
    "мороженое",
    "торт",
    "конфета",
    "печенье",
    "пирог",
    "сок",
    "чай",
    "лошадь",
    "корова",
    "свинья",
    "курица",
    "утка",
    "кролик",
    "лиса",
    "волк",
    "медведь",
    "заяц",
    "белка",
    "ёж",
    "черепаха",
    "попугай"
  ],
  medium: [
    "телефон",
    "компьютер",
    "автобус",
    "велосипед",
    "самолёт",
    "поезд",
    "фотография",
    "музыкант",
    "учитель",
    "библиотека",
    "путешествие",
    "фестиваль",
    "праздник",
    "концерт",
    "театр",
    "кинотеатр",
    "музей",
    "ресторан",
    "супермаркет",
    "больница",
    "аптека",
    "стадион",
    "бассейн",
    "университет",
    "студент",
    "профессор",
    "директор",
    "инженер",
    "программист",
    "художник",
    "писатель",
    "певец",
    "актёр",
    "режиссёр",
    "документ",
    "паспорт",
    "билет",
    "договор",
    "журнал",
    "газета",
    "холодильник",
    "микроволновка",
    "стиральная машина",
    "пылесос",
    "телевизор",
    "наушники",
    "зарядное устройство",
    "планшет",
    "светофор",
    "пешеход",
    "перекрёсток",
    "парковка",
    "заправка",
    "вокзал",
    "аэропорт",
    "паспортный контроль",
    "таможня",
    "пограничник",
    "пианист",
    "скрипач",
    "гитарист",
    "барабанщик",
    "дирижёр",
    "скульптор",
    "архитектор",
    "дизайнер",
    "фотограф",
    "журналист"
  ],
  hard: [
    "атмосфера",
    "философия",
    "температура",
    "электричество",
    "эволюция",
    "архитектура",
    "правительство",
    "экономика",
    "демократия",
    "конституция",
    "астрономия",
    "биология",
    "психология",
    "социология",
    "антропология",
    "лингвистика",
    "гравитация",
    "магнетизм",
    "электрон",
    "молекула",
    "эксперимент",
    "гипотеза",
    "теорема",
    "аксиома",
    "парадокс",
    "метафора",
    "аллегория",
    "символизм",
    "абстракция",
    "концепция",
    "инфраструктура",
    "технология",
    "цивилизация",
    "революция",
    "суверенитет",
    "федерация",
    "республика",
    "монархия",
    "бюрократия",
    "предпринимательство",
    "инвестиция",
    "дивиденд",
    "акционер",
    "фотосинтез",
    "метаболизм",
    "иммунитет",
    "антибиотик",
    "вакцинация",
    "нейрохирургия",
    "кардиология",
    "офтальмология",
    "стоматология",
    "криптография",
    "алгоритм",
    "искусственный интеллект",
    "нейронная сеть",
    "квантовая механика",
    "термодинамика",
    "аэродинамика",
    "электродинамика",
    "мифология",
    "теология",
    "эзотерика",
    "астрология",
    "нумерология"
  ]
};
const GameContext = createContext(null);
function load(key, def) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : def;
  } catch {
    return def;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}
const DEFAULT_SETTINGS = {
  difficulty: "easy",
  timerDuration: 60,
  wordsPerRound: 5,
  timerMode: "countdown"
};
function pickLetter(difficulty) {
  const pool = LETTER_POOLS[difficulty];
  return pool[Math.floor(Math.random() * pool.length)];
}
function buildRound(difficulty, count, customWords) {
  const defaults = DEFAULT_WORDS[difficulty];
  const custom = customWords.filter((w) => w.difficulty === difficulty).map((w) => w.word);
  const all = [...defaults, ...custom];
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length)).map((word) => ({
    word,
    letter: pickLetter(difficulty),
    status: "pending"
  }));
}
function GameProvider({ children }) {
  const [settings, setSettings] = useState(() => load("wg_settings", DEFAULT_SETTINGS));
  const [customWords, setCustomWords] = useState(() => load("wg_words", []));
  const [history, setHistory] = useState(() => load("wg_history", []));
  const [activeGame, setActiveGame] = useState(null);
  const updateSettings = (update) => {
    setSettings((prev) => {
      const next = { ...prev, ...update };
      save("wg_settings", next);
      return next;
    });
  };
  const addWord = (word, difficulty) => {
    setCustomWords((prev) => {
      const next = [...prev, { id: crypto.randomUUID(), word: word.trim().toLowerCase(), difficulty }];
      save("wg_words", next);
      return next;
    });
  };
  const removeWord = (id) => {
    setCustomWords((prev) => {
      const next = prev.filter((w) => w.id !== id);
      save("wg_words", next);
      return next;
    });
  };
  const addHistory = (entries) => {
    setHistory((prev) => {
      const next = [...entries.map((e) => ({ ...e, id: crypto.randomUUID(), timestamp: Date.now() })), ...prev];
      save("wg_history", next);
      return next;
    });
  };
  const removeHistory = (id) => {
    setHistory((prev) => {
      const next = prev.filter((h) => h.id !== id);
      save("wg_history", next);
      return next;
    });
  };
  const updateHistoryEntry = (id, guessed) => {
    setHistory((prev) => {
      const next = prev.map((h) => h.id === id ? { ...h, guessed } : h);
      save("wg_history", next);
      return next;
    });
  };
  const clearHistory = () => {
    setHistory([]);
    save("wg_history", []);
  };
  const startGame = () => {
    const { difficulty, wordsPerRound, timerDuration, timerMode } = settings;
    setActiveGame({
      phase: "player1",
      player1Words: buildRound(difficulty, wordsPerRound, customWords),
      player2Words: buildRound(difficulty, wordsPerRound, customWords),
      currentIndex: 0,
      difficulty,
      timerDuration,
      timerMode
    });
  };
  const markWord = (status) => {
    setActiveGame((prev) => {
      if (!prev) return prev;
      const isP1 = prev.phase === "player1";
      const words = isP1 ? [...prev.player1Words] : [...prev.player2Words];
      words[prev.currentIndex] = { ...words[prev.currentIndex], status };
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex >= words.length) {
        return isP1 ? { ...prev, player1Words: words, phase: "player1-results", currentIndex: 0 } : { ...prev, player2Words: words, phase: "final", currentIndex: 0 };
      }
      return isP1 ? { ...prev, player1Words: words, currentIndex: nextIndex } : { ...prev, player2Words: words, currentIndex: nextIndex };
    });
  };
  const skipRemainingWords = () => {
    setActiveGame((prev) => {
      if (!prev) return prev;
      const isP1 = prev.phase === "player1";
      const words = isP1 ? [...prev.player1Words] : [...prev.player2Words];
      for (let i = prev.currentIndex; i < words.length; i++) {
        if (words[i].status === "pending") {
          words[i] = { ...words[i], status: "skipped" };
        }
      }
      return isP1 ? { ...prev, player1Words: words, phase: "player1-results", currentIndex: 0 } : { ...prev, player2Words: words, phase: "final", currentIndex: 0 };
    });
  };
  const nextPhase = () => {
    setActiveGame((prev) => {
      if (!prev) return prev;
      if (prev.phase === "player1-results") {
        return { ...prev, phase: "player2", currentIndex: 0 };
      }
      return prev;
    });
  };
  const resetGame = () => {
    if (activeGame) {
      const allWords = [...activeGame.player1Words, ...activeGame.player2Words].filter((w) => w.status !== "pending").map((w) => ({
        word: w.word,
        letter: w.letter,
        difficulty: activeGame.difficulty,
        guessed: w.status === "guessed"
      }));
      if (allWords.length > 0) addHistory(allWords);
    }
    setActiveGame(null);
  };
  return /* @__PURE__ */ jsx(GameContext.Provider, { value: {
    settings,
    customWords,
    history,
    activeGame,
    updateSettings,
    addWord,
    removeWord,
    addHistory,
    removeHistory,
    updateHistoryEntry,
    clearHistory,
    startGame,
    markWord,
    skipRemainingWords,
    nextPhase,
    resetGame
  }, children });
}
function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "title", content: "Буква!" },
      { name: "description", content: "Игра на объяснение слов с одной буквой" }
    ],
    scripts: [
      { src: "https://telegram.org/js/telegram-web-app.js" }
    ]
  }),
  component: Root
});
function Root() {
  return /* @__PURE__ */ jsxs("html", { lang: "ru", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(GameProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$3 = () => import("./settings-BmGYungc.js");
const Route$3 = createFileRoute("/settings")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./history-DquYQ3Je.js");
const Route$2 = createFileRoute("/history")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./game-BLqDPP3O.js");
const Route$1 = createFileRoute("/game")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-D-ZOVk-g.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SettingsRoute = Route$3.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$4
});
const HistoryRoute = Route$2.update({
  id: "/history",
  path: "/history",
  getParentRoute: () => Route$4
});
const GameRoute = Route$1.update({
  id: "/game",
  path: "/game",
  getParentRoute: () => Route$4
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  GameRoute,
  HistoryRoute,
  SettingsRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  DIFFICULTY_LABELS as D,
  DEFAULT_WORDS as a,
  router as r,
  useGame as u
};
