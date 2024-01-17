import React from "react";
import styled from "styled-components";
import LogoImg from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../redux/userSlice.js";

const Container = styled.div`
  flex: 1;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0px;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  margin-bottom: 25px;
`;
const Img = styled.img`
  height: 25px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 6.5px 0;
  font-size: 12px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.div`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

const Logout = styled.div`
  display: flex;
  font-size: 12px;
`;

const Btn = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  font-size: 12px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 20px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const SignOutBtn = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 14px;
  color: #aaaaaa;
`;

export default function Menu({ darkMode, setDarkMode }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={LogoImg} />
            Wetube
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <SlideshowIcon />
          Libarary
        </Item>
        <Item>
          <SettingsBackupRestoreIcon />
          History
        </Item>
        {!currentUser && (
          <>
            <Hr />
            <Login>
              Sign to likes videos, comment, and suscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Btn>
                  <AccountCircleIcon />
                  Sign in
                </Btn>
              </Link>
            </Login>
          </>
        )}
        <Hr />
        <Title>BEST OF WETUBE</Title>
        <Item>
          <PlayCircleIcon />
          Music
        </Item>
        <Item>
          <SubtitlesIcon />
          Movies
        </Item>
        <Item>
          <LiveTvIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsSuggestIcon />
          Settings
        </Item>
        <Item>
          <ContactSupportIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessIcon />
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Item>
        {currentUser && (
          <>
            <Hr />
            <Logout>
              <SignOutBtn onClick={handleSignOut}>
                <LogoutIcon />
                Sign out
              </SignOutBtn>
            </Logout>
          </>
        )}
      </Wrapper>
    </Container>
  );
}
