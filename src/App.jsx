import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { FaSync } from "react-icons/fa";
import styled from "styled-components";
import axios from "axios";
import Humidity from "./components/Humidity";
import AlarmAlert from "./components/AlarmAlert";
import FanControl from "./components/FanControl";
import EventLog from "./components/EventLog";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: white;
`;
const LeftWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 7rem 0;
  align-items: center;
  gap: 2rem;
`;
const RightWrapper = styled.div`
  width: 50%;
  background-color: lightgray;
  padding: 12px;
  overflow-y: auto;
`;

export default function App() {
  const [messages, setMessages] = useState([]);

  const toggleAlarmSwitch = () => setIsAlarmEnabled((prev) => !prev);

  return (
    <Container>
      <LeftWrapper>
        <AlarmAlert />
        <Humidity />
        <FanControl />
      </LeftWrapper>
      <RightWrapper>
        <EventLog />
      </RightWrapper>
    </Container>
  );
}
