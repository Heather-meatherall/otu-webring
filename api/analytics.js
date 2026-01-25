// Vercel Serverless Function for Analytics
// This endpoint receives analytics events and can log them or send to a service

export default async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const eventData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        
        // Log the event (in production, you might want to send to a database or analytics service)
        console.log('Analytics Event:', {
            event: eventData.event,
            data: eventData.data,
            timestamp: eventData.timestamp || new Date().toISOString(),
            url: eventData.url,
            userAgent: req.headers['user-agent'],
            ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
        });

        // TODO: Here you can add code to:
        // 1. Store events in a database (e.g., Vercel Postgres, MongoDB, etc.)
        // 2. Send to an analytics service (e.g., Google Analytics, Mixpanel, etc.)
        // 3. Send to Vercel Analytics custom events (if using @vercel/analytics package)
        
        // Example: Send to external service
        // await fetch('https://your-analytics-service.com/events', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(eventData)
        // });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Analytics error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
