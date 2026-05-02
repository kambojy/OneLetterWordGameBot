import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { u as useGame } from "./router-uik1IF-k.js";
import { useEffect, useState, useRef } from "react";
function GamePage() {
  const {
    activeGame,
    nextPhase,
    resetGame
  } = useGame();
  const navigate = useNavigate();
  useEffect(() => {
    if (!activeGame) navigate({
      to: "/"
    });
  }, [activeGame, navigate]);
  if (!activeGame) return null;
  const {
    phase
  } = activeGame;
  if (phase === "player1" || phase === "player2") {
    return /* @__PURE__ */ jsx(TurnScreen, {});
  }
  if (phase === "player1-results") {
    return /* @__PURE__ */ jsx(PlayerResults, { playerNum: 1, onContinue: nextPhase, onExit: () => {
      resetGame();
      navigate({
        to: "/"
      });
    } });
  }
  if (phase === "final") {
    return /* @__PURE__ */ jsx(FinalScreen, { onExit: () => {
      resetGame();
      navigate({
        to: "/"
      });
    } });
  }
  return null;
}
function TurnScreen() {
  const {
    activeGame,
    markWord,
    resetGame
  } = useGame();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const game = activeGame;
  const isP1 = game.phase === "player1";
  const isStopwatch = game.timerMode === "stopwatch";
  const words = isP1 ? game.player1Words : game.player2Words;
  const current = words[game.currentIndex];
  const playerNum = isP1 ? 1 : 2;
  useEffect(() => {
    setTimeLeft(isStopwatch ? 0 : game.timerDuration);
    setTimerActive(false);
    setStarted(false);
    setPaused(false);
  }, [game.phase, game.currentIndex, isStopwatch, game.timerDuration]);
  useEffect(() => {
    if (!timerActive || paused) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (isStopwatch) {
          return t + 1;
        } else {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setTimerActive(false);
            return 0;
          }
          return t - 1;
        }
      });
    }, 1e3);
    return () => clearInterval(intervalRef.current);
  }, [timerActive, isStopwatch]);
  const timeExpired = !isStopwatch && timeLeft === 0 && started;
  const handleStart = () => {
    setStarted(true);
    setTimerActive(true);
  };
  const handlePause = () => {
    setPaused(!paused);
    if (paused) {
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  };
  const handleMark = (status) => {
    setTimeLeft(isStopwatch ? 0 : game.timerDuration);
    setTimerActive(true);
    markWord(status);
  };
  const handleTimeExpired = () => {
    markWord("skipped");
    setTimeLeft(isStopwatch ? 0 : game.timerDuration);
    setTimerActive(true);
  };
  const handleExit = () => {
    clearInterval(intervalRef.current);
    resetGame();
    navigate({
      to: "/"
    });
  };
  const pct = isStopwatch ? Math.min(timeLeft / game.timerDuration * 100, 100) : timeLeft / game.timerDuration * 100;
  const timerColor = isStopwatch ? timeLeft < 30 ? "#4ade80" : timeLeft < 60 ? "#facc15" : "#f87171" : timeLeft > 20 ? "#4ade80" : timeLeft > 10 ? "#facc15" : "#f87171";
  if (!started) {
    return /* @__PURE__ */ jsxs("div", { className: "app-screen app-screen--centered", children: [
      /* @__PURE__ */ jsxs("div", { className: "player-badge", children: [
        "Игрок ",
        playerNum
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "instruction-text", children: [
        "Передай телефон игроку ",
        playerNum,
        ".",
        /* @__PURE__ */ jsx("br", {}),
        "Объясняй слова только словами на заданную букву."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "timer-display", style: {
        color: timerColor
      }, children: isStopwatch ? "0с" : `${game.timerDuration}с` }),
      /* @__PURE__ */ jsx("p", { className: "hint-text", children: isStopwatch ? "Таймер будет считать время вперед" : "Таймер отсчитывает время назад" }),
      /* @__PURE__ */ jsx("button", { onClick: handleStart, className: "btn-primary btn-large", children: "Поехали!" }),
      /* @__PURE__ */ jsx("button", { onClick: handleExit, className: "btn-ghost", children: "Выйти" })
    ] });
  }
  if (timeExpired) {
    return /* @__PURE__ */ jsxs("div", { className: "app-screen app-screen--centered", children: [
      /* @__PURE__ */ jsx("div", { className: "big-emoji", children: "⏰" }),
      /* @__PURE__ */ jsx("h2", { className: "result-title", children: "Время вышло!" }),
      /* @__PURE__ */ jsx("p", { className: "instruction-text", children: "Переходим к следующему слову..." }),
      /* @__PURE__ */ jsx("button", { onClick: handleTimeExpired, className: "btn-primary btn-large", children: "Дальше →" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "app-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "game-header", children: [
      /* @__PURE__ */ jsx("button", { onClick: handleExit, className: "btn-ghost btn-small", children: "✕" }),
      /* @__PURE__ */ jsxs("div", { className: "progress-text", children: [
        game.currentIndex + 1,
        " / ",
        words.length
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: handlePause, className: "btn-ghost btn-small", children: paused ? "▶️ Продолжить" : "⏸ Пауза" })
    ] }),
    paused && /* @__PURE__ */ jsx("div", { className: "modal-overlay", children: /* @__PURE__ */ jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ jsx("h2", { className: "result-title", children: "⏸ Пауза" }),
      /* @__PURE__ */ jsx("p", { className: "instruction-text", children: "Отдохни и нажми продолжить" }),
      /* @__PURE__ */ jsx("button", { onClick: handlePause, className: "btn-primary btn-large", children: "Продолжить ▶️" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "timer-bar-wrap", children: /* @__PURE__ */ jsx("div", { className: "timer-bar", style: {
      width: `${pct}%`,
      backgroundColor: timerColor
    } }) }),
    /* @__PURE__ */ jsx("div", { className: "timer-num", style: {
      color: timerColor
    }, children: isStopwatch ? `+${timeLeft}с` : `${timeLeft}с` }),
    /* @__PURE__ */ jsxs("div", { className: "word-card", children: [
      /* @__PURE__ */ jsx("div", { className: "letter-badge", children: current.letter }),
      /* @__PURE__ */ jsx("div", { className: "word-text", children: current.word }),
      /* @__PURE__ */ jsxs("p", { className: "word-hint", children: [
        "Объясняй только словами на «",
        current.letter,
        "»"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "action-row", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => handleMark("skipped"), className: "btn-skip", children: "Пропустить" }),
      /* @__PURE__ */ jsx("button", { onClick: () => handleMark("guessed"), className: "btn-success", children: "Угадали! ✓" })
    ] })
  ] });
}
function PlayerResults({
  playerNum,
  onContinue,
  onExit
}) {
  const {
    activeGame
  } = useGame();
  const words = playerNum === 1 ? activeGame.player1Words : activeGame.player2Words;
  const guessed = words.filter((w) => w.status === "guessed").length;
  const skipped = words.filter((w) => w.status === "skipped").length;
  return /* @__PURE__ */ jsxs("div", { className: "app-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "result-header", children: [
      /* @__PURE__ */ jsxs("h2", { className: "result-title", children: [
        "Игрок ",
        playerNum,
        " — итог"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "score-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "score-box score-box--green", children: [
          /* @__PURE__ */ jsx("span", { className: "score-num", children: guessed }),
          /* @__PURE__ */ jsx("span", { className: "score-label", children: "угадано" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "score-box score-box--red", children: [
          /* @__PURE__ */ jsx("span", { className: "score-num", children: skipped }),
          /* @__PURE__ */ jsx("span", { className: "score-label", children: "пропущено" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "word-list", children: words.map((w, i) => /* @__PURE__ */ jsxs("div", { className: `word-list-item ${w.status === "guessed" ? "word-list-item--green" : "word-list-item--red"}`, children: [
      /* @__PURE__ */ jsx("span", { className: "word-list-letter", children: w.letter }),
      /* @__PURE__ */ jsx("span", { className: "word-list-word", children: w.word }),
      /* @__PURE__ */ jsx("span", { className: "word-list-status", children: w.status === "guessed" ? "✓" : "✗" })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "action-col", children: [
      /* @__PURE__ */ jsx("button", { onClick: onContinue, className: "btn-primary btn-large", children: "Ход игрока 2 →" }),
      /* @__PURE__ */ jsx("button", { onClick: onExit, className: "btn-ghost", children: "Закончить" })
    ] })
  ] });
}
function FinalScreen({
  onExit
}) {
  const {
    activeGame
  } = useGame();
  const p1 = activeGame.player1Words.filter((w) => w.status === "guessed").length;
  const p2 = activeGame.player2Words.filter((w) => w.status === "guessed").length;
  const winner = p1 > p2 ? 1 : p2 > p1 ? 2 : 0;
  return /* @__PURE__ */ jsxs("div", { className: "app-screen app-screen--centered", children: [
    /* @__PURE__ */ jsx("div", { className: "big-emoji", children: winner === 0 ? "🤝" : "🏆" }),
    /* @__PURE__ */ jsx("h2", { className: "result-title", children: winner === 0 ? "Ничья!" : `Победил игрок ${winner}!` }),
    /* @__PURE__ */ jsxs("div", { className: "final-scores", children: [
      /* @__PURE__ */ jsxs("div", { className: `final-score-row ${winner === 1 ? "final-score-row--winner" : ""}`, children: [
        /* @__PURE__ */ jsx("span", { children: "Игрок 1" }),
        /* @__PURE__ */ jsx("span", { className: "final-score-num", children: p1 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `final-score-row ${winner === 2 ? "final-score-row--winner" : ""}`, children: [
        /* @__PURE__ */ jsx("span", { children: "Игрок 2" }),
        /* @__PURE__ */ jsx("span", { className: "final-score-num", children: p2 })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "action-col", children: /* @__PURE__ */ jsx("button", { onClick: onExit, className: "btn-primary btn-large", children: "На главную" }) })
  ] });
}
export {
  GamePage as component
};
