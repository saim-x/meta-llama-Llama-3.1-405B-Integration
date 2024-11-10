"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, Send, User2 } from "lucide-react";
import Markdown from "../component/markdown";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Chatbot() {
  const [name, setName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "api/llm-response",
  });

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsDialogOpen(false);
    }
  };

  if (isDialogOpen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-11/12 max-w-lg mx-auto relative">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome to the Chatbot</h2>
          <p className="text-gray-600 mb-6">Please enter your name to start chatting</p>
          <form onSubmit={handleNameSubmit} className="flex flex-col gap-4">
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:border-gray-600 outline-none"
            />
            <Button type="submit" disabled={!name.trim()} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Start Chatting
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-900 text-white">
      {RenderForm()}
      {RenderMessages()}
    </main>
  );

  function RenderForm() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              prompt: input,
              history: messages.map((m) => ({
                content: m.content,
                role: m.role,
              })),
              userName: name,
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
      <div
        id="chatbox"
        className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap"
      >
        {messages.map((m, index) => {
          return (
            <div
              key={index}
              className={`p-4 shadow-lg rounded-lg ml-10 relative transition-transform duration-300 ${
                m.role === "user" ? "bg-white text-black" : "bg-gray-800 text-white"
              }`}
            >
              <Markdown text={m.content} />
{m.role === "user" ? (
  <User2 className="absolute top-2 -left-10 border border-white rounded-full p-1 shadow-lg" />
) : (
  <Bot
    className={
      `absolute top-2 -left-10 border border-blue-500 rounded-full p-1 shadow-lg stroke-blue-400 ` +
      (isLoading && index === messages.length - 1 ? "animate-bounce" : "")
    }
  />
)}

            </div>
          );
        })}
      </div>
    );
  }
}
