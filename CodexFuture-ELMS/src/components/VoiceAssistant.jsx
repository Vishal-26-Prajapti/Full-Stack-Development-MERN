import React, { useEffect, useContext } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BACKEND_URL = "http://localhost:5000";

const VoiceAssistant = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const speak = (message) => {
        const utter = new SpeechSynthesisUtterance(message);
        utter.lang = "en-US";
        window.speechSynthesis.speak(utter);
    };

    const handleLogout = async () => {
        await fetch(`${BACKEND_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
        });
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
        alert("Your browser does not support speech recognition.");
        }
    }, [browserSupportsSpeechRecognition]);

    useEffect(() => {
    if (!transcript) return;

    const lower = transcript.toLowerCase().trim();
    console.log("Transcript:", lower);

    const handleCommand = () => {
        if (lower.includes("hello assistant")) {
        speak("Yes sir, how can I help you?");
        } else if (lower.includes("open home") || lower.includes("go to home")) {
        speak("Opening home page.");
        setTimeout(() => navigate("/"), 800);
        } else if (lower.includes("open course") || lower.includes("courses")) {
        speak("Opening courses page.");
        setTimeout(() => navigate("/courses"), 800);
        } else if (lower.includes("open dashboard")) {
        speak("Opening dashboard.");
        setTimeout(() => navigate("/dashboard"), 800);
        } else if (lower.includes("open admin")) {
        speak("Opening admin dashboard.");
        setTimeout(() => navigate("/admin"), 800);
        } else if (lower.includes("open login")) {
        speak("Opening login page.");
        setTimeout(() => navigate("/login"), 800);
        } else if (lower.includes("logout")) {
        speak("Logging out.");
        handleLogout();
        } else {
        speak("Sorry, I didn’t understand that command.");
        console.log("No matching command found.");
        }

        // stop listening after processing
        setTimeout(() => {
        SpeechRecognition.stopListening();
        resetTranscript();
        }, 1500);
    };

    handleCommand();
    }, [transcript]);

    return (
        <div
        className="ai-assistent fixed bottom-5 right-5 bg-indigo-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-indigo-700 transition"
        onClick={() => {
            if (!listening) {
            SpeechRecognition.startListening({
                continuous: true,
                language: "en-IN",
            });
            speak("Voice assistant activated. How can I help you?");
            } else {
            SpeechRecognition.stopListening();
            speak("Voice assistant stopped.");
            }
        }}
        >
        <i className="fas fa-microphone"></i>
        {listening && <span className="ml-2 text-xs">Listening...</span>}
        </div>
    );
};

export default VoiceAssistant;