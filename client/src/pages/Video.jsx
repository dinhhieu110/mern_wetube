import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import SaveIcon from "@mui/icons-material/Save";
import Comments from "../components/Comments";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice.js";
import { format } from "timeago.js";
import { current } from "@reduxjs/toolkit";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import { subscription } from "../redux/userSlice.js";
import Recommendation from "../components/Recommendation.jsx";
const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
`;

const Content = styled.div`
  flex: 4.8;
`;

const VideoWrapper = styled.div`
  width: 97%;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  width: 780px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.textSoft};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const Hr = styled.hr`
  width: 780px;

  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  width: 780px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const ChannelDesc = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: #fff;
  border: none;
  border-radius: 20px;
  height: fit-content;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;

  &:hover {
    background-color: #6b6666;
  }
`;

const UnSubscribe = styled.button`
  background-color: ${({ theme }) => theme.soft};
  font-weight: 500;
  color: #fff;
  border: none;
  border-radius: 20px;
  height: fit-content;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #6b6666;
  }
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

export default function Video() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentVideo = useSelector((state) => state.video.currentVideo);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2]; // video Id

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

  useEffect(() => {
    const fetData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        console.log(currentVideo);
      } catch (error) {}
    };
    fetData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDisLike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSubscription = async () => {
    currentUser?.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {formatViews(currentVideo?.views)} views •{" "}
            {format(currentVideo.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOffAltIcon />
              )}

              {currentVideo?.likes.length}
            </Button>
            <Button onClick={handleDisLike}>
              {currentVideo?.dislikes.includes(currentUser?._id) ? (
                <ThumbDownAltIcon />
              ) : (
                <ThumbDownOffAltIcon />
              )}
              {currentVideo?.dislikes.length}
            </Button>
            <Button>
              <ReplyIcon />
              Share
            </Button>
            <Button>
              <SaveIcon />
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Img src={channel.img}></Img>
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <ChannelDesc>{currentVideo.desc}</ChannelDesc>
            </ChannelDetail>
          </ChannelInfo>
          {currentUser?.subscribedUsers.includes(channel._id) ? (
            <UnSubscribe onClick={handleSubscription}>
              <NotificationsOffIcon /> Unsubscribe
            </UnSubscribe>
          ) : (
            <Subscribe onClick={handleSubscription}>
              <NotificationAddIcon /> <span>Subscribe</span>
            </Subscribe>
          )}
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
}
