/**
 * Cosmic Crew Hackathon - Data Module
 * Complete configuration and content database
 */

const COSMIC_DATA = {
  hackathon: {
    title: "COSMIC CREW",
    tagline: "EMERGENCY PROTOCOL // HACKATHON 2026",
    edition: "VCET COSMIC EDITION 2026",
    venue: "Vidyavardhini's College of Engineering & Technology",
    duration: "30 HOURS",
    dates: "OCTOBER 24-25, 2026",
    totalPrizePool: "₹1,05,000",
    expectedHackers: "300+ CREWMATES",
    targetDate: new Date(Date.now() + (2 * 24 * 60 * 60 + 10 * 60 * 60 + 59 * 60 + 19) * 1000).toISOString(),
    status: "REGISTRATIONS OPEN",
    stats: [
      { id: "jackpot", label: "TOTAL PRIZE VAULT", value: "₹1,05,000", subtext: "CASH & BOUNTIES", icon: "vault" },
      { id: "duration", label: "MISSION DURATION", value: "30 HRS", subtext: "NON-STOP CODING", icon: "timer" },
      { id: "crew", label: "FLEET HEADCOUNT", value: "300+", subtext: "CREWMATES ASSEMBLED", icon: "crew" },
      { id: "tracks", label: "MISSION TRACKS", value: "6 TASKS", subtext: "DOMAINS TO EXPLORE", icon: "tracks" }
    ]
  },

  tasks: [
    {
      id: "task-1",
      number: "TASK 01",
      title: "Fix Wiring: Decentralized Space Protocols",
      category: "Web3 & Blockchain",
      shortDescription: "Restore damaged communication channels between galactic stations using smart contracts, decentralized identity, or zero-knowledge security.",
      fullDescription: "The mothership's main electrical and comms bus has been tampered with. Your crew must build decentralized, trustless protocols to prevent unauthorized impostor access. Build dApps, cross-chain verification tools, or verifiable data sharing systems for interplanetary nodes.",
      difficulty: "COMMON TASK",
      difficultyLevel: "Medium",
      color: "#00f0ff",
      icon: "wiring",
      tags: ["Solidity", "Smart Contracts", "zk-SNARKs", "IPFS", "DeFi"],
      sampleIdeas: [
        "Trustless multi-signature emergency pod ejection voting dApp",
        "Decentralized bounty vault with instant milestone-based payouts",
        "Zero-knowledge identity pass for spaceship crew verification"
      ],
      points: 1500
    },
    {
      id: "task-2",
      number: "TASK 02",
      title: "Calibrate Engine: Autonomous AI Crewmates",
      category: "AI & Machine Learning",
      shortDescription: "Deploy intelligent LLM agents and predictive models to monitor ship telemetry, detect anomalies, and assist crew navigation.",
      fullDescription: "Deep space navigation requires hyper-accurate anomaly detection. Build multimodal AI agents, autonomous code-repair bots, or predictive maintenance systems that keep the warp core stabilized even when chaos strikes.",
      difficulty: "LONG TASK",
      difficultyLevel: "Hard",
      color: "#ff007f",
      icon: "engine",
      tags: ["Gemini API", "PyTorch", "Autonomous Agents", "Computer Vision", "RAG"],
      sampleIdeas: [
        "Real-time impostor biometric & behavioral anomaly detection agent",
        "Multimodal co-pilot for automated sensor diagnostics and voice dispatch",
        "Synthetic data generator for space navigation failure simulation"
      ],
      points: 2000
    },
    {
      id: "task-3",
      number: "TASK 03",
      title: "Prime Shields: Zero-Trust Cyber Defense",
      category: "Cybersecurity & Cloud",
      shortDescription: "Defend against sabotage! Construct fortress-level intrusion detection, automated threat isolation, and biometric shield perimeters.",
      fullDescription: "Saboteurs are lurking in the air vents. We need real-time SIEM systems, honey-pots, memory leak detectors, and threat mitigation pipelines that automatically isolate infected ship pods before critical systems collapse.",
      difficulty: "LONG TASK",
      difficultyLevel: "Hard",
      color: "#ffe600",
      icon: "shields",
      tags: ["Zero-Trust", "eBPF", "Honey-pots", "Cloud Sec", "Cryptography"],
      sampleIdeas: [
        "Autonomous quarantine orchestrator for compromised cloud containers",
        "Network packet analyzer with visual threat radar in real-time",
        "Biometric multi-factor keycard with anti-spoofing challenge"
      ],
      points: 1800
    },
    {
      id: "task-4",
      number: "TASK 04",
      title: "Download Data: High-Velocity Stream Engine",
      category: "Big Data & Space Analytics",
      shortDescription: "Process gigabytes of deep-space sensor telemetry in real-time to visualize cosmic storms, star charts, and fleet telemetry.",
      fullDescription: "Every second, the ship's sensor arrays record millions of data points from surrounding galaxies. Design high-throughput data processing pipelines, interactive 3D spatial visualizers, and edge-computing telemetry processors.",
      difficulty: "SHORT TASK",
      difficultyLevel: "Medium",
      color: "#00ff66",
      icon: "download",
      tags: ["Kafka", "ClickHouse", "Three.js", "WebSockets", "Data Pipelines"],
      sampleIdeas: [
        "Real-time 3D planetary collision warning and orbital visualizer",
        "Distributed telemetry collector for edge devices with offline sync",
        "Interactive star-map query engine with sub-second geospatial analytics"
      ],
      points: 1200
    },
    {
      id: "task-5",
      number: "TASK 05",
      title: "Swipe Card: Interstellar FinTech & Payments",
      category: "FinTech & Payments",
      shortDescription: "Build seamless, fraud-proof transaction rails for galactic trade, micro-escrow, and instant multi-currency fuel settlements.",
      fullDescription: "Trade between planetary colonies requires ultra-low latency settlement, instant currency conversion, and fraud detection that prevents fraudulent transactions before they clear warp gate customs.",
      difficulty: "SHORT TASK",
      difficultyLevel: "Easy",
      color: "#a855f7",
      icon: "card",
      tags: ["Stripe", "UPI / Rails", "Fraud ML", "Micro-escrow", "Next.js"],
      sampleIdeas: [
        "One-tap zero-friction offline NFC payments for remote stations",
        "AI-powered dynamic gas-fee optimizer and cross-border currency swap",
        "Gamified savings vault with team staking and milestone unlocking"
      ],
      points: 1400
    },
    {
      id: "task-6",
      number: "TASK 06",
      title: "Clear Asteroids: Open Innovation & Gaming",
      category: "Open Innovation & WebXR",
      shortDescription: "Unleash your creativity! Build browser games, AR/VR simulations, health-tech survival suites, or social platforms for isolated crews.",
      fullDescription: "No boundaries, pure cosmic creativity. Solve any real-world challenge using emerging web tech, interactive gamification, social collaboration spaces, or accessible assistive tech for the crew.",
      difficulty: "COMMON TASK",
      difficultyLevel: "Open",
      color: "#ff9900",
      icon: "asteroids",
      tags: ["WebXR", "Canvas / WebGL", "Accessibility", "GameDev", "IoT"],
      sampleIdeas: [
        "Collaborative multi-user virtual war room for remote emergency crews",
        "Gamified coding playground with live peer battles and retro sound effects",
        "Accessible screen-reader spatial navigation for visually impaired astronauts"
      ],
      points: 1600
    }
  ],

  timeline: [
    {
      level: "LEVEL 0",
      stage: "PRE-STAGE",
      name: "Lobby Assembly & Squad Forming",
      time: "DAYS BEFORE LAUNCH",
      date: "OCTOBER 15 - 23",
      status: "COMPLETED",
      description: "Join the official Discord dropship, lock in your crew of 1-4 hackers, participate in pre-hack tech workshops, and customize your battle station.",
      highlights: ["Team Matchmaker channel", "API Sandbox Access", "Rules & Protocol Briefing"]
    },
    {
      level: "LEVEL 1",
      stage: "DAY ONE - 09:00 AM",
      name: "Hyperspace Launch & Task Rollout",
      time: "HOUR 00:00",
      date: "OCTOBER 24",
      status: "ACTIVE",
      description: "The airlock opens! Keynote address, live problem statements revealed, coding terminals ignite, and the 30-hour countdown begins.",
      highlights: ["Opening Keynote & Sponsor Keynotes", "Problem Statement Deep Dives", "Hacking Timer Starts"]
    },
    {
      level: "LEVEL 2",
      stage: "DAY ONE - 08:00 PM",
      name: "Reactor Surge & Sabotage Mini-Games",
      time: "HOUR 11:00",
      date: "OCTOBER 24",
      status: "LOCKED",
      description: "Mid-sprint checkpoint with industry mentors. Midnight pizza recharge, speed debugging trivia, and Impostor Hunt mini-games to win bonus swag!",
      highlights: ["1-on-1 Mentor Checkpoints", "Midnight Energy Fuel & Pizza", "Among Us Live Tournament"]
    },
    {
      level: "LEVEL 3",
      stage: "DAY TWO - 08:00 AM",
      name: "Oxygen Depletion & Code Freeze",
      time: "HOUR 23:00",
      date: "OCTOBER 25",
      status: "LOCKED",
      description: "Final push to polish UIs, deploy demo URLs, write documentation, and submit GitHub repositories before the airlock seals shut at 03:00 PM.",
      highlights: ["Breakfast & Coffee Surge", "GitHub Submission Deadline", "Pitch Deck Finalization"]
    },
    {
      level: "LEVEL 4",
      stage: "DAY TWO - 03:30 PM",
      name: "Emergency Meeting & Victory Pods",
      time: "HOUR 30:00",
      date: "OCTOBER 25",
      status: "LOCKED",
      description: "Final top-10 team live demonstrations in the Main Cafeteria. Jury voting, impostor reveals, trophy presentations, and the ₹1,05,000 vault unlock!",
      highlights: ["Live Stage Pitches (3 min demo + 2 min Q&A)", "Jury Evaluation", "Grand Prize Ceremony"]
    }
  ],

  prizes: {
    total: "₹1,05,000",
    top5: [
      {
        rank: "1ST PLACE",
        title: "Supreme Commander (Winner)",
        amount: "₹50,000",
        badge: "GOLDEN VISOR",
        color: "#ffd700",
        perks: ["₹50,000 Direct Cash Prize", "Champion Trophy & Gold Medals", "Fast-track Startup Incubation", "Exclusive Swag Backpacks", "Direct Interview Passes"]
      },
      {
        rank: "2ND PLACE",
        title: "First Officer (Runner Up)",
        amount: "₹25,000",
        badge: "SILVER VISOR",
        color: "#c0c0c0",
        perks: ["₹25,000 Cash Prize", "Silver Plaques & Medals", "Cloud Credits ($500+)", "Priority Internship Screening"]
      },
      {
        rank: "3RD PLACE",
        title: "Flight Engineer (2nd Runner Up)",
        amount: "₹15,000",
        badge: "BRONZE VISOR",
        color: "#cd7f32",
        perks: ["₹15,000 Cash Prize", "Bronze Plaques & Medals", "Premium Tech Subscriptions", "Cosmic Swag Kits"]
      },
      {
        rank: "4TH PLACE",
        title: "Master Navigator",
        amount: "₹10,000",
        badge: "CYAN VISOR",
        color: "#00f0ff",
        perks: ["₹10,000 Cash Prize", "Top 5 Certificate of Excellence", "Domain & Hosting Credits", "Cosmic Crew Merch"]
      },
      {
        rank: "5TH PLACE",
        title: "Comms Specialist",
        amount: "₹5,000",
        badge: "LIME VISOR",
        color: "#00ff66",
        perks: ["₹5,000 Cash Prize", "Top 5 Certificate of Excellence", "Developer Tool Kits", "Cosmic Crew Merch"]
      }
    ],
    bounties: [
      { title: "Best Impostor Hunter", category: "Best Security / Anti-Sabotage", prize: "₹5,000", icon: "shield-alert" },
      { title: "Sleekest Visor UI", category: "Best UI/UX Holo-Design", prize: "₹5,000", icon: "sparkles" },
      { title: "Best Rookie Astronauts", category: "Best All-First-Year Team", prize: "₹5,000", icon: "baby" },
      { title: "Cosmic AI Agent", category: "Best Use of Generative AI", prize: "₹5,000", icon: "bot" }
    ]
  },

  sponsors: [
    {
      tier: "ALPHA CENTAURI TIER (TITLE)",
      companies: [
        { name: "Galactic Cloud Services", role: "Title Sponsor", logo: "cloud-star", perk: "$2,000 API Credits to all teams" },
        { name: "Nova Quantum Labs", role: "AI Compute Partner", logo: "cpu", perk: "Dedicated GPU clusters" }
      ]
    },
    {
      tier: "ORBITAL TIER (GOLD)",
      companies: [
        { name: "Nebula Protocol", role: "Web3 Track Partner", logo: "hexagon", perk: "₹20,000 Dedicated Track Bounty" },
        { name: "CyberShield Vanguard", role: "Security Partner", logo: "shield", perk: "Free Pen-Testing Licenses" },
        { name: "DevCosmos API", role: "Developer Tools", logo: "terminal", perk: "Pro Tier access for 1 year" }
      ]
    },
    {
      tier: "COMMUNITY & PLATFORM ALLIES",
      companies: [
        { name: "HackQuest Galaxy", role: "Platform Partner", logo: "globe", perk: "Global Hacker Community" },
        { name: "StarFuel Caffeine", role: "Energy Partner", logo: "coffee", perk: "Unlimited Fuel for 30H" },
        { name: "StickerStar Fleet", role: "Swag Partner", logo: "sticker", perk: "Holographic Vinyl Stickers" }
      ]
    }
  ],

  gallery: [
    {
      id: "mem-1",
      title: "Cafeteria Midnight Sprint",
      tag: "HACKING",
      caption: "Over 200 developers locked in deep code concentration at 3:00 AM.",
      image: "media_1788285210355.jpg",
      year: "2025 EDITION"
    },
    {
      id: "mem-2",
      title: "Arcade Scoreboard Reveal",
      tag: "CEREMONY",
      caption: "The electric moment when the top 5 scores flashed across the auditorium screens.",
      image: "media_1788285210362.jpg",
      year: "2025 EDITION"
    },
    {
      id: "mem-3",
      title: "Battlefield Track Pitching",
      tag: "KEYNOTE",
      caption: "Team captains presenting their AI emergency response systems to the jury.",
      image: "media_1788285210369.jpg",
      year: "2024 EDITION"
    },
    {
      id: "mem-4",
      title: "Campfire Code Debrief",
      tag: "COMMUNITY",
      caption: "Mentors and students debugging tricky async network loops over midnight chai.",
      image: "media_1788285210379.jpg",
      year: "2024 EDITION"
    },
    {
      id: "mem-5",
      title: "Victory Trophy Presentation",
      tag: "WINNERS",
      caption: "The champion team celebrating their ₹50,000 jackpot win on the main stage.",
      image: "media_1788285210385.jpg",
      year: "2025 EDITION"
    }
  ],

  faqs: [
    {
      q: "Who can board the Cosmic Crew mothership?",
      a: "Any undergraduate student, polytechnic student, or postgraduate enrolled in an accredited university or college is eligible to participate. You just need passion, a laptop, and your crewmate spirit!"
    },
    {
      q: "What is the team size limit?",
      a: "Teams can have between 1 to 4 crewmates. If you are flying solo, don't worry! We have a dedicated 'Team Matchmaker' channel on our Discord server where you can find fellow astronauts."
    },
    {
      q: "Is there any registration fee to enter the airlock?",
      a: "NO! Cosmic Crew is 100% FREE for all accepted participants. We provide meals, high-speed Wi-Fi, mentorship, swags, midnight snacks, and coffee throughout the 30 hours."
    },
    {
      q: "What if I am a beginner and have never hacked before?",
      a: "Cosmic Crew welcomes all skill levels! We have seasoned industry mentors walking the floor 24/7 to guide you through debugging, architecture design, and pitch coaching. Plus, we have dedicated Beginner Bounties!"
    },
    {
      q: "Can we use pre-existing code?",
      a: "All code must be written during the 30-hour hacking window. You may use open-source libraries, APIs, and public frameworks, but pre-built project solutions will result in immediate ejection from the airlock by the jury."
    },
    {
      q: "What are the judging criteria during the Emergency Meeting?",
      a: "Projects are evaluated on: Innovation & Originality (25%), Technical Complexity & Execution (25%), Practical Impact & Problem Fit (25%), and UI/UX & Demo Presentation (25%)."
    }
  ],

  crewmates: [
    { id: "red", name: "Red", color: "#c51111", highlight: "#f62d31", shadow: "#7a0838", role: "Captain / Suspicious" },
    { id: "cyan", name: "Cyan", color: "#38fedc", highlight: "#70ffe6", shadow: "#24a89c", role: "Chief Engineer" },
    { id: "lime", name: "Lime", color: "#50ef39", highlight: "#8cfb7b", shadow: "#24941e", role: "Navigation Lead" },
    { id: "pink", name: "Pink", color: "#ed54ba", highlight: "#f58ce0", shadow: "#ab2b84", role: "Comms Director" },
    { id: "yellow", name: "Yellow", color: "#f5f557", highlight: "#ffff99", shadow: "#c2bc16", role: "Reactor Specialist" },
    { id: "black", name: "Black", color: "#3f474e", highlight: "#6b7785", shadow: "#1e2227", role: "Security Officer" },
    { id: "purple", name: "Purple", color: "#6b2fbb", highlight: "#9b5be8", shadow: "#3b1770", role: "Science Officer" },
    { id: "orange", name: "Orange", color: "#f07d0d", highlight: "#ffa64d", shadow: "#b35203", role: "Shield Operator" }
  ]
};

// Export to window
window.COSMIC_DATA = COSMIC_DATA;
