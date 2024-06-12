import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LogItem = styled.div`
  width: 95%;
  background-color: #f9f9f9;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
`;

const LogMessage = styled.div`
  font-size: 15px;
  margin-bottom: 15px;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  width: 40%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  padding-top: 18px;
`;

const InfoContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: flex-end;
  padding-top: 16px;
`;

const TimestampText = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
  margin-left: 5px;
`;

const eventImage = {
  ULTRA_SONIC: "/assets/exit.png",
  DHT22: "/assets/humidity_event.png",
};

const EventLog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEventLogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/event_log/");
        console.log("log : ", response);
        setData(response.data.reverse()); // Reverse the data array here
      } catch (error) {
        console.error("Error fetching event logs:", error);
      }
      setLoading(false);
    };

    getEventLogs();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = timestamp.split("T")[0];
    const time = timestamp.split("T")[1].replace("Z", "");
    return `${date} ${time}`;
  };

  if (loading) {
    return (
      <LoadingContainer>
        <div>Loading...</div>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {data.map((item, id) => (
        <LogItem key={id}>
          <LogMessage>
            {item.log_message === "물체 지나감 감지"
              ? "물체 출입 감지"
              : item.log_message}
          </LogMessage>
          <BottomContainer>
            <ImageContainer>
              <Image
                src={eventImage[item.sensor_type]}
                alt={item.sensor_type}
              />
            </ImageContainer>
            <InfoContainer>
              <TimestampText>{formatTimestamp(item.timestamp)}</TimestampText>
            </InfoContainer>
          </BottomContainer>
        </LogItem>
      ))}
    </Container>
  );
};

export default EventLog;
