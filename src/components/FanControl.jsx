import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const FanContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const FanImage = styled.img`
  width: 5rem;
  height: 5rem;
`;
const Switch = styled.input`
  width: 1.5rem;
  height: 1.5rem;
`;

const FanControl = () => {
  const [isFanEnabled, setIsFanEnabled] = useState(false);

  const toggleFanSwitch = async () => {
    const newFanState = !isFanEnabled;
    setIsFanEnabled(newFanState);
    try {
      await controlFan(newFanState);
    } catch (error) {
      console.error("Error controlling fan:", error);
      setIsFanEnabled(!newFanState);
    }
  };

  // 펜 동작
  const controlFan = async (state) => {
    try {
      const response = await axios.post(`/api/control_fan/`, {
        state,
      });
      console.log("res : ", state, response);
    } catch (error) {
      console.error(
        "Error controlling fan:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <FanContainer>
      <FanImage src="/assets/fan.png" alt="Fan" />
      <Switch
        type="checkbox"
        checked={isFanEnabled}
        onChange={toggleFanSwitch}
      />
    </FanContainer>
  );
};

export default FanControl;
