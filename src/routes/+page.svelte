<script>
    import { me, skills, experience, education, projects } from '$lib/data.js';
    import { onMount } from 'svelte';
    import { animate, inView, stagger, scroll } from 'motion';
    import { 
        Mail, 
        User, 
        Briefcase, 
        Code2, 
        Wrench, 
        GraduationCap 
    } from 'lucide-svelte';

    let typedName = $state('');
    let isTyping = $state(true);

    onMount(() => {
        // Typing animation for the name
        const nameToType = me.name;
        let i = 0;
        const typingTimer = setInterval(() => {
            if (i < nameToType.length) {
                typedName += nameToType.charAt(i);
                i++;
            } else {
                clearInterval(typingTimer);
                setTimeout(() => isTyping = false, 1500); // Stop blinking after 1.5 seconds
            }
        }, 100);

        // Set initial states to prevent FOUC (Flash of Unstyled Content) before animation
        const heroElements = document.querySelectorAll('.hero-content > *');
        const sections = document.querySelectorAll('.animate-section');
        const grids = document.querySelectorAll('.bento-grid');
        const timelineItems = document.querySelectorAll('.timeline-item');
        const allBentoCards = document.querySelectorAll('.bento-card');
        
        heroElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });

        // Hero animations (immediate on load) with smooth spring-like bezier
        animate('.hero-content > *', 
            { y: [30, 0], opacity: [0, 1] }, 
            { duration: 0.8, delay: stagger(0.15), ease: [0.16, 1, 0.3, 1] }
        );

        // Scroll animations for sections
        sections.forEach((section) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(40px)';
            
            inView(section, () => {
                animate(section, 
                    { y: [40, 0], opacity: [0, 1] }, 
                    { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                );
            }, { margin: "0px 0px -15% 0px" });
        });

        // Staggered bento cards
        grids.forEach((grid) => {
            const cards = Array.from(grid.children);
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
            });
            
            inView(grid, () => {
                animate(cards, 
                    { y: [30, 0], opacity: [0, 1] }, 
                    { duration: 0.6, delay: stagger(0.1), ease: [0.16, 1, 0.3, 1] }
                );
            }, { margin: "0px 0px -15% 0px" });
        });
        
        // Staggered timeline items
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
        });
        
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            inView(timeline, () => {
                animate('.timeline-item', 
                    { x: [-30, 0], opacity: [0, 1] }, 
                    { duration: 0.6, delay: stagger(0.2), ease: [0.16, 1, 0.3, 1] }
                );
            }, { margin: "0px 0px -20% 0px" });
        }
    });
</script>

<svelte:head>
    <title>{me.name} • {me.title}</title>
    <meta name="description" content={me.summary} />
</svelte:head>

<div class="container">
    <!-- Hero Section -->
    <section id="hero" class="hero">
        <div class="hero-content">
            <div class="availability-badge">
                <span class="pulse-dot"></span> Available for new opportunities
            </div>
            <h1>
                Hi, I'm <span class="highlight">{typedName}</span><span class="blinking-cursor" class:hidden={!isTyping}></span>
            </h1>
            <h2>{me.title}</h2>
            <p class="tagline">
                Building scalable, high-performance applications with modern web technologies and AI integrations. I craft digital experiences that are robust and visually striking.
            </p>
            <div class="actions">
                <a href="mailto:{me.email}" class="btn primary">
                    <Mail size={20} /> Contact Me
                </a>
                <a href="https://{me.github}" target="_blank" rel="noopener noreferrer" class="btn secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg> GitHub
                </a>
                <a href="https://{me.linkedin}" target="_blank" rel="noopener noreferrer" class="btn secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn
                </a>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about animate-section bento-card">
        <h2><User class="icon-heading" size={36} /> About Me</h2>
        <p>{me.summary}</p>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="experience">
        <h2 class="animate-section"><Briefcase class="icon-heading" size={36} /> Experience</h2>
        <div class="timeline">
            {#each experience as exp}
                <div class="timeline-item bento-card">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content has-bg" style={exp.bgImage ? `background-image: url(${exp.bgImage});` : ''}>
                        <div class="bg-overlay"></div>
                        <div class="content-wrapper">
                            <h3>{exp.role}</h3>
                            <h4>{exp.company} <span class="date">• {exp.date}</span></h4>
                            <p class="location">{exp.location}</p>
                            <ul>
                                {#each exp.description as desc}
                                    <li>{desc}</li>
                                {/each}
                            </ul>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
        <h2 class="animate-section"><Code2 class="icon-heading" size={36} /> Featured Projects</h2>
        <div class="bento-grid">
            {#each projects as project}
                <div class="project-card bento-card">
                    <div class="content-wrapper">
                        <div class="card-header">
                            <h3>{project.name}</h3>
                        </div>
                        <p class="desc">{project.description}</p>
                        <ul class="highlights">
                            {#each project.highlights as highlight}
                                <li>{highlight}</li>
                            {/each}
                        </ul>
                        <div class="tech-stack">
                            {#each project.tech as tech}
                                <span class="tech-badge">{tech}</span>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="skills">
        <h2 class="animate-section"><Wrench class="icon-heading" size={36} /> Skills & Tools</h2>
        <div class="bento-grid">
            <div class="skill-category bento-card">
                <h3>Languages</h3>
                <div class="tags">
                    {#each skills.languages as skill}
                        <span class="tag">{skill}</span>
                    {/each}
                </div>
            </div>
            <div class="skill-category bento-card">
                <h3>Frontend</h3>
                <div class="tags">
                    {#each skills.frontend as skill}
                        <span class="tag">{skill}</span>
                    {/each}
                </div>
            </div>
            <div class="skill-category bento-card">
                <h3>Backend</h3>
                <div class="tags">
                    {#each skills.backend as skill}
                        <span class="tag">{skill}</span>
                    {/each}
                </div>
            </div>
            <div class="skill-category bento-card">
                <h3>Tools & Methods</h3>
                <div class="tags">
                    {#each skills.tools as skill}
                        <span class="tag">{skill}</span>
                    {/each}
                </div>
            </div>
        </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="education animate-section bento-card">
        <h2><GraduationCap class="icon-heading" size={36} /> Education</h2>
        {#each education as edu}
            <div class="edu-item">
                <h3>{edu.institution}</h3>
                <h4>{edu.degree}</h4>
                <p>{edu.date} • {edu.grade}</p>
            </div>
        {/each}
    </section>
</div>

<style lang="scss">
    /* Using global :global for Lucide Icons */
    :global(.icon-heading) {
        color: var(--primary-color);
        margin-right: 0.5rem;
    }

    .hero {
        min-height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-top: 10vh;
        
        .hero-content {
            max-width: 800px;
        }

        .availability-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: rgba(59, 130, 246, 0.1);
            color: var(--primary-color);
            border-radius: 30px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 2rem;
            border: 1px solid rgba(59, 130, 246, 0.2);

            .pulse-dot {
                width: 8px;
                height: 8px;
                background-color: var(--primary-color);
                border-radius: 50%;
                box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
                animation: pulse 2s infinite;
            }
        }

        @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        h1 {
            font-size: clamp(3rem, 8vw, 5rem);
            margin-bottom: 0.5rem;
            letter-spacing: -2px;
            
            .highlight {
                background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                display: inline-block;
            }

            .blinking-cursor {
                display: inline-block;
                width: 2px;
                height: 1em;
                background-color: var(--primary-color);
                vertical-align: middle;
                margin-left: 4px;
                animation: blink 1s step-end infinite;
                transition: opacity 0.3s;

                &.hidden {
                    display: none;
                    animation: none;
                }
            }
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        h2 {
            font-size: clamp(1.5rem, 4vw, 2.5rem);
            color: var(--secondary-color);
            margin-bottom: 1.5rem;
            font-weight: 500;
            letter-spacing: -0.5px;
            text-shadow: none;
        }
        
        .tagline {
            font-size: 1.25rem;
            line-height: 1.8;
            margin-bottom: 2.5rem;
            color: var(--secondary-color);
        }
        
        .actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            
            .btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.8rem 1.8rem;
                border-radius: 99px; /* Pill shape for trendiness */
                font-weight: 600;
                cursor: pointer;
                transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
                
                &.primary {
                    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                    color: white;
                    border: none;
                    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
                    
                    &:hover {
                        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.5);
                        transform: translateY(-2px);
                    }
                }
                
                &.secondary {
                    background-color: var(--card-bg);
                    backdrop-filter: blur(10px);
                    color: var(--text-color);
                    border: 1px solid var(--border-color);
                    
                    &:hover {
                        border-color: var(--primary-color);
                        color: var(--primary-color);
                        transform: translateY(-2px);
                    }
                }
            }
        }
    }

    .about {
        scroll-margin-top: 100px;
        p {
            font-size: 1.15rem;
            line-height: 1.8;
            color: var(--secondary-color);
            margin: 0;
        }
    }

    .timeline {
        position: relative;
        padding-left: 2rem;
        
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, var(--primary-color), transparent);
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 2rem;
            padding: 2rem;
            
            .timeline-dot {
                position: absolute;
                left: -2.4rem;
                top: 2rem;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: var(--primary-color);
                border: 3px solid var(--bg-color);
                box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
            }
            
            .timeline-content {
                h3 {
                    margin: 0;
                    color: var(--text-color);
                    font-size: 1.4rem;
                }
                
                h4 {
                    margin: 0.5rem 0;
                    color: var(--primary-color);
                    font-size: 1.1rem;
                    font-weight: 600;
                    
                    .date {
                        color: var(--secondary-color);
                        font-weight: 500;
                        font-size: 0.95rem;
                    }
                }
                
                .location {
                    font-size: 0.9rem;
                    color: var(--secondary-color);
                    margin-bottom: 1.5rem;
                }
                
                ul {
                    padding-left: 1.2rem;
                    margin: 0;
                    
                    li {
                        margin-bottom: 0.8rem;
                        color: var(--secondary-color);
                        font-size: 1.05rem;
                        line-height: 1.6;

                        &::marker {
                            color: var(--primary-color);
                        }
                    }
                }
            }
        }
    }

    .bento-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
        
        .project-card {
            display: flex;
            flex-direction: column;
            
            h3 {
                font-size: 1.4rem;
                margin-bottom: 1rem;
                color: var(--text-color);
            }
            
            .desc {
                color: var(--secondary-color);
                margin-bottom: 1.5rem;
                flex-grow: 1;
                font-size: 1.05rem;
            }
            
            .highlights {
                padding-left: 1.2rem;
                margin-bottom: 2rem;
                
                li {
                    font-size: 0.95rem;
                    color: var(--secondary-color);
                    margin-bottom: 0.5rem;

                    &::marker {
                        color: var(--primary-color);
                    }
                }
            }
            
            .tech-stack {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                
                .tech-badge {
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--primary-color);
                    padding: 0.4rem 0.8rem;
                    border-radius: 99px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    transition: all 0.3s ease;

                    &:hover {
                        background: rgba(99, 102, 241, 0.15);
                        border-color: var(--primary-color);
                    }
                }
            }
        }
    }

    .skills {
        .skill-category {
            h3 {
                font-size: 1.3rem;
                margin-bottom: 1.5rem;
                color: var(--text-color);
                border-bottom: 2px solid var(--border-color);
                padding-bottom: 0.5rem;
            }
            
            .tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.8rem;
                
                .tag {
                    background: var(--bg-color);
                    border: 1px solid var(--border-color);
                    color: var(--text-color);
                    padding: 0.5rem 1.2rem;
                    border-radius: 99px; /* pill shape */
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.02);

                    &:hover {
                        transform: translateY(-2px);
                    }
                    
                    &:nth-child(5n+1):hover {
                        border-color: #ef4444; color: #ef4444; box-shadow: 0 5px 15px rgba(239, 68, 68, 0.15);
                    }
                    &:nth-child(5n+2):hover {
                        border-color: #3b82f6; color: #3b82f6; box-shadow: 0 5px 15px rgba(59, 130, 246, 0.15);
                    }
                    &:nth-child(5n+3):hover {
                        border-color: #10b981; color: #10b981; box-shadow: 0 5px 15px rgba(16, 185, 129, 0.15);
                    }
                    &:nth-child(5n+4):hover {
                        border-color: #f59e0b; color: #f59e0b; box-shadow: 0 5px 15px rgba(245, 158, 11, 0.15);
                    }
                    &:nth-child(5n+5):hover {
                        border-color: #8b5cf6; color: #8b5cf6; box-shadow: 0 5px 15px rgba(139, 92, 246, 0.15);
                    }
                }
            }
        }
    }

    .education {
        margin-bottom: 4rem; /* Bottom padding for the page */
        
        .edu-item {
           p {
                color: var(--secondary-color);
                margin: 0;
            }
        }
    }

    @media (max-width: 768px) {
        .hero {
            h1 { font-size: 2.8rem; }
            h2 { font-size: 1.5rem; }
        }
        
        .timeline {
            .timeline-item {
                padding: 1.5rem;
                .timeline-dot {
                    left: -1.9rem;
                }
            }
        }
    }
</style>