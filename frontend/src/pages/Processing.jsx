import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Fingerprint } from 'lucide-react';
import axios from 'axios';

const Processing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file;
  
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing neural models...");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!file) {
      navigate('/detect');
      return;
    }

    const startAnalysis = async () => {
      // Simulate progress bar increments while waiting for API
      const statuses = [
        "Initializing neural models...",
        "Extracting metadata...",
        "Analyzing frequency domains...",
        "Checking for biological artifacts...",
        "Running frame analysis...",
        "Compiling forensic report..."
      ];
      
      let currentStatusIdx = 0;
      
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return 95; // Hold at 95% until API finishes
          return prev + (Math.random() * 5);
        });
        
        if (Math.random() > 0.7 && currentStatusIdx < statuses.length - 1) {
          currentStatusIdx++;
          setStatusText(statuses[currentStatusIdx]);
          setLogs(prev => [...prev, `[INFO] ${statuses[currentStatusIdx]}`]);
        }
      }, 800);

      // CPU-Fallback Timeout Warning (HF models take 60-90s on CPU)
      const cpuWarningTimeout = setTimeout(() => {
        setStatusText("Heavy CPU execution in progress...");
        setLogs(prev => [...prev, "[WARNING] Model executing on CPU. This may take up to 90 seconds."]);
      }, 15000);

      try {
        const formData = new FormData();
        formData.append("file", file);

        let endpoint = "http://localhost:8000/detect/";
        if (file.type.startsWith('image/')) endpoint += 'image';
        else if (file.type.startsWith('video/')) endpoint += 'video';
        else if (file.type.startsWith('audio/')) endpoint += 'audio';
        else endpoint += 'image'; // Fallback

        const response = await axios.post(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        clearTimeout(cpuWarningTimeout);
        clearInterval(progressInterval);
        setProgress(100);
        setStatusText("Analysis complete");
        setLogs(prev => [...prev, `[SUCCESS] Output verified: ${response.data.prediction}`]);
        
        // Short delay before showing results for smooth UX
        setTimeout(() => {
          navigate('/results', { state: { result: response.data, fileUrl: URL.createObjectURL(file), fileType: file.type } });
        }, 1000);

      } catch (error) {
        clearTimeout(cpuWarningTimeout);
        clearInterval(progressInterval);
        console.error("API Error", error);
        setLogs(prev => [...prev, `[ERROR] Analysis failed. Please try again.`]);
        setTimeout(() => navigate('/detect'), 3000);
      }
    };

    startAnalysis();
    
    // Cleanup URL objective creation
    return () => { }
  }, [file, navigate]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 max-w-4xl mx-auto">
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">AI Analysis in Progress</h1>
        <p className="text-gray-500 dark:text-gray-400">Our neural networks are dissecting the media for synthetic manipulation.</p>
      </div>

      <div className="w-full bg-white dark:bg-[#111] rounded-3xl p-8 shadow-premium border border-gray-100 dark:border-gray-800 relative overflow-hidden">
        
        {/* Animated Scanner Visual */}
        <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl">
          <Cpu className="w-48 h-48 text-accent animate-pulse" />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-1">Engine Status</p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{statusText}</h3>
            </div>
            <div className="text-4xl font-bold text-accent">
              {Math.floor(progress)}<span className="text-xl">%</span>
            </div>
          </div>

          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-4 mb-2 overflow-hidden shadow-inner">
            <motion.div 
              className="bg-accent h-4 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
            </motion.div>
          </div>
        </div>

        {/* Terminal logs block */}
        <div className="mt-8 bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 h-40 overflow-hidden relative shadow-inner">
          <div className="absolute top-4 right-4 text-gray-600">v2.4.0-stable</div>
          <p className="opacity-50">[OK] Model initialized: DeepGuard_Inception_V4</p>
          <p className="opacity-50">[OK] Connection to analysis server established</p>
          {logs.map((log, idx) => (
            <motion.p 
              key={idx} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className={log.includes('[ERROR]') ? 'text-red-400' : 'text-green-400'}
            >
              {log}
            </motion.p>
          ))}
          <motion.div 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-2 h-4 bg-green-400 mt-2"
          ></motion.div>
        </div>

      </div>
    </div>
  );
};

export default Processing;
