'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../../../public/slide1.jpg';
import image2 from '../../../public/slide2.jpg';
import image3 from '../../../public/slide3.jpg';
import { FaShoppingCart } from 'react-icons/fa';

const ImageSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    pauseOnFocus: true,
    cssEase: 'ease-in-out',
  };

  const HeroData = [
    {
      id: 1,
      img: image1,
      subtitle: 'Echo Pellets',
      title: 'Stoves',
      title2: 'Pellets',
    },
    {
      id: 2,
      img: image2,
      subtitle: 'Echo Pellets',
      title: 'Stoves',
      title2: 'Pellets',
    },
    {
      id: 3,
      img: image3,
      subtitle: 'Echo Pellets',
      title: 'Stoves',
      title2: 'Pellets',
    },
  ];

  return (
    <div className="w-full relative flex items-center">
      <div className="w-full h-full">
        <Slider {...settings}>
          {HeroData.map((data) => (
            <Slide key={data.id} data={data} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

const Slide = ({ data }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
    >
      <img
        src={data.img.src}
        className="w-full h-full object-cover"
        alt={data.title}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex gap-1 sm:gap-3 flex-col justify-center items-center text-center text-white p-4">
        <motion.h1 className="text-xl sm:text-2xl md:text-4xl lg:text-[60px] font-bold" variants={itemVariants}>
          {data.subtitle}
        </motion.h1>
        <motion.h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl" variants={itemVariants}>
          {data.title}
        </motion.h2>
        <motion.h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl mt-1" variants={itemVariants}>
          {data.title2}
        </motion.h3>
        <a href="/products">
    <motion.button
      className="bg-green-400 hover:bg-white text-white hover:text-green-500 font-semibold py-2 px-4 border border-green-500 rounded transition duration-300 flex items-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      variants={itemVariants}
    >
      <FaShoppingCart className="mr-2" /> Purchase
    </motion.button>
  </a>
      </div>
    </motion.div>
  );
};

export default ImageSlider;
