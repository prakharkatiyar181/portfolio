export const me = {
    name: 'Prakhar Katiyar',
    title: 'Senior Software Engineer',
    email: 'prakharkatiyar18012001@gmail.com',
    phone: '+91 8448718658',
    location: 'New Delhi, India',
    linkedin: 'linkedin.com/in/prakhar-katiyar-965224183',
    github: 'github.com/prakharkatiyar181',
    leetcode: 'leetcode.com/prakharkatiyar078',
    summary: 'Dedicated Full Stack Engineer with over 3+ years of experience in crafting robust, high-performance web applications for diverse platforms. Expertise in JavaScript/TypeScript, React.js, PHP, Laravel, and Node.js, with a solid foundation in object-oriented programming and algorithmic problem-solving. Proven ability to design and implement intuitive user interfaces, enhance web performance, and deliver high-quality, reliable code. Experienced in collaborating within Agile teams to drive projects from initial concept through to successful deployment.'
};

export const skills = {
    languages: ['JavaScript', 'TypeScript', 'Java', 'Python', 'C++', 'C', 'PHP', 'Go'],
    frontend: ['React.js', 'Next.js', 'Svelte', 'Redux', 'React Hooks', 'TanStack Query', 'SCSS', 'Tailwind CSS', 'Figma', 'jQuery', 'GraphQL'],
    backend: ['Node.js', 'SQL', 'MongoDB', 'MariaDB', 'MySQL', 'Laravel', 'Springboot'],
    tools: ['Git', 'GitHub', 'AWS', 'BitBucket', 'CI/CD', 'Agile', 'Jira', 'Unit Testing', 'Jest', 'OpenAI', 'MCP', 'Agentic AI']
};

export const experience = [
    {
        company: 'Onefinnet',
        role: 'Senior Software Engineer',
        location: 'Delhi, India',
        date: 'Dec 2024 – Present',
        description: [
            'Leading frontend and AI integrations for Onefinnet flagship B2B hiring platform focused on automating recruitment workflows and improving system scalability.',
            'Developed an AI-based hiring platform that automated candidate screening and matching, improving hiring efficiency by 40% and reducing manual intervention by 30%.',
            'Built and optimized AI chatbot, interview scheduling, mailing system, and authentication modules, increasing product reliability and reducing crash rates by 25%.',
            'Optimized rendering performance using memoization, lazy loading, and code splitting, reducing crash rates by 25%.',
            'Collaborated with cross-functional teams and mentored junior engineers, boosting overall team productivity by 15% and fostering innovation through agile practices.',
            'Contributed to end-to-end product enhancements, elevating user experience and engagement by 20% through iterative feedback loops and performance tuning.'
        ]
    },
    {
        company: 'Silver Oak Health',
        role: 'Senior Product Engineer (Started as: Product Engineer)',
        location: 'Bangalore, India',
        date: 'Dec 2022 – Nov 2024',
        description: [
            'Led migration from PHP to React.js architecture, improving page load speed by 50% and enhancing scalability.',
            'Built responsive B2B dashboards with optimized state management and API integration, reducing manual coordination by 35%.',
            'Developed scalable design systems and reusable UI components to maintain UI consistency across modules.',
            'Implemented performance optimizations (virtualization, debouncing, memoization) to enhance responsiveness.',
            'Designed secure authentication flows and protected routes, improving login success rate by 40%.',
            'Led development of three major client-facing projects, enhancing reliability and reducing downtime by 30%.',
            'Mentored junior developers, improving code quality and reducing bug reports by 25% through code reviews and training sessions.',
            'Collaborated closely with UI/UX designers to translate Figma designs into pixel-perfect, production-ready interfaces.'
        ]
    },
    {
        company: 'Silver Oak Health',
        role: 'Web Developer Intern',
        location: 'Bangalore, India',
        date: 'Oct 2022 – Nov 2022',
        description: [
            'Developed internal tools to automate client management for dietician counseling services.',
            'Built a dietician management application in PHP Laravel, reducing manual record-keeping time by 60% and enhancing data accessibility.',
            'Improved user experience through a responsive UI and dashboard, increasing client engagement by 25%.'
        ]
    }
];

export const education = [
    {
        institution: 'Guru Gobind Singh Indraprastha University',
        degree: 'Bachelor of Technology in Computer Science and Engineering',
        location: 'Delhi, India',
        date: 'Aug 2018 - Jul 2022',
        grade: 'CGPA: 8.5/10'
    }
];

export const projects = [
    {
        name: 'CYF – AI-Powered Study Assistant (SaaS Platform)',
        bgImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
        description: 'Cloud-based SaaS platform enabling students to interact with PDFs through AI-driven conversational capabilities.',
        highlights: [
            'Engineered real-time AI chat with PDF documents, improving study productivity by 45%.',
            'Built seamless document upload, parsing, and retrieval pipelines, reducing data load times by 35%.',
            'Enhanced research and revision efficiency by integrating semantic search and GPT-powered summarization.',
            'Designed intuitive onboarding flows supporting both free and paid tiers, improving user retention by 25%.'
        ],
        tech: ['React.js', 'Node.js', 'AI APIs', 'Vector DB']
    },
    {
        name: 'DPS – Disease Prediction System',
        bgImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        description: 'Intelligent health prediction platform to assess probable diseases using symptom data and machine learning.',
        highlights: [
            'Designed and trained ML models in Python (Jupyter Notebook) for disease prediction with ~85% accuracy.',
            'Implemented frontend (React.js, CSS, JS) for an intuitive and accessible UI.',
            'Automated symptom analysis workflows, cutting diagnosis time by 50% compared to manual consultation.'
        ],
        tech: ['Python', 'Jupyter Notebook', 'React.js', 'CSS', 'JavaScript']
    },
    {
        name: 'Gesturama – AI Gesture Recognition System',
        bgImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
        description: 'AI-powered computer vision model enabling real-time hand gesture recognition for accessibility and automation.',
        highlights: [
            'Utilized Python and OpenCV to train a gesture detection model achieving 92% recognition accuracy.',
            'Designed touch-free interaction modules to enhance accessibility for differently-abled users.',
            'Applied CNN-based architectures for real-time performance with sub-200ms latency.'
        ],
        tech: ['Python', 'OpenCV', 'CNN', 'Computer Vision']
    },
    {
        name: 'CSA – Course Selling Application',
        bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        description: 'Full-Stack E-Commerce Platform facilitating the sale of online educational courses.',
        highlights: [
            'Developed dynamic course browsing, secure payment, and responsive UI improving conversion rate by 35%.',
            'Integrated database-driven user sessions and analytics for course tracking and performance optimization.'
        ],
        tech: ['Handlebars', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'MongoDB']
    },
    {
        name: 'Pathanto – Gamified Educational Web Platform',
        bgImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
        description: 'Scalable learning ecosystem offering interactive NCERT solutions, gamified learning, and content management.',
        highlights: [
            'Developed dynamic MCQ quiz modules with real-time analytics and chapter-wise progress tracking.',
            'Built a personalized dashboard featuring streaks, points, leaderboards, and badges.',
            'Integrated WordPress CMS and custom PHP backend for scalable content delivery and blog integration.'
        ],
        tech: ['PHP', 'JavaScript', 'HTML', 'SCSS', 'MySQL', 'WordPress']
    }
];