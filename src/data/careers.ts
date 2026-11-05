/**
 * JOB OPENINGS — add, edit or remove openings here.
 * Each opening gets its own page at /careers/<slug> with an application form.
 * To close an opening, set `open: false` (it disappears from the site and sitemap).
 * Pages, sitemap entries and SEO data are generated automatically from this list.
 */
export interface JobOpening {
  slug: string
  open: boolean
  title: string
  type: string
  /** Schema.org employmentType */
  employmentType: 'INTERN' | 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR'
  location: string
  remote: boolean
  duration: string
  durationOptions: string[]
  commitment: string
  stipend: string
  startDate: string
  datePosted: string
  /** Leave empty for rolling applications. ISO date, e.g. '2027-01-31'. */
  applyBy: string
  summary: string
  about: string
  eligibility: string[]
  tracks: { title: string; description: string; skills: string }[]
  responsibilities: string[]
  skills: string[]
  benefits: string[]
  process: { title: string; description: string }[]
  yearOptions: string[]
  seoDescription: string
}

export const jobs: JobOpening[] = [
  {
    slug: 'engineering-internship',
    open: true,
    title: 'Internship for Engineering College Students (Pre-final & Final Year)',
    type: 'Internship',
    employmentType: 'INTERN',
    location: 'Remote (online) — open to students across India',
    remote: true,
    duration: '2 to 3 months',
    durationOptions: ['2 months', '3 months'],
    commitment: 'Flexible, around 15–20 hours per week, planned around your academic schedule',
    stipend: 'Details shared with shortlisted candidates',
    startDate: 'Rolling batches — choose your preferred start month in the form',
    datePosted: '2026-11-05',
    applyBy: '',
    summary:
      'A 2–3 month, project-based internship for pre-final and final year engineering students. Work on real AI, software, research and EdTech projects with mentorship from our founder.',
    about:
      'UKQAAI Technologies is offering a hands-on internship for pre-final and final year engineering students who want real project experience in artificial intelligence, software engineering and research-driven technology. Interns join a project track, work on tasks connected to our live products and research, and receive regular guidance and feedback. You will finish with work you can show in your portfolio and discuss confidently in interviews.',
    eligibility: [
      'Currently studying in the pre-final year (3rd year) or final year (4th year) of B.E. / B.Tech in any engineering branch.',
      'Students from all engineering colleges are welcome — CSE, IT, AI & DS, AI & ML, ECE, EEE, Mechanical, Civil and others.',
      'Basic programming knowledge in any language (Python preferred) and willingness to learn new tools quickly.',
      'Able to commit 2 to 3 months and attend scheduled online reviews.',
      'A laptop or desktop computer and a reliable internet connection.',
    ],
    tracks: [
      { title: 'Artificial Intelligence & Machine Learning', description: 'Build and evaluate ML models, work with datasets, and explore generative AI applications.', skills: 'Python, NumPy/Pandas, scikit-learn or PyTorch basics' },
      { title: 'Full-Stack Web Development', description: 'Develop features for web platforms such as AcadexMatch using modern frameworks.', skills: 'HTML, CSS, JavaScript; React/Next.js or Node.js is a plus' },
      { title: 'Research & Scientific Computing', description: 'Support deep learning research in medical imaging and brain connectomics, including data pipelines and experiments.', skills: 'Python, interest in research, basic statistics' },
      { title: 'Data Analytics & Visualisation', description: 'Clean, analyse and visualise data to produce dashboards and insights.', skills: 'Python or Excel, SQL basics, charting tools' },
      { title: 'IoT & Embedded Applications', description: 'Prototype sensor-based monitoring solutions connected to cloud dashboards.', skills: 'Arduino/ESP32 or Raspberry Pi basics, C or Python' },
    ],
    responsibilities: [
      'Work on assigned tasks within your chosen track, from planning to a working result.',
      'Write clean, documented code and maintain it in Git/GitHub.',
      'Take part in weekly online review meetings and share progress updates.',
      'Research tools and approaches, test your work and fix issues.',
      'Prepare a final project report and presentation at the end of the internship.',
    ],
    skills: [
      'Basic programming (Python, Java, C/C++ or JavaScript)',
      'Problem-solving and logical thinking',
      'Good written and spoken communication in English',
      'Self-motivation and ability to work independently online',
      'Familiarity with Git, GitHub or any ML/web framework is an advantage, not a requirement',
    ],
    benefits: [
      'Internship completion certificate from UKQAAI Technologies on successful completion',
      'Hands-on experience on real products and research projects',
      'One-to-one mentorship and regular feedback from our founder',
      'Portfolio-ready project work and a final project report',
      'Flexible remote schedule that fits around your classes and exams',
      'Outstanding interns may be considered for future opportunities with UKQAAI',
    ],
    process: [
      { title: 'Apply online', description: 'Complete the application form on this page with your details and a link to your resume.' },
      { title: 'Application review', description: 'We review every application and shortlist candidates by track.' },
      { title: 'Online interaction', description: 'Shortlisted students are invited by email to a short online discussion or simple task.' },
      { title: 'Offer & onboarding', description: 'Selected interns receive an offer email with the start date, track and schedule.' },
    ],
    yearOptions: ['Pre-final year (3rd year)', 'Final year (4th year)'],
    seoDescription:
      'Remote 2–3 month internship for pre-final and final year engineering students in AI & ML, web development, research computing, data analytics and IoT. Apply online.',
  },
]

export const openJobs = jobs.filter((j) => j.open)
export const getJob = (slug: string) => openJobs.find((j) => j.slug === slug)
