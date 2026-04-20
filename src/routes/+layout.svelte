<script>
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '@fontsource/inter/900.css';
	import '../app.scss';
	import { onMount } from 'svelte';
	let { children } = $props();

    let isDark = $state(false);
    let isMenuOpen = $state(false);
    let canvas;

    onMount(() => {
        // Theme initialization
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            isDark = true;
        } else {
            document.documentElement.classList.remove('dark');
            isDark = false;
        }

        // Interactive Dot Grid Canvas
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const spacing = 35; // Distance between dots
        const mouse = { x: -1000, y: -1000, radius: 200 }; // Larger radius for the spread
        let animationFrame;

        // Bright, glowing colors for the antigravity effect
        const lightColors = ['rgba(226, 232, 240, 0.4)', 'rgba(148, 163, 184, 0.4)', 'rgba(129, 140, 248, 0.4)', 'rgba(167, 139, 250, 0.4)'];
        const darkColors = ['rgba(30, 41, 59, 0.4)', 'rgba(71, 85, 105, 0.4)', 'rgba(79, 70, 229, 0.4)', 'rgba(219, 39, 119, 0.4)'];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        }

        function initParticles() {
            particles = [];
            for (let x = 0; x < width; x += spacing) {
                for (let y = 0; y < height; y += spacing) {
                    particles.push({
                        x: x,
                        y: y,
                        baseX: x,
                        baseY: y,
                        size: 1.5,
                        colorIndex: Math.floor(Math.random() * 4)
                    });
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            
            const isDarkMode = document.documentElement.classList.contains('dark');
            const currentColors = isDarkMode ? lightColors : darkColors;

            // Draw multi-color circular spread (aura) behind the cursor
            if (mouse.x !== -1000 && mouse.y !== -1000) {
                ctx.save();
                
                // Add composite operation for a vibrant glow/blend effect
                ctx.globalCompositeOperation = isDarkMode ? 'screen' : 'multiply';
                
                const glowRadius = mouse.radius * 1.8;
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
                
                if (isDarkMode) {
                    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)'); // Vivid Indigo
                    gradient.addColorStop(0.3, 'rgba(167, 139, 250, 0.25)'); // Bright Violet
                    gradient.addColorStop(0.6, 'rgba(236, 72, 153, 0.08)'); // Vibrant Pink
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                } else {
                    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.3)'); // Vivid Indigo
                    gradient.addColorStop(0.3, 'rgba(14, 165, 233, 0.15)'); // Sky Blue
                    gradient.addColorStop(0.6, 'rgba(16, 185, 129, 0.05)'); // Emerald Green
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                }
                
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                ctx.restore();
            }

            particles.forEach(p => {
                let dx = mouse.x - p.x;
                let dy = mouse.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    // Push particles away for the antigravity effect
                    const pushX = Math.cos(angle) * force * 25; 
                    const pushY = Math.sin(angle) * force * 25;
                    
                    p.x = p.baseX - pushX;
                    p.y = p.baseY - pushY;
                } else {
                    // Return smoothly to base position
                    p.x -= (p.x - p.baseX) * 0.1;
                    p.y -= (p.y - p.baseY) * 0.1;
                }

                ctx.beginPath();
                // Base colors are dim, but when near the mouse they can brighten slightly (optional enhancement)
                ctx.fillStyle = currentColors[p.colorIndex];
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrame = requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        resize();
        draw();

        // --- DEVELOPER EASTER EGG 🥚 ---
        console.log(
            "%cHello Fellow Developer! 👋\n%cDid you really think I'd build a portfolio without an easter egg?\nTry typing the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A",
            "color: #4f46e5; font-size: 20px; font-weight: bold; border-bottom: 2px solid #ec4899; padding-bottom: 10px;",
            "color: #64748b; font-size: 14px; padding-top: 10px;"
        );

        let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        const handleKonami = (e) => {
            if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        };

        window.addEventListener('keydown', handleKonami);

        let isEasterEggActive = false;

        function activateEasterEgg() {
            isEasterEggActive = !isEasterEggActive;
            
            if (isEasterEggActive) {
                console.log("%c🚨 Easter Egg Activated: SUPER ANTIGRAVITY MODE 🚀", "color: #10b981; font-weight: bold; font-size: 18px;");
                mouse.radius = 1000;
            } else {
                console.log("%cEaster Egg Deactivated. Returning to normal.", "color: #64748b; font-size: 14px;");
                mouse.radius = 200;
            }

            let overlay = document.getElementById("trippy-overlay");
            if (!overlay) {
                overlay = document.createElement("div");
                overlay.id = "trippy-overlay";
                overlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 9999; backdrop-filter: hue-rotate(90deg); transition: opacity 1s; opacity: 0;";
                document.body.appendChild(overlay);
            }

            const scrollY = window.scrollY;
            const centerY = scrollY + (window.innerHeight / 2);
            document.body.style.transformOrigin = `50% ${centerY}px`;

            const bottomInset = document.body.scrollHeight - scrollY - window.innerHeight;
            const fixedSelector = '.particle-canvas, .bg-image, .animated-bg, .navbar, #trippy-overlay';

            document.body.style.animation = 'none';
            void document.body.offsetWidth; 

            if (isEasterEggActive) {
                document.body.style.clipPath = `inset(${scrollY}px 0px ${bottomInset}px 0px)`;
                document.querySelectorAll(fixedSelector).forEach(el => {
                    el.style.transform = `translateY(${scrollY}px)`;
                });
                overlay.style.opacity = '1';
                document.body.style.animation = 'epic-spin 2.5s ease-in-out';
            } else {
                overlay.style.opacity = '0';
                document.body.style.animation = 'epic-spin 2.5s ease-in-out reverse';
            }
            
            setTimeout(() => {
                document.body.style.animation = '';
                if (!isEasterEggActive) {
                    document.body.style.clipPath = 'none';
                    document.querySelectorAll(fixedSelector).forEach(el => {
                        el.style.transform = 'none';
                    });
                }
            }, 2500);
        }

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('keydown', handleKonami);
            cancelAnimationFrame(animationFrame);
        };
    });

    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            isDark = false;
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            isDark = true;
        }
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }
</script>

<div class="app">
    <canvas bind:this={canvas} class="particle-canvas"></canvas>
	<div class="bg-image"></div>
	<div class="animated-bg"></div>
	<nav class="navbar">
		<div class="container nav-content">
			<a href="#hero" class="logo">PK.</a>
			<div class="nav-right">
				<ul class="nav-links" class:open={isMenuOpen}>
					<li><a href="#about" onclick={closeMenu}>About</a></li>
					<li><a href="#experience" onclick={closeMenu}>Experience</a></li>
					<li><a href="#projects" onclick={closeMenu}>Projects</a></li>
					<li><a href="#skills" onclick={closeMenu}>Skills</a></li>
				</ul>
				<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle Theme">
					{#if isDark}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
					{/if}
				</button>
				<button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle Menu">
					{#if isMenuOpen}
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
					{/if}
				</button>
			</div>
		</div>
	</nav>

	<main>
		{@render children()}
	</main>

	<footer>
		<div class="container">
			<p>&copy; {new Date().getFullYear()} Prakhar Katiyar.</p>
		</div>
	</footer>
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
		overflow-x: hidden;
	}

	.particle-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -2;
		pointer-events: none;
	}

	.bg-image {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-image: url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80');
		background-size: cover;
		background-position: center;
		opacity: 0.05;
		z-index: -3;
		pointer-events: none;
	}

	.animated-bg {
		position: fixed;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: 
			radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.08) 0%, transparent 40%),
			radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 30%),
			radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.08) 0%, transparent 40%);
		z-index: -1;
		animation: slow-spin 30s linear infinite;
		pointer-events: none;
		filter: blur(60px);
	}

	@keyframes slow-spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.navbar {
		position: fixed;
		top: 0;
		width: 100%;
		background: var(--glass-bg);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border-color);
		z-index: 1000;
		transition: background var(--transition-speed);

		.nav-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 70px;
		}

		.logo {
			font-size: 1.8rem;
			font-weight: 900;
			color: var(--text-color);
			text-decoration: none;
			letter-spacing: -1px;
			background: linear-gradient(90deg, var(--text-color), var(--primary-color));
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.nav-right {
			display: flex;
			align-items: center;
		}

		.nav-links {
			list-style: none;
			display: flex;
			gap: 2.5rem;
			margin: 0;
			padding: 1rem 0;

			a {
				color: var(--secondary-color);
				font-weight: 600;
				font-size: 0.95rem;
				letter-spacing: 0.5px;
				text-transform: uppercase;
				transition: color 0.3s ease;

				&:hover {
					color: var(--primary-color);
				}
			}
		}

		.theme-toggle {
			background: transparent;
			border: 1px solid var(--border-color);
			color: var(--text-color);
			border-radius: 50%;
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: all var(--transition-speed) ease;
			margin-left: 2rem;

			&:hover {
				background: var(--glass-bg);
				color: var(--primary-color);
				border-color: var(--primary-color);
				transform: scale(1.05);
			}
		}

		.menu-toggle {
			display: none;
			background: transparent;
			border: none;
			color: var(--text-color);
			cursor: pointer;
			margin-left: 1rem;
			padding: 0.5rem;
			
			&:hover {
				color: var(--primary-color);
			}
		}
	}

	main {
		flex: 1;
		padding-top: 70px; /* Offset for fixed navbar */
		position: relative;
		z-index: 1;
	}

	footer {
		background: transparent;
		border-top: 1px solid var(--border-color);
		padding: 3rem 0;
		text-align: center;
		color: var(--secondary-color);
		position: relative;
		z-index: 1;
	}

	@media (max-width: 768px) {
		.navbar {
			.nav-content {
				height: 60px;
			}
			.logo {
				font-size: 1.5rem;
			}
			.theme-toggle {
				margin-left: 0.5rem;
			}
		}

		.menu-toggle {
			display: block !important;
		}

		.nav-links {
			position: absolute;
			top: 60px;
			left: 0;
			right: 0;
			background: var(--card-bg);
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
			border-bottom: 1px solid var(--border-color);
			flex-direction: column;
			padding: 2rem;
			gap: 2rem !important;
			align-items: center;
			transform: translateY(-150%);
			opacity: 0;
			pointer-events: none;
			transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
			box-shadow: var(--card-shadow);

			&.open {
				transform: translateY(0);
				opacity: 1;
				pointer-events: auto;
			}

			a {
				font-size: 1.1rem;
			}
		}

		main {
			padding-top: 60px;
		}

		footer {
			padding: 2rem 0;
			font-size: 0.9rem;
		}
	}
</style>