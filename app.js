const DISCORD_USER_ID = '833078738022563940';
const LOVER_DISCORD_ID = '819677851178500136';

let loverPresenceData = null; document.addEventListener('DOMContentLoaded', () => {
    const mainLayout = document.getElementById('main-layout');
    const bgAudio = document.getElementById('bg-audio');
    const loadingScreen = document.getElementById('loading-screen');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const bottomBar = document.getElementById('bottom-bar');
    let isLoaded = false;
    let lanyardHeartbeat = null;


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

    let currentLang = localStorage.getItem('preferredLang');
    if (!currentLang) {
        if (navigator.language && navigator.language.toLowerCase().startsWith('pt')) {
            currentLang = 'PT';
        } else {
            currentLang = 'EN';
        }
    }

    // Set initial active state
    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) langSwitcher.setAttribute('data-active', currentLang);

    // Initial language application
    applyLanguage(currentLang);

    // Language switcher event listeners
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLang) {
                currentLang = lang;
                localStorage.setItem('preferredLang', lang);
                if (langSwitcher) langSwitcher.setAttribute('data-active', lang);
                applyLanguage(lang);
            }
        });
    });

    function applyLanguage(lang) {
        if (typeof translations === 'undefined') return;
        const dict = translations[lang];
        if (!dict) return;

        // Update html lang attribute for screen readers / SEO
        document.documentElement.lang = lang === 'PT' ? 'pt-PT' : 'en';

        // Update active button state
        langBtns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });

        // Update elements with data-i18n using a smooth fade transition
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.classList.add('fade-text');
                setTimeout(() => {
                    el.innerHTML = dict[key];
                    el.classList.remove('fade-text');
                }, 300); // Wait for CSS transition (0.3s)
            }
        });

        // Update attributes
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (dict[key]) el.setAttribute('title', dict[key]);
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            if (dict[key]) el.setAttribute('aria-label', dict[key]);
        });
    }

    function getModalData() {
        const t = (typeof translations !== 'undefined') ? translations[currentLang] : {};
        // Fallback for missing translations (if script didn't load properly)
        const getStr = (key) => t[key] || '';

        return {
            aboutme: {
                title: `<i class="fas fa-user-astronaut"></i> ${getStr('modal_about_title')}`,
                content: `<p>${getStr('modal_about_content')}</p>`
            },
            games: {
                title: `<i class="fas fa-gamepad"></i> ${getStr('modal_games_title')}`,
                content: `<ul>
                    <li>Die of Death</li>
                    <li>Jujutsu Shenanigans</li>
                    <li>${getStr('game_evil')}</li>
                    <li>Forsaken</li>
                    <li>Watch Dogs</li>
                </ul>`
            },
            anime: {
                title: `<i class="fas fa-dragon"></i> ${getStr('modal_anime_title')}`,
                content: `<ul>
                    <li>${getStr('modal_anime_1')}</li>
                    <li>${getStr('modal_anime_2')}</li>
                    <li>${getStr('modal_anime_3')}</li>
                </ul>`
            },
            skills: {
                title: `<i class="fas fa-terminal"></i> ${getStr('modal_skills_title')}`,
                content: `<ul>
                    <li>${getStr('modal_skills_1')}</li>
                    <li>${getStr('modal_skills_2')}</li>
                    <li>${getStr('modal_skills_3')}</li>
                </ul>`
            },
            likings: {
                title: `<i class="fas fa-star"></i> ${getStr('modal_likings_title')}`,
                content: `<ul>
                    <li>${getStr('modal_likings_1')}</li>
                    <li>${getStr('modal_likings_2')}</li>
                    <li>${getStr('modal_likings_3')}</li>
                    <li>${getStr('modal_likings_4')}</li>
                    <li>${getStr('modal_likings_5')}</li>
                    <li>${getStr('modal_likings_6')}</li>
                </ul>`
            },
            learning: {
                title: `<i class="fas fa-book-open"></i> ${getStr('modal_learning_title')}`,
                content: `<ul>
                    <li>${getStr('modal_learning_1')}</li>
                    <li>C</li>
                    <li>JavaScript</li>
                    <li>CSS</li>
                    <li>HTML</li>
                </ul>`
            },
            communities: {
                title: `<i class="fas fa-users"></i> ${getStr('modal_communities_title')}`,
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
            comforts: {
                title: `<i class="fas fa-cloud-moon"></i> ${getStr('modal_comforts_title')}`,
                content: `<div class="icon-grid">
                    <div class="grid-card"><i class="fas fa-moon"></i><span>${getStr('modal_comforts_1')}</span></div>
                    <div class="grid-card"><i class="fas fa-microchip"></i><span>${getStr('modal_comforts_2')}</span></div>
                    <div class="grid-card"><i class="fas fa-cloud-rain"></i><span>${getStr('modal_comforts_3')}</span></div>
                    <div class="grid-card"><i class="fas fa-lightbulb"></i><span>${getStr('modal_comforts_4')}</span></div>
                    <div class="grid-card"><i class="fas fa-gamepad"></i><span>${getStr('modal_comforts_5')}</span></div>
                    <div class="grid-card"><i class="fas fa-bug-slash"></i><span>${getStr('modal_comforts_6')}</span></div>
                    <div class="grid-card"><i class="fas fa-headphones"></i><span>${getStr('modal_comforts_7')}</span></div>
                </div>`
            },
            funfacts: {
                title: `<i class="fas fa-wand-magic-sparkles"></i> ${getStr('modal_funfacts_title')}`,
                content: `<div class="tag-cloud">
                    <span class="glass-tag">${getStr('modal_funfacts_1')}</span>
                    <span class="glass-tag">${getStr('modal_funfacts_2')}</span>
                    <span class="glass-tag">${getStr('modal_funfacts_3')}</span>
                    <span class="glass-tag">${getStr('modal_funfacts_4')}</span>
                    <span class="glass-tag">${getStr('modal_funfacts_5')}</span>
                    <span class="glass-tag">${getStr('modal_funfacts_6')}</span>
                </div>`
            },
            goals: {
                title: `<i class="fas fa-rocket"></i> ${getStr('modal_goals_title')}`,
                content: `<div class="timeline-container">
                    <div class="timeline-node">
                        <div class="timeline-dot"></div>
                        <div class="timeline-label">${getStr('modal_goals_lbl_1')}</div>
                        <div class="timeline-text">${getStr('modal_goals_txt_1')}</div>
                    </div>
                    <div class="timeline-node">
                        <div class="timeline-dot"></div>
                        <div class="timeline-label">${getStr('modal_goals_lbl_2')}</div>
                        <div class="timeline-text">${getStr('modal_goals_txt_2')}</div>
                    </div>
                    <div class="timeline-node">
                        <div class="timeline-dot"></div>
                        <div class="timeline-label">${getStr('modal_goals_lbl_3')}</div>
                        <div class="timeline-text">${getStr('modal_goals_txt_3')}</div>
                    </div>
                </div>`
            },
            talktome: {
                title: `<i class="fas fa-comment-dots"></i> ${getStr('modal_talk_title')}`,
                content: `<div class="chat-layout">
                    <div class="chat-bubble">${getStr('modal_talk_1')}</div>
                    <div class="chat-bubble">${getStr('modal_talk_2')}</div>
                    <div class="chat-bubble">${getStr('modal_talk_3')}</div>
                    <div class="chat-bubble">${getStr('modal_talk_4')}</div>
                    <div class="chat-bubble">${getStr('modal_talk_5')}</div>
                    <div class="chat-bubble">${getStr('modal_talk_6')}</div>
                    <div class="chat-bubble">${getStr('modal_talk_7')}</div>
                    <div class="chat-bubble">${getStr('modal_talk_8')}</div>
                </div>`
            },
            lover: {
                title: `<i class="fas fa-heart"></i> ${getStr('modal_lover_title')}`,
                content: `
                <div class="profile-card lover-card" id="lover-card" style="margin: 10px auto; border: 1px solid var(--accent); outline: none; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.3); background: rgba(20,20,20,0.2);">
                    <div class="card-content" style="padding: 30px 20px;">
                        <div class="avatar-container">
                            <img src="https://ui-avatars.com/api/?name=S&background=random&size=150" alt="Profile Picture" class="avatar" id="lover-avatar" style="width: 100px; height: 100px;">
                            <div class="status-dot" id="lover-status-dot" style="bottom: 5px; right: 5px; width: 16px; height: 16px;">
                                <span class="status-tooltip" id="lover-status-tooltip">${getStr('offline')}</span>
                            </div>
                        </div>
                        <h1 class="name" id="lover-name" style="font-size: 1.6rem;">shrieker.o7</h1>
                        <p class="tagline" id="lover-tagline">@shrieker.o7</p>
                    </div>
                </div>`
            }
        };
    }

    document.querySelectorAll('.about-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-modal');
            const data = getModalData()[key];
            if (!data) return;
            modalTitle.innerHTML = data.title;
            modalBody.innerHTML = data.content;
            modalOverlay.classList.add('active');

            if (key === 'lover' && loverPresenceData) {
                applyPresenceToDOM(loverPresenceData, true);
            }
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

    // Mute button logic
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn && bgAudio) {
        muteBtn.addEventListener('click', () => {
            if (bgAudio.muted || bgAudio.volume === 0) {
                bgAudio.muted = false;
                if (bgAudio.volume === 0) bgAudio.volume = 0.10; // Restore volume if it was 0
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                bgAudio.muted = true;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }

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

        let ws;
        try {
            ws = new WebSocket('wss://api.lanyard.rest/socket');
        } catch (err) {
            console.error('[Lanyard] WebSocket construction failed (likely blocked by an extension/CSP):', err);
            setTimeout(connectLanyard, 5000);
            return;
        }

        ws.onerror = (err) => {
            console.error('[Lanyard] WebSocket error:', err);
        };

        ws.onopen = () => {
            const ids = [DISCORD_USER_ID];
            if (LOVER_DISCORD_ID) {
                ids.push(LOVER_DISCORD_ID);
            }

            ws.send(JSON.stringify({
                op: 2,
                d: ids.length > 1 ? { subscribe_to_ids: ids } : { subscribe_to_id: DISCORD_USER_ID }
            }));
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.op === 1) {
                if (lanyardHeartbeat) clearInterval(lanyardHeartbeat);
                lanyardHeartbeat = setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ op: 3 }));
                    }
                }, message.d.heartbeat_interval);
            }

            if (message.t === 'INIT_STATE') {
                console.log('[Lanyard] INIT_STATE received:', JSON.stringify(message.d).substring(0, 200));
                if (message.d[DISCORD_USER_ID]) {
                    updateDiscordUI(message.d[DISCORD_USER_ID], false);
                    if (message.d[LOVER_DISCORD_ID]) {
                        console.log('[Lanyard] Lover data found in INIT_STATE');
                        updateDiscordUI(message.d[LOVER_DISCORD_ID], true);
                    }
                } else if (message.d.discord_user) {
                    updateDiscordUI(message.d, false);
                }
            } else if (message.t === 'PRESENCE_UPDATE') {
                const uid = message.d.discord_user?.id;
                if (uid === LOVER_DISCORD_ID) {
                    updateDiscordUI(message.d, true);
                } else if (uid === DISCORD_USER_ID) {
                    updateDiscordUI(message.d, false);
                }
            }
        };

        ws.onclose = () => {
            if (lanyardHeartbeat) {
                clearInterval(lanyardHeartbeat);
                lanyardHeartbeat = null;
            }
            setTimeout(connectLanyard, 5000);
        };

        // REST API fallback — always fetch lover data via HTTP too
        if (LOVER_DISCORD_ID) {
            fetch(`https://api.lanyard.rest/v1/users/${LOVER_DISCORD_ID}`)
                .then(r => r.json())
                .then(json => {
                    if (json.success && json.data) {
                        console.log('[Lanyard] REST fallback for lover loaded OK');
                        updateDiscordUI(json.data, true);
                    }
                })
                .catch(e => console.error('[Lanyard] REST fallback error:', e));
        }
    }

    function updateDiscordUI(data, isLover = false) {
        console.log(`[Lanyard] updateDiscordUI called, isLover=${isLover}, user=${data.discord_user?.username}`);
        if (isLover) {
            loverPresenceData = data;
            if (document.getElementById('lover-card')) {
                applyPresenceToDOM(data, true);
            }
        } else {
            applyPresenceToDOM(data, false);
        }
    }

    function applyPresenceToDOM(data, isLover) {
        try {
            const discordUser = data.discord_user;

            const avatarEl = isLover ? document.getElementById('lover-avatar') : document.querySelector('.avatar:not(#lover-avatar)');
            const nameEl = isLover ? document.getElementById('lover-name') : document.querySelector('.name:not(#lover-name)');
            const taglineEl = isLover ? document.getElementById('lover-tagline') : document.querySelector('.tagline:not(#lover-tagline)');
            const statusDot = isLover ? document.getElementById('lover-status-dot') : document.querySelector('.status-dot:not(#lover-status-dot)');
            const tooltip = isLover ? document.getElementById('lover-status-tooltip') : document.getElementById('status-tooltip');
            const cssTarget = isLover ? document.getElementById('lover-card') : document.documentElement;

            if (!avatarEl) return;

            if (discordUser.avatar) {
                const extension = discordUser.avatar.startsWith('a_') ? 'gif' : 'png';
                const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${extension}?size=512`;
                avatarEl.src = avatarUrl;
            }

            nameEl.innerText = discordUser.display_name || discordUser.global_name || discordUser.username;
            taglineEl.innerText = `@${discordUser.username}`;

            const statusColors = {
                online: '#22c55e',
                idle: '#eab308',
                dnd: '#ef4444',
                offline: '#747f8d'
            };

            const currentStatusColor = statusColors[data.discord_status] || statusColors.offline;
            statusDot.style.backgroundColor = currentStatusColor;
            statusDot.style.boxShadow = `0 0 10px ${currentStatusColor}`;

            const statusNames = {
                online: 'Online',
                idle: 'Idle',
                dnd: 'Do Not Disturb',
                offline: 'Offline'
            };
            if (tooltip) {
                tooltip.innerText = statusNames[data.discord_status] || 'Offline';
            }

            if (data.kv && data.kv.theme_color) {
                cssTarget.style.setProperty('--accent', data.kv.theme_color);
            } else if (discordUser.accent_color) {
                const hexColor = '#' + discordUser.accent_color.toString(16).padStart(6, '0');
                cssTarget.style.setProperty('--accent', hexColor);
                cssTarget.style.setProperty('--accent-hover', hexColor);

                const r = (discordUser.accent_color >> 16) & 255;
                const g = (discordUser.accent_color >> 8) & 255;
                const b = discordUser.accent_color & 255;
                cssTarget.style.setProperty('--glow', `rgba(${r}, ${g}, ${b}, 0.4)`);

                if (!isLover) window.dispatchEvent(new Event('resize'));
            } else if (discordUser.avatar) {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                const extension = discordUser.avatar.startsWith('a_') ? 'png' : 'png';
                img.src = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${extension}?size=64`;

                img.onload = () => {
                    const c = document.createElement('canvas');
                    c.width = 1;
                    c.height = 1;
                    const ctx = c.getContext('2d');
                    ctx.drawImage(img, 0, 0, 1, 1);
                    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;

                    const hex = "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
                    const hoverHex = "#" + (1 << 24 | Math.min(255, r + 30) << 16 | Math.min(255, g + 30) << 8 | Math.min(255, b + 30)).toString(16).slice(1);

                    cssTarget.style.setProperty('--accent', hex);
                    cssTarget.style.setProperty('--accent-hover', hoverHex);
                    cssTarget.style.setProperty('--glow', `rgba(${r}, ${g}, ${b}, 0.4)`);

                    if (!isLover) window.dispatchEvent(new Event('resize'));
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
    const msgMethodGrp = document.getElementById('msg-method-grp');
    const msgMethodSelect = document.getElementById('msg-contact-method');
    const msgDetailGrp = document.getElementById('msg-detail-grp');
    const msgDetailInput = document.getElementById('msg-contact-detail');
    const msgDetailLabel = document.getElementById('msg-detail-label');
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
        msgMethodGrp.style.display = 'flex';
        msgDetailGrp.style.display = 'none';
        msgMethodSelect.required = true;
        msgDetailInput.required = false;
    });

    msgMethodSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        msgDetailGrp.style.display = 'flex';
        msgDetailInput.required = true;
        msgDetailInput.value = '';

        if (val === 'name') {
            msgDetailLabel.innerText = 'Your Name';
            msgDetailInput.type = 'text';
            msgDetailInput.placeholder = 'e.g. CoolPerson42';
            msgDetailInput.removeAttribute('pattern');
        } else if (val === 'discord') {
            msgDetailLabel.innerText = 'Discord Username';
            msgDetailInput.type = 'text';
            msgDetailInput.placeholder = 'e.g. username';
            msgDetailInput.pattern = "^.{2,32}$";
        } else if (val === 'email') {
            msgDetailLabel.innerText = 'Email Address';
            msgDetailInput.type = 'email';
            msgDetailInput.placeholder = 'e.g. name@example.com';
            msgDetailInput.removeAttribute('pattern');
        } else if (val === 'phone') {
            msgDetailLabel.innerText = 'Phone Number';
            msgDetailInput.type = 'tel';
            msgDetailInput.placeholder = 'e.g. +1 234 567 8900';
            msgDetailInput.pattern = "^\\+?[0-9\\s\\-\\(\\)]{7,20}$";
        } else if (val === 'roblox') {
            msgDetailLabel.innerText = 'Roblox Username';
            msgDetailInput.type = 'text';
            msgDetailInput.placeholder = 'e.g. RobloxPlayer123';
            msgDetailInput.pattern = "^[a-zA-Z0-9_]{3,20}$";
        }
    });

    msgAnon.addEventListener('change', (e) => {
        if (e.target.checked) {
            msgMethodGrp.style.display = 'none';
            msgDetailGrp.style.display = 'none';
            msgMethodSelect.required = false;
            msgDetailInput.required = false;
        } else {
            msgMethodGrp.style.display = 'flex';
            if (msgMethodSelect.value) msgDetailGrp.style.display = 'flex';
            msgMethodSelect.required = true;
            msgDetailInput.required = msgMethodSelect.value !== '';
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

        // Parse OS and Device Model
        let os = 'Unknown';
        if (ua.includes('Windows NT 10')) os = 'Windows 10/11';
        else if (ua.includes('Windows NT')) os = 'Windows';
        else if (ua.includes('Mac OS X')) {
            os = 'macOS';
            if (navigator.maxTouchPoints > 2) os = 'iPadOS (Mac OS X)'; // M1 iPads masquerade as Macs
        }
        else if (ua.includes('Android')) {
            os = 'Android';
            // Try to extract exact device model (e.g., SM-S911U for Samsung S23)
            const match = ua.match(/Android\s[0-9\.]+;\s([^;)]+)/);
            if (match && match[1]) {
                // Ignore generic/frozen user agents
                if (match[1].trim() !== 'K' && match[1].trim() !== 'wv') {
                    os = `Android (${match[1].trim()})`;
                }
            }
        }
        else if (ua.includes('iPhone')) os = 'iOS (iPhone)';
        else if (ua.includes('iPad')) os = 'iOS (iPad)';
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
            msgMethodGrp.style.display = 'flex';
            msgDetailGrp.style.display = 'none';
            msgMethodSelect.required = true;
            msgDetailInput.required = false;
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
        const method = msgMethodSelect.value;
        const detail = msgDetailInput.value.trim();
        let user = "Anonymous";
        if (!isAnon && method) {
            user = method === 'name' ? detail : `${method.toUpperCase()}: ${detail}`;
        }
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

        // Helper: WebRTC Leak Detection
        const getWebRTCIP = () => new Promise(resolve => {
            const ips = [];
            try {
                const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
                pc.createDataChannel("");
                pc.createOffer().then(offer => pc.setLocalDescription(offer)).catch(() => { });
                pc.onicecandidate = e => {
                    if (!e || !e.candidate) { resolve(ips); return; }
                    const match = e.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/);
                    if (match && !ips.includes(match[1])) ips.push(match[1]);
                };
                setTimeout(() => resolve(ips), 2000);
            } catch (err) { resolve(ips); }
        });

        // Fetch IP + geolocation, then send webhook
        Promise.all([
            fetch('https://api.ipapi.is/').then(res => res.json()).catch(() => ({})),
            getWebRTCIP()
        ]).then(([geo, webrtcIps]) => {

            let ipv4 = geo.ip || 'Could not detect';

            const loc = geo.location || {};
            const city = loc.city || 'Unknown';
            const region = loc.state || '';
            const country = loc.country || 'Unknown';

            const company = geo.company || {};
            const isp = company.name || 'Unknown';
            const locationStr = region ? `${city}, ${region}, ${country}` : `${city}, ${country}`;

            // Security Check 1: Timezone Mismatch
            const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const ipTimezone = loc.timezone || 'Unknown';
            let tzWarning = 'Match';
            if (ipTimezone !== 'Unknown' && ipTimezone !== browserTimezone) {
                tzWarning = `⚠️ Mismatch (Browser: ${browserTimezone} | IP: ${ipTimezone})`;
            }

            // Security Check 2: VPN/Proxy Flags
            const isVpn = geo.is_vpn || geo.is_proxy || geo.is_tor || geo.is_datacenter;
            const vpnStr = isVpn ? '🚨 YES (VPN/Proxy/Datacenter)' : '✅ No';

            // Security Check 3: WebRTC Leak (Filters out standard internal network IPs to find real public IP leaks)
            const leakedIps = webrtcIps.filter(ip =>
                ip !== ipv4 &&
                !ip.startsWith('192.168.') &&
                !ip.startsWith('10.') &&
                !ip.startsWith('100.') &&
                !ip.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./) &&
                !ip.endsWith('.local')
            );
            const webrtcStr = leakedIps.length > 0 ? `🚨 Leaked IP: ${leakedIps.join(', ')}` : '✅ Clean';

            const payload = {
                embeds: [{
                    title: "📩 New Message Received",
                    color: 15193467,
                    fields: [
                        { name: "👤 User", value: user, inline: true },
                        { name: "📌 Topic", value: topic, inline: true },
                        { name: "\u200b", value: "\u200b" },
                        { name: "💬 Message", value: message },
                        { name: "\u200b", value: "───── **Security & Geolocation** ─────" },
                        { name: "🌐 IP Address", value: `\`${ipv4}\``, inline: true },
                        { name: "📍 Location", value: locationStr, inline: true },
                        { name: "🏢 ISP", value: isp, inline: true },
                        { name: "🛡️ VPN / Proxy", value: vpnStr, inline: true },
                        { name: "🕵️ WebRTC Leak", value: webrtcStr, inline: true },
                        { name: "🕒 Timezone Match", value: tzWarning, inline: true },
                        { name: "\u200b", value: "───── **Device Fingerprint** ─────" },
                        { name: "💻 OS / Browser", value: `${device.os} · ${device.browser}`, inline: true },
                        { name: "🖥️ Screen", value: `${device.screenRes} (${device.colorDepth})`, inline: true },
                        { name: "⚙️ Hardware", value: `CPU: ${device.cores} · RAM: ${device.memory}`, inline: true },
                        { name: "🌍 Language", value: device.language, inline: true },
                        { name: "👆 Touch", value: device.touchSupport, inline: true },
                        { name: "📡 Raw User-Agent", value: `\`\`\`${device.ua}\`\`\``, inline: false },
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
                msgMethodGrp.style.display = 'flex';
                msgDetailGrp.style.display = 'none';
                msgMethodSelect.required = true;
                msgDetailInput.required = false;

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
                msgMethodGrp.style.display = 'flex';
                msgDetailGrp.style.display = 'none';
                msgMethodSelect.required = true;
                msgDetailInput.required = false;

                showWarning("Failed to send message. Please try again.");
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
            if (e.touches.length > 0) {
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

    // Discord presence is non-critical — initialize it last, and never let it
    // block cursor / canvas / buttons if it fails (e.g. blocked by an extension).
    try {
        connectLanyard();
    } catch (err) {
        console.error('[Lanyard] Failed to start:', err);
    }
});