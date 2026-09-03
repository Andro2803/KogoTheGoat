(function() {
    const player = document.querySelector('.video-wrapper iframe');
    const videoItems = document.querySelectorAll('.video-item');
    const titleSpan = document.getElementById('video-title');

    // title map for clean display with specific si parameters
    const videoConfig = {
        '0GuAM6tdsok': {
            title: '00:29 Perfect 👑',
            si: '9BJekO8qRCocBppI'
        },
        '0G4ucwMuKyg': {
            title: '00:36 Attempt 🥈',
            si: 'NU8PPWV3iaEi1YhJ'
        }
    };

    // function to update iframe src
    function loadVideo(videoId, title) {
        if (!videoId) return;
        const baseUrl = 'https://www.youtube-nocookie.com/embed/';
        // Use the specific si parameter for each video
        const config = videoConfig[videoId];
        const siParam = config ? config.si : '';
        const url = siParam ? `${baseUrl}${videoId}?si=${siParam}&autoplay=0&rel=0` : `${baseUrl}${videoId}?autoplay=0&rel=0`;
        player.src = url;
        // Update title
        titleSpan.textContent = title || (config ? config.title : `Video ${videoId}`);
    }

    // set initial: active item (first) -> load its video
    const initialActive = document.querySelector('.video-item.active');
    if (initialActive) {
        const id = initialActive.dataset.videoId;
        if (id) loadVideo(id, videoConfig[id]?.title || initialActive.textContent.trim());
    } else {
        // fallback: first item
        const first = document.querySelector('.video-item');
        if (first) {
            first.classList.add('active');
            const id = first.dataset.videoId;
            if (id) loadVideo(id, videoConfig[id]?.title || first.textContent.trim());
        }
    }

    // click handler for sidebar items
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            videoItems.forEach(el => el.classList.remove('active'));
            this.classList.add('active');

            const videoId = this.dataset.videoId;
            let displayTitle = this.textContent.trim();
            if (videoId && videoConfig[videoId]) {
                displayTitle = videoConfig[videoId].title;
            } else {
                displayTitle = displayTitle.replace(/\s+/g, ' ').trim();
            }
            if (videoId) loadVideo(videoId, displayTitle);
        });
    });
})();
