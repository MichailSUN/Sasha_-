import React from "react";
import { Card, Div } from "@vkontakte/vkui";

const DayDescription = ({ description }) => (
  <Card style={{ margin: 20, padding: 15 }}>
    <Div>
      <h3>Описание дня:</h3>
      <p>{description || "Загрузка данных..."}</p>
    </Div>
  </Card>
);

export default DayDescription;
