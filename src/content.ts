// ---------------------------------------------------------------------------
// All site copy lives here. Edit this file to update content — no need to
// touch component code for text, link, or section changes.
// ---------------------------------------------------------------------------

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  photo: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
    resume: string;
  };
}

export interface AboutContent {
  paragraphs: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  summary: string;
  problem: string;
  build: string;
  impact: string;
  stack: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  dates: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const profile: Profile = {
  name: "Robert Harrison",
  title: "Senior Software Engineer",
  tagline: "Full-stack and distributed systems engineering, with deep backend expertise.",
  location: "Salt Lake City, UT",
  photo: "/photo.jpg",
  links: {
    github: "https://github.com/rharrison33", // TODO: replace
    linkedin: "https://www.linkedin.com/in/robertwharrison17/", // TODO: replace
    email: "robertwharrison17@gmail.com", // pulled from your account — update if you'd like a different contact address
    resume: "/resume.pdf", // TODO: drop your resume PDF into /public and confirm this path
  },
};

export const about: AboutContent = {
  paragraphs: [
    "I'm a senior software engineer with nine years of experience building backend systems, distributed workflows, and full-stack products. I studied computer science at Georgia Tech and have built much of my career around software that engineering and operations teams rely on every day.",
    "Most recently, I spent four years at Tesla Energy building services, APIs, integrations, and event-driven workflows for residential and commercial energy products. Before Tesla, I worked at LBA Ware, where I built high-performance BI dashboards that gave mortgage companies visibility into their operations — work that shipped shortly before the company was acquired by SimpleNexus.",
    "I'm comfortable across the stack, but backend engineering is where I do my strongest work. I'm currently a Formation Fellow, working with experienced engineering mentors and peers to deepen my system-design, technical problem-solving, and leadership skills, while pursuing senior backend and full-stack roles with meaningful ownership — particularly in distributed systems, workflow automation, and AI-enabled products.",
  ],
};

export const work: WorkItem[] = [
  {
    id: "system-cost-update-tool",
    title: "System Cost Update Tool",
    summary:
      "Tooling to reprice thousands of active commercial energy quotes without manual, one-by-one updates.",
    problem:
      "Commercial energy quotes needed to be repriced as system costs changed, but doing this manually across a large, active pipeline was slow and error-prone.",
    build:
      "Built a tool to reprice more than 5,000 active commercial energy quotes representing a multi-billion-dollar pipeline, with processing designed around controlled, time-boxed batches to keep updates safe and predictable.",
    impact: "Eliminated roughly 90% of the manual pricing work involved.",
    stack: [".NET", "PostgreSQL", "SQL", "Batch Processing"],
  },
  {
    id: "commercial-sales-platform",
    title: "Tesla Energy Commercial Sales Platform",
    summary:
      "Web application for quoting Megapack deals — some exceeding $1 billion — replacing a slow, manual, Excel-based process for Tesla Energy's sales team.",
    problem:
      "Megapack quotes were built and tracked entirely in Excel: slow, error-prone, and difficult to scale as deal volume and complexity grew.",
    build:
      "Built a full-stack, event-driven web application — a React frontend backed by .NET services and PostgreSQL, using Kafka and RabbitMQ as durable message brokers — to automate quoting and the surrounding sales workflows.",
    impact:
      "Freed the sales team from manual, spreadsheet-driven quoting, making them significantly more efficient across day-to-day workflows.",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      ".NET",
      "PostgreSQL",
      "RabbitMQ",
      "Kafka",
      "Redis",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    id: "megapack-delivery-scheduling",
    title: "Megapack Delivery Scheduling",
    summary:
      "Full-stack application that turns upstream factory build data into Megapack delivery schedules and automatically keeps logistics teams and project contacts informed.",
    problem:
      "Delivery scheduling for Megapacks was manual and operationally intensive, with no systematic way to translate factory build schedules into delivery dates or communicate them downstream.",
    build:
      "Built a full-stack, event-driven application — a React frontend backed by .NET services and PostgreSQL — that ingests build schedules uploaded by upstream factory teams, calculates delivery schedules across all deals, and uses Kafka as a durable message broker to notify downstream logistics teams and project contacts of scheduled delivery dates.",
    impact:
      "Delivered major time savings for logistics teams by fully automating a manual scheduling process, while keeping project contacts reliably informed of delivery dates.",
    stack: ["React", ".NET", "PostgreSQL", "Kafka"],
  },
];

export const experience: ExperienceItem[] = [
  {
    id: "formation",
    role: "Engineering Fellowship for Senior Software Engineers",
    org: "Formation",
    dates: "Aug 2026 – Present",
    bullets: [
      "Participating in Formation, an engineering fellowship pairing senior software engineers with staff-level mentors and hiring managers from top tech companies to sharpen advanced system design, technical leadership, and problem-solving skills.",
    ],
  },
  {
    id: "tesla-energy",
    role: "Senior Software Engineer",
    org: "Tesla, Inc.",
    dates: "Oct 2020 – Apr 2024",
    bullets: [
      "Co-owned Tesla's Energy Pricing Gateway for both Residential and Commercial, handling all pricing requests for Solar Roof, Solar Panels, Powerwall, and Megapack.",
      "Architected and delivered a full-stack, event-driven web application (React, .NET, PostgreSQL, Kafka, RabbitMQ) that replaced Excel-based quoting for Megapack deals — some exceeding $1 billion — making the sales team significantly more efficient.",
      "Engineered the System Cost Update Tool, repricing 5,000+ active commercial quotes across a multi-billion-dollar Megapack sales pipeline and eliminating ~90% of manual pricing work.",
      "Automated Megapack delivery scheduling with a full-stack, event-driven application (React, .NET, PostgreSQL, Kafka) that calculated delivery schedules from upstream factory build data, delivering major time savings for logistics teams.",
      "Improved production observability by implementing service-health dashboards, monitoring, and automated alerting, enabling faster detection and diagnosis of production issues.",
      "Led design discussions with Product whenever new capabilities were scoped for the commercial quoting platform, translating requirements into detailed technical plans of action, and regularly mentored junior engineers on service architecture and implementation approach.",
    ],
  },
  {
    id: "lba-ware",
    role: "Software Developer",
    org: "LBA Ware (Acquired by SimpleNexus, an nCino Company)",
    dates: "Jan 2019 – Oct 2020",
    bullets: [
      "Developed high-performance BI dashboards using Angular, TypeScript, C#/.NET, Redis, and SQL Server, enabling mortgage companies to analyze operational and performance metrics while LBA Ware scaled rapidly and was ultimately acquired.",
      "Implemented Microsoft OAuth-based SSO, enabling users to securely authenticate with their existing Microsoft credentials and streamlining access across the platform.",
    ],
  },
  {
    id: "citrix",
    role: "Software Engineer",
    org: "Citrix",
    dates: "Jul 2013 – Nov 2016",
    bullets: [
      "Delivered the Azure Provisioning Plugin for XenDesktop (WPF/XAML), using Azure APIs to automatically migrate and scale customers' on-premises deployments into Microsoft Azure — provisioning and managing the underlying virtual desktop infrastructure end-to-end with no manual setup required.",
    ],
  },
  {
    id: "kahua",
    role: "Software Developer Intern",
    org: "Kahua",
    dates: "May 2011 – Jun 2012",
    bullets: [
      "Designed an automated validator for the Kahua Store that checked third-party XML submissions against our platform's app language schema and surfaced detailed, actionable error reports — enabling third-party developers to quickly identify and resolve syntax issues, streamlining the submission process.",
    ],
  },
  {
    id: "georgia-tech",
    role: "B.S., Computer Science",
    org: "Georgia Institute of Technology",
    dates: "2010 – 2013",
    bullets: ["Graduated with Highest Honors, GPA 3.6/4.0."],
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages & Frameworks",
    items: ["C#", ".NET", "JavaScript", "TypeScript", "Node.js", "React", "Angular"],
  },
  {
    category: "Data & Messaging",
    items: [
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Kafka",
      "Dapper",
      "Entity Framework",
    ],
  },
  {
    category: "APIs & Integration",
    items: ["REST APIs"],
  },
  {
    category: "Infrastructure",
    items: ["Docker", "Kubernetes"],
  },
];
