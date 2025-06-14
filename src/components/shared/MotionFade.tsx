"use client"
import { motion, Variants } from 'framer-motion';
import React from 'react';

interface MotionFadeProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
}

const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: custom,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

const MotionFade: React.FC<MotionFadeProps> = ({ children, className = '', delay = 0, duration = 0.6 }) => {
    return (
        <motion.div
            className={className}
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={delay}
            transition={{ duration }}
        >
            {children}
        </motion.div>
    );
};

export default MotionFade;
