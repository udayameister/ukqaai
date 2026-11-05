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
 */
export const publications: { title: string; venue: string; year: string; type: string; doi?: string }[] = [
  { title: 'CST-GCNN: Spatio-Temporal Connectome Graph Network for Schizophrenia Classification', venue: 'IEEE Access', year: '2026', type: 'Journal article', doi: '10.1109/ACCESS.2026.3586749' },
  { title: "Connectome Graph Attention Network (CGAT): A multimodal approach for enhanced classification of Alzheimer's disease controls", venue: 'Results in Engineering', year: '2025', type: 'Journal article', doi: '10.1016/j.rineng.2025.105200' },
  { title: 'Integrating deep learning in brain connectome mapping: Insights from a systematic review', venue: 'International Research Journal of Multidisciplinary Scope (IRJMS), 6(2)', year: '2025', type: 'Systematic review', doi: '10.47857/irjms.2025.v06i02.01953' },
  { title: 'Connectome based schizophrenia prediction using structural connectivity — Deep Graph Neural Network (sc-DGNN)', venue: 'Journal of X-Ray Science and Technology', year: '2024', type: 'Journal article', doi: '10.3233/XST-230426' },
  { title: 'fMRI data to connectivity matrices: Building functional connectomes for deep learning models', venue: 'IEEE WIECON-ECE 2024', year: '2024', type: 'Conference paper' },
  { title: 'Diffusion MRI preprocessing for deep learning analysis of brain structural connectivity', venue: '12th International Conference on Advanced Computing (ICoAC), IEEE', year: '2023', type: 'Conference paper' },
]

export const scholarProfile = 'https://scholar.google.com/citations?user=cV5MPAQAAAAJ'
