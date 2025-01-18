/* eslint-disable no-unused-vars */
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const History = (props) => {
  const [show, setShow] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-[70%] mx-auto mt-5">
      {props.loading && 
      <div className="text-xl font-medium">Loading Participation History...</div>
      }
      {props.history.map((value) => {
        const urlsArray = value.certificates.split(",");
        console.log(urlsArray);

        return (
          <div
            key={value.id}
            className="p-4 rounded-lg bg-slate-300  space-y-4 w-[100%] text-start hover:shadow-xl hover:bg-slate-400 hover:cursor-pointer"
          >
            <div className="flex w-[100%] justify-between items-center">
              <p className="text-xl font-medium">{value.college}</p>
              <i
                className="fa-solid fa-angle-down fa-xl"
                onClick={() => {
                  setShow((prev) => ({
                    ...prev,
                    [value.id]: !prev[value.id],
                  }));
                }}
              ></i>
            </div>
            <div className="flex w-[100%] justify-between">
              <div>
                <p className="text-lg">
                  Event Name : {value.competition_name}{" "}
                </p>
              </div>
              <div className="gap-2">
                <i className="fa-solid fa-calendar-day fa-lg text-[#0e2f44]"></i>{" "}
                {value.date}
              </div>
            </div>
            {show[value.id] && (
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-medium text-center my-4">
                  <i className="fa-solid fa-award fa-xl mr-2"></i>
                    Certifications
                  </p>
                  <Slider
                    {...settings}
                    style={{ width: "500px", margin: "0 auto",marginBottom :"30px" }} 
                  >
                    {urlsArray.map((item) => {
                      return (
                        <div key={item}>
                          <img
                            src={item}
                            alt="certification"
                            style={{
                              width: "500px",
                              height: "400px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      );
                    })}
                  </Slider>
                </div>
                <div>
                  <p className="text-lg font-medium text-center my-4"> <i className="fa-solid fa-file-lines fa-xl mr-2"></i>Report</p>
                  <iframe
                    src={`https://docs.google.com/gview?url=${value.report}&embedded=true`}
                    width="50%"
                    height="400px"
                    className="mx-auto"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default History;
