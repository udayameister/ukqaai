import type { IconName } from '@/components/Icon'

export const industries: { id: string; title: string; description: string; icon: IconName; examples: string[] }[] = [
  { id: 'education', title: 'Education & academia', icon: 'graduation', description: 'Platforms and analytics for colleges, universities, schools and training providers.', examples: ['Academic recruitment', 'Learning platforms', 'Assessment & analytics'] },
  { id: 'healthcare', title: 'Healthcare & medical research', icon: 'heart', description: 'AI and data tools that support medical research teams, built with privacy and rigour in mind.', examples: ['Medical image analysis', 'Research data pipelines', 'Clinical research tooling'] },
  { id: 'it', title: 'IT & software', icon: 'code', description: 'AI capabilities, APIs and engineering support for software teams and product companies.', examples: ['AI feature integration', 'API development', 'Cloud-native services'] },
  { id: 'manufacturing', title: 'Manufacturing & industrial technology', icon: 'factory', description: 'Monitoring, analytics and computer vision for operations and quality.', examples: ['Visual inspection', 'Smart monitoring', 'Predictive maintenance'] },
  { id: 'startups', title: 'Startups & enterprises', icon: 'rocket', description: 'From first MVP to internal automation for established organisations.', examples: ['SaaS MVPs', 'Workflow automation', 'AI agents'] },
  { id: 'research', title: 'Research organisations', icon: 'microscope', description: 'Reproducible research software and deep learning support for labs and institutes.', examples: ['Research software', 'Model benchmarking', 'Data analytics'] },
]
