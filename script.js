document.addEventListener('DOMContentLoaded', function () {

    // Function to update the clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const clockDisplay = `<span class="hours-minutes" style="font-size: 1.2em; color: ${getClockColor(now)};">${hours}:${minutes}</span>:<span class="seconds" style="font-size: 0.8em; color: ${getSecondsColor(now)};">${seconds}</span>`;
        document.getElementById('clock').innerHTML = clockDisplay;

        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = now.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        document.getElementById('currentDate').textContent = formattedDate;
    }

    // Function to update the finish time based on start time and duration
    function updateFinishTime() {
        const startTime = document.querySelector('.start-time').textContent;
        const durationText = document.querySelector('.duration-text').textContent;

        // Initialize duration in minutes
        let durationMinutes = 0;

        // Check if duration contains 'h' for hours
        if (durationText.includes('h')) {
            const [hours, minutes] = durationText.split('h').map(part => parseInt(part, 10));
            durationMinutes = hours * 60 + (minutes || 0);
        } else {
            // Extract only the numeric part from duration for minutes
            durationMinutes = parseInt(durationText.match(/\d+/)[0], 10) || 0;
        }

        // Parse start time
        const [startHours, startMinutes] = startTime.split(':').map(Number);

        // Calculate finish time
        const finishHours = (startHours + Math.floor((startMinutes + durationMinutes) / 60)) % 24;
        const finishMinutes = (startMinutes + durationMinutes) % 60;

        // Display finish time
        const finishTime = `${finishHours.toString().padStart(2, '0')}:${finishMinutes.toString().padStart(2, '0')}`;
        document.querySelector('.finish-time').textContent = finishTime;
    }

    // Function to get the clock color based on remaining time
    function getClockColor(now) {
        const finishTime = parseTime(document.querySelector('.finish-time').textContent);
        const remainingTime = (finishTime.hours * 60 + finishTime.minutes) - (now.getHours() * 60 + now.getMinutes());

        if (remainingTime <= 5 && remainingTime > 0) {
            return 'red';
        } else {
            return '';
        }
    }

    // Function to get the color for seconds
    function getSecondsColor(now) {
        const finishTime = parseTime(document.querySelector('.finish-time').textContent);
        const remainingTime = (finishTime.hours * 60 + finishTime.minutes) - (now.getHours() * 60 + now.getMinutes());

        if (remainingTime <= 5 && remainingTime > 0) {
            return 'darkred'; // Adjust the color as needed
        } else {
            return '';
        }
    }

    // Function to parse time from HH:MM format
    function parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(part => parseInt(part, 10));
        return { hours, minutes };
    }

    // Event listener for duration change
    document.querySelector('.duration-text').addEventListener('input', function () {
        updateFinishTime();
        updateClock();
    });

    // Event listener for start time change
    document.querySelector('.start-time').addEventListener('input', function () {
        updateFinishTime();
        updateClock();
    });

    // Set interval to update the clock every second
    setInterval(function () {
        updateClock();
    }, 1000);

    // Initial update for clock and finish time
    updateClock();
    updateFinishTime();

});
