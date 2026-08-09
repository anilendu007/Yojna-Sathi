// =========================================================================
// ====== SYSTEM 1: AI CHAT PANEL TOGGLE CONTROLLER ========================
// =========================================================================

const openAiChatBtn = document.getElementById('ai-toggle-btn');
const closeAiChatBtn = document.getElementById('close-chat-btn');
const aiChatPopup = document.querySelector('.ai-chat-window');
const aiUserInput = document.getElementById('ai-query-input');

if (openAiChatBtn && aiChatPopup) {
    openAiChatBtn.addEventListener('click', () => {
        aiChatPopup.classList.remove('hidden');
        if (aiUserInput) aiUserInput.focus();
    });
}

if (closeAiChatBtn && aiChatPopup) {
    closeAiChatBtn.addEventListener('click', () => {
        aiChatPopup.classList.add('hidden');
    });
}


// =========================================================================
// ====== SYSTEM 2: MICROPHONE VOICE TRACKER & AUTOMATION SEARCH ===========
// =========================================================================

const voiceBtn = document.getElementById('voice-btn');
const cityInput = document.getElementById('city-input');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const speechEngine = new SpeechRecognition();
    speechEngine.lang = 'en-IN';
    speechEngine.interimResults = false;

    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            try {
                speechEngine.start();
                voiceBtn.innerHTML = '<i>🛑</i>';
                voiceBtn.style.color = "#ff4757";
            } catch (error) {
                console.log("Audio capture block log: ", error.message);
            }
        });
    }

    speechEngine.addEventListener('result', (voiceEvent) => {
        const spokenInput = voiceEvent.results[0][0].transcript;
        const cleanText = spokenInput.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        
        if (cityInput) {
            cityInput.value = cleanText;
            // Instantly execute background search optimization pipelines
            processLocationSearch(cleanText);
        }
    });

    speechEngine.addEventListener('end', () => {
        if (voiceBtn) {
            voiceBtn.innerHTML = '<i>🎙️</i>';
            voiceBtn.style.color = "white";
        }
    });

    speechEngine.addEventListener('error', (faultLog) => {
        console.error("Speech Diagnostics Exception: ", faultLog);
        if (voiceBtn) {
            voiceBtn.innerHTML = '<i>🎙️</i>';
            voiceBtn.style.color = "white";
        }
    });
} else {
    if (voiceBtn) voiceBtn.style.display = 'none';
}


// =========================================================================
// ====== SYSTEM 3: SEARCH SELECTION & DYNAMIC LAYOUT SWAPPER =============
// =========================================================================

// 1. Grab presentation interface indicators from your exact HTML snippet
const searchBtn = document.getElementById('search-btn');
const bgStatusText = document.getElementById('bg-status-text');
const cityNameDisplay = document.getElementById('city-name');
const weatherDescDisplay = document.getElementById('weather-desc');
const tempNumberDisplay = document.getElementById('temperature');

// 2. Grab your specific Emergency Alert elements using your exact HTML IDs
const alarmBannerElement = document.getElementById('alarm-banner');
const alertMessageElement = document.getElementById('alert-message');
const alarmAudioTrack = document.getElementById('alarm-audio');
const stopAlarmButton = document.getElementById('stop-alarm-btn');

const atmosphericWallpapers = {
    clear: "https://unsplash.com",
    clouds: "https://unsplash.com",
    rain: "https://unsplash.com",
    thunderstorm: "https://unsplash.com",
    drought: "https://unsplash.com"
};

// 3. Core Alert Launcher Function
function triggerSevereAlert(warningText) {
    if (alarmBannerElement && alertMessageElement && alarmAudioTrack) {
        alertMessageElement.innerText = warningText;
        alarmBannerElement.classList.remove('hidden'); // Force layout card visible
        
        // Play the watch audio buzzer sound effect loop cleanly
        alarmAudioTrack.play().catch((err) => {
            console.log("Audio waiting for explicit user click gesture approval: ", err.message);
        });
    }
}

// 4. Central Search and Swapper Logic Function
function processLocationSearch(targetCity) {
    const cleanCity = targetCity.trim().toLowerCase();
    if (!cleanCity) return;

    if (cityNameDisplay) {
        cityNameDisplay.innerText = targetCity.toUpperCase();
    }
    
    // Clear and reset previous active alarms by default upon a new query request
    if (alarmBannerElement) alarmBannerElement.classList.add('hidden');
    if (alarmAudioTrack) {
        alarmAudioTrack.pause();
        alarmAudioTrack.currentTime = 0;
    }

    // Conditional evaluation tracking specific manual keywords
    if (cleanCity === "delhi" || cleanCity === "new delhi") {
        if (tempNumberDisplay) tempNumberDisplay.innerText = "32";
        if (weatherDescDisplay) weatherDescDisplay.innerText = "Heavy Monsoon Rain Downpour";
        if (bgStatusText) {
            bgStatusText.innerText = "RAIN";
            bgStatusText.style.color = "rgba(255, 255, 255, 0.05)";
        }
        document.body.style.background = "linear-gradient(135deg, #2c3e50, #3498db)";
        
        // Trigger the synchronized flood alarm panel
        triggerSevereAlert("FLASH FLOOD WARNING: Active urban drainage basin flooding detected in surrounding zones. Avoid travel.");
    } 
    else if (cleanCity === "mumbai") {
        if (tempNumberDisplay) tempNumberDisplay.innerText = "29";
        if (weatherDescDisplay) weatherDescDisplay.innerText = "Severe Electrical Thunderstorm Activity";
        if (bgStatusText) {
            bgStatusText.innerText = "STORM";
            bgStatusText.style.color = "rgba(168, 85, 247, 0.05)";
        }
        document.body.style.background = "linear-gradient(135deg, #111726, #3b0764)";
        
        // Trigger the synchronized storm alarm panel
        triggerSevereAlert("THUNDERSTORM ALARM: High electrical cloud discharge grid detected. Disconnect electronic grids.");
    } 
    else if (cleanCity === "rajasthan" || cleanCity === "chennai") {
        if (tempNumberDisplay) tempNumberDisplay.innerText = "41";
        if (weatherDescDisplay) weatherDescDisplay.innerText = "Scorching Sunlight & Bright Clear Skies";
        if (bgStatusText) {
            bgStatusText.innerText = "SUNNY";
            bgStatusText.style.color = "rgba(15, 23, 42, 0.04)";
        }
        document.body.style.background = "linear-gradient(135deg, #38bdf8 30%, #fef08a 100%)";
        
        // Trigger the synchronized drought alarm panel
        triggerSevereAlert("DROUGHT WATCH: Extreme heat indexing. Critical local reservoir depletion thresholds active.");
    } 
    else {
        if (tempNumberDisplay) tempNumberDisplay.innerText = "26";
        if (weatherDescDisplay) weatherDescDisplay.innerText = "Scattered Clouds and Clear Intermissions";
        if (bgStatusText) {
            bgStatusText.innerText = "CLOUDS";
            bgStatusText.style.color = "rgba(255, 255, 255, 0.03)";
        }
        document.body.style.background = "linear-gradient(135deg, #1e293b, #0f172a)";
    }
}

// 5. Register manual sound mute listener logic block
if (stopAlarmButton && alarmAudioTrack && alarmBannerElement) {
    stopAlarmButton.addEventListener('click', () => {
        alarmAudioTrack.pause();
        alarmAudioTrack.currentTime = 0;
        alarmBannerElement.classList.add('hidden'); // Tuck the red box back away safely
    });
}

// 6. Action Listeners for Search Button and Enter Key Inputs
if (searchBtn && cityInput) {
    searchBtn.addEventListener('click', () => {
        processLocationSearch(cityInput.value);
    });

    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            processLocationSearch(cityInput.value);
        }
    });
}
// =========================================================================
// ====== SYSTEM 3: UPDATED LIGHT EFFECTS & WEATHER STYLE SYSTEM ===========
// =========================================================================

// =========================================================================
// ====== SYSTEM 5: FIXED PERSISTENT BOOT LOADING ENGINE ===================
// =========================================================================

function processLocationSearch(targetCity) {
    // MAKE SURE THIS SAVE LINE IS RIGHT HERE:
    localStorage.setItem('cachedWeatherCity', targetCity);
}


function processLocationSearch(targetCity) {
    localStorage.setItem('cachedWeatherCity', targetCity);
    const cleanCity = targetCity.trim().toLowerCase();
    if (!cleanCity) return;

    cityNameDisplay.innerText = targetCity.toUpperCase();
    
    // Clear hazard alert cards by default
    const alarmBanner = document.getElementById('alarm-banner');
    if (alarmBanner) alarmBanner.classList.add('hidden');

    // Remove any previous background styling overlays completely
    document.body.style.backgroundImage = 'none';

    if (cleanCity === "delhi" || cleanCity === "new delhi") {
        tempNumberDisplay.innerText = "32";
        weatherDescDisplay.innerText = "Heavy Monsoon Rain Downpour";
        bgStatusText.innerText = "RAIN";
        
        // CSS Style Shift: Deep stormy dark gray tones with clear rain overlay image
        document.body.style.background = "linear-gradient(135deg, #2c3e50, #3498db)";
        bgStatusText.style.color = "rgba(255, 255, 255, 0.05)";
    } 
    else if (cleanCity === "mumbai") {
        tempNumberDisplay.innerText = "29";
        weatherDescDisplay.innerText = "Severe Electrical Thunderstorm Activity";
        bgStatusText.innerText = "STORM";
        
        // CSS Style Shift: Electric dark violet sky colors
        document.body.style.background = "linear-gradient(135deg, #111726, #3b0764)";
        bgStatusText.style.color = "rgba(168, 85, 247, 0.05)";
    } 
    else if (cleanCity === "rajasthan" || cleanCity === "chennai") {
        tempNumberDisplay.innerText = "41";
        weatherDescDisplay.innerText = "Scorching Sunlight & Bright Clear Skies";
        bgStatusText.innerText = "SUNNY";
        
        // CSS Style Shift: Beautiful light sky blue melting into warm sun yellow!
        document.body.style.background = "linear-gradient(135deg, #38bdf8 30%, #fef08a 100%)";
        
        // Adjust the large background text color so it remains visible against light yellow
        bgStatusText.style.color = "rgba(15, 23, 42, 0.04)"; 
    } 
    else {
        tempNumberDisplay.innerText = "26";
        weatherDescDisplay.innerText = "Scattered Clouds and Clear Intermissions";
        bgStatusText.innerText = "CLOUDS";
        
        // CSS Style Shift: Standard neutral modern dark slate tone canvas
        document.body.style.background = "linear-gradient(135deg, #1e293b, #0f172a)";
        bgStatusText.style.color = "rgba(255, 255, 255, 0.03)";
    }
}

// 3. Core Alert Launcher Function (Upgraded to bypass browser autoplay blocks)
function triggerSevereAlert(warningText) {
    if (alarmBannerElement && alertMessageElement && alarmAudioTrack) {
        alertMessageElement.innerText = warningText;
        alarmBannerElement.classList.remove('hidden'); // Force layout card visible
        
        // --- PRO AUDIO UNLOCK TRICK ---
        // We tell the audio engine to explicitly load the file stream right before playing
        alarmAudioTrack.load(); 
        
        // Play the watch audio buzzer sound effect loop cleanly
        const playPromise = alarmAudioTrack.play();
        
        if (playPromise !== undefined) {
            playPromise.catch((err) => {
                console.log("Browser autoplay policy blocked initial start. Clicking anywhere on the screen will unlock it: ", err.message);
                
                // Fallback: If blocked, wait for the user to make one quick click on the app to instantly play the sound
                document.body.addEventListener('click', () => {
                    alarmAudioTrack.play();
                }, { once: true }); // 'once: true' means this helper listener auto-deletes itself immediately after clicking
            });
        }
    }
}

// 4. Central Search and Swapper Logic Function (Upgraded with String Trimming)
function processLocationSearch(targetCity) {
    // SECURITY UPGRADE: Convert text parameters completely to lowercase and slice off hidden spaces
    const cleanCity = targetCity.replace(/\s+/g, ' ').trim().toLowerCase();
    if (!cleanCity) return;

    if (cityNameDisplay) {
        cityNameDisplay.innerText = targetCity.toUpperCase();
    }
    
    // Clear and reset previous active alarms by default upon a new query request
    if (alarmBannerElement) alarmBannerElement.classList.add('hidden');
    if (alarmAudioTrack) {
        alarmAudioTrack.pause();
        alarmAudioTrack.currentTime = 0;
    }

    // Dynamic Keyword Conditional Evaluation
    if (cleanCity === "delhi" || cleanCity === "new delhi") {
        if (tempNumberDisplay) tempNumberDisplay.innerText = "32";
        if (weatherDescDisplay) weatherDescDisplay.innerText = "Heavy Monsoon Rain Downpour";
        if (bgStatusText) {
            bgStatusText.innerText = "RAIN";
            bgStatusText.style.color = "rgba(255, 255, 255, 0.05)";
        }
        document.body.style.background = "linear-gradient(135deg, #2c3e50, #3498db)";
        
        // Trigger the synchronized flood alarm panel
        triggerSevereAlert("FLASH FLOOD WARNING: Active urban drainage basin flooding detected in surrounding zones. Avoid travel.");
    } 
    else if (cleanCity === "mumbai") {
        if (tempNumberDisplay) tempNumberDisplay.innerText = "29";
        if (weatherDescDisplay) weatherDescDisplay.innerText = "Severe Electrical Thunderstorm Activity";
        if (bgStatusText) {
            bgStatusText.innerText = "STORM";
            bgStatusText.style.color = "rgba(168, 85, 247, 0.05)";
        }
        document.body.style.background = "linear-gradient(135deg, #111726, #3b0764)";
        
        triggerSevereAlert("THUNDERSTORM ALARM: High electrical cloud discharge grid detected. Disconnect electronic grids.");
    } 
    else if (cleanCity === "rajasthan" || cleanCity === "chennai") {
        if (tempNumberDisplay) tempNumberDisplay.innerText = "41";
        if (weatherDescDisplay) weatherDescDisplay.innerText = "Scorching Sunlight & Bright Clear Skies";
        if (bgStatusText) {
            bgStatusText.innerText = "SUNNY";
            bgStatusText.style.color = "rgba(15, 23, 42, 0.04)";
        }
        document.body.style.background = "linear-gradient(135deg, #38bdf8 30%, #fef08a 100%)";
        
        triggerSevereAlert("DROUGHT WATCH: Extreme heat indexing. Critical local reservoir depletion thresholds active.");
    } 
    else {
        // Universal fallback presentation parameters if no keyword hits match
        if (tempNumberDisplay) tempNumberDisplay.innerText = "26";
        if (weatherDescDisplay) weatherDescDisplay.innerText = "Scattered Clouds and Clear Intermissions";
        if (bgStatusText) {
            bgStatusText.innerText = "CLOUDS";
            bgStatusText.style.color = "rgba(255, 255, 255, 0.03)";
        }
        document.body.style.background = "linear-gradient(135deg, #1e293b, #0f172a)";
    }
}

// =========================================================================
// ====== SYSTEM 5: BOOT INITIALIZATION & LOCAL STORAGE CACHE ENGINE ======
// =========================================================================

// This block runs automatically the exact millisecond the web page finishes loading
window.addEventListener('DOMContentLoaded', () => {
    // Attempt to pull the cached string item from the browser's hard drive memory
    const userSavedCity = localStorage.getItem('cachedWeatherCity');

    if (userSavedCity) {
        // If a past search exists, automatically run the dashboard query for it
        processLocationSearch(userSavedCity);
        
        // Populate the input field text box so it matches the active view
        if (cityInput) {
            cityInput.value = userSavedCity;
        }
    } else {
        // Fallback default city layout if the user is opening the app for the very first time
        processLocationSearch("New Delhi");
    }
});

const ecoTipDisplay = document.getElementById('eco-tip');

const environmentalWisdomArray = [
    "Rainwater harvesting configurations during active monsoons can secure domestic irrigation demands for months.",
    "Minimize municipal water footprint thresholds during droughts by systematically repurposing domestic graywater.",
    "Disconnect primary electrical circuitry loops ahead of heavy thunderstorms to mitigate critical utility power surges.",
    "Maintain clear urban drainage flow metrics around household boundaries to suppress sudden flash flood risks."
];

function displayRandomEcoTip() {
    if (ecoTipDisplay) {
        const randomItemIndex = Math.floor(Math.random() * environmentalWisdomArray.length);
        ecoTipDisplay.innerText = environmentalWisdomArray[randomItemIndex];
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // 🧠 Load the random Eco Tip of the day on page boot execution
    displayRandomEcoTip();

    // 🧠 Check LocalStorage cache memory to remember the user's last preference
    const userSavedCity = localStorage.getItem('cachedWeatherCity');

    if (userSavedCity) {
        processLocationSearch(userSavedCity);
        if (cityInput) {
            cityInput.value = userSavedCity.toUpperCase();
        }
    } else {
        // Fallback default city layout configuration if opening the app for the first time
        processLocationSearch("New Delhi");
    }
});

