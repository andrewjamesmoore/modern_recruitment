"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, ChevronDown, Menu, X } from "lucide-react";
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
import { COMPANY_NAME } from "@/lib/constants";

// Mock job data (same as home page)
const allJobs = [
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
  // Add more jobs to make it feel like a full jobs page
  {
    id: 7,
    title: "Full Stack Developer",
    company: "WebFlow Solutions",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    expertise: "Frontend",
    description:
      "Build end-to-end web applications using modern technologies and frameworks.",
    longDescription: `WebFlow Solutions is seeking a Full Stack Developer to join our remote team and help build innovative web applications for our clients.

Key Responsibilities:
• Develop both frontend and backend components of web applications
• Work with React, Node.js, and modern JavaScript frameworks
• Design and implement RESTful APIs and database schemas
• Collaborate with designers and product managers
• Ensure responsive design and cross-browser compatibility
• Write clean, maintainable, and well-tested code
• Participate in code reviews and technical discussions
• Stay updated with latest web development trends

Requirements:
• 3+ years of full stack development experience
• Proficiency in React, Node.js, and JavaScript/TypeScript
• Experience with databases (PostgreSQL, MongoDB)
• Knowledge of version control systems (Git)
• Understanding of web security best practices
• Experience with cloud platforms (AWS, Heroku)
• Strong problem-solving and communication skills
• Ability to work independently in a remote environment

Benefits:
• Competitive salary with annual bonuses
• Fully remote work environment
• Flexible working hours
• Health and dental insurance
• Professional development budget
• Modern equipment and tools
• Collaborative team culture
• Opportunity to work on diverse projects`,
    tags: ["React", "Node.js", "Full Stack"],
    posted: "1 day ago",
  },
  {
    id: 8,
    title: "Mobile App Developer",
    company: "AppCraft Studios",
    location: "Miami, FL",
    type: "Full-time",
    salary: "$95k - $135k",
    expertise: "Frontend",
    description:
      "Create amazing mobile experiences using React Native and native technologies.",
    longDescription: `AppCraft Studios is looking for a Mobile App Developer to join our team and help create cutting-edge mobile applications for iOS and Android platforms.

Key Responsibilities:
• Develop cross-platform mobile applications using React Native
• Implement native features and integrations
• Collaborate with UI/UX designers to create intuitive interfaces
• Optimize app performance and user experience
• Write unit and integration tests
• Publish apps to App Store and Google Play
• Debug and resolve technical issues
• Stay current with mobile development trends

Requirements:
• 3+ years of mobile app development experience
• Strong proficiency in React Native and JavaScript
• Experience with native iOS and Android development
• Knowledge of mobile app architecture patterns
• Familiarity with app store submission processes
• Understanding of mobile UI/UX principles
• Experience with testing frameworks
• Strong attention to detail and quality

Benefits:
• Competitive salary and equity options
• Comprehensive health benefits
• Flexible work arrangements
• Professional development opportunities
• Modern office in downtown Miami
• Team building events and outings
• Creative and innovative work environment
• Opportunity to work on high-impact projects`,
    tags: ["React Native", "iOS", "Android"],
    posted: "3 days ago",
  },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter jobs based on search and filters
  const handleFilter = () => {
    let filtered = allJobs;

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
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
      <header className='sticky top-0 z-50 bg-background border-b'>
        {/* Main Header */}
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link
              href='/'
              className='flex items-center space-x-2 hover:opacity-80 transition-opacity'
            >
              <Briefcase className='h-8 w-8 text-primary' />
              <span className='text-l font-bold'>{COMPANY_NAME}</span>
            </Link>

            {/* Desktop Right Side */}
            <div className='hidden md:flex items-center space-x-6'>
              <a
                href='/jobs'
                className='text-sm font-medium text-foreground hover:text-foreground transition-colors border-b-2 border-primary'
              >
                Find Jobs
              </a>
              <a
                href='#'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
              >
                About
              </a>
              <Button variant='outline' size='sm'>
                Upload Resume
              </Button>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden flex items-center space-x-2'>
              <ThemeToggle />
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className='h-5 w-5' />
                ) : (
                  <Menu className='h-5 w-5' />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className='md:hidden bg-background border-t'>
            <div className='container mx-auto px-4 py-4'>
              <div className='flex flex-col space-y-4'>
                <a
                  href='/jobs'
                  className='text-sm font-medium text-foreground hover:text-foreground transition-colors py-2 border-l-4 border-primary pl-4'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Jobs
                </a>
                <a
                  href='#'
                  className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
                <Separator />
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Upload Resume
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Search Section */}
      <section className='md:hidden bg-muted/50 py-4'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col gap-3'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search jobs, companies, locations...'
                className='pl-10'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={handleFilter}
              variant='secondary'
              className='w-full'
            >
              Search Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Page Header */}
      <div className='bg-background border-b'>
        <div className='container mx-auto px-4 py-8'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold mb-4'>Find Your Dream Job</h1>
            <p className='text-xl text-muted-foreground mb-8'>
              Explore {filteredJobs.length} opportunities from top companies
            </p>
          </div>

          {/* Search Section */}
          <div className='max-w-2xl mx-auto'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search jobs, companies, locations...'
                  className='pl-10'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                onClick={handleFilter}
                variant='secondary'
                className='px-8'
              >
                <Search className='h-4 w-4 mr-2' />
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          {/* Filters */}
          <div className='flex flex-wrap gap-4 mb-8 justify-center'>
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

          {/* Results Count */}
          <div className='text-center mb-8'>
            <p className='text-muted-foreground'>
              Showing {filteredJobs.length} job
              {filteredJobs.length !== 1 ? "s" : ""}
            </p>
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

          {/* Load More */}
          <div className='text-center mt-12'>
            <Button variant='outline' size='lg'>
              Load More Jobs
              <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
