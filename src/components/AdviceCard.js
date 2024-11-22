import React from "react";
import { Card, Div } from "@vkontakte/vkui";

const AdviceCard = ({ advice, onGenerate }) => (
  <Card style={{ margin: 40, padding: 20 }}>
    <Div>
      <h3>Ваш совет:</h3>
    </Div>
  </Card>
);

export default AdviceCard;