import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import type * as monacoType from "monaco-editor";
import axios from "axios";


import { useAppDispatch, useAppSelector } from "../hooks";
import { setRoomId, setCode, setSuggestion } from "../features/room/roomSlice";

const WS_BASE_URL = "ws://localhost:8000/v1/ws";
const API_BASE_URL = "http://localhost:8000/v1";

function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const dispatch = useAppDispatch();

  const code = useAppSelector((state) => state.room.code);
  const suggestion = useAppSelector((state) => state.room.suggestion);

  const wsRef = useRef<WebSocket | null>(null);
  const debounceTimerRef = useRef<number | null>(null);
  const editorRef = useRef<monacoType.editor.IStandaloneCodeEditor | null>(null);
  const codeRef = useRef(code);
  const suggestionRef = useRef<string | null>(null);

  useEffect(() => {
  codeRef.current = code;
  }, [code]);

  useEffect(() => {
    suggestionRef.current = suggestion;
  }, [suggestion]);

  useEffect(() => {
    if (roomId) {
      dispatch(setRoomId(roomId));
    }
  }, [roomId, dispatch]);

  useEffect(() => {
    if (!roomId) return;

    const ws = new WebSocket(`${WS_BASE_URL}/${roomId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected to room:", roomId);
    };

    ws.onmessage = (event) => {
      const incomingCode = event.data as string;
      dispatch(setCode(incomingCode));
      dispatch(setSuggestion(null));
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected from room:", roomId);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [roomId, dispatch]);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value ?? "";
    dispatch(setCode(newCode));

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(newCode);
    }

    dispatch(setSuggestion(null));

    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      triggerAutocomplete(newCode);
    }, 600);
  };

  const triggerAutocomplete = async (currentCode: string) => {
    if (!currentCode.trim()) {
      dispatch(setSuggestion(null));
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/autocomplete`, {
        code: currentCode,
        cursorPosition: currentCode.length, 
        language: "python",
      });

      const suggestionText = res.data?.suggestion ?? null;
      dispatch(setSuggestion(suggestionText));
    } catch (err) {
      console.error("Autocomplete error:", err);
      dispatch(setSuggestion(null));
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      const combined = code + "\n" + suggestion; 
      dispatch(setCode(combined));
      dispatch(setSuggestion(null));

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(combined);
      }
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        height: "100vh",
        boxSizing: "border-box",
        backgroundColor: "#1e1e1e",
        color: "#f3f3f3",
        display: "flex",
        flexDirection: "column",
      }}
      onKeyDown={handleKeyDown}
    >
      <header style={{ marginBottom: "0.5rem" }}>
        <h2 style={{ margin: 0 }}>Room: {roomId}</h2>
        <small>Start typing below. Open this room in another tab to see live sync.</small>
      </header>

      <div style={{ flex: 1, borderRadius: "4px", overflow: "hidden" }}>
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          onMount={(editor, monaco) => {
            editorRef.current = editor;

            editor.addCommand(monaco.KeyCode.Tab, () => {
              const sugg = suggestionRef.current;
              const currentCode = codeRef.current ?? "";

              if (!sugg) {
                editor.trigger("keyboard", "type", { text: "\t" });
                return;
              }

              const newCode = currentCode + "\n" + sugg;

              dispatch(setCode(newCode));
              dispatch(setSuggestion(null));

              if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(newCode);
              }

              editor.setValue(newCode);
              const model = editor.getModel();
              if (model) {
                const endLine = model.getLineCount();
                const endCol = model.getLineMaxColumn(endLine);
                editor.setPosition({ lineNumber: endLine, column: endCol });
              }
            });
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
          }}
        />
      </div>

      <div style={{ marginTop: "0.5rem", minHeight: "1.5rem" }}>
        {suggestion && (
          <div
            style={{
              padding: "0.5rem 0.75rem",
              backgroundColor: "#252526",
              borderRadius: "4px",
              border: "1px solid #3c3c3c",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              color: "#9cdcfe",
            }}
          >
            <strong>Suggestion:</strong> {suggestion}
            <span style={{ color: "#808080", marginLeft: "0.5rem" }}>
              (Press Tab to insert)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomPage;