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
    
    let leetcodeData = $state(null);
    let leetcodeLoading = $state(true);
    let leetcodeError = $state(false);
    let contributionGrid = $state([]);
    let monthLabels = $state([]);

    onMount(() => {
        Promise.all([
            fetch('https://alfa-leetcode-api.onrender.com/prakharkatiyar078/solved').then(r => r.json()),
            fetch('https://alfa-leetcode-api.onrender.com/prakharkatiyar078').then(r => r.json()),
            fetch('https://alfa-leetcode-api.onrender.com/prakharkatiyar078/calendar').then(r => r.json())
        ])
        .then(([solvedData, profileData, calendarData]) => {
            if (solvedData && solvedData.solvedProblem) {
                leetcodeData = { ...solvedData, ...profileData };
                
                if (calendarData && calendarData.submissionCalendar) {
                    const calendar = JSON.parse(calendarData.submissionCalendar);
                    const grid = [];
                    const today = new Date();
                    const daysToShow = 364; 
                    
                    const submissionsByDate = {};
                    for (const [timestamp, count] of Object.entries(calendar)) {
                        const date = new Date(parseInt(timestamp) * 1000);
                        const dateString = date.toISOString().split('T')[0];
                        submissionsByDate[dateString] = count;
                    }
                    
                    const startDate = new Date(today);
                    startDate.setDate(today.getDate() - daysToShow + 1);
                    const startDayOfWeek = startDate.getDay();
                    
                    for (let i = 0; i < startDayOfWeek; i++) {
                        grid.push({ date: null, count: 0, level: -1 });
                    }
                    
                    let currentMonth = -1;
                    const mLabels = [];

                    for (let i = daysToShow - 1; i >= 0; i--) {
                        const d = new Date(today);
                        d.setDate(d.getDate() - i);
                        const dateString = d.toISOString().split('T')[0];
                        const count = submissionsByDate[dateString] || 0;
                        
                        const currentCol = Math.floor(grid.length / 7) + 1;
                        const month = d.getMonth();
                        if (month !== currentMonth) {
                            mLabels.push({ label: d.toLocaleString('default', { month: 'short' }), col: currentCol });
                            currentMonth = month;
                        }

                        let level = 0;
                        if (count > 0 && count <= 2) level = 1;
                        else if (count <= 5) level = 2;
                        else if (count <= 9) level = 3;
                        else if (count > 9) level = 4;
                        
                        grid.push({ date: dateString, count, level, formatted: d.toLocaleDateString() });
                    }
                    contributionGrid = grid;
                    monthLabels = mLabels;
                }
            } else {
                leetcodeError = true;
            }
        })
        .catch(() => {
            leetcodeError = true;
        })
        .finally(() => {
            leetcodeLoading = false;
        });

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
    <section id="about" class="about animate-section">
        <h2><User class="icon-heading" size={36} /> About Me</h2>
        <div class="bento-card">
            <p>{me.summary}</p>
        </div>
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

    <!-- LeetCode Section -->
    <section id="leetcode" class="leetcode">
        <h2 class="animate-section">
            <svg class="icon-heading" viewBox="0 0 24 24" width="36" height="36" fill="currentColor" style="display:inline-block; vertical-align:-8px; margin-right:8px;"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.467 2.418-1.467 3.896s.486 2.915 1.467 3.896l10.1 10.101c.515.515 1.366.497 1.902-.038.536-.536.553-1.387.038-1.902l-2.467-2.503a5.055 5.055 0 0 0 2.445-1.336l2.609-2.636c.514-.514.496-1.365-.039-1.9-.535-.535-1.386-.553-1.9-.038z"/></svg>
            LeetCode Profile
        </h2>
        <div class="bento-card animate-section">
            {#if leetcodeLoading}
                <div class="loading-state">
                    <div class="spinner"></div>
                    <p>Loading API data...</p>
                </div>
            {:else if leetcodeError}
                <div class="error-state">
                    <p>Unable to load live stats due to API limits.</p>
                    <a href="https://leetcode.com/u/prakharkatiyar078/" target="_blank" rel="noopener noreferrer" class="view-btn">View on LeetCode</a>
                </div>
            {:else}
                <div class="leetcode-content">
                    <div class="profile-info">
                        <img src={leetcodeData.avatar} alt="LeetCode Avatar" class="avatar" />
                        <div class="info-text">
                            <h3>{leetcodeData.name || 'Prakhar Katiyar'}</h3>
                            <a href="https://leetcode.com/u/prakharkatiyar078/" target="_blank" rel="noopener noreferrer" class="leetcode-link">@prakharkatiyar078</a>
                            <div class="rank-badge">Rank: {leetcodeData.ranking.toLocaleString()}</div>
                        </div>
                    </div>
                    
                    <div class="stats-container">
                        <div class="total-solved">
                            <span class="number">{leetcodeData.solvedProblem}</span>
                            <span class="label">Problems Solved</span>
                        </div>
                        <div class="difficulty-bars">
                            <div class="stat-row easy">
                                <div class="stat-label">Easy</div>
                                <div class="bar-bg">
                                    <div class="bar-fill" style="width: {(leetcodeData.easySolved / leetcodeData.solvedProblem) * 100}%"></div>
                                </div>
                                <div class="stat-count">{leetcodeData.easySolved}</div>
                            </div>
                            <div class="stat-row medium">
                                <div class="stat-label">Medium</div>
                                <div class="bar-bg">
                                    <div class="bar-fill" style="width: {(leetcodeData.mediumSolved / leetcodeData.solvedProblem) * 100}%"></div>
                                </div>
                                <div class="stat-count">{leetcodeData.mediumSolved}</div>
                            </div>
                            <div class="stat-row hard">
                                <div class="stat-label">Hard</div>
                                <div class="bar-bg">
                                    <div class="bar-fill" style="width: {(leetcodeData.hardSolved / leetcodeData.solvedProblem) * 100}%"></div>
                                </div>
                                <div class="stat-count">{leetcodeData.hardSolved}</div>
                            </div>
                        </div>
                    </div>
                    
                    {#if contributionGrid.length > 0}
                    <div class="calendar-container">
                        <h4>Past Year Submissions</h4>
                        <div class="graph-scroll-wrapper">
                            <div class="calendar-layout">
                                <div class="calendar-y-axis">
                                    <span></span>
                                    <span></span>
                                    <span>Mon</span>
                                    <span></span>
                                    <span>Wed</span>
                                    <span></span>
                                    <span>Fri</span>
                                    <span></span>
                                </div>
                                <div class="calendar-content">
                                    <div class="month-labels" style="display: grid; grid-template-columns: repeat(53, 16px); gap: 4px; pointer-events: none;">
                                        {#each monthLabels as month}
                                            <span style="grid-column: {month.col};">{month.label}</span>
                                        {/each}
                                    </div>
                                    <div class="contribution-graph">
                                        {#each contributionGrid as cell}
                                            <div class="cube level-{cell.level}" title={cell.date ? `${cell.count} submissions on ${cell.formatted}` : ''}></div>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/if}
                </div>
            {/if}
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
    <section id="education" class="education animate-section">
        <h2><GraduationCap class="icon-heading" size={36} /> Education</h2>
        <div class="bento-card">
            {#each education as edu}
                <div class="edu-item">
                    <h3>{edu.institution}</h3>
                    <h4>{edu.degree}</h4>
                    <p>{edu.date} • {edu.grade}</p>
                </div>
            {/each}
        </div>
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

    .leetcode {
        margin-bottom: 2rem;
        
        .loading-state, .error-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem;
            color: var(--secondary-color);
            gap: 1rem;

            .view-btn {
                background: linear-gradient(135deg, #ffa116, #d97a00);
                color: white;
                padding: 0.8rem 1.8rem;
                border-radius: 99px;
                text-decoration: none;
                font-weight: 600;
                box-shadow: 0 4px 15px rgba(255, 161, 22, 0.3);
                transition: all 0.3s;
                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(255, 161, 22, 0.4);
                }
            }
        }

        @keyframes spin { 100% { transform: rotate(360deg); } }

        .spinner {
            width: 40px; height: 40px;
            border: 3px solid rgba(255, 161, 22, 0.2);
            border-top-color: #ffa116;
            border-radius: 50%;
            animation: spin 1s infinite linear;
        }

        .leetcode-content {
            display: flex;
            flex-wrap: wrap;
            gap: 3rem;
            align-items: center;
            justify-content: space-between;
        }

        .profile-info {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            flex: 1;
            min-width: 250px;

            .avatar {
                width: 90px;
                height: 90px;
                border-radius: 20px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                border: 2px solid var(--border-color);
                object-fit: cover;
            }

            .info-text {
                h3 {
                    margin: 0 0 0.2rem 0;
                    color: var(--text-color);
                    font-size: 1.5rem;
                }
                .leetcode-link {
                    color: #ffa116;
                    text-decoration: none;
                    display: block;
                    margin-bottom: 0.8rem;
                    font-weight: 500;
                    
                    &:hover { text-decoration: underline; }
                }
                .rank-badge {
                    display: inline-block;
                    background: rgba(255, 161, 22, 0.1);
                    color: #ffa116;
                    padding: 0.3rem 0.8rem;
                    border-radius: 99px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    border: 1px solid rgba(255, 161, 22, 0.2);
                }
            }
        }

        .stats-container {
            flex: 2;
            min-width: 300px;
            display: flex;
            gap: 2.5rem;
            align-items: center;

            .total-solved {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: rgba(255, 161, 22, 0.05);
                padding: 1.5rem;
                border-radius: 20px;
                min-width: 150px;
                border: 1px solid rgba(255, 161, 22, 0.1);

                .number {
                    font-size: 3.5rem;
                    font-weight: 800;
                    color: var(--text-color);
                    line-height: 1;
                    margin-bottom: 0.5rem;
                }
                .label {
                    color: var(--secondary-color);
                    font-weight: 500;
                }
            }

            .difficulty-bars {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 1.2rem;

                .stat-row {
                    display: flex;
                    align-items: center;
                    gap: 1rem;

                    .stat-label {
                        width: 60px;
                        font-weight: 500;
                        font-size: 0.95rem;
                    }

                    .bar-bg {
                        flex: 1;
                        height: 8px;
                        background: var(--bg-color);
                        border-radius: 99px;
                        overflow: hidden;
                        border: 1px solid var(--border-color);

                        .bar-fill {
                            height: 100%;
                            border-radius: 99px;
                            transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                        }
                    }

                    .stat-count {
                        width: 40px;
                        text-align: right;
                        font-weight: 600;
                        color: var(--text-color);
                    }

                    &.easy {
                        .stat-label { color: #00b8a3; }
                        .bar-fill { background: #00b8a3; box-shadow: 0 0 10px rgba(0, 184, 163, 0.5); }
                    }
                    &.medium {
                        .stat-label { color: #ffc01e; }
                        .bar-fill { background: #ffc01e; box-shadow: 0 0 10px rgba(255, 192, 30, 0.5); }
                    }
                    &.hard {
                        .stat-label { color: #ef4743; }
                        .bar-fill { background: #ef4743; box-shadow: 0 0 10px rgba(239, 71, 67, 0.5); }
                    }
                }
            }
        }

        .calendar-container {
            width: 100%;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border-color);

            h4 {
                color: var(--text-color);
                margin: 0 0 1rem 0;
                font-size: 1.1rem;
            }

            .graph-scroll-wrapper {
                width: 100%;
                overflow-x: auto;
                padding-bottom: 1rem;
                
                &::-webkit-scrollbar { height: 6px; }
                &::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.3); border-radius: 10px; }
            }

            .calendar-layout {
                display: flex;
                gap: 10px;
                width: max-content;
                align-items: flex-end;
            }
            
            .calendar-y-axis {
                display: grid;
                grid-template-rows: 16px repeat(7, 12px);
                gap: 4px;
                text-align: right;

                span {
                    font-size: 0.75rem;
                    color: var(--secondary-color);
                    line-height: 12px;
                }
            }

            .calendar-content {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .month-labels {
                height: 16px;
                span {
                    font-size: 0.75rem;
                    color: var(--secondary-color);
                    line-height: 16px;
                    display: block;
                    width: max-content;
                }
            }

            .contribution-graph {
                display: grid;
                grid-auto-flow: column;
                grid-template-rows: repeat(7, 12px);
                grid-auto-columns: 12px;
                gap: 4px;

                .cube {
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                    background: rgba(255, 255, 255, 0.05);

                    &.level--1 { background: transparent; }
                    &.level-0 { background: rgba(150, 150, 150, 0.1); }
                    &.level-1 { background: rgba(0, 184, 163, 0.3); border: 1px solid rgba(0, 184, 163, 0.4); }
                    &.level-2 { background: rgba(0, 184, 163, 0.6); border: 1px solid rgba(0, 184, 163, 0.7); }
                    &.level-3 { background: rgba(0, 184, 163, 0.8); border: 1px solid rgba(0, 184, 163, 0.9); }
                    &.level-4 { background: #00b8a3; box-shadow: 0 0 5px rgba(0, 184, 163, 0.6); }

                    &:hover:not(.level--1) {
                        transform: scale(1.2);
                        z-index: 10;
                        box-shadow: 0 0 10px rgba(0, 184, 163, 0.8);
                        transition: all 0.2s;
                    }
                }
            }
        }

        @media (max-width: 768px) {
            .stats-container {
                flex-direction: column;
                align-items: stretch;
                
                .total-solved {
                    flex-direction: row;
                    justify-content: space-between;
                    padding: 1.5rem 2rem;
                    
                    .number { font-size: 2.5rem; margin: 0; }
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

    .projects {
        padding-top: 2rem;
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
            padding-top: 5vh;
            min-height: 80vh;

            h1 { 
                font-size: 2.5rem; 
                line-height: 1.2;
                margin-bottom: 1rem;
            }
            h2 { font-size: 1.3rem; }
            
            .tagline {
                font-size: 1.1rem;
            }

            .actions {
                flex-direction: column;
                width: 100%;
                
                .btn {
                    width: 100%;
                    justify-content: center;
                }
            }
        }
        
        .timeline {
            padding-left: 1.5rem;

            .timeline-item {
                padding: 1.5rem;
                
                .timeline-dot {
                    left: -1.4rem;
                    width: 12px;
                    height: 12px;
                }
                
                .timeline-content {
                    h3 { font-size: 1.2rem; }
                    h4 { font-size: 1rem; }
                    ul li { font-size: 0.95rem; }
                }
            }
        }

        .skills .skill-category .tags .tag {
            font-size: 0.85rem;
            padding: 0.4rem 1rem;
        }
    }

    @media (max-width: 480px) {
        .bento-grid {
            grid-template-columns: 1fr;
        }
    }
</style>