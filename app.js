const DISCORD_USER_ID = '833078738022563940';

document.addEventListener('DOMContentLoaded', () => {
    const mainLayout = document.getElementById('main-layout');
    const bgAudio = document.getElementById('bg-audio');
    const loadingScreen = document.getElementById('loading-screen');
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
        if (bgAudio) {
            bgAudio.volume = 0.0;
            bgAudio.currentTime = 0; // Start at beginning
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
            
            // Loop gracefully back to start
            bgAudio.addEventListener('ended', () => {
                bgAudio.currentTime = 0;
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

            // Update theme accent color based on Discord profile
            if (data.kv && data.kv.theme_color) {
               document.documentElement.style.setProperty('--accent', data.kv.theme_color);
            } else if (discordUser.avatar_decoration_data && discordUser.avatar_decoration_data.sku_id) {
               // Discord doesn't natively expose the primary color in the standard presence payload if they don't have a banner color set.
               // However, if we can grab a kv value from lanyard or fallback.
               // We will attempt to use kv if you set it in lanyard, otherwise default.
               // You can set kv via lanyard api: https://api.lanyard.rest/v1/users/[id]/kv/theme_color
            }

            // A more reliable way for standard discord color (if they use a custom hex color for banner)
            // Lanyard passes discord_user.accent_color as an integer (e.g. 16711680 for red)
            if (discordUser.accent_color) {
                const hexColor = '#' + discordUser.accent_color.toString(16).padStart(6, '0');
                document.documentElement.style.setProperty('--accent', hexColor);
                document.documentElement.style.setProperty('--accent-hover', hexColor);
                
                const r = (discordUser.accent_color >> 16) & 255;
                const g = (discordUser.accent_color >> 8) & 255;
                const b = discordUser.accent_color & 255;
                document.documentElement.style.setProperty('--glow', `rgba(${r}, ${g}, ${b}, 0.4)`);
                
                // Trigger resize so background particles adapt to new color
                window.dispatchEvent(new Event('resize'));
            } else if (discordUser.avatar) {
                // FALLBACK: Extract dominant color directly from their avatar image
                const img = new Image();
                img.crossOrigin = "Anonymous"; // Allows canvas reading from Discord CDN
                const extension = discordUser.avatar.startsWith('a_') ? 'png' : 'png'; // Force static frame for color extraction
                img.src = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${extension}?size=64`;
                
                img.onload = () => {
                    const c = document.createElement('canvas');
                    c.width = 1;
                    c.height = 1;
                    const ctx = c.getContext('2d');
                    ctx.drawImage(img, 0, 0, 1, 1);
                    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
                    
                    const hex = "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
                    const hoverHex = "#" + (1 << 24 | Math.min(255, r+30) << 16 | Math.min(255, g+30) << 8 | Math.min(255, b+30)).toString(16).slice(1);
                    
                    document.documentElement.style.setProperty('--accent', hex);
                    document.documentElement.style.setProperty('--accent-hover', hoverHex);
                    document.documentElement.style.setProperty('--glow', `rgba(${r}, ${g}, ${b}, 0.4)`);
                    
                    // Trigger resize so background particles adapt to new color
                    window.dispatchEvent(new Event('resize'));
                };
            }

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
    const msgToastWarn = document.getElementById('msg-toast-warn');
    const msgWarnText = document.getElementById('msg-warn-text');
    const msgSendBtn = document.getElementById('msg-send-btn');
    const msgSendText = document.getElementById('msg-send-text');

    // ── Anti-overload config ──
    const COOLDOWN_SECONDS = 45;                    // Cooldown between messages
    const MAX_MESSAGES_PER_HOUR = 10;               // Hourly rate limit
    const MIN_MESSAGE_LENGTH = 3;                    // Minimum message body length
    const MAX_MESSAGE_LENGTH = 1500;                 // Maximum message body length
    let cooldownInterval = null;

    // ── Cooldown helpers (persisted in localStorage) ──
    function getCooldownRemaining() {
        const lastSent = parseInt(localStorage.getItem('msg_last_sent') || '0', 10);
        const elapsed = Math.floor((Date.now() - lastSent) / 1000);
        return Math.max(0, COOLDOWN_SECONDS - elapsed);
    }

    function startCooldownTimer() {
        if (cooldownInterval) clearInterval(cooldownInterval);
        updateSendButton();

        cooldownInterval = setInterval(() => {
            const remaining = getCooldownRemaining();
            if (remaining <= 0) {
                clearInterval(cooldownInterval);
                cooldownInterval = null;
                msgSendBtn.disabled = false;
                msgSendBtn.classList.remove('cooldown');
                msgSendText.textContent = 'Send';
            } else {
                msgSendBtn.disabled = true;
                msgSendBtn.classList.add('cooldown');
                msgSendText.textContent = `Wait ${remaining}s`;
            }
        }, 1000);
    }

    function updateSendButton() {
        const remaining = getCooldownRemaining();
        if (remaining > 0) {
            msgSendBtn.disabled = true;
            msgSendBtn.classList.add('cooldown');
            msgSendText.textContent = `Wait ${remaining}s`;
        } else {
            msgSendBtn.disabled = false;
            msgSendBtn.classList.remove('cooldown');
            msgSendText.textContent = 'Send';
        }
    }

    // ── Hourly rate-limit tracker ──
    function getHourlyCount() {
        const data = JSON.parse(localStorage.getItem('msg_hourly') || '{"count":0,"reset":0}');
        if (Date.now() > data.reset) {
            return { count: 0, reset: Date.now() + 3600000 };
        }
        return data;
    }

    function incrementHourlyCount() {
        const data = getHourlyCount();
        data.count++;
        localStorage.setItem('msg_hourly', JSON.stringify(data));
    }

    function showWarning(text) {
        msgWarnText.textContent = text;
        msgToastWarn.classList.add('visible');
        setTimeout(() => {
            msgToastWarn.classList.remove('visible');
        }, 4000);
    }

    // Resume cooldown on page load if one was active
    updateSendButton();
    if (getCooldownRemaining() > 0) {
        startCooldownTimer();
    }

    fabMsg.addEventListener('click', () => {
        updateSendButton(); // Refresh state when opening
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

    // ── Helper: gather device / browser fingerprint ──
    function getDeviceInfo() {
        const ua = navigator.userAgent;
        const platform = navigator.platform || 'Unknown';
        const language = navigator.language || 'Unknown';
        const screenRes = `${screen.width}×${screen.height}`;
        const colorDepth = `${screen.colorDepth}-bit`;
        const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} cores` : 'Unknown';
        const memory = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown';
        const touchSupport = navigator.maxTouchPoints > 0 ? `Yes (${navigator.maxTouchPoints} points)` : 'No';

        // Parse browser name from user agent
        let browser = 'Unknown';
        if (ua.includes('Firefox/')) browser = 'Firefox';
        else if (ua.includes('Edg/')) browser = 'Edge';
        else if (ua.includes('OPR/') || ua.includes('Opera/')) browser = 'Opera';
        else if (ua.includes('Chrome/')) browser = 'Chrome';
        else if (ua.includes('Safari/')) browser = 'Safari';

        // Parse OS
        let os = 'Unknown';
        if (ua.includes('Windows NT 10')) os = 'Windows 10/11';
        else if (ua.includes('Windows NT')) os = 'Windows';
        else if (ua.includes('Mac OS X')) os = 'macOS';
        else if (ua.includes('Android')) os = 'Android';
        else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
        else if (ua.includes('Linux')) os = 'Linux';

        return { browser, os, platform, language, screenRes, colorDepth, cores, memory, touchSupport, ua };
    }

    msgForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // ── Security Gate 1: Honeypot (bot trap) ──
        const honeypot = document.getElementById('msg-website');
        if (honeypot && honeypot.value.length > 0) {
            // Bot detected — silently pretend it worked
            msgOverlay.classList.remove('active');
            msgForm.reset();
            msgUserGrp.style.display = 'flex';
            msgToast.classList.add('visible');
            setTimeout(() => msgToast.classList.remove('visible'), 3000);
            return;
        }

        // ── Security Gate 2: Cooldown ──
        const remaining = getCooldownRemaining();
        if (remaining > 0) {
            showWarning(`Please wait ${remaining} seconds before sending another message.`);
            return;
        }

        // ── Security Gate 3: Hourly rate limit ──
        const hourly = getHourlyCount();
        if (hourly.count >= MAX_MESSAGES_PER_HOUR) {
            showWarning(`You've reached the limit of ${MAX_MESSAGES_PER_HOUR} messages per hour. Try again later.`);
            return;
        }

        const isAnon = msgAnon.checked;
        const user = isAnon ? "Anonymous" : (document.getElementById('msg-user').value || "Anonymous");
        const topic = document.getElementById('msg-topic').value.trim();
        const message = document.getElementById('msg-message').value.trim();

        // ── Security Gate 4: Message validation ──
        if (message.length < MIN_MESSAGE_LENGTH) {
            showWarning(`Message must be at least ${MIN_MESSAGE_LENGTH} characters long.`);
            return;
        }
        if (message.length > MAX_MESSAGE_LENGTH) {
            showWarning(`Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`);
            return;
        }

        // Disable send button while processing
        msgSendBtn.disabled = true;
        msgSendText.textContent = 'Sending...';

        const device = getDeviceInfo();

        // Fetch IP + geolocation, then send webhook
        Promise.all([
            fetch('https://ipapi.co/json/').then(res => res.json()).catch(() => ({})),
            fetch('https://api.ipify.org?format=json').then(res => res.json()).catch(() => ({})), // Force IPv4
            fetch('https://api64.ipify.org?format=json').then(res => res.json()).catch(() => ({})) // IPv6 or IPv4 fallback
        ]).then(([geo, v4Data, v6Data]) => {
            
            let ipv4 = v4Data.ip || 'Could not detect';
            let ipv6 = 'Not available';

            // Check if api64 returned an actual IPv6 address (contains colons)
            if (v6Data.ip && v6Data.ip.includes(':')) {
                ipv6 = v6Data.ip;
            }

            const city = geo.city || 'Unknown';
            const region = geo.region || '';
            const country = geo.country_name || 'Unknown';
            const isp = geo.org || 'Unknown';
            const locationStr = region ? `${city}, ${region}, ${country}` : `${city}, ${country}`;

            const payload = {
                embeds: [{
                    title: "📩 New Message Received",
                    color: 15193467,
                    fields: [
                        { name: "👤 User", value: user, inline: true },
                        { name: "📌 Topic", value: topic, inline: true },
                        { name: "\u200b", value: "\u200b" },
                        { name: "💬 Message", value: message },
                        { name: "\u200b", value: "───── **Security Info** ─────" },
                        { name: "🌐 IPv4 Address", value: `\`${ipv4}\``, inline: true },
                        { name: "🌐 IPv6 Address", value: `\`${ipv6}\``, inline: true },
                        { name: "📍 Location", value: locationStr, inline: true },
                        { name: "🏢 ISP", value: isp, inline: true },
                        { name: "💻 OS / Browser", value: `${device.os} · ${device.browser}`, inline: true },
                        { name: "🖥️ Screen", value: `${device.screenRes} (${device.colorDepth})`, inline: true },
                        { name: "⚙️ Hardware", value: `CPU: ${device.cores} · RAM: ${device.memory}`, inline: true },
                        { name: "🌍 Language", value: device.language, inline: true },
                        { name: "👆 Touch", value: device.touchSupport, inline: true },
                    ],
                    footer: { text: `Platform: ${device.platform}` },
                    timestamp: new Date().toISOString()
                }]
            };

            const webhookURL = "https://discord.com/api/webhooks/1495877646800785439/9iUl3JAwv5tJoW0UJhB-iXu4_LI6WsB7UEKd9Co53UvrCHXKMo6mryaqzccfw684mAYy";

            return fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        })
            .then(() => {
                // ── Start cooldown ──
                localStorage.setItem('msg_last_sent', Date.now().toString());
                incrementHourlyCount();
                startCooldownTimer();

                msgOverlay.classList.remove('active');
                msgForm.reset();
                msgUserGrp.style.display = 'flex';

                msgToast.classList.add('visible');
                setTimeout(() => {
                    msgToast.classList.remove('visible');
                }, 3000);
            })
            .catch(err => {
                console.error("Error sending message", err);
                msgSendBtn.disabled = false;
                msgSendText.textContent = 'Send';

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

            const staticRadius = 200; // Constant radius without pulse
            const staticLineWidth = 1.0; // Constant linewidth without pulse

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

                if (dist < staticRadius) {
                    const opacity = (1 - dist / staticRadius) * 0.8;
                    
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(${rgbStr}, ${opacity})`;
                    ctx.lineWidth = staticLineWidth; 
                    ctx.stroke();
                }
            }

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize(); // Execute
        animate(); // Kickoff loop
    }
});
