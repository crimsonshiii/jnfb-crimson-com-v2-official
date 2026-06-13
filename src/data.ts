// Resume and portfolio data for Jao Nicholas F. Benedicto (JNFB // Crimson)

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  middleInitial: string;
  nickName: string;
  title: string;
  subTitles: string[];
  bio: string;
  email: string;
  phone: string;
  address: string;
  github: string;
  linkedin: string;
  birthDate: string;
  birthPlace: string;
  age: number;
  civilStatus: string;
  languages: { name: string; level: string }[];
}

export interface Project {
  id: string;
  name: string;
  type: 'academic' | 'personal';
  role: string;
  techStack: string[];
  duration: string;
  description: string;
  bullets: string[];
  teamSize?: number;
  platforms?: string[];
  icon?: string;
  interactiveLink?: string;
  githubLink?: string;
  websiteLink?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  duration: string;
  location: string;
  bullets: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; info?: string }[];
}

export interface Achievement {
  id: string;
  category: 'all' | 'organizational';
  title: string;
  subtitle: string;
  year: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  location: string;
  year: string;
}

export const jnfbProfile: Profile = {
  name: "Jao Nicholas F. Benedicto",
  firstName: "Jao Nicholas",
  lastName: "Benedicto",
  middleInitial: "F.",
  nickName: "crimsonshiii",
  title: "Front-End Developer & UI/UX Designer",
  subTitles: ["Application Development Specialist", "Creative Graphic Designer", "Gaming Content Creator & Livestreamer"],
  bio: "A Computer Science student at the University of Makati specializing in Application Development, with expertise in front-end development, UI/UX, and graphic design. Skilled in creating interactive, user-centered digital experiences that balance functionality and aesthetics. Passionate about gaming, esports, and sound design, leveraging creativity to enhance immersion and engagement. Thrives in collaborative environments, contributing both technically and creatively to innovative projects.",
  email: "jaonicholasbenedicto0418@gmail.com",
  phone: "09389064360",
  address: "B-210 Makati Homes Milkweed St., Rizal, Taguig City, 1649",
  github: "https://github.com/crimsonshiii",
  linkedin: "https://linkedin.com/in/jao-nicholas-benedicto", // Standard LinkedIn placeholder
  birthDate: "April 18, 2004",
  birthPlace: "Manila, Metro Manila, Philippines",
  age: 22,
  civilStatus: "Single",
  languages: [
    { name: "English", level: "Fluent / Conversational" },
    { name: "Tagalog", level: "Fluent" },
    { name: "Korean", level: "Basic" }
  ]
};

export const jnfbProjects: Project[] = [
  // Academic Projects
  {
    id: "cicportal",
    name: "CIC Submission Portal",
    type: "academic",
    role: "UI/UX Desiner / Researcher / Front End Developer",
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Supabase"],
    duration: "2025-Present",
    description: "A comprehensive Job Recommendation System designed to match user profiles with ideal job positions dynamically using Laravel and custom matching algorithms.",
    bullets: [
      "Led a team of 4 scholars & developers in designing the architectural blueprint of the job recommendation pipeline.",
      "Designed and implemented the core user-friendly front-end interface, creating beautiful forms and high-contrast tables using AlpineJS and Tailwind CSS.",
      "Successfully conducted end-to-end quality and regression testing, ensuring seamless user flow from questionnaire to matches.",
      "Authored major documentation blocks including Chapters 1 to 5, establishing clear software requirements and methodology."
    ],
    teamSize: 4,
    platforms: ["Web Application"],
    githubLink: "https://github.com/crimsonshiii/cic-submission-portal",
    websiteLink: "https://crimsonshiii.github.io/cic-submission-portal"
  },
  {
    id: "empowerpath",
    name: "EmpowerPath",
    type: "academic",
    role: "Assistant Leader / Researcher",
    techStack: ["HTML", "CSS", "JS", "Tailwind CSS", "Laravel Framework", "PHP"],
    duration: "2025-Present",
    description: "A comprehensive Job Recommendation System designed to match user profiles with ideal job positions dynamically using Laravel and custom matching algorithms.",
    bullets: [
      "Led a team of 4 scholars & developers in designing the architectural blueprint of the job recommendation pipeline.",
      "Designed and implemented the core user-friendly front-end interface, creating beautiful forms and high-contrast tables using AlpineJS and Tailwind CSS.",
      "Successfully conducted end-to-end quality and regression testing, ensuring seamless user flow from questionnaire to matches.",
      "Authored major documentation blocks including Chapters 1 to 5, establishing clear software requirements and methodology."
    ],
    teamSize: 4,
    platforms: ["Web Application"],
    githubLink: "https://github.com/crimsonshiii/EmpowerPath",
    websiteLink: "https://crimsonshiii.github.io/EmpowerPath"
  },
  {
    id: "crimsonskillboost",
    name: "CrimsonSkillBoost: The Computer Science Hub",
    type: "academic",
    role: "Project Leader / UI/UX Designer / Tester",
    techStack: ["HTML", "CSS", "JS", "CodeIgniter Framework", "PHP", "Android Studio", "Java"],
    duration: "2024-2025",
    description: "An educational hub designed for computer science students to enhance technical proficiencies with course resources, assessments, and learning analytics.",
    bullets: [
      "Directed a web development team of 5 members, planning sprint logs, assignment charts, and code reviews.",
      "Designed and optimized the responsive front-end layouts using CodeIgniter 4 for the primary portal and integrated native Android Studio (Java) elements.",
      "Tested and validated user verification circuits, quiz scoring, and system resource caches for high-impact speed gains.",
      "Built rigorous documentation outlining the project charter, custom user stories, and comprehensive functional requirements trees."
    ],
    teamSize: 5,
    platforms: ["Mobile App", "Web Portal"],
    githubLink: "https://github.com/crimsonshiii/CrimsonSkillBoost"
  },
  {
    id: "objection-overruled",
    name: "Objection, Overruled!: The Legal Courtroom Game",
    type: "academic",
    role: "Project Leader / Game Analyst / Front End Designer",
    techStack: ["C#", "Unity Engine", "Canva", "UI Design"],
    duration: "2024-2025",
    description: "An immersive mobile gaming title that simulates legal court processes, presenting players with evidence analysis, cross-examinations, and legal decisions.",
    bullets: [
      "Led a 5-person game-design squad to construct interactive court scenarios with game logic built on Unity and state engines.",
      "Crafted the original game design document, script structure, case storylines, and user-decision branches.",
      "Developed high-fidelity UI layout comps on Canva, bridging them directly into Unity UI nodes with rigid responsive margins.",
      "Led documentation workflows creating user stories, case mechanics sheets, and functional specification frameworks."
    ],
    teamSize: 5,
    platforms: ["Mobile Game (Android/iOS)"],
    githubLink: "https://github.com/crimsonshiii/objection-overruled"
  },
  {
    id: "crimson-library",
    name: "Crimson Library System",
    type: "academic",
    role: "Project Leader / Front End Designer",
    techStack: ["C#", "Visual Studio", "Java", "Desktop UI Design"],
    duration: "2023-2024",
    description: "An enterprise-grade desktop inventory and cataloging suite for tracking media, user loans, overdue logs, and reservation queues.",
    bullets: [
      "Spearheaded a development crew of 4, dividing features into database integration, security layers, and interactive front-ends.",
      "Designed and refined the modern client-dashboard interfaces, modeling visual references from premium designs with smooth dark highlights.",
      "Executed user acceptance tests (UAT) and interface benchmarks to verify instantaneous search and query performance on local caches."
    ],
    teamSize: 4,
    platforms: ["Desktop App (Windows/DirectX)"],
    githubLink: "https://github.com/crimsonshiii/crimson-library-system"
  },
  // Personal Projects
  {
    id: "tot-murkoffterminal",
    name: "The Outlast Trials Murkoff Therapy Terminal",
    type: "personal",
    role: "Front End Designer / UI/UX Designer / Tester",
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Material UI"],
    duration: "2026-Present",
    description: "An interactive, game-accurate web application showcasing all the list of Main Trials and MK-Challenges and its information needed to guide the players (also known as reagents) to navigate throughout the therapy in the game.",
    bullets: [
      "Programmed a sleek, military-grade terminal interface evoking the psychological horror atmosphere of Red Barrels' Outlast series.",
      "Modeled accurate challenge lists and trial tracking components with search filters, dynamic status reports, and responsive retro grids.",
      "Incorporated rich audio cues and custom static noise filters imitating vintage cathode ray tube (CRT) monitor displays."
    ],
    platforms: ["Web Dashboard App"],
    githubLink: "https://github.com/crimsonshiii/murkoff-therapy-terminal",
    websiteLink: "https://crimsonshiii.github.io/murkoff-therapy-terminal"
  },
  {
    id: "jnfb-portfolio",
    name: "JNFB.Crimson.com (Personal Portfolio)",
    type: "personal",
    role: "Front End Designer / UI/UX Designer / Tester",
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "Shadcn/UI"],
    duration: "2025-Present",
    description: "The official interactive showcase portal of Jao Nicholas Benedicto. Combines cutting-edge animation structures, highly refined dark sci-fi color themes, and direct responsive resume maps.",
    bullets: [
      "Engineered high-performance scrolling sections and page status bars utilizing Framer Motion.",
      "Configured consistent dark-slate style architectures interspersed with rich primary crimson branding notes.",
      "Designed a smart diagnostic console contact utility, receiving real-time logs and user messages on local sandbox states."
    ],
    platforms: ["Responsive Web Platform"],
    githubLink: "https://github.com/crimsonshiii/jnfb-portfolio",
    websiteLink: "https://crimsonshiii.github.io/portfolio"
  },
  {
    id: "jnfb-cloudvault",
    name: "JNFB Cloud Vault",
    type: "personal",
    role: "Front End Designer / UI/UX Designer / Tester",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Cloud Utilities"],
    duration: "2025-Present",
    description: "A specialized elective portfolio cataloging advanced cloud deployment reports, virtual machine configurations, serverless microservices, and network subnet designs.",
    bullets: [
      "Built a secure archive framework to showcase active labs, Docker containers, and Cloud Computing milestones.",
      "Implemented a file-system explorer UI displaying interactive PDF summaries and live system reports.",
      "Formatted custom dashboards to display resource tracking, billing projections, and cluster architectures visually."
    ],
    platforms: ["Web Dashboard App"],
    githubLink: "https://github.com/crimsonshiii/jnfb-cloudvault",
    websiteLink: "https://crimsonshiii.github.io/jnfb-cloudvault"
  },
];

export const jnfbExperience: Experience[] = [
  {
    id: "intern-cic",
    role: "Software Engineer, Automation Engineer & Website Manager Intern",
    company: "University of Makati (CIC Onsite Internship)",
    type: "Onsite Modality Internship",
    duration: "Feb 2026 - May 2026",
    location: "J.P. Rizal, Extension, West Rembo, Taguig City",
    bullets: [
      "Assisted in designing, developing, testing, and maintaining mission-critical internal software systems used by the college department.",
      "Architected and deployed customized automated workflows to streamline repetitive administrative tasks and communication pipelines, slashing processing delays.",
      "Took principal custody of updating, auditing, and maintaining the college's public website content, ensuring 100% data fidelity, modern WCAG accessibility, and responsive load speed."
    ]
  },
  {
    id: "youtube-freelance",
    role: "Freelance Content Creator & Livestreamer",
    company: "YouTube / Remote Creator Modality",
    type: "Remote Creative Modality",
    duration: "Jan 2026 - Present",
    location: "Online Portal / Remote",
    bullets: [
      "Records, edits, and publishes gameplay commentary sessions for immersive tactical games including 'The Outlast Trials' and 'R.E.P.O.', building a dedicated community around horror-survival strategy.",
      "Utilizes professional-grade broadcasting gear, configuring Steam built-in capture tools paired with advanced OBS Studio setups to balance real-time gameplay audio, vocals, and latency.",
      "Strategizes SEO tag-mapping, description indexing, custom thumbnails, and title structures to maximize index visibility and visual brand authority.",
      "Reviews analytics curves (audience retention charts, CTR trends, geographic distribution) to pivot themes, schedule streams, and drive high viewer interaction."
    ]
  }
];

export const jnfbSkills: SkillCategory[] = [
  {
    category: "Technical & Coding Mastery",
    skills: [
      { name: "Front-End Development", level: 95, info: "Expert in responsive interfaces and pixel-perfect rendering" },
      { name: "React.js & Next.js", level: 90, info: "Highly skilled in state engines, hook patterns, and SSG/SSR" },
      { name: "Tailwind CSS", level: 95, info: "Flawless nested utilities, responsive configurations, and custom animations" },
      { name: "JavaScript / TypeScript", level: 92, info: "HackerRank certified intermediate/basic logic master" },
      { name: "C# & Unity Engine", level: 85, info: "Creative logic scripting for game loops, UI rigging, and state controls" },
      { name: "PHP (Laravel & CodeIgniter)", level: 88, info: "Experienced with clean MVC routing, database queries, and controllers" },
      { name: "HTML & CSS Core", level: 98, info: "Semantic markups, layouts, fluid box-models, and flexboxes" },
      { name: "Git & Version Control", level: 85, info: "Branch management, conflict resolution, and staging setups" }
    ]
  },
  {
    category: "Design & UX Strategy",
    skills: [
      { name: "UI/UX Modeling", level: 92, info: "User stories mapping, clickable wireframes, and interactive mockups" },
      { name: "Graphic Design", level: 85, info: "Color theory mastery, display typography, and visual branding patterns" },
      { name: "Canva & Figma Prototyping", level: 95, info: "High-contrast asset generation and vector spacing" },
      { name: "Sound Design Concepts", level: 80, info: "Atmospheric, ambient score selections, and audio cues integration" }
    ]
  },
  {
    category: "Professional Strengths",
    skills: [
      { name: "Leadership & Sprint Planning", level: 95, info: "Led teams of 4-5 scholars to successful deployments" },
      { name: "Research & Documentation", level: 98, info: "Chapters 1-5 master, thesis structure, and UML system modeling" },
      { name: "Time Management & Sprint Agility", level: 90, info: "High-honors graduate balance and strict project milestone tracking" },
      { name: "Adaptability & Rapid Learning", level: 95, info: "Fast onboarding across frameworks (e.g. CodeIgniter, Next.js)" }
    ]
  }
];

export const jnfbAchievements: Achievement[] = [
  {
    id: "csc-eligibility",
    category: "all",
    title: "Civil Service Commission - Certificate of Eligibility",
    subtitle: "Career Service Subprofessional Examination (Rating: 80.74%)",
    year: "2023"
  },
  {
    id: "umak-sc-secretary",
    category: "organizational",
    title: "UMak CCIS Student Council - Executive Secretary",
    subtitle: "Took command of council document archives, agenda transcripts, and administrative channels.",
    year: "2023-2024"
  },
  {
    id: "umak-sc-logistics",
    category: "organizational",
    title: "UMak CCIS Student Council - Logistics Staff",
    subtitle: "Managed physical assets, equipment inventories, and staging structures for active academic events.",
    year: "2022-2023"
  },
  {
    id: "infotechnolympics-head",
    category: "organizational",
    title: "InfoTechnolympics 2023: The Technology Supreme",
    subtitle: "Appointed as Event Head, planning contest layouts, judging spreadsheets, and participant schedules.",
    year: "2023"
  },
  {
    id: "it-skills-olympics",
    category: "organizational",
    title: "12th IT Skills Olympics",
    subtitle: "Committee Head managing staging configurations, network setup, and award certificates.",
    year: "2023"
  },
  {
    id: "language-consortium",
    category: "organizational",
    title: "The Language Consortium - Higher School ng UMak",
    subtitle: "Grade 11 Director & Assistant Secretary executing multilingual advocacy contests.",
    year: "2021-2022"
  }
];

export const jnfbCertifications: Certification[] = [
  {
    id: "hr-js-intermediate",
    title: "JavaScript (Intermediate) Certificate",
    issuer: "HackerRank",
    location: "Taguig City, Metro Manila",
    year: "2026"
  },
  {
    id: "hr-js-basic",
    title: "JavaScript (Basic) Certificate",
    issuer: "HackerRank",
    location: "Taguig City, Metro Manila",
    year: "2026"
  },
  {
    id: "fcc-responsive",
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    location: "Taguig City, Metro Manila",
    year: "2025"
  },
  {
    id: "certiport-db",
    title: "IT Specialist: Databases (SQL Server)",
    issuer: "Certiport - A Pearson VUE Business",
    location: "Taguig City, Metro Manila",
    year: "2025"
  },
  {
    id: "simplilearn-ml",
    title: "Machine Learning using Python Certificate",
    issuer: "Simplilearn SkillUp",
    location: "Taguig City, Metro Manila",
    year: "2025"
  }
];
