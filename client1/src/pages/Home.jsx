import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`videos/${type}`);
      setVideo(res.data);
      console.log(type)
    };
    fetchVideo();
  }, [type]);
  
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default Home;
