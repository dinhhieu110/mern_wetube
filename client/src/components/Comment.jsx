import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const Img = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelTimer = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const ChannelDesc = styled.p`
  font-size: 14px;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export default function Comment({ comment }) {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Img src={channel.img}></Img>
      <ChannelDetail>
        <Text>
          <ChannelName>{channel.name}</ChannelName>
          <ChannelTimer>{format(comment.createdAt)}</ChannelTimer>
        </Text>
        <ChannelDesc>{comment.desc}</ChannelDesc>
      </ChannelDetail>
    </Container>
  );
}
