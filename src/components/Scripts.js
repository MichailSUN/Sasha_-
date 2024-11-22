import React, { useState } from 'react';

const Scripts = () => {
  const [advice, setAdvice] = useState('');
  const adviceList = [
    "Всегда начинайте день с улыбки!",
    "Не бойтесь пробовать новое.",
    "Каждый день - это новый шанс.",
    "Уделите время тому, что делает вас счастливыми.",
    "Будьте добры к себе и окружающим.",
    "Поставьте цель на день и выполните её.",
    "Не сравнивайте себя с другими - вы уникальны."
  ];

  const getRandomAdvice = () => {
    if (!adviceList || adviceList.length === 0) {
      setAdvice("Извините, нет доступных советов.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * adviceList.length);
    setAdvice(adviceList[randomIndex]);
  };

  return (
    <div>
      <button onClick={getRandomAdvice}>Получить совет</button>
      <p>{advice}</p>
    </div>
  );
};

export default Scripts;

