import React from "react";
import "./ImageContainer.scss";
import { Image, Card } from "antd";

export default ({ link, description, onClick }) => {
  const { Meta } = Card;

  return (
    <Card className="card" onClick={onClick} hoverable>
      <Image
        preview={false}
        width={250}
        height={250}
        src={link}
        className="card-image"
      />
      <Meta
        className="card-description"
        description={description && description}
      />
    </Card>
  );
};
