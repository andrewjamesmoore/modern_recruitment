"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  TrendingUp,
  Star,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/theme-toggle";

// Mock job data
const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    expertise: "Frontend",
    description:
      "Join our team to build cutting-edge web applications using React and TypeScript.",
    longDescription: `We are seeking a Senior Frontend Developer to join our dynamic team at TechCorp Inc. You will be responsible for developing and maintaining high-quality web applications using modern technologies.

Key Responsibilities:
• Develop responsive and interactive user interfaces using React, TypeScript, and Next.js
• Collaborate with UX/UI designers to implement pixel-perfect designs
• Optimize applications for maximum speed and scalability
• Write clean, maintainable, and well-documented code
• Participate in code reviews and mentor junior developers
• Work closely with backend developers to integrate APIs
• Stay up-to-date with the latest frontend technologies and best practices

Requirements:
• 5+ years of experience in frontend development
• Expert knowledge of React, TypeScript, and modern JavaScript
• Experience with Next.js, Redux, and state management
• Proficiency in HTML5, CSS3, and responsive design
• Familiarity with testing frameworks (Jest, React Testing Library)
• Experience with version control systems (Git)
• Strong problem-solving skills and attention to detail
• Excellent communication and teamwork abilities

Benefits:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote work options
• Professional development budget
• Catered meals and snacks
• Modern office space in downtown San Francisco`,
    tags: ["React", "TypeScript", "Next.js"],
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLab",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $170k",
    expertise: "Product",
    description:
      "Lead product strategy and work with cross-functional teams to deliver amazing products.",
    longDescription: `InnovateLab is looking for an experienced Product Manager to drive product strategy and execution for our innovative SaaS platform.

Key Responsibilities:
• Define and execute product roadmap and strategy
• Conduct market research and competitive analysis
• Gather and prioritize product requirements from stakeholders
• Work closely with engineering, design, and marketing teams
• Analyze product metrics and user feedback to drive improvements
• Manage product launches and go-to-market strategies
• Create detailed product specifications and user stories
• Present product updates to executives and stakeholders

Requirements:
• 4+ years of product management experience
• Strong analytical and problem-solving skills
• Experience with product analytics tools (Mixpanel, Amplitude)
• Knowledge of agile development methodologies
• Excellent communication and presentation skills
• Technical background or ability to work closely with engineers
• Experience with B2B SaaS products preferred
• MBA or relevant degree preferred

Benefits:
• Competitive salary with performance bonuses
• Stock options and equity participation
• Comprehensive healthcare coverage
• Unlimited PTO policy
• Learning and development stipend
• Team building events and company retreats
• Prime office location in Manhattan`,
    tags: ["Strategy", "Analytics", "Leadership"],
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $150k",
    expertise: "DevOps",
    description:
      "Build and maintain scalable infrastructure using modern cloud technologies.",
    longDescription: `CloudTech Solutions is seeking a skilled DevOps Engineer to join our infrastructure team and help scale our cloud-native applications.

Key Responsibilities:
• Design and implement CI/CD pipelines using modern tools
• Manage and optimize AWS cloud infrastructure
• Implement infrastructure as code using Terraform and CloudFormation
• Monitor system performance and implement alerting solutions
• Ensure security best practices across all environments
• Automate deployment processes and reduce manual interventions
• Collaborate with development teams to improve deployment workflows
• Troubleshoot and resolve production issues

Requirements:
• 3+ years of DevOps or infrastructure experience
• Strong experience with AWS services (EC2, ECS, RDS, S3, etc.)
• Proficiency with containerization (Docker, Kubernetes)
• Experience with infrastructure as code tools (Terraform, Ansible)
• Knowledge of CI/CD tools (Jenkins, GitLab CI, GitHub Actions)
• Scripting skills in Python, Bash, or similar languages
• Understanding of networking and security principles
• Experience with monitoring tools (Prometheus, Grafana, ELK stack)

Benefits:
• Competitive salary and annual bonuses
• Comprehensive health and wellness benefits
• Flexible working hours and remote work options
• Professional certification reimbursement
• State-of-the-art equipment and tools
• Collaborative and innovative work environment
• Austin's vibrant tech scene location`,
    tags: ["AWS", "Docker", "Kubernetes"],
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "UX Designer",
    company: "DesignStudio",
    location: "Los Angeles, CA",
    type: "Contract",
    salary: "$80k - $120k",
    expertise: "Design",
    description:
      "Create beautiful and intuitive user experiences for our mobile and web applications.",
    longDescription: `DesignStudio is seeking a talented UX Designer to join our creative team and help design exceptional user experiences for our clients.

Key Responsibilities:
• Conduct user research and usability testing
• Create wireframes, prototypes, and high-fidelity designs
• Develop user personas and journey maps
• Collaborate with product managers and developers
• Design responsive interfaces for web and mobile applications
• Maintain and evolve design systems and style guides
• Present design concepts to clients and stakeholders
• Stay current with design trends and best practices

Requirements:
• 3+ years of UX/UI design experience
• Proficiency in Figma, Sketch, and Adobe Creative Suite
• Strong portfolio demonstrating design process and outcomes
• Experience with user research methodologies
• Knowledge of responsive design principles
• Understanding of accessibility standards (WCAG)
• Excellent visual design skills
• Strong communication and presentation abilities

Contract Details:
• 6-month contract with possibility of extension
• Competitive hourly rate
• Flexible schedule and remote work options
• Access to premium design tools and resources
• Opportunity to work with high-profile clients
• Creative and collaborative team environment
• Beautiful studio space in West Hollywood`,
    tags: ["Figma", "Prototyping", "User Research"],
    posted: "1 week ago",
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "DataDriven Corp",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140k - $180k",
    expertise: "Data Science",
    description:
      "Analyze complex datasets and build machine learning models to drive business insights.",
    longDescription: `DataDriven Corp is looking for a Data Scientist to join our analytics team and help drive data-informed decision making across the organization.

Key Responsibilities:
• Develop and deploy machine learning models for business applications
• Analyze large datasets to identify trends and insights
• Create data visualizations and dashboards for stakeholders
• Collaborate with engineering teams to implement ML solutions
• Design and conduct A/B tests and experiments
• Build predictive models for customer behavior and business metrics
• Present findings and recommendations to executive leadership
• Mentor junior data analysts and scientists

Requirements:
• PhD or Master's degree in Data Science, Statistics, or related field
• 4+ years of experience in data science or analytics
• Strong programming skills in Python and R
• Experience with machine learning frameworks (scikit-learn, TensorFlow, PyTorch)
• Proficiency in SQL and database technologies
• Knowledge of statistical analysis and experimental design
• Experience with cloud platforms (AWS, GCP, Azure)
• Strong communication skills and business acumen

Benefits:
• Highly competitive salary and equity package
• Comprehensive benefits including health, dental, vision
• Flexible work arrangements and unlimited PTO
• Professional development and conference attendance
• Access to cutting-edge tools and technologies
• Collaborative and data-driven culture
• Seattle's thriving tech ecosystem`,
    tags: ["Python", "Machine Learning", "SQL"],
    posted: "4 days ago",
  },
  {
    id: 6,
    title: "Backend Developer",
    company: "ServerSide Inc.",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$100k - $140k",
    expertise: "Backend",
    description:
      "Develop robust APIs and microservices using Node.js and cloud technologies.",
    longDescription: `ServerSide Inc. is seeking a Backend Developer to join our engineering team and help build scalable server-side applications and APIs.

Key Responsibilities:
• Design and develop RESTful APIs and GraphQL endpoints
• Build and maintain microservices architecture
• Optimize database queries and improve application performance
• Implement security best practices and authentication systems
• Write comprehensive tests and maintain code quality
• Collaborate with frontend developers on API integration
• Monitor and troubleshoot production systems
• Participate in architectural decisions and code reviews

Requirements:
• 3+ years of backend development experience
• Strong proficiency in Node.js and JavaScript/TypeScript
• Experience with databases (MongoDB, PostgreSQL, Redis)
• Knowledge of API design and development (REST, GraphQL)
• Familiarity with cloud services and containerization
• Understanding of software architecture patterns
• Experience with testing frameworks and methodologies
• Strong problem-solving and debugging skills

Benefits:
• Competitive salary with annual reviews
• Comprehensive health and wellness benefits
• Flexible work schedule and hybrid options
• Professional development opportunities
• Modern office in downtown Chicago
• Team lunches and social events
• Collaborative and supportive team culture
• Opportunity for career growth and advancement`,
    tags: ["Node.js", "MongoDB", "GraphQL"],
    posted: "5 days ago",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(featuredJobs);

  // Filter jobs based on search and filters
  const handleFilter = () => {
    let filtered = featuredJobs;

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (locationFilter && locationFilter !== "all") {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (expertiseFilter && expertiseFilter !== "all") {
      filtered = filtered.filter(
        (job) => job.expertise.toLowerCase() === expertiseFilter.toLowerCase()
      );
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Briefcase className='h-8 w-8 text-primary' />
            <span className='text-2xl font-bold'>ModernRecruit</span>
          </div>
          <nav className='hidden md:flex items-center space-x-6'>
            <a href='#' className='text-muted-foreground hover:text-foreground'>
              Jobs
            </a>
            <a href='#' className='text-muted-foreground hover:text-foreground'>
              Companies
            </a>
            <a href='#' className='text-muted-foreground hover:text-foreground'>
              About
            </a>
            <a href='#' className='text-muted-foreground hover:text-foreground'>
              Contact
            </a>
          </nav>
          <div className='flex items-center space-x-4'>
            <ThemeToggle />
            <Button variant='outline'>Sign In</Button>
            <Button>Post Job</Button>
          </div>
        </div>
      </header>

      {/* Search Bar Section */}
      <section className='bg-muted/50 py-8'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-4xl font-bold text-center mb-2'>
              Find Your Dream Job
            </h1>
            <p className='text-xl text-muted-foreground text-center mb-8'>
              Discover thousands of opportunities from top companies
            </p>
            <div className='flex flex-col md:flex-row gap-4 bg-background p-4 rounded-lg shadow-sm'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Job title, keywords, or company'
                  className='pl-10'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className='flex-1 relative'>
                <MapPin className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Location'
                  className='pl-10'
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
              <Button onClick={handleFilter} className='px-8'>
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-5xl font-bold mb-6'>
                Your Career Journey Starts Here
              </h2>
              <p className='text-xl text-muted-foreground mb-8'>
                Connect with top employers, explore exciting opportunities, and
                take the next step in your professional journey with our modern
                recruitment platform.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button size='lg' className='px-8'>
                  Browse Jobs
                </Button>
                <Button size='lg' variant='outline' className='px-8'>
                  Upload Resume
                </Button>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <Card>
                <CardContent className='p-6 text-center'>
                  <Users className='h-12 w-12 text-primary mx-auto mb-4' />
                  <h3 className='text-2xl font-bold mb-2'>10K+</h3>
                  <p className='text-muted-foreground'>Active Job Seekers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6 text-center'>
                  <Briefcase className='h-12 w-12 text-primary mx-auto mb-4' />
                  <h3 className='text-2xl font-bold mb-2'>5K+</h3>
                  <p className='text-muted-foreground'>Job Openings</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6 text-center'>
                  <TrendingUp className='h-12 w-12 text-primary mx-auto mb-4' />
                  <h3 className='text-2xl font-bold mb-2'>95%</h3>
                  <p className='text-muted-foreground'>Success Rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6 text-center'>
                  <Star className='h-12 w-12 text-primary mx-auto mb-4' />
                  <h3 className='text-2xl font-bold mb-2'>4.9</h3>
                  <p className='text-muted-foreground'>User Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className='py-16 bg-muted/50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold mb-4'>Featured Jobs</h2>
            <p className='text-xl text-muted-foreground'>
              Discover hand-picked opportunities from top companies
            </p>
          </div>

          {/* Filters */}
          <div className='flex flex-wrap gap-4 mb-8 justify-center'>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className='w-48'>
                <SelectValue placeholder='Filter by location' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Locations</SelectItem>
                <SelectItem value='san francisco'>San Francisco</SelectItem>
                <SelectItem value='new york'>New York</SelectItem>
                <SelectItem value='austin'>Austin</SelectItem>
                <SelectItem value='los angeles'>Los Angeles</SelectItem>
                <SelectItem value='seattle'>Seattle</SelectItem>
                <SelectItem value='chicago'>Chicago</SelectItem>
              </SelectContent>
            </Select>

            <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
              <SelectTrigger className='w-48'>
                <SelectValue placeholder='Filter by expertise' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Expertise</SelectItem>
                <SelectItem value='frontend'>Frontend</SelectItem>
                <SelectItem value='backend'>Backend</SelectItem>
                <SelectItem value='product'>Product</SelectItem>
                <SelectItem value='devops'>DevOps</SelectItem>
                <SelectItem value='design'>Design</SelectItem>
                <SelectItem value='data science'>Data Science</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleFilter} variant='outline'>
              Apply Filters
            </Button>
          </div>

          {/* Job Cards */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredJobs.map((job) => (
              <Card key={job.id} className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <div className='flex justify-between items-start'>
                    <div>
                      <CardTitle className='text-lg mb-1'>
                        {job.title}
                      </CardTitle>
                      <CardDescription className='text-base font-medium'>
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge variant='secondary'>{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex items-center text-sm text-muted-foreground'>
                      <MapPin className='h-4 w-4 mr-1' />
                      {job.location}
                    </div>
                    <div className='text-lg font-semibold text-primary'>
                      {job.salary}
                    </div>
                    <p className='text-sm text-muted-foreground line-clamp-2'>
                      {job.description}
                    </p>
                    <div className='flex flex-wrap gap-1'>
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant='outline' className='text-xs'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Separator />
                    <div className='flex justify-between items-center'>
                      <span className='text-xs text-muted-foreground'>
                        Posted {job.posted}
                      </span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size='sm' variant='outline'>
                            Read More
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
                          <DialogHeader>
                            <DialogTitle className='text-2xl font-bold'>
                              {job.title}
                            </DialogTitle>
                            <DialogDescription className='text-lg'>
                              {job.company} • {job.location} • {job.type}
                            </DialogDescription>
                          </DialogHeader>
                          <div className='space-y-6'>
                            <div className='flex items-center justify-between'>
                              <div className='text-2xl font-bold text-primary'>
                                {job.salary}
                              </div>
                              <div className='flex flex-wrap gap-2'>
                                {job.tags.map((tag) => (
                                  <Badge key={tag} variant='secondary'>
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Separator />
                            <div className='prose prose-sm max-w-none dark:prose-invert'>
                              <div className='whitespace-pre-line text-sm leading-relaxed'>
                                {job.longDescription}
                              </div>
                            </div>
                            <Separator />
                            <div className='flex justify-between items-center'>
                              <span className='text-sm text-muted-foreground'>
                                Posted {job.posted}
                              </span>
                              <Button size='lg' className='px-8'>
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='text-center mt-12'>
            <Button variant='outline' size='lg'>
              View All Jobs
              <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </div>
      </section>

      {/* Marketing Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold mb-4'>
              Why Choose ModernRecruit?
            </h2>
            <p className='text-xl text-muted-foreground'>
              We make job searching and hiring simple, efficient, and effective
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <Card className='text-center'>
              <CardContent className='p-8'>
                <div className='bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <Search className='h-8 w-8 text-primary' />
                </div>
                <h3 className='text-xl font-semibold mb-4'>
                  Smart Job Matching
                </h3>
                <p className='text-muted-foreground'>
                  Our AI-powered algorithm matches you with the most relevant
                  job opportunities based on your skills and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardContent className='p-8'>
                <div className='bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <Users className='h-8 w-8 text-primary' />
                </div>
                <h3 className='text-xl font-semibold mb-4'>Top Companies</h3>
                <p className='text-muted-foreground'>
                  Connect with leading companies across various industries, from
                  startups to Fortune 500 enterprises.
                </p>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardContent className='p-8'>
                <div className='bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <TrendingUp className='h-8 w-8 text-primary' />
                </div>
                <h3 className='text-xl font-semibold mb-4'>Career Growth</h3>
                <p className='text-muted-foreground'>
                  Access career resources, salary insights, and professional
                  development opportunities to advance your career.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-muted py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center space-x-2 mb-4'>
                <Briefcase className='h-6 w-6 text-primary' />
                <span className='text-xl font-bold'>ModernRecruit</span>
              </div>
              <p className='text-muted-foreground mb-4'>
                Your trusted partner in finding the perfect career opportunity.
              </p>
              <div className='flex space-x-4'>
                <Button variant='ghost' size='icon'>
                  <svg
                    className='h-4 w-4'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                  </svg>
                </Button>
                <Button variant='ghost' size='icon'>
                  <svg
                    className='h-4 w-4'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                  </svg>
                </Button>
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-4'>For Job Seekers</h3>
              <ul className='space-y-2 text-muted-foreground'>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Career Advice
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Resume Builder
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Salary Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-semibold mb-4'>For Employers</h3>
              <ul className='space-y-2 text-muted-foreground'>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Post a Job
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Browse Resumes
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Hiring Solutions
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-semibold mb-4'>Company</h3>
              <ul className='space-y-2 text-muted-foreground'>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Contact
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-foreground'>
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className='my-8' />

          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-muted-foreground'>
              © 2024 ModernRecruit. All rights reserved.
            </p>
            <div className='flex items-center space-x-4 mt-4 md:mt-0'>
              <ThemeToggle />
              <span className='text-sm text-muted-foreground'>
                Made with ❤️ for job seekers
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
