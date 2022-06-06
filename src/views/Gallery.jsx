import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Select, Spin, Divider, Typography } from "antd";
import ImageContainer from "../components/ImageContainer";
import ImageDetail from "../components/ImageDeatil";
import "./Gallery.scss";
import { getPhoto, removePhoto, selectPhoto } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const [posts, setPosts] = useState(null);
  const [section, setSection] = useState("hot");
  const [sort, setSort] = useState("viral");
  const [window, setWindow] = useState("day");
  const [viral, setViral] = useState("true");
  const [loading, setLoading] = useState(false);
  const image = useSelector(selectPhoto);
  const dispatch = useDispatch();

  let imageArr = [];

  const { Option } = Select;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(
          `https://api.imgur.com/3/gallery/${section}/${sort}/${window}/1?showViral=${viral}`,
          {
            headers: {
              Authorization: "Client-ID 0555a6a9e8431a6",
            },
          }
        )
        .then((resp) => setPosts(resp.data));
      setLoading(false);
    };
    fetchData();
  }, [section, sort, window, viral]);

  posts &&
    posts.data.map((a) => {
      a.images?.map((item) => {
        imageArr.push(item);
      });
    });

  return (
    <div className="gallery">
      {loading ? (
        <Spin />
      ) : (
        <>
          <Typography.Title type="success">Imgur API</Typography.Title>
          <div className="dropdown-container">
            <Row gutter={16}>
              <Col span={6}>
                <h1>Section: </h1>
                <Select
                  defaultValue={section}
                  onChange={(value) => setSection(value)}
                >
                  <Option value="hot">Hot</Option>
                  <Option value="top">Top</Option>
                  <Option value="user">User</Option>
                </Select>
              </Col>
              <Col span={6}>
                <h1>Sort: </h1>
                <Select
                  defaultValue={sort}
                  onChange={(value) => setSort(value)}
                >
                  <Option value="viral">Viral</Option>
                  <Option value="top">Top</Option>
                  <Option value="time">Time</Option>
                </Select>
              </Col>
              <Col span={6}>
                <h1>Window: </h1>
                <Select
                  dropdownMatchSelectWidth
                  defaultValue={window}
                  onChange={(value) => setWindow(value)}
                >
                  <Option value="day">Day</Option>
                  <Option value="week">Week</Option>
                  <Option value="month">Month</Option>
                  <Option value="year">Year</Option>
                  <Option value="all">All</Option>
                </Select>
              </Col>
              <Col span={6}>
                <h1>Show Viral? </h1>
                <Select
                  dropdownMatchSelectWidth
                  defaultValue={viral === "true" ? "Yes" : "No"}
                  onChange={(value) => setViral(value)}
                >
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>
              </Col>
            </Row>
          </div>
          <Divider></Divider>
          <Row gutter={16}>
            {imageArr.map(
              (item, idx) =>
                (item.type === "image/png" || item.type === "image/gif") && (
                  <Col
                    lg={{ span: 6 }}
                    md={{ span: 12 }}
                    sm={{ span: 24 }}
                    key={idx}
                    style={{ marginBottom: "30px" }}
                  >
                    <ImageContainer
                      link={item.link}
                      description={item.description}
                      onClick={() => dispatch(getPhoto(item))}
                    />
                  </Col>
                )
            )}
          </Row>
          <ImageDetail
            isVisible={image !== null}
            title={(image && image.title) || "N/A"}
            link={image && image.link}
            description={(image && image.description) || "N/A"}
            views={(image && image.views) || "N/A"}
            upvotes={(image && image.ups) || "N/A"}
            downvotes={(image && image.downs) || "N/A"}
            score={(image && image.score) || "N/A"}
            handleCancel={() => dispatch(removePhoto())}
            handleOk={() => dispatch(removePhoto())}
          />
        </>
      )}
    </div>
  );
};
