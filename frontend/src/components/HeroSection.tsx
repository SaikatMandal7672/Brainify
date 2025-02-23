
import { animate, easeInOut, motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { Terminal } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom";

const COLORS = [
  "#f72585", "#b5179e", "#7209b7", "#560bad", "#480ca8",
  "#3a0ca3", "#3f37c9", "#4361ee", "#4895ef", "#4cc9f0"
];
export default function HeroSection() {
  const color = useMotionValue(COLORS[0])
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0% , #FFFFFF 55%, ${color})`

  useEffect(() => {
    animate(color, COLORS, {
      ease: easeInOut,
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror"
    })
  }, )
  return (
    <motion.section
      style={{
        backgroundImage: backgroundImage,

      }}
      className="pt-32 pb-16 px-4">
      <div className="h-[74vh] container mx-auto max-w-6xl text-center">
        <motion.h1

          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
        >
          Your Second Brain for the Web
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          Brainify enables you to create
          <span className="text-black font-semibold"> organized digital notes </span>
          that are easily accessible and shareable.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
        >
          <Link to="/signup" className="px-8 py-4 rounded-lg bg-[#4642ff] text-white hover:bg-[#5147E4] transition-colors text-lg font-semibold">
            Get Started
          </Link>
          <a
            href="https://github.com/SaikatMandal7672/Brainify"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors text-lg font-semibold"
          >
            Learn More
          </a>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-black text-white rounded-lg p-4 max-w-md mx-auto font-mono text-sm flex items-center justify-center gap-2"
        >
          <Terminal size={20} />
          <span>Work place to manage your learnings.</span>
        </motion.div>
      </div>
    </motion.section>
  )
}

