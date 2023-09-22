import React from "react";
import { Carousel } from "react-carousel-minimal";
import { useProducts } from "../../Context/StateContext";

export default function TopSlider() {
  const { topSlider } = useProducts();

  if (!topSlider || topSlider.length === 0) {
    return <p>No data available.</p>;
  }

  const captionStyle = {
    color: "lightred",
    fontSize: "1.5em",
    fontWeight: "bold",
  };

  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  const data = topSlider.map((slide) => ({
    image: slide.image,
    caption: slide.title,
  }));

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            padding: "0px",
          }}
        >
          <Carousel
            data={data}
            time={5000}
            width="full"
            height="600px"
            captionStyle={captionStyle}
            radius="0px 0px 16px 16px"
            slideNumber={false}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="blue"
            pauseIconSize="40px"
            slideBackgroundColor="white"
            slideImageFit="contain"
            thumbnails={false}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "full",
              maxHeight: "600px",
              margin: "0px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}
