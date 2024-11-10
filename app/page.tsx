// "use client";
// import { useChat } from "ai/react";
// import { Bot, Loader2, Send, User2 } from "lucide-react";
// import Markdown from "./component/markdown";

// export default function Home() {
//   const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
//     useChat({
//       api: "api/llm-response",
//     });

//   return (
//     <main className="flex min-h-screen flex-col items-center p-12 bg-gray-900 text-white">
//       {/* form element */}
//       {RenderForm()}
//       {RenderMessages()}
//       {/* rendering messages */}
//     </main>
//   );

//   // inner render functions
//   function RenderForm() {
//     return (
//       <form
//         onSubmit={(event) => {
//           event.preventDefault();
//           handleSubmit(event, {
//             data: {
//               prompt: input,
//               history: messages.map(m => ({ content: m.content, role: m.role })), // Convert messages to a compatible format
//             },
//           });
//         }}
//         className="w-full flex flex-row gap-2 items-center h-full"
//       >
//         <input
//           type="text"
//           placeholder={isLoading ? "Generating . . ." : "Ask something . . ."}
//           value={input}
//           disabled={isLoading}
//           onChange={handleInputChange}
//           className="border-b border-white outline-none w-full px-4 py-2 bg-transparent text-white placeholder:text-white/50 text-right focus:placeholder-transparent disabled:bg-transparent transition duration-300 ease-in-out"
//         />
//         <button
//           type="submit"
//           className="rounded-full shadow-md border border-white flex flex-row transition-transform transform hover:scale-105"
//         >
//           {isLoading ? (
//             <Loader2
//               onClick={stop}
//               className="p-3 h-10 w-10 stroke-white animate-spin"
//             />
//           ) : (
//             <Send className="p-3 h-10 w-10 stroke-white" />
//           )}
//         </button>
//       </form>
//     );
//   }

//   function RenderMessages() {
//     return (
//       <div id="chatbox" className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap">
//         {messages.map((m, index) => {
//           return (
//             <div
//               className={`p-4 shadow-lg rounded-lg ml-10 relative transition-transform duration-300 ${
//                 m.role === "user" ? "bg-white text-black" : "bg-gray-800 text-white"
//               }`}
//             >
//               <Markdown text={m.content} />
//               {m.role === "user" ? (
//                 <User2 className="absolute top-2 -left-10 border border-white rounded-full p-1 shadow-lg" />
//               ) : (
//                 <Bot
//                   className={`absolute top-2 -left-10 border border-blue-500 rounded-full p-1 shadow-lg stroke-blue-400 ${
//                     isLoading && index === messages.length - 1
//                       ? "animate-bounce"
//                       : ""
//                   }`}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// }


'use client'
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Heart, Lock, MessageCircle, Upload, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'; // Correct import for the app directory// Inside your component
export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <header className="p-4 md:p-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600" onClick={() => {
            window.location.reload(); // Forces a full page reload
          }}>
            EternalVoice
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Features
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Contact
            </Link>
            <Button variant="outline">Sign In</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Reconnect, Remember, Reflect.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            EternalVoice helps you connect with loved ones who’ve passed, keeping their memories close to heart.
          </p>

          <div className="flex justify-center space-x-4">
            <Link href="/chatbot" passHref>
              <Button variant="outline" className="bg-white rounded-full px-4 py-2 text-sm font-medium">Get Started</Button>
            </Link>
            <Button size="lg" variant="secondary">
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Upload a Chat History",
              description: "Upload chat histories of loved ones, creating a personalized AI-driven chatbot.",
              icon: <Upload className="w-10 h-10 text-blue-600" />,
            },
            {
              title: "Select from Legacy Profiles",
              description: "Choose from carefully curated profiles of historical or notable personalities.",
              icon: <User className="w-10 h-10 text-blue-600" />,
            },
            {
              title: "Engage in Meaningful Conversations",
              description: "Interact with your loved one's chatbot, offering comfort and a chance to reconnect.",
              icon: <MessageCircle className="w-10 h-10 text-blue-600" />,
            },
          ].map((feature, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent>
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
            {[
              { step: "1", title: "Upload or Select a Profile", icon: <Upload className="w-8 h-8" /> },
              { step: "2", title: "Train the AI", icon: <ArrowRight className="w-8 h-8" /> },
              { step: "3", title: "Start Chatting", icon: <MessageCircle className="w-8 h-8" /> },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">Step {item.step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What People Are Saying</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Alex Johnson",
                quote: "EternalVoice gave me a chance to have one last conversation. It felt like they were right there with me.",
                avatar: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Sam Lee",
                quote: "It brought back memories I didn't even realize I'd missed so much. So comforting.",
                avatar: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="flex items-start space-x-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-gray-600 mb-2">"{testimonial.quote}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Explore Legacy Profiles</h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover conversations with historical figures and notable personalities.
          </p>
          <div className="flex justify-center space-x-8">
            {["Albert Einstein", "Rosa Parks", "Vincent van Gogh"].map((name, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 mx-auto"></div>
                <p className="font-medium">{name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 rounded-lg p-8 mb-16">
          <div className="flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold">Security and Privacy</h2>
          </div>
          <p className="text-center text-gray-600 mb-4">
            Your data remains secure, with privacy-focused technology to keep your memories safe.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white rounded-full px-4 py-2 text-sm font-medium">End-to-end Encryption</div>
            <div className="bg-white rounded-full px-4 py-2 text-sm font-medium">User Data Control</div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold text-blue-600">
                EternalVoice
              </Link>
            </div>
            <nav className="flex space-x-4 mb-4 md:mb-0">
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                About Us
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                FAQ
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                Terms of Service
              </Link>
            </nav>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">GitHub</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}