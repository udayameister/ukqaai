import {
  ArrowRight, ArrowUpRight, Atom, BookOpen, Brain, Briefcase, Building2, CircleAlert, CircleCheck, Code, Compass, Cpu,
  Factory, FileText, FlaskConical, Gauge, Globe, GraduationCap, Handshake, HeartPulse, Layers, Lightbulb, Link,
  LoaderCircle, Lock, Mail, MapPin, Microscope, Network, Orbit, Rocket, Scale, ScanLine, School, Search, Send,
  ShieldCheck, Sparkles, Target, Users, Workflow, type LucideProps,
} from 'lucide-react'

const icons = {
  arrowRight: ArrowRight, arrowUpRight: ArrowUpRight, atom: Atom, book: BookOpen, brain: Brain, briefcase: Briefcase,
  building: Building2, alert: CircleAlert, check: CircleCheck, code: Code, compass: Compass, cpu: Cpu, factory: Factory,
  file: FileText, flask: FlaskConical, gauge: Gauge, globe: Globe, graduation: GraduationCap, handshake: Handshake,
  heart: HeartPulse, layers: Layers, lightbulb: Lightbulb, link: Link, loader: LoaderCircle, lock: Lock, mail: Mail,
  mapPin: MapPin, microscope: Microscope, network: Network, orbit: Orbit, rocket: Rocket, scale: Scale, scan: ScanLine,
  school: School, search: Search, send: Send, shield: ShieldCheck, sparkles: Sparkles, target: Target, users: Users,
  workflow: Workflow,
} as const

export type IconName = keyof typeof icons

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = icons[name]
  return <C aria-hidden="true" strokeWidth={1.75} {...props} />
}
