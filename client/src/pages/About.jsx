import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Testimonials from './Testimonials';

function About() {

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
       <h1 className="text-3xl font-semibold font-serif mb-4 text-center">About Us</h1>
      <p className="text-lg mb-4 ">
        Welcome to <strong className='text-pink-600'>Usman's Blog</strong>, where we believe in the power of words to inspire, inform, and connect people across the globe. Our mission is to provide a platform where diverse voices can be heard, ideas can be shared, and conversations can flourish.
      </p>
      
      {/* our success story section  */}
      <section>
      <h2 className="text-2xl font-bold mb-2">Our Success Story</h2>
      <p className="text-lg mb-4">
        
        Usman's Blog was founded in <span className='text-purple-500'>2024</span>  by <span className='text-purple-500'>Usman Choudhary</span> . As avid writers and passionate believers in the importance of storytelling, we set out to create a space where individuals from all walks of life could express themselves freely and authentically. What started as a simple idea has since evolved into a thriving community of writers, readers, and thinkers.
      </p>
      </section>
      {/* Creative "Why Choose Us" Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center ">Why Choose Us?</h2>
        <div className="grid grid-cols-1  md:grid-cols-3 gap-8">
          <div className="flex flex-col shadow-md dark:shadow-gray-700 p-6  items-center justify-center space-y-4">
            <div className="bg-blue-500 text-white rounded-full h-24 w-24 flex items-center justify-center">
              <span className="text-4xl font-semibold">1</span>
            </div>
            <h3 className="text-xl font-semibold">Inspiring Content</h3>
            <p className="text-center">Our content is crafted to inspire and captivate our readers, fostering a sense of curiosity and wonder.</p>
          </div>
          <div className="flex flex-col shadow-md dark:shadow-gray-700 p-6  items-center justify-center space-y-4">
            <div className="bg-green-500 text-white rounded-full h-24 w-24 flex items-center justify-center">
              <span className="text-4xl font-semibold">2</span>
            </div>
            <h3 className="text-xl font-semibold">Community Engagement</h3>
            <p className="text-center">Join a vibrant community of like-minded individuals who share a passion for storytelling and meaningful dialogue.</p>
          </div>
          <div className="flex flex-col shadow-md dark:shadow-gray-700 p-6 items-center justify-center space-y-4">
            <div className="bg-purple-500 text-white rounded-full h-24 w-24 flex items-center justify-center">
              <span className="text-4xl font-semibold">3</span>
            </div>
            <h3 className="text-xl font-semibold">Diverse Perspectives</h3>
            <p className="text-center">We celebrate diversity and strive to amplify voices that are often unheard, fostering a more inclusive society.</p>
          </div>
        </div>
      </section>

      <section className="md:mb-12 mb-4">
        <Testimonials />
      </section>

      {/* Creative "What We Offer" Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-4 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Engaging Content</h3>
            <p>From personal narratives to informative articles, our blog covers a wide array of topics to cater to diverse interests.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Guest Contributions</h3>
            <p>We welcome guest writers to share their unique perspectives and experiences, enriching our community with fresh insights.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Interactive Discussions</h3>
            <p>Participate in engaging discussions, connect with fellow readers, and broaden your horizons through diverse viewpoints.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Exclusive Events</h3>
            <p>Join us for exclusive events, workshops, and webinars designed to inspire creativity and foster personal growth.</p>
          </div>
        </div>
      </section>
      {/* follows us on section */}
      <section>
        <h2 className="text-3xl font-semibold mb-4 mt-2">Follow Us On:</h2>
        <div className="flex justify-center space-x-4">
          <Link to="https://www.facebook.com/profile.php?id=100076522775933">
            <FontAwesomeIcon className='text-blue-600' icon={faFacebook} size="2x" />
          </Link>
          <Link to="https://www.instagram.com/mrusmanghani8/">
            <FontAwesomeIcon className='text-pink-700' icon={faInstagram} size="2x" />
          </Link>
          <Link to="https://www.linkedin.com/in/usman-ghani-11a460240/">
            <FontAwesomeIcon className='text-blue-600' icon={faLinkedin} size="2x" />
          </Link>
          <Link to="https://github.com/Usmanghani1518">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
