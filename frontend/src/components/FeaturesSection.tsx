import { animate, easeInOut, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Brain,
  Sparkles,
  LinkIcon,
  FileCheck2,
  BookmarkCheckIcon,
  PersonStanding,
} from "lucide-react";
import { useEffect } from "react";

const features = [
  {
    icon: <FileCheck2 className="w-8 h-8 text-[#4642ff]" />,
    title: "Colaboration & Sharing",
    description:
      "Share your organized content with friends, team members, or the world with simple link sharing.",
  },
  {
    icon: <LinkIcon className="w-8 h-8 text-[#4642ff]" />,
    title: "Universal Integration",
    description:
      "Connect and import content from Twitter, YouTube, and more.[PS: more integrations coming soon]",
  },
  {
    icon: <BookmarkCheckIcon className="w-8 h-8 text-[#4642ff]" />,
    title: "Custom tagging",
    description: "Easily organize your content with custom tags.",
  },
  {
    icon: <Brain className="w-8 h-8 text-[#4642ff]" />,
    title: "Smart Suggestions",
    description:
      "Get personalized suggestions based on your content and preferences.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-[#4642ff]" />,
    title: "Customizable themes",
    description:
      "Choose from a variety of themes to personalize your experience.",
  },
  {
    icon: <PersonStanding className="w-8 h-8 text-[#4642ff]" />,
    title: "Offline Access",
    description: "Access your content even when you're offline.",
  },
];
const COLORS = [
  "#f72585", "#b5179e", "#7209b7", "#560bad", "#480ca8",
  "#3a0ca3", "#3f37c9", "#4361ee", "#4895ef", "#4cc9f0"
];
export default function FeaturesSection() {
  const color = useMotionValue(COLORS[0])
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 100% , #FFFFFF 55%, ${color})`
  
  useEffect(() => {
    animate(color,COLORS,{
      ease:easeInOut,
      duration:10,
      repeat:Infinity,
      repeatType:"mirror"
    })
  },[])
  return (
    <motion.section 
    style={{backgroundImage}}
    className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What&apos;s in Brainify
          </h2>
          <p className="text-xl text-gray-600">
            Essentials to organize your digital life.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center mt-8">
          *Some of the above mentioned features may not be available 
        </p>
      </div>
    </motion.section>
  );
}
