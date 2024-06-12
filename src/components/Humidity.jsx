import { useState } from "react";
import { FaSync } from "react-icons/fa";
import styled from "styled-components";
// import { ProgressBar } from "react-bootstrap";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";

const HumidityTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const HumidityFigure = styled.div`
  width: 100%;
`;
const SyncIcon = styled(FaSync)`
  cursor: pointer;
  font-size: 20px;
  margin-left: 5px;
`;
const HumidityImage = styled.img`
  width: 5rem;
  height: 5rem;
`;

const Humidity = () => {
  const [humidity, setHumidity] = useState("70");
  const now = 60;

  // 습도 값 가져오기
  const getHumidity = async () => {
    try {
      const response = await axios.get(`/api/get_humidity/`);
      setHumidity(response.data.humidity);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return (
    <HumidityTextContainer>
      <HumidityImage src="/assets/humidity.png" alt="Humidity" />
      <p>습도 : {humidity} %</p>
      <HumidityFigure>
        <ProgressBar completed={humidity} />
      </HumidityFigure>
      <SyncIcon onClick={getHumidity} />
    </HumidityTextContainer>
  );
};
export default Humidity;
