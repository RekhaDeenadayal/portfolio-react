// ── DATA ──────────────────────────────────────────────────────────────────────
export const PROJECTS = [
  { num:"01", year:"2024", type:"AI · Full-Stack", name:"Aether",
    sub:"AI Video Support Companion",
    desc:"What if an AI could watch the same video as a user and understand what they're stuck on? Built the multimodal pipeline with OpenVINO, YOLO, and LangChain — so it sees what you see, not just reads what you type.",
    tech:["React","Node.js","OpenVINO","LangChain","YOLO"],
    href:"https://github.com/RekhaDeenadayal" },
  { num:"02", year:"2024", type:"Safety · AI", name:"Self Embrace",
    sub:"Mental Health & Safety Platform",
    desc:"An SOS system and AI companion that responds like it knows the stakes. The 99.9% uptime wasn't accidental — some things can't go down.",
    tech:["FastAPI","Next.js","MongoDB","Amazon Bedrock","AWS"],
    href:"https://github.com/RekhaDeenadayal" },
  { num:"03", year:"2023", type:"Finance · Web", name:"Stock Search",
    sub:"Real-Time Market Dashboard",
    desc:"A market dashboard built to handle real volume — live autocomplete, watchlists, news feeds, interactive charts. The caching layer was the interesting part.",
    tech:["React","Node.js","AWS","Highcharts","REST APIs"],
    href:"https://github.com/RekhaDeenadayal" },
  { num:"04", year:"2024", type:"Hardware", name:"RISC-V CPU",
    sub:"Cycle-Accurate 32-bit Processor",
    desc:"Built a 32-bit RISC-V processor simulator from scratch — because I wanted to know what a hazard actually is at the hardware level.",
    tech:["RISC-V","Verilog","Computer Architecture","HDL"],
    href:"https://github.com/RekhaDeenadayal" },
  { num:"05", year:"2024", type:"ML Research", name:"Adversarial Study",
    sub:"Robustness on ResNet-34",
    desc:"Made ResNet-34 and DenseNet-121 confidently wrong. The failure modes transfer between architectures in ways that should concern more people.",
    tech:["PyTorch","Adversarial ML","DenseNet","ResNet","Deep Learning"],
    href:"https://github.com/RekhaDeenadayal" },
];

export const EXPERIENCE = [
  { role:"Software Engineer", company:"Accenture",
    location:"Chennai, India", period:"Mar 2022 – Aug 2024", years:"2022–2024",
    points:[
      "Engineered React components tightly integrated with SAP backend APIs for enterprise-grade dashboards.",
      "Improved data connectivity flows and UX consistency across large-scale production systems.",
      "Collaborated on end-to-end feature delivery in fast-paced, cross-functional teams.",
    ],
    tech:["React","JavaScript","TypeScript","SAP APIs","REST APIs","CI/CD"],
  },
  { role:"Software Engineering Intern", company:"Kaar Technologies",
    location:"Chennai, India", period:"Mar 2021 – Feb 2022", years:"2021–2022",
    points:[
      "Delivered full-stack features across multiple agile sprint cycles with consistent on-time delivery.",
      "Improved UI validation and form logic, reducing user-reported errors significantly.",
      "Collaborated across design, backend, and QA teams in standups and retrospectives.",
    ],
    tech:["React","Node.js","Express","MySQL","Agile/Scrum"],
  },
];

export const SKILLS = {
  "Languages":      ["Python","JavaScript","TypeScript","C","SQL","HTML/CSS","Verilog","Bash"],
  "Frameworks":     ["React","Next.js","Node.js","Express","FastAPI","Flask","NumPy","Pandas"],
  "AI & ML":        ["PyTorch","LangChain","OpenVINO","Amazon Bedrock","YOLO","HuggingFace","TensorFlow"],
  "Cloud & DevOps": ["AWS (EC2, S3, Lambda)","Docker","GitHub Actions","CI/CD","Kubernetes"],
  "Databases":      ["MongoDB","MySQL","PostgreSQL","Redis","Firebase"],
  "Hardware":       ["Verilog/HDL","RISC-V","MATLAB","Fourier Analysis","PDE"],
};

export const COFFEE_IMGS = [
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1485808191679-5f86510bd0a0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
];
