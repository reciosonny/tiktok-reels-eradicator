
const formatMinutes = (mins: number) => {
    if (mins < 1) {
        return '';
    }

    return mins > 1 ? `${mins} minutes, ` : `${mins} minute, `;
}

const formatHours = (hrs: number) => {
    if (hrs < 1) {
        return '';
    }

    return hrs > 1 ? `${hrs} hours, ` : `${hrs} hour, `;
}

export const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let formatBuilder = formatHours(hrs) + formatMinutes(mins) + (mins > 0 || hrs > 0 ? `and ${secs} seconds` : `${secs} seconds`);

    return formatBuilder;
}