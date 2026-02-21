"use client";

import Link from "next/link";
import { Button } from "./_ui/button";
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  Globe,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";

export default function LandingPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-background flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-linear-to-b from-primary/10 to-transparent pointer-events-none -z-1" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none -z-1" />
      <div className="absolute top-3/4 left-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none -z-1" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm mb-10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Future-Proof Your Education
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground mb-8 text-balance">
            Your Journey to <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400">
              Global Excellence
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed text-pretty">
            Shabuj Global helps you discover, compare, and apply to the
            world&apos;s most prestigious universities. All in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/universities">
              <Button
                size="lg"
                className="w-full sm:w-auto h-16 px-10 gap-3 group"
              >
                Find Universities
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto h-16 px-10"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 max-w-5xl mx-auto"
        >
          {[
            { icon: Globe, label: "Universities", value: "2,000+" },
            { icon: GraduationCap, label: "Countries", value: "50+" },
            { icon: Shield, label: "Success Rate", value: "98%" },
            { icon: Sparkles, label: "Scholarships", value: "$2M+" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none -z-2" />
    </main>
  );
}
