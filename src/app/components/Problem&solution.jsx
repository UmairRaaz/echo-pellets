import React from 'react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProblemsSolutions = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="py-12 bg-white"
    >
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Problems & Solutions</h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <motion.div variants={itemVariants} className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            <FaExclamationCircle size={40} className="text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Problem 1</h3>
            <p className="text-gray-600 text-center mb-4">
              Many customers face delayed shipping which causes inconvenience and frustration.
            </p>
            <FaCheckCircle size={40} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Solution 1</h3>
            <p className="text-gray-600 text-center">
              Our express shipping ensures that your products arrive on time, every time.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            <FaExclamationCircle size={40} className="text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Problem 2</h3>
            <p className="text-gray-600 text-center mb-4">
              Customers worry about the security of their payment information.
            </p>
            <FaCheckCircle size={40} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Solution 2</h3>
            <p className="text-gray-600 text-center">
              We use state-of-the-art encryption technology to keep your data secure.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            <FaExclamationCircle size={40} className="text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Problem 3</h3>
            <p className="text-gray-600 text-center mb-4">
              Finding quality products can be difficult and time-consuming.
            </p>
            <FaCheckCircle size={40} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Solution 3</h3>
            <p className="text-gray-600 text-center">
              We offer a curated selection of high-quality products that meet your needs.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            <FaExclamationCircle size={40} className="text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Problem 4</h3>
            <p className="text-gray-600 text-center mb-4">
              Lack of customer support can lead to unresolved issues and dissatisfaction.
            </p>
            <FaCheckCircle size={40} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Solution 4</h3>
            <p className="text-gray-600 text-center">
              Our 24/7 customer support team is always available to assist you with any issues.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProblemsSolutions;
