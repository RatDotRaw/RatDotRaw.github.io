import React, { useState, useRef, useEffect } from "react";

interface CommandHistoryItem {
  id: number;
  command: string;
  output: string;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    { id: 1, command: "", output: "Welcome to ReactOS Terminal v1.0" },
    { id: 2, command: "", output: 'Type "help" for available commands' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [history]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = (command: string): string => {
    const cmd = command.trim().toLowerCase();

    switch (cmd) {
      case "":
        return "";
      case "help":
        return [
          "Available commands:",
          "  help     - Show this help message",
          "  clear    - Clear the terminal",
          "  echo     - Display text",
          "  date     - Show current date",
          "  whoami   - Display current user",
          "  pwd      - Show current directory",
          "  ls       - List directory contents",
          "  hello    - Say hello",
        ].join("\n");
      case "clear":
        setHistory([]);
        return "";
      case "date":
        return new Date().toLocaleString();
      case "whoami":
        return "user@reactos";
      case "pwd":
        return "C:\\Users\\User\\Desktop";
      case "ls":
        return [
          "Directory of C:\\Users\\User\\Desktop",
          "",
          "01/01/2024  10:00 AM    <DIR>          Documents",
          "01/01/2024  10:00 AM    <DIR>          Downloads",
          "01/01/2024  10:00 AM    <DIR>          Pictures",
          "01/01/2024  10:00 AM               123 hello.txt",
          "01/01/2024  10:00 AM             1,234 document.pdf",
        ].join("\n");
      case "hello":
        return "Hello there! Welcome to ReactOS Terminal!";
      default:
        if (cmd.startsWith("echo ")) {
          return command.substring(5);
        }
        return `'${command}' is not recognized as an internal or external command`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === "" && history.length > 0) {
      return;
    }

    const output = executeCommand(input);

    if (input.trim() !== "") {
      setHistory((prev) => [
        ...prev,
        { id: Date.now(), command: input, output },
      ]);

      // Add to command history
      setCommandHistory((prev) => [...prev, input]);
    } else if (output) {
      setHistory((prev) => [...prev, { id: Date.now(), command: "", output }]);
    }

    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion for common commands
      const commands = [
        "help",
        "clear",
        "echo",
        "date",
        "whoami",
        "pwd",
        "ls",
        "hello",
      ];
      const matchingCommand = commands.find((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );
      if (matchingCommand) {
        setInput(matchingCommand);
      }
    }
  };

  return (
    <div
      style={{
        height: "100%",
        color: "white",
        fontFamily: "monospace",
        fontSize: "14px",
        padding: "10px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item) => (
        <div key={item.id} style={{ marginBottom: "8px" }}>
          {item.command && (
            <div>
              <span style={{ color: "#00ff00" }}>user@reactos:</span>
              <span style={{ color: "#ffffff" }}>~$ </span>
              <span>{item.command}</span>
            </div>
          )}
          {item.output && (
            <div
              style={{
                whiteSpace: "pre-wrap",
                marginTop: item.command ? "4px" : "0",
              }}
            >
              {item.output}
            </div>
          )}
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "4px",
        }}
      >
        <span style={{ color: "#00ff00", marginRight: "8px" }}>
          user@reactos:
        </span>
        <span style={{ color: "#ffffff", marginRight: "4px" }}>~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            fontFamily: "monospace",
            fontSize: "14px",
            outline: "none",
            flex: 1,
            caretColor: "white",
          }}
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </form>

      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;
