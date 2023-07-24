const relativeTime = new Intl.RelativeTimeFormat(undefined, { style: 'short', numeric: 'auto' });

export function dateToRelative(date: Date): string {
    const seconds = (date.getTime() - Date.now()) / 1000;

    const units: Intl.RelativeTimeFormatUnit[] = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];
    const thresholds: number[] = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

    for (let i = 0; i < thresholds.length; i++) {
        if (Math.abs(seconds) > thresholds[i]) {
            return relativeTime.format(Math.round(seconds / thresholds[i]), units[i]);
        }
    }

    return relativeTime.format(seconds, 'seconds');
}

export function dateFormatted(date: Date): string {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
}
