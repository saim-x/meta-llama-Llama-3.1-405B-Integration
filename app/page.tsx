"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, Send, User2 } from "lucide-react";
import Markdown from "./component/markdown";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/llm-response",
    });
  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-900 text-white">
      {/* form element */}
      {RenderForm()}
      {RenderMessages()}
      {/* rendering messages */}
    </main>
  );

  // inner render functions
  function RenderForm() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              prompt: input,
            },
          });
        }}
        className="w-full flex flex-row gap-2 items-center h-full"
      >
        <input
          type="text"
          placeholder={isLoading ? "Generating . . ." : "Ask something . . ."}
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          className="border-b border-white outline-none w-full px-4 py-2 bg-transparent text-white placeholder:text-white/50 text-right focus:placeholder-transparent disabled:bg-transparent transition duration-300 ease-in-out"
        />
        <button
          type="submit"
          className="rounded-full shadow-md border border-white flex flex-row transition-transform transform hover:scale-105"
        >
          {isLoading ? (
            <Loader2
              onClick={stop}
              className="p-3 h-10 w-10 stroke-white animate-spin"
            />
          ) : (
            <Send className="p-3 h-10 w-10 stroke-white" />
          )}
        </button>
      </form>
    );
  }

  function RenderMessages() {
    return (
      <div id="chatbox" className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap">
        {messages.map((m, index) => {
          return (
            <div
              className={`p-4 shadow-lg rounded-lg ml-10 relative transition-transform duration-300 ${
                m.role === "user" ? "bg-white text-black" : "bg-gray-800 text-white"
              }`}
            >
              <Markdown text={m.content} />
              {m.role === "user" ? (
                <User2 className="absolute top-2 -left-10 border border-white rounded-full p-1 shadow-lg" />
              ) : (
                <Bot
                  className={`absolute top-2 -left-10 border border-blue-500 rounded-full p-1 shadow-lg stroke-blue-400 ${
                    isLoading && index === messages.length - 1
                      ? "animate-bounce"
                      : ""
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
