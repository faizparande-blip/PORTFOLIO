/**
 * Centralized Portfolio Data
 * Authentic developer information for Muhammad Faiz Parande.
 * All content is data-driven.
 */

export const portfolioData = {
  personal: {
    name: "Muhammad Faiz Parande",
    role: "FULL-STACK DEVELOPER",
    roles: [
      "FULL-STACK DEVELOPER",
      "COMPUTER SCIENCE ENGINEER",
      "DATA ANALYST",
      "DATA SCIENTIST"
    ],
    eyebrow: "HELLO, I'M",
    tagline: "Computer Science Engineer specializing in full-stack web applications, data analytics, and machine learning solutions.",
    shortBio: "Skilled in React.js, Node.js, Python, Pandas, SQL, and REST APIs. Passionate about software engineering, data-driven systems, and scalable digital products.",
    location: "Solapur, Maharashtra, India",
    email: "faizparande@gmail.com",
    phone: "+91 9699858890",
    avatar: "",
    availability: "Available for Software Engineering & Data Analytics Opportunities",
  },

  social: {
    github: "https://github.com/faizparande-blip",
    linkedin: "https://linkedin.com/in/faiz-parande-79aa92307",
    leetcode: "",
    twitter: "",
    resume: "/resume.pdf"
  },

  about: {
    heading: "Engineering scalable web applications, robust APIs, and data-driven systems.",
    intro: [
      "I am a Computer Science Engineering student with practical hands-on experience in Full Stack Web Development, ERP application engineering, Data Analytics, and AI integrations.",
      "Skilled in building responsive frontends with React.js, designing robust REST APIs with Node.js and Express, and optimizing relational databases with MySQL. I enjoy translating complex business workflows into clean, reliable, and user-friendly software."
    ],
    cards: [
      {
        icon: "Layers",
        title: "Full-Stack Development",
        description: "Building responsive frontends and reliable backend services using React.js, Node.js, Express, and modern REST APIs."
      },
      {
        icon: "Database",
        title: "Database & Backend Systems",
        description: "Designing structured MySQL and MongoDB schemas, query optimizations, and modular backend components."
      },
      {
        icon: "Cpu",
        title: "AI & Data Analytics",
        description: "Working with Python (Pandas, NumPy, Scikit-learn), Power BI dashboards, and OpenAI API integrations."
      },
      {
        icon: "Code2",
        title: "Core CS & Engineering",
        description: "Strong fundamentals in Data Structures & Algorithms, Object-Oriented Programming, DBMS, and SDLC methodologies."
      }
    ]
  },

  skills: {
    categories: [
      { id: "all", name: "All Skills" },
      { id: "languages", name: "Languages" },
      { id: "frontend", name: "Frontend" },
      { id: "backend", name: "Backend" },
      { id: "database", name: "Databases" },
      { id: "ai", name: "AI & Analytics" },
      { id: "tools", name: "Tools & DevOps" }
    ],
    items: [
      // Languages
      { name: "JavaScript", category: "languages", icon: "FileCode" },
      { name: "Python", category: "languages", icon: "Terminal" },
      { name: "Java", category: "languages", icon: "Code2" },
      { name: "PHP", category: "languages", icon: "Code" },
      { name: "SQL", category: "languages", icon: "Database" },
      { name: "HTML5 / CSS3", category: "languages", icon: "Layers" },

      // Frontend
      { name: "React.js", category: "frontend", icon: "Component" },
      { name: "Tailwind CSS", category: "frontend", icon: "Palette" },
      { name: "Bootstrap", category: "frontend", icon: "Layout" },

      // Backend
      { name: "Node.js", category: "backend", icon: "Server" },
      { name: "Express.js", category: "backend", icon: "Cpu" },
      { name: "REST APIs", category: "backend", icon: "Network" },

      // Database
      { name: "MySQL", category: "database", icon: "HardDrive" },
      { name: "MongoDB", category: "database", icon: "FolderGit2" },

      // AI & Analytics
      { name: "Power BI", category: "ai", icon: "Sparkles" },
      { name: "Pandas & NumPy", category: "ai", icon: "Boxes" },
      { name: "Matplotlib & Scikit-learn", category: "ai", icon: "RefreshCw" },
      { name: "OpenAI API & Prompt Eng.", category: "ai", icon: "Zap" },

      // Tools & DevOps
      { name: "Git & GitHub", category: "tools", icon: "GitBranch" },
      { name: "VS Code", category: "tools", icon: "TerminalSquare" },
      { name: "Postman", category: "tools", icon: "Send" },
      { name: "Docker (Basics)", category: "tools", icon: "Box" },
      { name: "Vite", category: "tools", icon: "PackageCheck" }
    ]
  },

  projects: [
    {
      id: "chef-ai",
      number: "01",
      title: "ChefAI",
      tagline: "AI-Powered Recipe Recommendation Platform",
      category: "AI & Web Application",
      description: "An interactive web application providing personalized recipe recommendations based on available ingredients and culinary preferences using AI integrations.",
      technologies: ["JavaScript", "HTML5", "CSS3", "OpenAI API", "REST APIs"],
      github: "https://github.com/faizparande-blip",
      live: "https://chefai-ocoj.onrender.com/",
      image: "",
      featured: true,
      caseStudy: {
        problem: "Users frequently find it difficult to decide what to cook with ingredients already available in their pantry, leading to food waste.",
        solution: "Engineered an AI-powered interface where users input available ingredients and instantly receive tailored recipes and step-by-step cooking instructions.",
        features: [
          "Ingredient-based dynamic recipe generation",
          "Responsive and intuitive mobile-friendly UI",
          "Dietary preference filters and cuisine selections"
        ]
      }
    },
    {
      id: "furniture-ecommerce",
      number: "02",
      title: "Furniture E-Commerce",
      tagline: "Modern Furniture & Interior Online Store",
      category: "E-Commerce Web Application",
      description: "A full-featured responsive e-commerce web application for browsing furniture catalogs, product details, and seamless shopping cart interactions.",
      technologies: ["React.js", "JavaScript", "Tailwind CSS"],
      github: "https://github.com/faizparande-blip/furniture-E-Commerce",
      live: "https://furniture-e-commerce-weld.vercel.app/",
      image: "",
      featured: true,
      caseStudy: {
        problem: "Users need a fast, responsive, and intuitive interface to discover, inspect, and order furniture online.",
        solution: "Developed a modern e-commerce storefront with dynamic product filtering, cart management, and clean responsive design.",
        features: [
          "Product catalog with categories and search filtering",
          "Interactive cart management with instant total calculation",
          "Mobile-optimized responsive layout"
        ]
      }
    },
    {
      id: "travel-agency",
      number: "03",
      title: "Travel Agency",
      tagline: "Travel Booking & Tour Destination Platform",
      category: "Web Application",
      description: "A modern travel and tour booking web platform showcasing destination packages, tour itineraries, and interactive customer inquiry interfaces.",
      technologies: ["React.js", "JavaScript", "Tailwind CSS"],
      github: "https://github.com/faizparande-blip/Travel-Agency",
      live: "https://travel-agency-sepia-one.vercel.app/",
      image: "",
      featured: true,
      caseStudy: {
        problem: "Travelers look for comprehensive tour package details, pricing, and visual destination guides in an organized layout.",
        solution: "Created an engaging travel agency website featuring destination showcases, travel itineraries, and responsive contact booking forms.",
        features: [
          "Destination showcase with package breakdowns",
          "Interactive inquiry and booking form interface",
          "Responsive mobile-first navigation"
        ]
      }
    },
    {
      id: "real-state",
      number: "04",
      title: "Real State",
      tagline: "Property Listings & Real Estate Discovery Platform",
      category: "Web Application",
      description: "A real estate property listing and search platform for exploring residential and commercial properties with location details and amenity filters.",
      technologies: ["React.js", "JavaScript", "Tailwind CSS"],
      github: "https://github.com/faizparande-blip/real-state",
      live: "https://real-state-olive-ten.vercel.app/",
      image: "",
      featured: true,
      caseStudy: {
        problem: "Prospective buyers and tenants need an easy way to explore real estate properties with clear pricing, photos, and location specifics.",
        solution: "Engineered a clean real estate discovery platform with categorized property cards, search filtering, and agent inquiry options.",
        features: [
          "Searchable property listings by type and budget",
          "Detailed property cards with specifications",
          "Responsive layout optimized across devices"
        ]
      }
    },
    {
      id: "college-staff-portal",
      number: "05",
      title: "College Staff Portal for VVPIET",
      tagline: "Academic Staff Directory & Institutional Portal",
      category: "Institutional Web Application",
      description: "An institutional portal developed for VVPIET to streamline staff directory lookups, departmental information, and faculty profile management.",
      technologies: ["React.js", "JavaScript", "Tailwind CSS"],
      github: "https://github.com/faizparande-blip/VVP-STAFF",
      live: "https://vvp-staff-psi.vercel.app/",
      image: "",
      featured: true,
      caseStudy: {
        problem: "Institutions need a centralized, easily accessible digital portal to display faculty profiles, department hierarchies, and staff contact details.",
        solution: "Constructed a dedicated college staff directory portal for VVPIET facilitating fast staff discovery and structured academic profile views.",
        features: [
          "Departmental staff listings with role designations",
          "Faculty profile details and contact access",
          "Clean, responsive institutional design"
        ]
      }
    }
  ],

  experience: [
    {
      company: "Dominal Technology",
      role: "Software Developer Intern",
      duration: "27 July 2026 – 30 August 2026",
      current: true,
      statusBadge: "CURRENT",
      description: "Software Developer Intern at Dominal Technology.",
      responsibilities: [],
      technologies: []
    },
    {
      company: "InfoStack",
      role: "Software Developer Intern",
      duration: "Jan 2026 – Aug 2026",
      current: false,
      statusBadge: "COMPLETED",
      description: "Developed and integrated ERP modules including Product, Purchase, Inventory, and Reporting using React.js, Node.js, and MySQL. Built interactive Power BI dashboards and developed REST APIs.",
      responsibilities: [
        "Developed and integrated NexInvo ERP modules including Product, Purchase, Inventory, and Reporting using React.js, Node.js, and MySQL.",
        "Built interactive Power BI dashboards, optimized SQL reports, and performed exploratory data analysis using Python.",
        "Developed REST APIs, optimized MySQL databases, and managed version control with Git and GitHub."
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MySQL", "Python", "Power BI", "REST APIs", "Git"]
    }
  ],

  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "Bharat-Ratna Indira Gandhi College of Engineering",
      duration: "2024 – 2027",
      current: true,
      statusBadge: "CURRENTLY PURSUING"
    },
    {
      degree: "Diploma in Computer Science",
      institution: "Government Polytechnic",
      duration: "2021 – 2024",
      current: false
    }
  ],

  certifications: [
    {
      name: "Full Stack Web Development",
      issuer: "InfoStack Software Development & Research Center",
      date: "2026",
      credentialUrl: ""
    },
    {
      name: "Software Development Training & Web Development Workshops",
      issuer: "Professional Workshops",
      date: "2024",
      credentialUrl: ""
    }
  ],

  contact: {
    heading: "Let's build something great together.",
    subheading: "I am actively looking for software engineering opportunities, internships, and collaborative full-stack projects. Feel free to reach out directly.",
    email: "faizparande@gmail.com",
    location: "Solapur, Maharashtra, India",
    availability: "Available for Software Engineering Roles"
  },

  footer: {
    quote: "Crafted with clean code, modern React architecture, and attention to detail.",
    navigation: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" }
    ]
  }
};

export default portfolioData;
