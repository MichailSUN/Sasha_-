import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { AdaptivityProvider, AppRoot, Panel, View, PanelHeader } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import AdviceCard from "./components/AdviceCard";
import Scripts from "./components/Scripts";
import MyComponent from "./components/MyComponent"; // Import MyComponent
import './App.css';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [advice, setAdvice] = useState("");
  // Removed dayInfo state, it's now handled by MyComponent
  const [isLoading, setIsLoading] = useState(true); //Add loading state
  const [error, setError] = useState(null);      //Add error state


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await bridge.send("VKWebAppInit");
        const userInfo = await bridge.send("VKWebAppGetUserInfo");
        setUserData(userInfo);
        setIsLoading(false); // Set loading to false after data fetch
      } catch (error) {
        setError("Ошибка загрузки данных пользователя");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getAdvice = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    if (!userData) {
      setError("Необходимы данные пользователя");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/get-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userData }), //Removed dayInfo from request
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Ошибка получения совета: ${errorData.error || response.status}`);
      }
      const data = await response.json();
      setAdvice(data.advice);
    } catch (error) {
      setError(`Ошибка получения совета: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdaptivityProvider>
      <AppRoot>
        <View activePanel="main">
          <Panel id="main">
            <PanelHeader>Советы на день</PanelHeader>
            {isLoading ? (
              <p>Загрузка...</p> //Or a better loading indicator
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
              <>
                <MyComponent /> {/* Render MyComponent for the day description */}
                <AdviceCard advice={advice} onGenerate={getAdvice} />
                <Scripts />
              </>
            )}
          </Panel>
        </View>
      </AppRoot>
    </AdaptivityProvider>
  );
};

export default App;