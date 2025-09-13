// Global variables for DOM elements
let lightBtn, doorBtn, windowBtn;
let light, door, windowElement;
let lightStatusText, doorStatusText, windowStatusText;
let baldMan, manSmile, manArms;

// Trạng thái ban đầu
let lightOn = false;
let doorOpen = false;
let windowOpen = false;

// Âm thanh cho các hiệu ứng
const playSound = (soundType) => {
    // Tạo âm thanh đơn giản bằng Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(soundType) {
        case 'light':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            break;
        case 'door':
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
            break;
        case 'window':
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.2);
            break;
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
};

// Hàm bật/tắt đèn
const toggleLight = () => {
    lightOn = !lightOn;
    
    if (lightOn) {
        light.classList.add('on');
        lightStatusText.textContent = '💡 Light is ON – now you can see your own misery.';
        lightStatusText.classList.add('active');
        lightBtn.classList.add('active');
        lightBtn.querySelector('.btn-text').textContent = 'LIGHT OFF';
        playSound('light');
        
        // Character reactions
        if (manSmile) manSmile.classList.add('glow');
        if (baldMan) baldMan.classList.add('glow');
        
        // Thêm hiệu ứng ánh sáng cho toàn bộ villa
        document.querySelector('.troc-villa').classList.add('lit');
        
        // Loại bỏ hiệu ứng tối
        document.body.classList.remove('dark');
        document.querySelector('.container').classList.remove('dark');
        document.querySelector('.control-panel').classList.remove('dark');
        document.querySelector('.door').classList.remove('dark');
        document.querySelector('.window').classList.remove('dark');
    } else {
        light.classList.remove('on');
        lightStatusText.textContent = '💡 Light is OFF – embrace the darkness, my friend.';
        lightStatusText.classList.remove('active');
        lightBtn.classList.remove('active');
        lightBtn.querySelector('.btn-text').textContent = 'LIGHT ON';
        
        // Character reactions
        if (manSmile) manSmile.classList.remove('glow');
        if (baldMan) baldMan.classList.remove('glow');
        
        // Loại bỏ hiệu ứng ánh sáng
        document.querySelector('.troc-villa').classList.remove('lit');
        
        // Thêm hiệu ứng tối
        document.body.classList.add('dark');
        document.querySelector('.container').classList.add('dark');
        document.querySelector('.control-panel').classList.add('dark');
        document.querySelector('.door').classList.add('dark');
        document.querySelector('.window').classList.add('dark');
    }
};

// Hàm mở/đóng cửa
const toggleDoor = () => {
    doorOpen = !doorOpen;
    
    if (doorOpen) {
        door.classList.add('open');
        doorStatusText.textContent = '🚪 Door is OPEN – don\'t get too excited, it\'s still your house.';
        doorStatusText.classList.add('active');
        doorBtn.classList.add('active');
        doorBtn.querySelector('.btn-text').textContent = 'DOOR CLOSE';
        playSound('door');
        
        // Character reactions
        if (manArms) manArms.classList.remove('crossed');
        
        // Thêm hiệu ứng gió khi cửa mở
        setTimeout(() => {
            if (doorOpen) {
                document.querySelector('.troc-villa').style.background = 'linear-gradient(180deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%), linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)';
            }
        }, 250);
    } else {
        door.classList.remove('open');
        doorStatusText.textContent = '🚪 Door is CLOSED – privacy level: 100%.';
        doorStatusText.classList.remove('active');
        doorBtn.classList.remove('active');
        doorBtn.querySelector('.btn-text').textContent = 'DOOR OPEN';
        
        // Character reactions
        if (manArms) manArms.classList.add('crossed');
        
        // Loại bỏ hiệu ứng gió
        document.querySelector('.troc-villa').style.background = 'linear-gradient(180deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%)';
    }
};

// Hàm mở/đóng cửa sổ
const toggleWindow = () => {
    windowOpen = !windowOpen;
    
    if (windowOpen) {
        windowElement.classList.add('open');
        windowStatusText.textContent = '🪟 Window is OPEN – fresh air won\'t solve your problems.';
        windowStatusText.classList.add('active');
        windowBtn.classList.add('active');
        windowBtn.querySelector('.btn-text').textContent = 'WINDOW CLOSE';
        playSound('window');
        
        // Thêm hiệu ứng gió nhẹ cho cửa sổ
        setTimeout(() => {
            if (windowOpen) {
                windowElement.style.transform = 'scale(1.02)';
                windowElement.style.transition = 'transform 0.3s ease';
            }
        }, 100);
    } else {
        windowElement.classList.remove('open');
        windowStatusText.textContent = '🪟 Window is CLOSED – the outside world can wait.';
        windowStatusText.classList.remove('active');
        windowBtn.classList.remove('active');
        windowBtn.querySelector('.btn-text').textContent = 'WINDOW OPEN';
        
        // Loại bỏ hiệu ứng gió
        windowElement.style.transform = 'scale(1)';
    }
};

// Thêm hiệu ứng hover cho các nút
const addHoverEffects = () => {
    const buttons = [lightBtn, doorBtn, windowBtn];
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            if (!btn.classList.contains('active')) {
                btn.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
};

// Thêm hiệu ứng click cho các nút
const addClickEffects = () => {
    const buttons = [lightBtn, doorBtn, windowBtn];
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.transform = 'translateY(1px) scale(0.95)';
            setTimeout(() => {
                btn.style.transform = btn.classList.contains('active') ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)';
            }, 150);
        });
    });
};

// Thêm hiệu ứng ánh sáng động cho đèn
const addLightAnimation = () => {
    if (lightOn) {
        const lightBulb = document.querySelector('.light-bulb');
        const randomDelay = Math.random() * 2000 + 1000; // 1-3 giây
        
        setTimeout(() => {
            if (lightOn) {
                lightBulb.style.animation = 'none';
                setTimeout(() => {
                    if (lightOn) {
                        lightBulb.style.animation = 'flicker 2s infinite';
                    }
                }, 50);
                addLightAnimation(); // Lặp lại
            }
        }, randomDelay);
    }
};

// Khởi tạo ứng dụng
const initApp = () => {
    // Lấy các phần tử DOM
    lightBtn = document.getElementById('lightBtn');
    doorBtn = document.getElementById('doorBtn');
    windowBtn = document.getElementById('windowBtn');

    light = document.getElementById('light');
    door = document.getElementById('door');
    windowElement = document.getElementById('window');

    lightStatusText = document.getElementById('lightStatusText');
    doorStatusText = document.getElementById('doorStatusText');
    windowStatusText = document.getElementById('windowStatusText');
    
    baldMan = document.getElementById('baldMan');
    manSmile = document.getElementById('manSmile');
    manArms = document.getElementById('manArms');
    
    // Check if elements exist
    if (!lightBtn || !doorBtn || !windowBtn) {
        console.error('Some buttons not found!');
        return;
    }
    
    // Thêm event listeners
    lightBtn.addEventListener('click', () => {
        toggleLight();
        if (lightOn) {
            addLightAnimation();
        }
    });
    
    doorBtn.addEventListener('click', toggleDoor);
    windowBtn.addEventListener('click', toggleWindow);
    
    // Thêm hiệu ứng
    addHoverEffects();
    addClickEffects();
    
    // Thêm hiệu ứng khởi động
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '0';
        document.querySelector('.container').style.transform = 'translateY(50px)';
        document.querySelector('.container').style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            document.querySelector('.container').style.opacity = '1';
            document.querySelector('.container').style.transform = 'translateY(0)';
        }, 100);
    }, 100);
    
    console.log('🏠 House Control App Ready!');
};

// Chạy ứng dụng khi trang được tải
document.addEventListener('DOMContentLoaded', initApp);

// Thêm keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'l':
        case 'L':
            toggleLight();
            if (lightOn) addLightAnimation();
            break;
        case 'd':
        case 'D':
            toggleDoor();
            break;
        case 'w':
        case 'W':
            toggleWindow();
            break;
        case ' ':
            e.preventDefault();
            // Toggle tất cả
            toggleLight();
            toggleDoor();
            toggleWindow();
            if (lightOn) addLightAnimation();
            break;
    }
});

// Thêm thông báo hướng dẫn
setTimeout(() => {
    console.log('💡 Hướng dẫn sử dụng:');
    console.log('   - Nhấn L: Bật/tắt đèn');
    console.log('   - Nhấn D: Mở/đóng cửa');
    console.log('   - Nhấn W: Mở/đóng cửa sổ');
    console.log('   - Nhấn Space: Toggle tất cả');
}, 2000);
