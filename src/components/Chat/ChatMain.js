import React from "react";
import "./Chat.css";
import SelectedButton from "../Buttons/SelectedButton";
import Input from "../Inputs/Input";
import Parse from "parse";
import { initializeParse, useParseQuery } from "@parse/react";
import Message from "./Message";

initializeParse(
  "https://entrantadi.b4a.io/",
  "yxPnWbQX9w1aSveJmbTIEJyWJUO7Lg4emp6rEmSX",
  "7JUESLrz0P2ALkZBtUIPLi1XJ7IN1ItWySclh5lU"
);

function ChatMain() {
  const [isVisible, setVisible] = React.useState(false);
  const [channelText, setChannelText] = React.useState([
    {
      name: "Поступление",
      align: "left",
    },
    { name: "Другое", align: "right" },
  ]);
  const [channelID, setChannelID] = React.useState(0);
  const [accounts, setAccounts] = React.useState([]);

  const [queryChannel1, setQueryChanngel1] = React.useState("");
  const [queryChannel2, setQueryChanngel2] = React.useState("");

  const [regName, setRegName] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");
  const [regRePassword, setRegRePassword] = React.useState("");

  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const parseChannel1 = new Parse.Query("Channel_1");
  const parseChannel2 = new Parse.Query("Channel_2");

  const [pageState, setPageState] = React.useState(1);
  /* 
    0 - Регистрация 
    1 - Вход 
    2 - Выбор канал 
    3 - Канал "Поступления"
    4 - Канал "Другое" 
  */

  const { isLoading, results } = useParseQuery(
    pageState === 3 ? parseChannel1 : parseChannel2,
    {
      enableLocalDatastore: false,
      enableLiveQuery: true,
    }
  );

  const createAccount = async function () {
    if (regPassword === regRePassword) {
      let accounts = new Parse.Object("Accounts");
      const date = new Date().toLocaleDateString();
      accounts.set("name", regName);
      accounts.set("password", regPassword);
      accounts.set("date", date);

      try {
        await accounts.save();
        alert("Аккаунт создан");
        return true;
      } catch (error) {
        alert(`Ошибка! ${error}`);
        return false;
      }
    } else {
      alert("Пароли не совпадают");
    }
  };

  const createMessageFromChannel1 = async function () {
    if (queryChannel1.trim()) {
      let message = new Parse.Object("Channel_1");
      const date = new Date().toLocaleString();
      message.set("name", name);
      message.set("text", queryChannel1);
      message.set("date", date);

      try {
        await message.save();
        setQueryChanngel1("");
        return true;
      } catch (error) {
        alert(`Ошибка! ${error}`);
        return false;
      }
    } else {
      alert("Введите сообщение.");
    }
  };

  const createMessageFromChannel2 = async function () {
    if (queryChannel2.trim()) {
      let message = new Parse.Object("Channel_2");
      const date = new Date().toLocaleString();
      message.set("name", name);
      message.set("text", queryChannel2);
      message.set("date", date);

      try {
        await message.save();
        setQueryChanngel2("");
        return true;
      } catch (error) {
        alert(`Ошибка! ${error}`);
        return false;
      }
    } else {
      alert("Введите сообщение");
    }
  };

  const readProfile = async function () {
    const parseQuery = new Parse.Query("Accounts");
    try {
      let account = await parseQuery.find();
      setAccounts(account);
      return true;
    } catch (error) {
      alert(`Ошибка! ${error}`);
      return false;
    }
  };

  const joinToChannel = (name) => {
    switch (name) {
      case channelText[0].name:
        setPageState(3);
        break;
      case channelText[1].name:
        setPageState(4);
        break;
      default:
        setPageState(3);
    }
  };

  const signOut = () => {
    setPageState(1);
    setName("");
    setPassword("");
  };

  const findPassword = () => {
    return accounts
      .filter((f) => f.get("name") === name)
      .map((a) => a.get("password"));
  };

  const signIn = () => {
    if (findPassword()[0] === password) {
      setPageState(2);
    } else {
      alert("Неправильный пароль");
    }
  };

  React.useEffect(() => {
    readProfile();
  }, []);

  return (
    <div className="chat-position">
      <button
        className={`chat-btn ${isVisible ? "hide" : ""}`}
        onClick={() => setVisible(!isVisible)}
      >
        <i className="fa-solid fa-comments"></i>
      </button>
      <div className={`chat ${isVisible ? "" : "hide"}`}>
        <button
          className="chat-btn-close"
          onClick={() => setVisible(!isVisible)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        {pageState === 0 ? (
          <div className="chat-group">
            <h3 className="chat-title">Регистрация</h3>
            <Input
              title="Имя пользователя"
              type="text"
              maxLength={20}
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              max={1}
            />
            <Input
              title="Пароль"
              type="text"
              maxLength={20}
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              max={1}
            />
            <Input
              title="Повторите пароль"
              type="text"
              maxLength={20}
              value={regRePassword}
              onChange={(e) => setRegRePassword(e.target.value)}
              max={1}
            />
            <div className="chat-button-content">
              <button className="chat-account-btn main" onClick={createAccount}>
                Зарегистрироваться
              </button>
              <button
                className="chat-account-btn"
                onClick={() => setPageState(1)}
              >
                Уже есть аккаунт?
              </button>
            </div>
          </div>
        ) : pageState === 1 ? (
          <div className="chat-group">
            <h3 className="chat-title">Вход</h3>
            <Input
              title="Имя пользователя"
              type="text"
              maxLength={20}
              value={name}
              onChange={(e) => setName(e.target.value)}
              max={1}
            />
            <Input
              title="Пароль"
              type="text"
              maxLength={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              max={1}
            />
            <div className="chat-button-content">
              <button className="chat-account-btn main" onClick={signIn}>
                Войти в аккаунт
              </button>
              <button
                className="chat-account-btn"
                onClick={() => setPageState(0)}
              >
                Нет аккаунта?
              </button>
            </div>
          </div>
        ) : pageState === 2 ? (
          <div className="chat-group">
            <h3 className="chat-title">Выберете категорию чата</h3>
            {channelText.map((text, index) => {
              return (
                <SelectedButton
                  key={index}
                  title={text.name}
                  isActive={index === channelID}
                  align={text.align}
                  setID={() => setChannelID(index)}
                />
              );
            })}
            <button
              className="chat-join-btn"
              onClick={() => joinToChannel(channelText[channelID].name)}
            >{`Присоединиться к "${channelText[channelID].name}"`}</button>

            <button className="chat-signOut" onClick={signOut}>
              Выйти с аккаунта
            </button>
            <div className="chat-message-account">({name})</div>
          </div>
        ) : pageState === 3 ? (
          <div className="chat-group">
            <h3 className="chat-title">Канал "Поступление"</h3>
            <button className="chat-btn-back" onClick={() => setPageState(2)}>
              <i className="fa-solid fa-arrow-left"></i> Назад
            </button>
            {isLoading && <h3>Загрузка...</h3>}
            {results && (
              <div className="chat-message-list">
                {results.length > 0 ? (
                  results
                    .sort((a, b) => a.get("createdAt") - b.get("createdAt"))
                    .map((result, index) => (
                      <Message
                        key={index}
                        self={result.get("name") === name}
                        name={result.get("name")}
                        text={result.get("text")}
                        date={result.get("date")}
                      />
                    ))
                ) : (
                  <div className="empty-message">
                    Пусто. Напишите первое сообщение
                  </div>
                )}
              </div>
            )}
            <div className="send-message-content">
              <Input
                title="Введите сообщение"
                type="text"
                maxLength={250}
                value={queryChannel1}
                onChange={(e) => setQueryChanngel1(e.target.value)}
                max={1}
              />
              <button
                className="chat-account-btn main"
                onClick={createMessageFromChannel1}
              >
                <i className="fa-sharp fa-solid fa-circle-arrow-right"></i>
              </button>
            </div>
            <div className="chat-account">Аккаунт: {name}</div>
          </div>
        ) : pageState === 4 ? (
          <div className="chat-group">
            <h3 className="chat-title">Канал "Другое"</h3>
            <button className="chat-btn-back" onClick={() => setPageState(2)}>
              <i className="fa-solid fa-arrow-left"></i> Назад
            </button>

            {isLoading && <h3>Загрузка...</h3>}
            {results && (
              <div className="chat-message-list">
                {results.length > 0 ? (
                  results
                    .sort((a, b) => a.get("createdAt") - b.get("createdAt"))
                    .map((result, index) => (
                      <Message
                        key={index}
                        self={result.get("name") === name}
                        name={result.get("name")}
                        text={result.get("text")}
                        date={result.get("date")}
                      />
                    ))
                ) : (
                  <div className="empty-message">
                    Пусто. Напишите первое сообщение
                  </div>
                )}
              </div>
            )}
            <div className="send-message-content">
              <Input
                title="Введите сообщение"
                type="text"
                maxLength={250}
                value={queryChannel2}
                onChange={(e) => setQueryChanngel2(e.target.value)}
                max={1}
              />
              <button
                className="chat-account-btn send"
                onClick={createMessageFromChannel2}
              >
                <i className="fa-sharp fa-solid fa-circle-arrow-right"></i>
              </button>
            </div>
            <div className="chat-account">Аккаунт: {name}</div>
          </div>
        ) : (
          `Ошибка ${pageState}.`
        )}
      </div>
    </div>
  );
}

export default ChatMain;
