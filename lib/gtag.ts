// @ts-ignore
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: any) => {
    // @ts-ignore
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
}

export interface eventProps {
    action?: string,
    category: string,
    label: string,
    value?: number,
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: eventProps) => {
    // @ts-ignore
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}
