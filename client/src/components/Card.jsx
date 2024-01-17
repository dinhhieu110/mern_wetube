import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import axios from "axios";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "300px"};

  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Img = styled.img`
  width: ${(props) => (props.type === "sm" ? "50%" : "100%")};
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
  border-radius: 10px;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

// const Detail = styled.div`
//   width: 100%;
//   height: 202px;
//   background-color: #999;
// `;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Title = styled.h1`
  font-size: ${(props) => (props.type === "sm" ? "13px" : "16px")};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: ${(props) => (props.type === "sm" ? "11px" : "14px")};
  color: ${({ theme }) => theme.textSoft};
  font-weight: ${(props) => props.type === "sm" && "500"};
  margin: ${(props) => (props.type === "sm" ? "5px 0" : "10px 0")};
`;

const Info = styled.div`
  font-size: ${(props) => (props.type === "sm" ? "11px" : "14px")};
  color: ${({ theme }) => theme.textSoft};
`;

export default function Card({ type, video }) {
  const [channel, setChannel] = useState({});

  const formatViews = (views) => {
    if (views >= 1000) {
      if (views >= 1000000) {
        const formatViews = (views / 1000000).toFixed(1);
        const prettyViews = formatViews.replace(/\.0$/, "");
        return prettyViews + "m";
      }
      const formatViews = (views / 1000).toFixed(1);
      const prettyViews = formatViews.replace(/\.0$/, "");

      return prettyViews + "k";
    } else {
      return views;
    }
  };

  //Whenever refresh page, run a function (fetching video function), run only once
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Img type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Text>
            <Title type={type}>{video.title}</Title>
            <ChannelName type={type}>{channel.name}</ChannelName>
            <Info type={type}>
              {formatViews(video.views)} views • {format(video.createdAt)}
            </Info>
          </Text>
        </Details>
      </Container>
    </Link>
  );
}
