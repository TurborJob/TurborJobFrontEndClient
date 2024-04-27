import React from "react";
import { Carousel } from "antd";
import { Image, useColorModeValue } from "@chakra-ui/react";

//#364d79

function CarouselImages({ data }) {
  const contentStyle = {
    display: " flex",
    justifyContent: "center",
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "white",
  };
  return (
    <Carousel autoplay>
      {data?.map((item, id) => (
        <div key={id}>
          <div style={contentStyle}>
            <Image objectFit="cover" src={item} />
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselImages;
