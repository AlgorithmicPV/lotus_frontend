import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/chat.css";
import Logo from "../components/logo";
import send_ico from "../../src/assets/icons/sendico.svg";
import axios from "axios";
import logo_icon from "../assets/icons/lotus-logo.svg";
import ReactMarkdown from "react-markdown";
import PulseLoader from "react-spinners/PulseLoader";

function ChatPage() {
  const chat_cont = useRef(null);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("client_messages");
    try {
      const parsedMessages = storedMessages ? JSON.parse(storedMessages) : [];
      return Array.isArray(parsedMessages) ? parsedMessages : [];
    } catch (error) {
      console.warn(
        "Invalid JSON in localStorage, resetting to empty array:",
        error
      );
      localStorage.removeItem("client_messages");
      return [];
    }
  });

  const [server_msgs, setServer_msgs] = useState(() => {
    const storedMessages = localStorage.getItem("server_messages");
    try {
      const parsedMessages = storedMessages ? JSON.parse(storedMessages) : [];
      return Array.isArray(parsedMessages) ? parsedMessages : [];
    } catch (error) {
      console.warn(
        "Invalid JSON in localStorage for server_messages, resetting to empty array:",
        error
      );

      localStorage.setItem("server_messages", "[]");
      return [];
    }
  });

  const [error_msg, Seterror_msg] = useState("");
  const [send_btn, Setsend_btn] = useState("not-allow");
  const [server_error_msg, Setserver_error_msg] = useState("");
  const [error_classname, Seterror_classname] = useState("error-box");

  let change_classname_of_the_error_msg = () => {
    Seterror_classname("error-hide");
  };

  // useEffect(() => {
  //   localStorage.setItem("client_messages", JSON.stringify(messages));
  // }, [messages]);

  useEffect(() => {
    localStorage.setItem("server_messages", JSON.stringify(server_msgs));
    localStorage.setItem("client_messages", JSON.stringify(messages));
  }, [server_msgs]);

  let user_send = () => {
    if (send_btn === "allow") {
      if (value.trim() !== "") {
        setMessages([...messages, value]);
        const chat_data = {
          user_msg: value,
        };
        axios
          .post("https://lotus-backend.vercel.app/lotus_chat", {
            user_msg: value,
          })
          .then((response) => {
            setServer_msgs((prevItems) => [
              ...prevItems,
              response.data["sent_message_from_server"],
            ]);
            Seterror_msg("");
            if (response.data["error_msg"]) {
              Seterror_classname("error-box");
              Setserver_error_msg(response.data["error_msg"]);
              console.log("error ", response.data);
            }
          })
          .catch(function (error) {
            let error_msg = error["message"];
            console.log(error_msg);
            Seterror_msg(error_msg);
          });
        setValue("");
      }
    }
  };

  useEffect(() => {
    if (chat_cont.current) {
      chat_cont.current.scrollTop = chat_cont.current.scrollHeight;
    }
  }, [messages, server_msgs]);

  useEffect(() => {
    if (server_msgs.length === messages.length) {
      Setsend_btn("allow");
    } else {
      Setsend_btn("not-allow");
    }
  }, [server_msgs, messages]);

  useEffect(() => {
    if (server_error_msg) {
      Seterror_classname("error-box");
      console.log("error");
    }
  }, [server_error_msg]);

  return (
    <>
      {console.log(server_msgs.length)}
      <div className="chatbody">
        <div className="space-chat"></div>
        <Logo />
        <div ref={chat_cont} className="chat-cont">
          {messages.map((message, index) => {
            return (
              <div className="conversation" key={index}>
                <div className="message_box">
                  <p className="message">{message}</p>
                </div>
                <div className="output_box">
                  <img src={logo_icon} alt="logo" />
                  {server_msgs && server_msgs[index] ? (
                    <p className="output">
                      <ReactMarkdown>{server_msgs[index]}</ReactMarkdown>
                    </p>
                  ) : (
                    <PulseLoader color="#E0E0E0" size={5} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="input-cont">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                user_send();
              }
            }}
            placeholder="Ask Lotus :- Plan my trip to Sri Lanka / Beautiful places in Sri Lanka"
            type="text"
            name="prob"
            id="prob"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="right-btns">
            <button className={send_btn} onClick={user_send}>
              <img src={send_ico} alt="send icon" />
            </button>
          </div>
        </div>
        {error_msg && (
          <div className="error-box">
            <p>{error_msg}. Try reloading the page</p>
            <button onClick={change_classname_of_the_error_msg}>X</button>
          </div>
        )}
        {server_error_msg && (
          <div className={error_classname}>
            <p>{server_error_msg}. Try reloading the page</p>
            <button onClick={change_classname_of_the_error_msg}>X</button>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatPage;
