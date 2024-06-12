import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  height: 8rem;
`;
const UmbrellaImage = styled.img`
  width: 5rem;
  height: 5rem;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const Content = styled.div``;

const AlarmAlert = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const eventSource = new EventSource("/api/sse/");

    eventSource.onmessage = (event) => {
      console.log("connect");
      console.log(event);
      console.log(event.data);
      //   setMessage(event.data);
      if (event.data === "물체 지나감 감지 및 높은 습도 감지") {
        setMessage("우산을 챙기세요");
      } else {
        setMessage(event.data);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Container>
      {message ? (
        <Wrapper>
          <UmbrellaImage src="/assets/umbrella.png" alt="Fan" />
          <Content>{message}</Content>
        </Wrapper>
      ) : null}
    </Container>
  );
};

export default AlarmAlert;
