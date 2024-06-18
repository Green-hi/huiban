document.addEventListener('DOMContentLoaded', function() {
    fetchMeetings();
    setupImageSlider();
    fetchJournals();

    function fetchMeetings() {
        fetch('http://47.100.138.113:7777/conference/getAllPagingCon?pageNo=1&pageSize=10', {
            headers: {}
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 100 && data.data.records) {
                populateTable(data.data.records);
            } else {
                console.error('Failed to fetch data:', data.msg);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    function populateTable(records) {
        const tbody = document.getElementById('meeting-data');
        tbody.innerHTML = ''; // Clear existing entries
        records.forEach(record => {
            const row = `<tr>
                <td>${record.ccflevel || ''}</td>
                <td>${record.corelevel || ''}</td>
                <td>${record.qualislevel || ''}</td>
                <td>${record.shortName || ''}</td>
                <td><a href="detail_hy.html?conferenceId=${record.id}" style="text-decoration: underline;">${record.name}</a></td>
                <td>${formatDate(record.dueDate)}</td>
                <td>${formatDate(record.infoDate)}</td>
                <td>${formatDate(record.meetingDate)}</td>
                <td>${record.location || ''}</td>
                <td>${record.session || ''}</td>
                <td>${record.views || ''}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    }
    
    function fetchJournals() {
        fetch('http://47.100.138.113:7777/conference/getAllPagingJor?pageNo=1&pageSize=10', {
            headers: {}
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 100 && data.data.records) {
                populateJournalTable(data.data.records);
            } else {
                console.error('Failed to fetch data:', data.msg);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    function populateJournalTable(records) {
        const tbody = document.getElementById('journal-data');
        tbody.innerHTML = ''; // Clear existing entries
        records.forEach(record => {
            const shortNameDisplay = record.shortName !== "未知" ? record.shortName : '';
            const row = `<tr>
                <td>${record.ccflevel || ''}</td>
                <td>${shortNameDisplay || ''}</td>
                <td><a href="detail_qk.html?journalId=${record.id}" style="text-decoration: underline;">${record.name}</a></td>
                <td>${record.influence || ''}</td>
                <td>${record.publish || ''}</td>
                <td>${record.issn || ''}</td>
                <td>${record.views || ''}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }

    

    function setupImageSlider() {
        let slideIndex = 0;
        showSlides(slideIndex);

        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("dot");
            if (n >= slides.length) { slideIndex = 0 }
            if (n < 0) { slideIndex = slides.length - 1 }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex].style.display = "block";
            dots[slideIndex].className += " active";
        }

        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlides(slideIndex = index);
            });
        });

        setInterval(() => showSlides(++slideIndex), 5000);  // Change image every 3 seconds
    }
});
