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

export function formatDate(date: Date): string {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
}

export function formatThousands(n: number): string {
    const units = ['k', 'm', 'b', 't'];
    const thresholds = [1000, 1000000, 1000000000, 1000000000000];

    for (let i = 0; i < thresholds.length; i++) {
        if (Math.abs(n) > thresholds[i]) {
            const value = n / thresholds[i];
            const unit = units[i];

            return `${value.toFixed(1).endsWith('.0') ? Math.round(value) : value.toFixed(1)}${unit}`;
        }
    }

    return n.toString();
}
