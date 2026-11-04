import type { IconName } from '@/components/Icon'

export const researchAreas: { title: string; description: string; icon: IconName }[] = [
  { title: 'AI & deep learning research', description: 'Model architectures, training methods and rigorous evaluation for real-world data.', icon: 'brain' },
  { title: 'Medical imaging applications', description: 'Learning from MRI, fMRI, DTI and MR spectroscopy data to support neurological research.', icon: 'scan' },
  { title: 'Brain connectomics', description: 'Graph neural networks on structural and functional brain networks for disorder classification.', icon: 'network' },
  { title: 'Scientific machine learning', description: 'Combining domain knowledge with data-driven models for reliable scientific inference.', icon: 'flask' },
  { title: 'Physics-informed neural networks', description: 'Embedding physical constraints into neural networks, including MR spectroscopy quantification.', icon: 'atom' },
  { title: 'Emerging technology research', description: 'Exploring quantum machine learning and other frontier technologies with a critical eye.', icon: 'orbit' },
]

/**
 * PUBLICATIONS — list only peer-reviewed, verifiable work.
 * These are the founder's academic publications (not company product claims).
 * Titles are short names — full citations are on the Google Scholar profile.
 */
export const publications: { title: string; venue: string; year: string; type: string }[] = [
  { title: 'CST-GCNN', venue: 'IEEE Access, vol. 14', year: '2026', type: 'Journal article' },
  { title: 'CGAT', venue: 'Results in Engineering', year: '2025', type: 'Journal article' },
  { title: 'sc-DGNN (schizophrenia classification)', venue: 'Journal of X-Ray Science and Technology', year: '2024', type: 'Journal article' },
  { title: 'Integrating deep learning in brain connectome mapping', venue: 'IRJMS, 6(2)', year: '2025', type: 'Systematic review' },
  { title: 'Conference papers', venue: 'ICoAC 2023 and IEEE WIECON-ECE 2024', year: '2023–2024', type: 'Conference papers' },
]

export const scholarProfile = 'https://scholar.google.com/citations?user=cV5MPAQAAAAJ'
