import { Carousel } from "react-carousel-minimal";

export default function TopSlider() {
  const data = [
    {
      // image: "../1.jpg",
      caption: "San Francisco",
    },
    {
      // image: "../2.jpg",
      caption: "Scotland",
    },
    {
      // image: "../3.jpg",
      caption: "Darjeeling",
    },
    {
      // image: "../4.jpg",
      caption: "San Francisco",
    },
    {
      // image: "../5.jpg",
      caption: "Scotland",
    },
    {
      // image: "../3.jpg",
      caption: "Darjeeling",
    },

    {
      // image: "../2.jpg",
      caption: "Scotland",
    },
  ];

  const captionStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  return (
    <div>
      <div style={{ textAlign: "center " }}>
        <div
          style={{
            padding: "0px",
          }}
        >
          <Carousel
            data={data}
            time={5000}
            width="full"
            height="500px"
            captionStyle={captionStyle}
            radius="0px 0px 8px 8px"
            slideNumber={false}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="transparent"
            pauseIconSize="40px"
            slideBackgroundColor="transparent"
            slideImageFit="cover"
            thumbnails={false}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "full",
              maxHeight: "500px",
              margin: "0px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}
