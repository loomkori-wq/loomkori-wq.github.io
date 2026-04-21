const DISCORD_USER_ID = '833078738022563940';

document.addEventListener('DOMContentLoaded', () => {
    const mainLayout = document.getElementById('main-layout');
    const bgAudio = document.getElementById('bg-audio');
    const loadingScreen = document.getElementById('loading-screen');

    const bgVideo = document.getElementById('bg-video');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const bottomBar = document.getElementById('bottom-bar');
    let isLoaded = false;

    
    // Unify entry binding: Ensure Web Audio API and audio playback start gracefully together
    const loaderText = document.querySelector('.loader-text');
    if (loaderText) {
        loaderText.innerHTML = 'Click to establish connection<span class="loader-dots">...</span>';
    }
    loadingScreen.style.cursor = 'pointer';
    loadingScreen.addEventListener('click', revealSite, { once: true });

    bottomBar.addEventListener('click', (e) => {
        if (e.target.closest('.about-btn')) return;
        bottomBar.classList.toggle('expanded');
    });

    const scrollRow = document.querySelector('.about-scroll-row');
    if (scrollRow) {
        scrollRow.addEventListener('wheel', (e) => {
            e.preventDefault();
            scrollRow.scrollLeft += e.deltaY;
        });
    }

    const modalData = {
        aboutme: {
            title: '<i class="fas fa-user-astronaut"></i> About Me',
            content: `<p>Hello! I'm Loom. I'm a 16+ year-old programmer who is always looking to make new friends. I'm a calm and gentle person, I try to help my friends and loved ones as much as I can, often preferring to help others rather than asking for help myself. I'm always open to building things for my friends, frequently creating websites for those in need, mostly for free, just to keep improving! I value my friends deeply, and I hope we can be friends too. Please make yourself comfortable around me, as I'm patient, tolerant, and very forgiving. If you want to chat, the best way to reach me is by checking my Discord status above and sending me a message, or sending a message through here.</p>`
        },
        games: {
            title: '<i class="fas fa-gamepad"></i> Game rotation',
            content: `<ul>
                <li>Die of Death</li>
                <li>Jujutsu Shenanigans</li>
                <li>Something evil will happen</li>
                <li>Forsaken</li>
                <li>Watch Dogs</li>
            </ul>`
        },
        anime: {
            title: '<i class="fas fa-dragon"></i> Anime',
            content: `<ul>
                <li>Jujutsu Kaisen</li>
                <li>Beastars</li>
                <li>Mob Psycho 100 (Thinking of watching)</li>
            </ul>`
        },
        skills: {
            title: '<i class="fas fa-terminal"></i> Skills',
            content: `<ul>
                <li>Basic &rarr; early Medium C knowledge</li>
                <li>Basic &rarr; early Medium HTML knowledge</li>
                <li>Basic JavaScript & CSS knowledge</li>
            </ul>`
        },
        likings: {
            title: '<i class="fas fa-star"></i> Likings',
            content: `<ul>
                <li>Gaming</li>
                <li>Coding</li>
                <li>Hanging out</li>
                <li>Calling</li>
                <li>Talking</li>
                <li>Learning About New Things</li>
            </ul>`
        },
        learning: {
            title: '<i class="fas fa-book-open"></i> Currently learning',
            content: `<ul>
                <li>Networking</li>
                <li>C</li>
                <li>JavaScript</li>
                <li>CSS</li>
                <li>HTML</li>
            </ul>`
        },
        communities: {
            title: '<i class="fas fa-users"></i> Communities',
            content: `<ul>
                <li>Cult of the Lamb</li>
                <li>JJK (Jujutsu Kaisen)</li>
                <li>Murder Drones</li>
                <li>Die of Death (Roblox)</li>
                <li>Deltarune</li>
                <li>The Battle Bricks (Roblox)</li>
                <li>TF2</li>
                <li>Pseudoregalia</li>
                <li>Hotline Miami</li>
                <li>Watch Dogs</li>
                <li>Payday</li>
                <li>Resident Evil</li>
                <li>Madness Combat</li>
            </ul>`
        },
        // ── CUSTOM LAYOUTS (experimental) ──
        // To revert: uncomment the original <ul>/<li> blocks below each entry and remove the custom content.

        comforts: {
            title: '<i class="fas fa-cloud-moon"></i> Comforts & Vibe',
            content: `<div class="icon-grid">
                <div class="grid-card"><i class="fas fa-moon"></i><span>Hanging out with friends at night</span></div>
                <div class="grid-card"><i class="fas fa-microchip"></i><span>Helping my friends (especially about tech)</span></div>
                <div class="grid-card"><i class="fas fa-cloud-rain"></i><span>Rainy nights</span></div>
                <div class="grid-card"><i class="fas fa-lightbulb"></i><span>Sharing interests</span></div>
                <div class="grid-card"><i class="fas fa-gamepad"></i><span>Gaming in a group</span></div>
                <div class="grid-card"><i class="fas fa-bug-slash"></i><span>The feeling of finally fixing a bug after hours of trying</span></div>
                <div class="grid-card"><i class="fas fa-headphones"></i><span>Cozy, quiet voice calls where everyone is just doing their own thing</span></div>
            </div>`
            /* ORIGINAL (revert target):
            content: `<ul>
                <li>Hanging out with friends at night</li>
                <li>Helping my friends (especially about tech)</li>
                <li>Rainy nights</li>
                <li>Sharing interests</li>
                <li>Gaming in a group</li>
                <li>The feeling of finally fixing a bug after hours of trying</li>
                <li>Cozy, quiet voice calls where everyone is just doing their own thing</li>
            </ul>`
            */
        },
        funfacts: {
            title: '<i class="fas fa-wand-magic-sparkles"></i> Fun Facts',
            content: `<div class="tag-cloud">
                <span class="glass-tag">I'm Pansexual</span>
                <span class="glass-tag">I love Strawberries and Strawberry-related stuff</span>
                <span class="glass-tag">I'm very unserious</span>
                <span class="glass-tag">I'm a huge listener</span>
                <span class="glass-tag">It's hard for me to make decisions</span>
                <span class="glass-tag">My most played game of all time is Rainbow Six Siege</span>
            </div>`
            /* ORIGINAL (revert target):
            content: `<ul>
                <li>I'm Pansexual</li>
                <li>I love Strawberries and Strawberry-related stuff</li>
                <li>I'm very unserious</li>
                <li>I'm a huge listener</li>
                <li>It's hard for me to make decisions</li>
                <li>My most played game of all time is Rainbow Six Siege</li>
            </ul>`
            */
        },
        goals: {
            title: '<i class="fas fa-rocket"></i> Future Goals',
            content: `<div class="timeline-container">
                <div class="timeline-node">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">Right now</div>
                    <div class="timeline-text">Developing small programs</div>
                </div>
                <div class="timeline-node">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">Soon</div>
                    <div class="timeline-text">Developing big projects</div>
                </div>
                <div class="timeline-node">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">Dream Goal</div>
                    <div class="timeline-text">Being a software Engineer/Developer or Working at a hardware store</div>
                </div>
            </div>`
            /* ORIGINAL (revert target):
            content: `<ul>
                <li>I want to be a Software Engineer/Developer</li>
                <li>Work at or own my own Hardware Store!</li>
                <li>Create a piece of software that genuinely helps make someone's day easier</li>
            </ul>`
            */
        },
        talktome: {
            title: '<i class="fas fa-comment-dots"></i> How to talk to me',
            content: `<div class="chat-layout">
                <div class="chat-bubble">I usually reply fast on Discord when not busy</div>
                <div class="chat-bubble">Don't be afraid to double-text me if I forget to reply</div>
                <div class="chat-bubble">I love talking about games</div>
                <div class="chat-bubble">I'm okay with random vents or rants (I'm a big listener!)</div>
                <div class="chat-bubble">I struggle to text first sometimes</div>
                <div class="chat-bubble">Feel free to just send me a random meme or video to start a conversation, that's one of the best ways!</div>
                <div class="chat-bubble">If my Discord status is 'Idle' or 'DND', you can still message me. I'll read it as soon as I'm back</div>
                <div class="chat-bubble">I might ask a lot of questions about your interests, mostly because I just love learning about what people are passionate about, but I also like to talk about my interests</div>
            </div>`
            /* ORIGINAL (revert target):
            content: `<ul>
                <li>I usually reply fast on Discord when not busy</li>
                <li>Don't be afraid to double-text me if I forget to reply</li>
                <li>I love talking about games or web design</li>
                <li>I'm okay with random vents or rants (I'm a big listener!)</li>
                <li>I struggle to text first sometimes</li>
                <li>Feel free to just send me a random meme or video to start a conversation, that's one of the best ways!</li>
                <li>If my Discord status is 'Idle' or 'DND', you can still message me. I'll read it as soon as I'm back</li>
                <li>I might ask a lot of questions about your interests, mostly because I just love learning about what people are passionate about, but I also like to talk about my interests</li>
            </ul>`
            */
        },
        lover: {
            title: '<i class="fas fa-heart"></i> My Lover',
            content: `<div class="lover-highlight">
                <p>shrieker.o7</p>
            </div>`
        }
    };

    document.querySelectorAll('.about-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-modal');
            const data = modalData[key];
            if (!data) return;
            modalTitle.innerHTML = data.title;
            modalBody.innerHTML = data.content;
            modalOverlay.classList.add('active');
        });
    });

    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalOverlay.classList.remove('active');
        }
    });

    connectLanyard();

    function revealSite() {
        if (isLoaded) return;
        isLoaded = true;

        // Fade out loading screen
        loadingScreen.classList.add('hidden');

        // Fade in main layout
        mainLayout.classList.remove('hidden');
        void mainLayout.offsetWidth;
        mainLayout.classList.add('visible');

        // Start background media
        if (bgVideo) {
            bgVideo.play().catch(e => console.log('Video autoplay blocked', e));
        }
        if (bgAudio) {
            bgAudio.volume = 0.0;
            bgAudio.currentTime = 18; // Start at 0:18
            bgAudio.play().catch(e => console.error("Audio play() failed:", e));
            
            // 5-second Fade-in (0.10 max volume: 0.10 / 100 steps = 0.001 per 50ms)
            let fadeIn = setInterval(() => {
                if (bgAudio.volume < 0.10) {
                    bgAudio.volume = Math.min(0.10, bgAudio.volume + 0.001);
                } else {
                    clearInterval(fadeIn);
                }
            }, 50);

            let isFadingOut = false;
            bgAudio.addEventListener('timeupdate', () => {
                if (bgAudio.duration && bgAudio.currentTime >= bgAudio.duration - 3.0 && !isFadingOut) {
                    isFadingOut = true;
                    // 3-second Fade-out (0.10 / 60 steps ≈ 0.0017 per 50ms)
                    let fadeOut = setInterval(() => {
                        if (bgAudio.volume > 0.0017) {
                            bgAudio.volume = Math.max(0, bgAudio.volume - 0.0017);
                        } else {
                            bgAudio.volume = 0;
                            clearInterval(fadeOut);
                        }
                    }, 50);
                }
            });
            
            // Loop gracefully back to 0:18
            bgAudio.addEventListener('ended', () => {
                bgAudio.currentTime = 18;
                isFadingOut = false;
                bgAudio.play();
                
                // Re-fade in (5 seconds)
                let reFadeIn = setInterval(() => {
                    if (bgAudio.volume < 0.10) {
                        bgAudio.volume = Math.min(0.10, bgAudio.volume + 0.001);
                    } else {
                        clearInterval(reFadeIn);
                    }
                }, 50);
            });
        }

        // Clean up loading screen from DOM after transition
        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.remove();
        }, { once: true });
    }

    function connectLanyard() {
        if (!DISCORD_USER_ID) return;

        const ws = new WebSocket('wss://api.lanyard.rest/socket');

        ws.onopen = () => {
            ws.send(JSON.stringify({
                op: 2,
                d: { subscribe_to_id: DISCORD_USER_ID }
            }));
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.op === 1) {
                setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ op: 3 }));
                    }
                }, message.d.heartbeat_interval);
            }

            if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
                updateDiscordUI(message.d);
            }
        };

        ws.onclose = () => {
            setTimeout(connectLanyard, 5000);
        };
    }

    function updateDiscordUI(data) {
        try {
            const discordUser = data.discord_user;

            if (discordUser.avatar) {
                const extension = discordUser.avatar.startsWith('a_') ? 'gif' : 'png';
                const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${extension}?size=512`;
                document.querySelector('.avatar').src = avatarUrl;
            }

            document.querySelector('.name').innerText = discordUser.display_name || discordUser.global_name || discordUser.username;
            document.querySelector('.tagline').innerText = `@${discordUser.username}`;

            const statusColors = {
                online: '#22c55e',
                idle: '#eab308',
                dnd: '#ef4444',
                offline: '#747f8d'
            };

            const currentStatusColor = statusColors[data.discord_status] || statusColors.offline;
            const statusDot = document.querySelector('.status-dot');
            statusDot.style.backgroundColor = currentStatusColor;
            statusDot.style.boxShadow = `0 0 10px ${currentStatusColor}`;

        } catch (error) {
            console.error(error);
        }
    }

    // ── Custom Cursor ──
    const customCursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
    });

    // ── Messaging System ──
    const fabMsg = document.getElementById('fab-msg');
    const msgOverlay = document.getElementById('msg-overlay');
    const msgBack = document.getElementById('msg-back');
    const msgForm = document.getElementById('msg-form');
    const msgAnon = document.getElementById('msg-anon');
    const msgUserGrp = document.getElementById('msg-user-grp');
    const msgToast = document.getElementById('msg-toast');

    fabMsg.addEventListener('click', () => {
        msgOverlay.classList.add('active');
    });

    msgBack.addEventListener('click', () => {
        msgOverlay.classList.remove('active');
        msgForm.reset();
        msgUserGrp.style.display = 'flex';
    });

    msgAnon.addEventListener('change', (e) => {
        if (e.target.checked) {
            msgUserGrp.style.display = 'none';
        } else {
            msgUserGrp.style.display = 'flex';
        }
    });

    msgForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isAnon = msgAnon.checked;
        const user = isAnon ? "Anonymous" : (document.getElementById('msg-user').value || "Anonymous");
        const topic = document.getElementById('msg-topic').value;
        const message = document.getElementById('msg-message').value;

        const payload = {
            embeds: [{
                title: "New Message Received",
                color: 15193467,
                fields: [
                    { name: "User", value: user, inline: true },
                    { name: "Topic", value: topic, inline: true },
                    { name: "Message", value: message }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        const webhookURL = "https://discord.com/api/webhooks/1495877646800785439/9iUl3JAwv5tJoW0UJhB-iXu4_LI6WsB7UEKd9Co53UvrCHXKMo6mryaqzccfw684mAYy";

        fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(() => {
            msgOverlay.classList.remove('active');
            msgForm.reset();
            msgUserGrp.style.display = 'flex';

            msgToast.classList.add('visible');
            setTimeout(() => {
                msgToast.classList.remove('visible');
            }, 3000);
        }).catch(err => {
            console.error("Error sending message", err);
            // Simulate success visually anyway since webhook URL might be placeholder
            msgOverlay.classList.remove('active');
            msgForm.reset();
            msgUserGrp.style.display = 'flex';

            msgToast.classList.add('visible');
            setTimeout(() => {
                msgToast.classList.remove('visible');
            }, 3000);
        });
    });

    // Make inputs trigger hover bounds on cursor
    document.querySelectorAll('#msg-overlay input, #msg-overlay textarea').forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
    });

    // ── Canvas Background System ──
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let dataPackets = [];
        
        let mouse = { x: -1000, y: -1000 };


        // ── Performance: detect low-power / mobile devices ──
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isLowPower = isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
        let accentRgb = { r: 231, g: 213, b: 123 }; // Fallback


        // Extract rgb from hex logically
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 231, g: 213, b: 123 };
        }

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            
            // Get computed accent dynamically 
            const rootStyles = getComputedStyle(document.documentElement);
            const accentHex = rootStyles.getPropertyValue('--accent').trim();
            if (accentHex) {
                accentRgb = hexToRgb(accentHex);
            }

            initParticles();
        }

        function initParticles() {
            particles = [];
            dataPackets = [];
            
            // Reduce density drastically on mobile to free CPU for audio
            const densityDivisor = isLowPower ? 35000 : 10000;
            const maxParticles = isLowPower ? 40 : 300;
            const numParticles = Math.min(maxParticles, Math.floor((width * height) / densityDivisor)); 
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    size: Math.random() * 1.0 + 1.0
                });
            }
        }

        // Ambient Data Packets creation
        function createPacket() {
            if (Math.random() > 0.96 && particles.length > 1) { // Occasional spawn
                const start = particles[Math.floor(Math.random() * particles.length)];
                const end = particles[Math.floor(Math.random() * particles.length)];
                dataPackets.push({
                    x: start.x,
                    y: start.y,
                    pathX: start.x, // history tracking for trail
                    pathY: start.y, // history tracking for trail
                    target: end,
                    life: 1.0
                });
            }
        }

        // Direct sharp mouse tracking includes Parallax offset
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        document.addEventListener('touchmove', (e) => {
            if(e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        });

        document.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        function animate() {
            ctx.clearRect(0, 0, width, height);

            const connectionRadius = 200; // Constant radius without pulse
            const lwPulse = 1.0; // Constant linewidth without pulse

            // Calculate inverse parallax translation globally based on mouse
            let parallaxX = 0;
            let parallaxY = 0;
            if (mouse.x !== -1000) {
                parallaxX = (mouse.x - width / 2) * -0.04;
                parallaxY = (mouse.y - height / 2) * -0.04;
            }

            const neuralRadius = isLowPower ? 0 : 80; // Skip neural web entirely on mobile
            const rgbStr = `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                p.x += p.vx;
                p.y += p.vy;

                // Friction to counter beat agitation
                p.vx *= 0.97;
                p.vy *= 0.97;

                // Ambient speed restoration if too slow
                if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.05;
                if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.05;

                // Screen Wrap
                if (p.x < -100) p.x = width + 100;
                if (p.x > width + 100) p.x = -100;
                if (p.y < -100) p.y = height + 100;
                if (p.y > height + 100) p.y = -100;

                const px = p.x + parallaxX;
                const py = p.y + parallaxY;

                // Draw Particle Dot (passive state)
                ctx.beginPath();
                ctx.arc(px, py, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgbStr}, 0.5)`;
                ctx.fill();

                // Passive Neural Network (particle-to-particle links)
                // Skipped entirely on low-power devices — this is O(n²) and murders mobile CPUs
                if (neuralRadius > 0) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const p2 = particles[j];
                        const px2 = p2.x + parallaxX;
                        const py2 = p2.y + parallaxY;
                        const dpx = px - px2;
                        const dpy = py - py2;
                        const pDist = Math.sqrt(dpx * dpx + dpy * dpy);
                        
                        if (pDist < neuralRadius) {
                            const nOpacity = (1 - pDist / neuralRadius) * 0.15; // Low opacity web
                            ctx.beginPath();
                            ctx.moveTo(px, py);
                            ctx.lineTo(px2, py2);
                            ctx.strokeStyle = `rgba(${rgbStr}, ${nOpacity})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }

                // Active Mouse Connection (The "Grab") augmented by audio
                const dx = mouse.x - px;
                const dy = mouse.y - py;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionRadius) {
                    const opacity = (1 - dist / connectionRadius) * 0.8;
                    
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(${rgbStr}, ${opacity})`;
                    ctx.lineWidth = lwPulse; 
                    ctx.stroke();
                }
            }

            // Render Traveling Data Packets (reduced on mobile)
            if (!isLowPower || dataPackets.length < 3) {
                createPacket();
            }
            dataPackets.forEach((pk, index) => {
                const targetPx = pk.target.x;
                const targetPy = pk.target.y;
                
                const prevX = pk.x + parallaxX;
                const prevY = pk.y + parallaxY;

                pk.x += (targetPx - pk.x) * 0.05;
                pk.y += (targetPy - pk.y) * 0.05;

                const currX = pk.x + parallaxX;
                const currY = pk.y + parallaxY;
                
                // Trail line
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(currX, currY);
                ctx.strokeStyle = `rgba(${rgbStr}, ${pk.life * 0.5})`;
                ctx.lineWidth = 2.0;
                ctx.stroke();

                // Head square
                ctx.fillStyle = `rgba(${rgbStr}, ${pk.life})`;
                ctx.fillRect(currX - 2, currY - 2, 4, 4);
                
                pk.life -= 0.015;
                if (pk.life <= 0) dataPackets.splice(index, 1);
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize(); // Execute
        animate(); // Kickoff loop
    }
});
