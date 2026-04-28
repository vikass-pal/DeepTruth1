import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Lock, Cpu, Image as ImageIcon, Globe, Activity, Eye, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-8 border border-accent/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          v2.0 Model Live - Improved Accuracy
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          Verify <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Authenticity</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mb-10">
          Upload your media to detect AI-generated deepfakes with enterprise-grade neural networks. Instant analyzing for images, videos, and audio.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/detect" className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-premium hover:shadow-xl hover:-translate-y-1">
              Analyze Media
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <Link to="/how-it-works" className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-sm">
              Learn How It Works
            </button>
          </Link>
        </motion.div>

      </motion.section>

      {/* Live Stats Widget */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 py-8 mb-12 sm:px-6 lg:px-8"
      >
        <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-soft flex flex-col sm:flex-row justify-around items-center gap-8">
          <div className="text-center">
            <h4 className="text-4xl font-extrabold text-accent mb-2">99.8%</h4>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Detection Accuracy</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-gray-200 dark:bg-gray-800"></div>
          <div className="text-center">
            <h4 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">12M+</h4>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Media Analyzed</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-gray-200 dark:bg-gray-800"></div>
          <div className="text-center">
            <h4 className="text-4xl font-extrabold text-blue-500 mb-2">&lt; 2s</h4>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Avg. Processing Time</p>
          </div>
        </div>
      </motion.section>

      {/* Trusted By Banner */}
      <section className="py-10 border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0a0a0a]/50 flex flex-col items-center overflow-hidden">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Trusted by leading organizations</p>
        <div className="flex gap-12 sm:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholder SVG Logos */}
          <div className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-50"><ShieldCheck className="w-8 h-8 text-gray-600 dark:text-gray-400" /> SecurVerify</div>
          <div className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900 dark:from-blue-300 dark:to-blue-50"><Cpu className="w-8 h-8 text-blue-600 dark:text-blue-400" /> NeuroAI</div>
          <div className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-900 dark:from-purple-300 dark:to-purple-50"><Lock className="w-8 h-8 text-purple-600 dark:text-purple-400" /> VaultTech</div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 bg-secondary-bg dark:bg-[#111]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Forensic analysis in milliseconds
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Our pipeline looks for biological inconsistencies and digital artifacts invisible to the human eye.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800 hover:border-accent/30 transition-colors group">
              <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Neural Analysis</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Deep learning models scan for biological inconsistencies, pulse rates in videos, and frequency anomalies.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800 hover:border-accent/30 transition-colors group">
              <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Instant Results</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Receive a detailed confidence report with frame-by-frame artifact visualizers within seconds of uploading.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800 hover:border-accent/30 transition-colors group">
              <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Enterprise Security</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                End-to-end encrypted pipelines. Your data is never used for training and is deleted immediately after analysis.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 bg-white dark:bg-[#0a0a0a]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            <motion.div variants={itemVariants} className="flex-1 space-y-8">
              <span className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">The DeepTruth Advantage</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                Designed for speed, <br />built for absolute certainty.
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                While other platforms rely on single-method detection, our multi-modal approach cross-references visual artifacts with biological anomalies to eliminate false positives.
              </p>

              <ul className="space-y-4">
                {[
                  "No data retention - processing occurs purely in-memory",
                  "Support for up to 50MB file sizes across 6 formats",
                  "Detailed frame-by-frame analysis reports",
                  "API access available for enterprise integration"
                ].map((item, idx) => (
                  <motion.li key={idx} variants={itemVariants} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div variants={itemVariants} className="pt-4">
                <Link to="/how-it-works" className="inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  Explore our technical paper <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex-1 w-full max-w-lg lg:max-w-none relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20 dark:opacity-30"></div>
              <div className="relative bg-white dark:bg-[#111] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a]">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400"><Globe className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Global CDN Network</h4>
                      <p className="text-sm text-gray-500">Low-latency uploads anywhere</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a]">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl text-purple-600 dark:text-purple-400"><Activity className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Biological Variance Scan</h4>
                      <p className="text-sm text-gray-500">Detecting synthetic skin textures</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a]">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl text-green-600 dark:text-green-400"><Eye className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Computer Vision Forensics</h4>
                      <p className="text-sm text-gray-500">Sub-pixel artifact tracking</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 bg-gray-50 dark:bg-[#0f0f0f]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What Industry Leaders Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              {
                quote: "DeepTruth's API integration allowed our newsroom to automatically flag suspicious incoming media before publication, saving us from massive liability.",
                name: "Sarah Jenkins",
                role: "Director of Fact-Checking, Global News Network"
              },
              {
                quote: "The speed is unmatched. Our KYC verification pipeline relies on this tool to immediately reject synthetic identity documents without slowing down user onboarding.",
                name: "David Chen",
                role: "CTO, FinVerify Fintech"
              },
              {
                quote: "Their forensic breakdown doesn't just give a 'fake' score—it shows exactly where the digital manipulation occurred, which is crucial for our investigations.",
                name: "Marcus Thorne",
                role: "Lead Investigator, CyberSec Forensics"
              }
            ].map((testimonial, idx) => (
              <motion.div key={idx} variants={itemVariants} className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                <p className="text-gray-600 dark:text-gray-300 italic mb-8 relative z-10">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-accent mt-1">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="py-24"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 sm:p-16 text-center shadow-premium relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 relative z-10">
              Ready to verify your media?
            </h2>
            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 relative z-10">
              Join thousands of organizations using DeepTruth to protect their digital integrity.
            </p>

            <Link to="/detect" className="relative z-10 inline-block">
              <button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Start Detection Free
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
};

export default Home;
