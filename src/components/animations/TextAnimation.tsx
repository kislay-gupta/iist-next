"use client"
import { motion } from 'framer-motion'

const TextAnimation = ({ text }: { text: string }) => {
  return (
    <motion.h1
      className="my-4 text-center capitalize md:text-start text-2xl lg:text-4xl font-bold tracking-tight text-gray-900"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {text}
    </motion.h1>
  )
}

export default TextAnimation