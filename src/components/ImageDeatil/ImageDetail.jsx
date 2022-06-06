import React from "react";
import "./ImageDetail.scss";
import { Modal, Image, Typography } from "antd";

export default ({
  isVisible,
  link,
  title,
  description,
  views,
  upvotes,
  downvotes,
  score,
  handleOk,
  handleCancel,
}) => {
  const { Title } = Typography;

  return (
    <Modal
      visible={isVisible}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      className="detail-container"
    >
      <div className="detail-container__image">
        <Image preview={false} src={link} />
      </div>
      <Title level={4}>
        Title: <span className="detail-text">{title}</span>
      </Title>
      <Title level={4}>
        Description: <span className="detail-text">{description}</span>
      </Title>
      <Title level={4}>
        Views: <span className="detail-text">{views}</span>
      </Title>
      <Title level={4}>
        Upvotes: <span className="detail-text">{upvotes}</span>
      </Title>
      <Title level={4}>
        Downvotes: <span className="detail-text">{downvotes}</span>
      </Title>
      <Title level={4}>
        Score: <span className="detail-text">{score}</span>
      </Title>
    </Modal>
  );
};
