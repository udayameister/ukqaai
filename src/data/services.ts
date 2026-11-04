import type { IconName } from '@/components/Icon'

/**
 * Service availability — be honest about maturity:
 *  available  → we take on client projects in this area today
 *  developing → early-stage practice; projects scoped case by case
 *  research   → exploration and R&D; not offered as a commercial service yet
 */
export type ServiceStatus = 'available' | 'developing' | 'research'

export interface Service {
  slug: string
  title: string
  shortTitle: string
  icon: IconName
  status: ServiceStatus
  summary: string
  seoTitle: string
  seoDescription: string
  intro: string
  problems: string[]
  offerings: { title: string; description: string }[]
  stack: string[]
  industries: string[]
  approach: { title: string; description: string }[]
}

export const statusLabels: Record<ServiceStatus, string> = {
  available: 'Available now',
  developing: 'In development',
  research: 'Research initiative',
}

export const services: Service[] = [
  {
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence & Machine Learning',
    shortTitle: 'AI & Machine Learning',
    icon: 'brain',
    status: 'available',
    summary:
      'Generative AI applications, AI agents, custom models, predictive analytics, computer vision and NLP — engineered for real workloads.',
    seoTitle: 'AI & Machine Learning Development Services',
    seoDescription:
      'Custom AI and machine learning development: generative AI applications, AI agents and automation, predictive analytics, computer vision and NLP solutions.',
    intro:
      'We design and build AI systems that solve specific, measurable problems — from generative AI assistants and autonomous agents to custom models trained on your own data. Every solution is grounded in sound data practice, careful evaluation and responsible deployment.',
    problems: [
      'Repetitive, document-heavy work that consumes skilled staff time',
      'Data that is collected but never turned into decisions',
      'Off-the-shelf AI tools that do not fit domain-specific workflows',
      'Prototypes that work in a notebook but never reach production',
    ],
    offerings: [
      { title: 'Generative AI applications', description: 'Retrieval-augmented assistants, content and document intelligence, and domain copilots built on leading foundation models.' },
      { title: 'AI agents & automation', description: 'Tool-using agents and workflow automation that take on multi-step tasks with human oversight built in.' },
      { title: 'Custom machine learning', description: 'Models designed and trained for your data — classification, regression, ranking, recommendation and anomaly detection.' },
      { title: 'Predictive analytics', description: 'Forecasting and risk models with clear, explainable outputs that teams can act on.' },
      { title: 'Computer vision', description: 'Image and video understanding: detection, segmentation, inspection and medical image analysis.' },
      { title: 'Natural language processing', description: 'Text classification, information extraction, semantic search, summarisation and multilingual processing.' },
    ],
    stack: ['Python', 'PyTorch', 'PyTorch Geometric', 'scikit-learn', 'Hugging Face', 'LLM APIs', 'LangChain / LlamaIndex', 'FastAPI', 'Vector databases', 'Docker'],
    industries: ['Education', 'Healthcare research', 'IT services', 'Manufacturing', 'Startups'],
    approach: [
      { title: 'Problem framing', description: 'Define the decision or task, success metrics and data availability before any model is chosen.' },
      { title: 'Data & baseline', description: 'Audit data quality and establish a simple baseline so improvements are measurable.' },
      { title: 'Model & evaluation', description: 'Iterate on models with rigorous validation, bias checks and error analysis.' },
      { title: 'Deploy & monitor', description: 'Ship behind clean APIs, with monitoring for drift, cost and quality over time.' },
    ],
  },
  {
    slug: 'edtech',
    title: 'Education Technology (EdTech)',
    shortTitle: 'Education Technology',
    icon: 'graduation',
    status: 'available',
    summary:
      'AI-powered learning platforms, academic recruitment, intelligent assessment and educational analytics — built by people who have taught for years.',
    seoTitle: 'EdTech Development Company — AI Learning & Academic Platforms',
    seoDescription:
      'EdTech development: AI-powered learning platforms, academic recruitment solutions, intelligent assessment systems, learning management and educational analytics.',
    intro:
      'Our team brings long first-hand experience of teaching and academic administration. We build education platforms that respect how institutions actually work — and we run our own, including the AcadexMatch academic recruitment platform.',
    problems: [
      'Faculty recruitment that relies on scattered notices and manual screening',
      'Assessment workloads that leave little time for feedback',
      'Learning platforms that report activity but not understanding',
      'Institutional data spread across disconnected systems',
    ],
    offerings: [
      { title: 'AI-powered learning platforms', description: 'Adaptive content, AI tutoring aids and course experiences designed around clear learning outcomes.' },
      { title: 'Academic recruitment solutions', description: 'Job discovery, candidate matching and recruitment workflows for colleges and universities.' },
      { title: 'Intelligent assessment systems', description: 'Question banks, automated evaluation support and analytics that keep educators in control.' },
      { title: 'Digital learning management', description: 'Course delivery, lab and record management, and integrations with existing LMS tools.' },
      { title: 'Educational analytics', description: 'Dashboards and early-warning indicators for programme, cohort and student performance.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'LLM APIs', 'Payment gateway integration'],
    industries: ['Universities & colleges', 'Schools', 'Training providers', 'Recruiters'],
    approach: [
      { title: 'Educator-led discovery', description: 'Start from the classroom and the admin office, not from a feature list.' },
      { title: 'Prototype with real users', description: 'Put clickable prototypes in front of faculty, students and administrators early.' },
      { title: 'Build for scale', description: 'Role-based access, data privacy and performance on modest devices and networks.' },
      { title: 'Measure outcomes', description: 'Track learning and operational outcomes, then iterate.' },
    ],
  },
  {
    slug: 'research-computing',
    title: 'Research & Scientific Computing',
    shortTitle: 'Research Computing',
    icon: 'microscope',
    status: 'available',
    summary:
      'Research software, deep learning research solutions, medical imaging and brain connectomics, scientific data analytics and research automation.',
    seoTitle: 'Research Software & Scientific Computing Solutions',
    seoDescription:
      'Research software development, deep learning research solutions, medical imaging and brain connectomics, scientific data analytics and academic technology consulting.',
    intro:
      'Research-driven development is part of who we are. Our founder’s doctoral work in graph neural networks and brain connectome analysis informs how we help researchers turn methods into reproducible, well-engineered software.',
    problems: [
      'Analysis pipelines that only one person can run',
      'Experiments that are hard to reproduce months later',
      'Imaging and signal data too large for ad-hoc scripts',
      'Promising methods that never become usable tools',
    ],
    offerings: [
      { title: 'Research software development', description: 'Reproducible pipelines, packages and tools with tests, documentation and version control.' },
      { title: 'Deep learning research solutions', description: 'Model design, training infrastructure and benchmarking for academic and industrial research.' },
      { title: 'Medical imaging & brain connectomics', description: 'Graph-based analysis of fMRI, DTI and structural MRI connectivity data, and MR spectroscopy workflows.' },
      { title: 'Scientific data analytics', description: 'Statistical analysis, visualisation and interpretable modelling of complex datasets.' },
      { title: 'Research automation tools', description: 'Automating data preparation, experiment tracking and literature workflows.' },
      { title: 'Academic technology consulting', description: 'Guidance on research computing, AI adoption and digital infrastructure for institutions.' },
    ],
    stack: ['Python', 'PyTorch', 'PyTorch Geometric', 'NumPy / SciPy', 'Nilearn / MNE', 'Jupyter', 'LaTeX', 'Git', 'HPC & GPU workflows'],
    industries: ['Universities', 'Research labs', 'Healthcare research', 'Life sciences'],
    approach: [
      { title: 'Understand the science', description: 'Work through the research question, data and constraints with your team.' },
      { title: 'Reproducible by design', description: 'Versioned data, configs and environments from the first commit.' },
      { title: 'Validate rigorously', description: 'Proper cross-validation, statistical testing and ablation studies.' },
      { title: 'Hand over cleanly', description: 'Documentation and training so your team owns the result.' },
    ],
  },
  {
    slug: 'software-development',
    title: 'Software Development',
    shortTitle: 'Software Development',
    icon: 'code',
    status: 'available',
    summary:
      'Web applications, SaaS products, enterprise software, APIs and cloud-native systems built to be maintained, not just launched.',
    seoTitle: 'Web, SaaS & Enterprise Software Development',
    seoDescription:
      'Web application and SaaS product development, enterprise software, API development and integration, and cloud-native applications.',
    intro:
      'We engineer modern software with the same discipline we apply to AI: clear architecture, readable code, automated testing and deployment pipelines that make every future change routine.',
    problems: [
      'Spreadsheets and email threads standing in for real systems',
      'Legacy applications that are risky to change',
      'Products that need to launch quickly without accruing heavy technical debt',
      'Systems that do not talk to each other',
    ],
    offerings: [
      { title: 'Web application development', description: 'Fast, accessible, responsive web applications with modern front-end frameworks.' },
      { title: 'SaaS product development', description: 'Multi-tenant products with authentication, subscriptions, payments and admin tooling.' },
      { title: 'Enterprise software', description: 'Internal tools, workflow systems and portals tailored to your processes.' },
      { title: 'API development & integration', description: 'Well-documented REST APIs and integrations with third-party services and AI providers.' },
      { title: 'Cloud-native applications', description: 'Containerised services, CI/CD pipelines and infrastructure that scales with demand.' },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python / FastAPI', 'PostgreSQL', 'Docker', 'GitHub Actions', 'Cloud hosting'],
    industries: ['Startups', 'SMEs', 'Education', 'Professional services'],
    approach: [
      { title: 'Discovery & scope', description: 'Agree on goals, users, priorities and a realistic first release.' },
      { title: 'Design & architecture', description: 'UX flows, data model and system architecture reviewed up front.' },
      { title: 'Iterative delivery', description: 'Short cycles with working software you can review at each step.' },
      { title: 'Launch & support', description: 'Automated deployment, documentation and ongoing maintenance options.' },
    ],
  },
  {
    slug: 'iot',
    title: 'Internet of Things (IoT)',
    shortTitle: 'Internet of Things',
    icon: 'cpu',
    status: 'developing',
    summary:
      'IoT applications, smart monitoring, sensor integration and IoT analytics — an emerging practice, scoped project by project.',
    seoTitle: 'IoT Solutions — Applications, Monitoring & Analytics',
    seoDescription:
      'IoT application development, smart monitoring solutions, sensor integration and IoT data analytics from UKQAAI Technologies.',
    intro:
      'IoT is a growing area for us. We combine our software and analytics capability with connected devices to build monitoring and data solutions. Engagements are currently scoped case by case, and we are open about what is proven and what is exploratory.',
    problems: [
      'Equipment and environments that are monitored manually, if at all',
      'Sensor data that is collected but never analysed',
      'Pilot deployments that cannot grow beyond a handful of devices',
    ],
    offerings: [
      { title: 'IoT application development', description: 'Dashboards and mobile-friendly applications that connect to device data.' },
      { title: 'Smart monitoring solutions', description: 'Condition, environment and usage monitoring with alerts.' },
      { title: 'Sensor integration', description: 'Connecting sensors and microcontrollers to cloud back-ends via standard protocols.' },
      { title: 'IoT analytics', description: 'Time-series analysis, anomaly detection and predictive maintenance models.' },
    ],
    stack: ['MQTT', 'ESP32 / Raspberry Pi', 'Python', 'Node.js', 'Time-series databases', 'Edge ML'],
    industries: ['Manufacturing', 'Campuses & facilities', 'Agriculture', 'Healthcare environments'],
    approach: [
      { title: 'Feasibility first', description: 'Confirm sensors, connectivity and data value before scaling.' },
      { title: 'Pilot', description: 'A small, instrumented pilot with clear success criteria.' },
      { title: 'Analyse', description: 'Turn device data into alerts and insights.' },
      { title: 'Scale carefully', description: 'Expand only once reliability and value are demonstrated.' },
    ],
  },
  {
    slug: 'quantum-computing',
    title: 'Quantum Computing & API Services',
    shortTitle: 'Quantum & APIs',
    icon: 'atom',
    status: 'research',
    summary:
      'Quantum computing research, algorithm exploration and quantum API integration — a forward-looking research initiative.',
    seoTitle: 'Quantum Computing Research & API Integration',
    seoDescription:
      'UKQAAI’s quantum computing research initiative: quantum algorithm exploration, quantum API integration and emerging technology consulting.',
    intro:
      'Quantum computing is a long-term research initiative at UKQAAI. We study quantum algorithms and hybrid quantum–classical machine learning, and experiment with cloud quantum APIs. These activities are exploratory and are not yet offered as production services.',
    problems: [
      'Uncertainty about where quantum computing will — and will not — matter',
      'Difficulty separating real capability from hype',
      'Lack of in-house familiarity with quantum software tools',
    ],
    offerings: [
      { title: 'Quantum computing research', description: 'Studying quantum and hybrid algorithms, with a focus on machine learning applications.' },
      { title: 'Quantum algorithm exploration', description: 'Prototyping algorithms on simulators and publicly available cloud quantum hardware.' },
      { title: 'Quantum API integration', description: 'Exploring how cloud quantum services can be called from conventional applications.' },
      { title: 'Emerging technology consulting', description: 'Plain-language briefings on quantum and other emerging technologies for decision-makers.' },
    ],
    stack: ['Qiskit', 'PennyLane', 'Cirq', 'Python', 'Cloud quantum simulators'],
    industries: ['Research organisations', 'Universities', 'Technology teams'],
    approach: [
      { title: 'Learn', description: 'Track the research literature and tooling closely.' },
      { title: 'Experiment', description: 'Run small, honest experiments on simulators and cloud hardware.' },
      { title: 'Share', description: 'Publish findings and discuss them openly with collaborators.' },
      { title: 'Prepare', description: 'Help partners build readiness without overpromising.' },
    ],
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
