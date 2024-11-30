

export const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs} hours, ${mins} minutes, and ${secs} seconds`; //TODO: only display hours and minutes if they are greater than 0 
}