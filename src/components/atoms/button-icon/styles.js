import styled from "styled-components";
import { FaRetweet } from "react-icons/fa";
import { BsReply } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { SlOptions } from "react-icons/sl";
import { IoMdHeart } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { MdBookmarks } from "react-icons/md";
import { IoIosListBox } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CiCircleMore } from "react-icons/ci";
import { PiMoneyBold } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { TbLogout } from "react-icons/tb";
import { BsArrowUpRightSquareFill } from "react-icons/bs";

export const StyledBsArrowUpRightSquareFill = styled(BsArrowUpRightSquareFill)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledTbLogout = styled(TbLogout)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledCiSettings = styled(CiSettings)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledPiMoneyBold = styled(PiMoneyBold)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledBsReply = styled(BsReply)`
  background: none;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
  fill: ${(prop) => (prop.$color ? prop.$color : "rgb(113, 118, 123)")};
`;

export const StyledFaRetweet = styled(FaRetweet)`
  background: none;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
  fill: ${(prop) => (prop.$fill ? prop.$fill : "rgb(113, 118, 123)")};
`;

export const StyledMdFavoriteBorder = styled(MdFavoriteBorder)`
  background: none;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
  fill: ${(prop) => (prop.$color ? prop.$color : "rgb(113, 118, 123)")};
`;

export const StyledTbBrandGoogleAnalytics = styled(TbBrandGoogleAnalytics)`
  background: none;
`;

export const StyledSlOptions = styled(SlOptions)`
  background: none;
  font-size: 1.4rem;
  color: blue;
`;

export const StyledIoMdHeart = styled(IoMdHeart)`
  background: none;
  font-size: 1.2em;
  padding: 0;
  margin: 0;
  stroke: red;
  fill: red;
`;

export const StyledGoHomeFill = styled(GoHomeFill)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledIoMdSearch = styled(IoMdSearch)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledIoIosNotifications = styled(IoIosNotifications)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledFaEnvelope = styled(FaEnvelope)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledMdBookmarks = styled(MdBookmarks)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledIoIosListBox = styled(IoIosListBox)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledIoMdPeople = styled(IoMdPeople)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledFaXTwitter = styled(FaXTwitter)`
  background: none;
  font-size: 1.6rem;
`;

export const StyledCgProfile = styled(CgProfile)`
  background: none;
  font-size: 1.4rem;
`;

export const StyledCiCircleMore = styled(CiCircleMore)`
  background: none;
  font-size: 1.4rem;
`;

export const Icon = styled.div`
  font-size: 1rem;
  padding: 0;
  display: flex;
  justify-content: center;
  margin: 0;
  transition: color 0.2s;
  background: none;
`;

export const Content = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  background: none;
  font-size: 1rem;

  @media screen and (max-width: 1024px) {
    display: none;
  }

  @media screen and (max-width: 500px) {
    display: flex;
    font-size: 1rem;
    font-weight: bold;
  }
`;

export const Button = styled.button`
  display: flex;
  border: none;
  align-items: center;
  cursor: pointer;
  padding: ${(prop) => (prop.$padding ? prop.$padding : "3px")};
  margin: 0;
  justify-content: center;
  flex-wrap: wrap;
  outline: none;
  border-radius: 15px;
  &:hover {
    background: rgba(160, 160, 160, 0.3);
  }
`;

export const Count = styled.span`
  font-size: 1rem;
  padding: 0;
  margin: 0;
  color: rgb(113, 118, 123);
  background: none;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;
