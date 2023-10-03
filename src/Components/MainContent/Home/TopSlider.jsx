import React, { useMemo } from "react";
import { Carousel } from "react-carousel-minimal";
import { DataSlider } from "../../Context/images/DataSlider";

const captionStyle = {
  // Add CSS styles here
  color: "red",
  fontSize: "1.5em",
  fontWeight: "bold",
};

function TopSlider() {
  const data = useMemo(
    () =>
      DataSlider.map((slide, index) => ({
        image: slide.img,
        // Use the Caption component here
        key: index,
      })),
    []
  );

  if (!DataSlider || DataSlider.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div className="contain" style={{ padding: "0px" }}>
          <Carousel
            data={data}
            time={5000}
            width="100%"
            height="500px"
            radius="8px"
            border="none"
            slideNumber={false}
            captionStyle={captionStyle}
            captionPosition="bottom"
            automatic={true}
            // dots={true}
            pauseIconColor="blue"
            pauseIconSize="40px"
            slideBackgroundColor="white"
            slideImageFit="cover"
            thumbnails={false}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "100%",
              maxHeight: "500px",
              margin: "0px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(TopSlider);
