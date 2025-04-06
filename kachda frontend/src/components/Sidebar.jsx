import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FinancePattern = () => (
  <motion.div 
    className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.05 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      animate={{ 
        y: [0, -100],
        x: [0, -50],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }}
      className="absolute inset-0"
    >
      {/* Finance-related pattern */}
      <svg width="200%" height="200%" viewBox="0 0 100 100" className="text-white">
        <pattern id="finance-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 0h20v20H0z" fill="none"/>
          <path d="M3 3h2v2H3z"/>
          <path d="M15 3h2v2h-2z"/>
          <path d="M9 3h2v2H9z"/>
          <path d="M3 9h2v2H3z"/>
          <path d="M15 9h2v2h-2z"/>
          <path d="M9 9h2v2H9z"/>
          <path d="M3 15h2v2H3z"/>
          <path d="M15 15h2v2h-2z"/>
          <path d="M9 15h2v2H9z"/>
          <path d="M6 6l8 8M14 6l-8 8"/>
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#finance-pattern)"/>
        
        {/* Dollar signs scattered around */}
        <g className="dollar-signs">
          <motion.path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"
            fill="currentColor"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </g>
        
        {/* Chart lines */}
        <motion.path
          d="M0 50 Q 25 30, 50 50 T 100 50"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          animate={{
            d: [
              "M0 50 Q 25 30, 50 50 T 100 50",
              "M0 50 Q 25 70, 50 50 T 100 50",
              "M0 50 Q 25 30, 50 50 T 100 50"
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </motion.div>
  </motion.div>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Expenses',
      path: '/expenses',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: 'Goals',
      path: '/goals',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    }
  ];

  const sidebarVariants = {
    expanded: {
      width: "16rem",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    collapsed: {
      width: "4rem",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const menuItemVariants = {
    expanded: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    collapsed: {
      x: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      className="fixed left-0 top-0 h-screen pt-16 bg-gray-800 text-white overflow-hidden z-40"
      style={{
        boxShadow: '4px 0 6px -1px rgba(0, 0, 0, 0.1), 2px 0 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <FinancePattern />

      <div className="relative z-10 h-full">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-4 bg-gray-800 text-white rounded-full p-1.5 hover:bg-gray-700 focus:outline-none shadow-lg"
        >
          <motion.svg
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4 text-white" // Added text-white
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </motion.svg>
        </motion.button>

        <nav className="mt-8">
          <AnimatePresence>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 transition-colors duration-200 relative ${
                    isActive
                      ? 'bg-gray-900 bg-opacity-60 text-white'
                      : 'text-white hover:bg-gray-700 hover:bg-opacity-60'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-white" // Added text-white
                  >
                    <div className="text-white"> {/* Wrapper for icon */}
                      {item.icon}
                    </div>
                    <motion.span
                      variants={menuItemVariants}
                      initial="expanded"
                      animate={isCollapsed ? "collapsed" : "expanded"}
                      exit="collapsed"
                      className="ml-3 text-sm font-medium whitespace-nowrap text-white" // Added text-white
                    >
                      {item.name}
                    </motion.span>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-white" // Changed to bg-white
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </AnimatePresence>
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;