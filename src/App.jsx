import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useContactForm } from './hooks/useContactForm'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Download,
  Code,
  Database,
  Cloud,
  Brain,
  Award,
  Calendar,
  MapPin,
  User,
  Briefcase,
  GraduationCap,
  Menu,
  X,
  Sun,
  Moon,
  CheckCircle,
  AlertCircle,
  Rocket
} from 'lucide-react'
import profilePic from './assets/profilepic.jpg'
import juspayImage from './assets/juspay_venkat.jpg'
import dbsImage from './assets/dbs_venkat.jpg'
import resumePdf from './assets/venkat_resume_sysdev.pdf'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  
  // Contact form functionality
  const {
    formData,
    isSubmitting,
    submitStatus,
    handleInputChange,
    submitForm,
    resetForm
  } = useContactForm()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const result = await submitForm()
    
    if (result.success) {
      // Show success message - you could use a toast library here
      console.log('Message sent successfully!')
    } else {
      // Show error message
      console.error('Failed to send message:', result.error)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const skills = {
    languages: ['Python', 'Java', 'JavaScript', 'SQL'],
    backend: ['FastAPI', 'Django', 'Spring Boot', 'REST APIs', 'MongoDB', 'MySQL'],
    cloudDevOps: ['AWS (EC2, S3, RDS)', 'Docker', 'Jenkins', 'GitHub Actions', 'Grafana', 'Git/GitHub'],
    practices: ['Automated Testing', 'Code Reviews', 'Human-in-the-loop Controls', 'Technical Documentation', 'Agile/Scrum'],
    genai: ['RAG', 'Embeddings (bge-small)', 'Vector Databases', 'Semantic Search', 'LLM Answer Generation', 'Prompt Engineering', 'AI Agents', 'LangChain', 'Hugging Face'],
    ml: ['scikit-learn', 'TensorFlow', 'PyTorch', 'Model Training & Evaluation']
  }

  const projects = [
    {
      title: 'RAG over a Codebase',
      description: 'Retrieval-augmented generation pipeline that answers questions about my own codebase: local bge-small embeddings, retrieval served by the vector database I built from scratch, and an LLM answer step grounded in the retrieved code.',
      technologies: ['Python', 'FastAPI', 'bge-small', 'HNSW', 'LLM'],
      github: 'https://github.com/venkat210105',
      achievements: ['Local embeddings, grounded LLM answers', 'HNSW indexing with write-ahead logging', 'Crash recovery without re-embedding']
    },
    {
      title: 'Vector Database (From Scratch)',
      description: 'Single-node vector database with flat and HNSW indexes behind a FastAPI REST API, benchmarked against faiss-cpu.',
      technologies: ['Python', 'FastAPI', 'NumPy', 'HNSW', 'Write-Ahead Logging'],
      github: 'https://github.com/venkat210105/vector',
      achievements: ['25–40% faster queries than faiss-cpu', '100% recall@10 after tombstone deletion', 'Flat and HNSW indexes']
    },
    {
      title: 'DBS Feedback System',
      description: 'Full-stack feedback application (Spring Boot + REST backend, React frontend) with Hugging Face sentiment classification and Google OAuth 2.0 and Calendar API for auto-scheduling, deployed on Docker/EC2.',
      technologies: ['Java', 'Spring Boot', 'Python', 'React', 'Hugging Face', 'Google OAuth 2.0', 'Docker', 'AWS EC2'],
      github: 'https://github.com/venkat210105/dbs_devops2',
      achievements: ['Sentiment classification with Hugging Face', 'Google OAuth 2.0 & Calendar auto-scheduling', 'Dockerized deploy on AWS EC2']
    }
  ]

  const experience = [
    {
      title: 'Software Development Engineer in Test (SDET)',
      company: 'Juspay Technologies',
      duration: 'February 2026 – Present',
      description: 'Building AI-agent test automation and record/replay testing for Hyperswitch, Juspay\'s open-source payments platform, with engineer approval built into every stage.',
      achievements: [
        'Five-agent automation pipeline with human approval: coverage ~80% → ~95–97%',
        'Proxy-based (MITM) record/replay testing: connector coverage 8 → 25',
        'Cypress suite: 90+ test suites across 50+ connectors',
        'CI/CD health across GitHub Actions & Jenkins, debugged with Grafana',
        '600+ GitHub contributions in the past year'
      ],
      image: juspayImage
    },
    {
      title: 'AI DevOps Intern',
      company: 'DBS Tech (DBS Bank)',
      duration: 'June 2025 – February 2026',
      description: 'Implemented a chatbot for the product procurement workflow and maintained Jenkins CI/CD pipelines for sandbox environments.',
      achievements: ['Procurement workflow chatbot', 'Jenkins CI/CD for sandbox environments', 'Python regex scripts for ETL-style extraction'],
      image: dbsImage
    }
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold"
            >
              Venkata Karthik Sai Mariserla
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${
                    activeSection === item ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-background border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 text-base font-medium capitalize w-full text-left hover:bg-accent"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-16 flex items-center justify-center relative overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"
        />
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          {/* Accent line above */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="h-1 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mb-5 rounded-full"
          />
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent"
          >
            Venkata Karthik Sai Mariserla
          </motion.h1>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-16 bg-gradient-to-r from-secondary to-primary mx-auto mb-5 rounded-full"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-xl font-light text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Software Engineer at Juspay building AI-agent automation with engineer approval built in, RAG pipelines, and Python/FastAPI services
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" onClick={() => scrollToSection('projects')} className="px-8 py-6 text-base">
              View My Work
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')} className="px-8 py-6 text-base">
              Get In Touch
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI-agent automation, retrieval-augmented generation, and reliable testing for payments infrastructure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={profilePic} 
                alt="Venkata Karthik Sai Mariserla" 
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed">
                I'm a B.Tech graduate (CGPA 8.95/10, 2026) and software engineer at Juspay who builds AI-agent 
                automation with engineer approval built in, measured by coverage metrics. I built a RAG pipeline 
                over a codebase, with local embeddings and a vector database written from scratch (HNSW, write-ahead 
                logging), plus Python and FastAPI REST services. I previously interned at DBS Tech, the technology arm of DBS Bank.
              </p>
              
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center p-4 bg-accent rounded-lg">
                  <div className="text-2xl font-bold text-primary">8.95</div>
                  <div className="text-xs text-muted-foreground">CGPA</div>
                </div>
                <div className="text-center p-4 bg-accent rounded-lg">
                  <div className="text-2xl font-bold text-primary">95%+</div>
                  <div className="text-xs text-muted-foreground">Test Coverage</div>
                </div>
                <div className="text-center p-4 bg-accent rounded-lg">
                  <div className="text-2xl font-bold text-primary">25</div>
                  <div className="text-xs text-muted-foreground">Connectors Replayed</div>
                </div>
                <div className="text-center p-4 bg-accent rounded-lg">
                  <div className="text-2xl font-bold text-primary">600+</div>
                  <div className="text-xs text-muted-foreground">GitHub Contributions</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary"><Mail className="w-3 h-3 mr-1" />venkatmariserla21@gmail.com</Badge>
                <Badge variant="secondary"><Phone className="w-3 h-3 mr-1" />+91-7093358526</Badge>
                <Badge variant="secondary"><MapPin className="w-3 h-3 mr-1" />Hyderabad, India</Badge>
              </div>

              <a href={resumePdf} download="venkat_resume_sysdev.pdf" className="w-full sm:w-auto inline-block">
                <Button className="w-full sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-accent/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hands-on experience in payments infrastructure and banking technology
            </p>
          </motion.div>

          <div className="space-y-16 relative pb-20">
            {/* Continuous curved line spanning all experiences */}
            <div className="absolute left-8 top-0 bottom-0 pointer-events-none -z-10 h-full">
              <svg width="256" height="100%" viewBox="0 0 256 2000" className="stroke-foreground/40 w-full h-full" preserveAspectRatio="none">
                <path
                  d="M 128 0 Q 20 75, 128 150 Q 236 225, 128 300 Q 20 375, 128 450 Q 236 525, 128 600 Q 20 675, 128 750 Q 236 825, 128 900 Q 20 975, 128 1050 Q 236 1125, 128 1200 Q 20 1275, 128 1350 Q 236 1425, 128 1500 Q 20 1575, 128 1650 Q 236 1725, 128 1800 Q 20 1875, 128 1950 Q 236 1975, 128 2000"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Experience cards */}
            {experience.map((exp, index) => (
              <div key={exp.title} className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className={`flex flex-col ${exp.image ? 'md:flex-row' : ''} gap-6 items-stretch`}>
                    <Card className="flex-1">
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <CardTitle className="flex items-center">
                              <Briefcase className="w-5 h-5 mr-2 text-primary" />
                              {exp.title}
                            </CardTitle>
                            <CardDescription className="text-lg font-medium">{exp.company}</CardDescription>
                          </div>
                          <Badge variant="outline" className="mt-2 md:mt-0">
                            <Calendar className="w-3 h-3 mr-1" />
                            {exp.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.achievements.map((achievement) => (
                            <Badge key={achievement} variant="secondary">{achievement}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    {exp.image && (
                      <div className="md:w-64 flex-shrink-0">
                        <img 
                          src={exp.image} 
                          alt={`${exp.company} - ${exp.title}`}
                          className="w-full h-64 object-cover rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              RAG, vector search built from scratch, and full-stack AI applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      {project.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center text-sm text-muted-foreground">
                          <Award className="w-3 h-3 mr-2 text-primary" />
                          {achievement}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      {project.website && (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => window.open(project.website, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-accent/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="w-5 h-5 mr-2 text-primary" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2 text-primary" />
                    Backend & Databases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cloud className="w-5 h-5 mr-2 text-primary" />
                    Cloud, DevOps & Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[...skills.cloudDevOps, ...skills.practices].map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-primary" />
                    Generative AI & ML
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[...skills.genai, ...skills.ml].map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Academic excellence and continuous learning through professional certifications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Bachelor of Technology in Information Technology</h3>
                    <p className="text-muted-foreground">MLR Institute of Technology, Hyderabad</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline">CGPA: 8.95/10</Badge>
                      <Badge variant="outline">2022 – 2026</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-primary" />
                    Key Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Full Stack Development - RINL</span>
                      <Badge variant="secondary">2024</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">JavaScript Programming - Scaler</span>
                      <Badge variant="secondary">2024</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Python Essentials - Python Institute</span>
                      <Badge variant="secondary">2024</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Structures & Algorithms - NPTEL</span>
                      <Badge variant="secondary">Elite</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-accent/50">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let's discuss opportunities and collaborate on innovative projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>venkatmariserla21@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+91-7093358526</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <span>linkedin.com/in/venkata-karthik-sai-mariserla</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-primary" />
                  <a href="https://github.com/venkat210105" target="_blank" rel="noopener noreferrer">github.com/venkat210105</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-primary" />
                  <a href="https://github.com/venkatakarthikm-maker" target="_blank" rel="noopener noreferrer">github.com/venkatakarthikm-maker (Hyperswitch)</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-primary" />
                  <a href="https://leetcode.com/u/venkat210604" target="_blank" rel="noopener noreferrer">leetcode.com/u/venkat210604</a>
                </div>
              </div>

              <div className="flex space-x-4">
                <a href="mailto:venkatmariserla21@gmail.com" className="flex-1">
                  <Button size="lg" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Me
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/venkata-karthik-sai-mariserla/" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button size="lg" variant="outline" className="flex-1">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>I'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        placeholder="First Name" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                      <Input 
                        placeholder="Last Name" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                    <Input 
                      placeholder="Email Address" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                    <Input 
                      placeholder="Subject" 
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                    <Textarea 
                      placeholder="Your Message" 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                    
                    {submitStatus === 'success' && (
                      <div className="flex items-center text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Message sent successfully! I'll get back to you soon.
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="flex items-center text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Failed to send message. Please try again.
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2">
            <p className="text-muted-foreground">
              © 2026 Venkata Karthik Sai Mariserla. Crafted with passion, powered by code.
            </p>
            <Rocket className="w-5 h-5 text-foreground" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

