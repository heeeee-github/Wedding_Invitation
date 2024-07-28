// 페이지가 로드될 때 음악의 볼륨 설정 + 자동재생 활성화
window.addEventListener('load', function() {
    var audio = document.getElementById('background-music');
    audio.volume = 0.3; // 볼륨 설정( 0 ~ 1 )
    audio.play(); // 음악을 재생
});

// Calendar
function generateCalendar() {
    const weddingDate = new Date(2024, 9, 27); // 10월은 9
    const startDate = new Date(2024, 9, 1);
    const endDate = new Date(2024, 9, 31);
    
    const calendar = document.getElementById('calendar');
    
    // Add day labels
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    days.forEach(day => {
        const dayLabel = document.createElement('div');
        dayLabel.classList.add('calendar-day');
        dayLabel.style.fontWeight = 'bold';
        dayLabel.textContent = day;
        calendar.appendChild(dayLabel);
    });
    
    // Add empty cells for days before the 1st
    for (let i = 0; i < startDate.getDay(); i++) {
        const emptyDay = document.createElement('div');
        calendar.appendChild(emptyDay);
    }
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const day = document.createElement('div');
        day.classList.add('calendar-day');
        day.textContent = d.getDate();
        
        if (d.getTime() === weddingDate.getTime()) {
            day.classList.add('wedding-day');
        }
        
        calendar.appendChild(day);
    }
}

// D-day countdown
function updateDday() {
    const weddingDate = new Date(2024, 9, 27, 14, 0, 0);
    const now = new Date();
    const diff = weddingDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    document.getElementById('dday').textContent = `D - ${days}일`;
}

// Gallery
function loadGalleryImages() {
    const gallery = document.getElementById('galleryImages');
    for (let i = 1; i <= 15; i++) {
        const img = document.createElement('img');
        img.src = `./img/img_${i}.jpg`; // 갤러리 이미지 경로를 맞추세요
        img.alt = `Gallery Image ${i}`;
        img.classList.add('gallery-image');
        gallery.appendChild(img);
    }
}

// Copy account number
function setupCopyAccountButtons() {
    const copyAccountButtons = document.querySelectorAll('.copy-account-btn');
    copyAccountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountNumber = this.getAttribute('data-account');
            navigator.clipboard.writeText(accountNumber).then(() => {
                alert('계좌번호가 복사되었습니다.');
            });
        });
    });
}

// Copy address number
function setupCopyAddressButtons() {
    const copyAddressButtons = document.querySelectorAll('.copy-address-btn');
    copyAddressButtons.forEach(button => {
        button.addEventListener('click', function() {
            const address = this.getAttribute('address');
            navigator.clipboard.writeText(address).then(() => {
                alert('주소가 복사되었습니다.');
            });
        });
    });
}

// Modal
function setupModal() {
    const modal = document.getElementById("contactModal");
    const btn = document.getElementById("contactBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Flower petal animation
function createFlowerPetals() {
    const container = document.getElementById('flower-container');
    const petalCount = 30;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('flower-petal');
        
        // Randomize petal properties
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 10 + 5}s`;
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        petal.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        
        container.appendChild(petal);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    updateDday();
    setInterval(updateDday, 60000); // Update every minute
    loadGalleryImages();
    setupCopyAccountButtons();
    setupCopyAddressButtons();
    setupModal();
    createFlowerPetals();
});


// 마우스 오른쪽 버튼 클릭 방지
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 키보드의 특정 키 조합 방지 (PrintScreen, Ctrl+P, Ctrl+S 등)
document.addEventListener('keydown', function(e) {
    // PrintScreen 키 방지
    if (e.key === 'PrintScreen') {
        alert('캡처는 금지되어 있습니다.');
        return false;
    }

    // Ctrl+P (인쇄), Ctrl+S (저장) 등 방지
    if ((e.ctrlKey && e.key === 'p') || (e.ctrlKey && e.key === 's')) {
        alert('이 기능은 금지되어 있습니다.');
        e.preventDefault();
    }
});

document.addEventListener('touchend', function(e) {
    var now = Date.now();
    var touchDuration = now - e.timeStamp;
    if (touchDuration > 500) { // 500ms 이상일 경우 길게 누른 것으로 간주
        e.preventDefault(); // 길게 누르기 방지
    }
});

navigator.mediaDevices.enumerateDevices().then(function(devices) {
    devices.forEach(function(device) {
        if (device.kind === 'videoinput') {
            console.log('녹화 장치 발견:', device.label);
        }
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'PrintScreen') {
        alert('스크린샷 기능이 감지되었습니다!');
        // 스크린샷 시도를 방지하는 추가적인 코드
    }
});

        // 핀치 줌 방지
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault(); // 핀치 줌 방지
    }
}, { passive: false });

document.addEventListener('gesturestart', function(event) {
    event.preventDefault(); // 핀치 줌 방지
});
// // 드래그 방지
// document.addEventListener('dragstart', function(e) {
//     e.preventDefault();
// });
