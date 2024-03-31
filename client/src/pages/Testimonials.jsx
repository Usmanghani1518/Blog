import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Testimonials() {

    const testimonialsData = [
        {
          id: 1,
          name: "John Doe",
          quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat.",
          rating: 5 // John Doe's rating is 5 stars
        },
        {
          id: 2,
          name: "Jane Smith",
          quote: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna.",
          rating: 4 // Jane Smith's rating is 4 stars
        },
        {
          id: 3,
          name: "David Johnson",
          quote: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis tortor sed quam rhoncus accumsan.",
          rating: 3 // David Johnson's rating is 3 stars
        }
      ];

    const carouselConfig = {
        responsive: {
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40 // Adjust according to your design
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            partialVisibilityGutter: 30 // Adjust according to your design
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 20 // Adjust according to your design
          }
        },
        draggable: true,
        swipeable: true,
        infinite: true,
        autoPlay: true,
        autoPlaySpeed: 1500,
        keyBoardControl: true,
        showDots: false,
        pauseOnHover: true
      
      };
  return (
    <div className="max-w-6xl mx-auto px-4 py-4 md:py-8">
      {/* Testimonials Carousel */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 md:mb-8 text-center">What Our Happy Users Say</h2>
        <Carousel {...carouselConfig}>
          {testimonialsData.map(testimonial => (
            <div key={testimonial.id} className="flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg max-w-sm mx-2 flex flex-col justify-between">
                <p className="text-lg mb-2">{testimonial.quote}</p>
                <div className="flex items-center">
                  <p className="text-pink-600">- {testimonial.name}</p>
                  <div className="flex ml-2">
                    {Array.from({ length: testimonial.rating }, (_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 fill-current"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0L12.245 6.782H19.481L13.891 11.2l2.254 6.964L10 14.859l-6.146 3.305 2.254-6.964L0 6.782h7.236L10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
}

export default Testimonials;
