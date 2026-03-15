const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');
const pagesDir = path.join(srcDir, 'pages');

// 1. ChatBot.jsx edits
const chatBotPath = path.join(componentsDir, 'ChatBot.jsx');
let chatBotCode = fs.readFileSync(chatBotPath, 'utf-8');
chatBotCode = chatBotCode.replace(
    /const API_BASE = 'https:\/\/sns-backend-t230\.onrender\.com';/g,
    "const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';"
);
chatBotCode = chatBotCode.replace(
    /const activeEvents = events\.filter\(\(e\) => e\.isActive\);/,
    "const activeEvents = events; // filtered by backend"
);
fs.writeFileSync(chatBotPath, chatBotCode);

// 2. Events.js edits
const eventsPath = path.join(pagesDir, 'Events.js');
let eventsCode = fs.readFileSync(eventsPath, 'utf-8');
eventsCode = eventsCode.replace(
    /const API_BASE_URL = 'https:\/\/sns-backend-t230\.onrender\.com';/g,
    "const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';"
);
fs.writeFileSync(eventsPath, eventsCode);

// 3. AdminPanel.js edits
const adminPath = path.join(pagesDir, 'AdminPanel.js');
let adminCode = fs.readFileSync(adminPath, 'utf-8');
adminCode = adminCode.replace(
    /const API_BASE_URL = 'https:\/\/sns-backend-t230\.onrender\.com';/g,
    "const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';"
);

// push client side computations to backend in AdminPanel.js
adminCode = adminCode.replace(
    /const filteredRegistrations = selectedEventFilter === 'all'[\s\S]*?: registrations\.filter\(\(r\) => r\.eventId && r\.eventId\._id === selectedEventFilter\);/,
    "const filteredRegistrations = registrations; // now filtered by backend"
);

const fetchRegistrationsFunction = `
    const fetchRegistrations = async () => {
        try {
            const headers = { 'x-admin-password': password };
            const endpoint = selectedEventFilter === 'all' 
                ? \`\${API_BASE_URL}/api/admin/registrations\`
                : \`\${API_BASE_URL}/api/admin/registrations/\${selectedEventFilter}\`;
            const regRes = await fetch(endpoint, { headers });
            if (regRes.ok) setRegistrations(await regRes.json());
        } catch (err) {
            console.error('Error fetching registrations:', err);
        }
    };

    useEffect(() => {
        if (authenticated) fetchRegistrations();
        // eslint-disable-next-line
    }, [selectedEventFilter, authenticated]);
`;

adminCode = adminCode.replace(
    /const fetchData = async \(\) => {[\s\S]*?if \(regRes\.ok\) setRegistrations\(await regRes\.json\(\)\);\n        } catch \(err\) {/,
    `const fetchData = async () => {
        try {
            const headers = { 'x-admin-password': password };
            const evRes = await fetch(\`\${API_BASE_URL}/api/admin/events\`, { headers });
            if (evRes.ok) setEvents(await evRes.json());
        } catch (err) {`
);

// We need to insert the fetchRegistrationsFunction right after fetchData
adminCode = adminCode.replace(
    /useEffect\(\(\) => {\n\s*if \(authenticated\) fetchData\(\);\n\s*\/\/ eslint-disable-next-line\n\s*}, \[authenticated\]\);/,
    `useEffect(() => {
        if (authenticated) fetchData();
        // eslint-disable-next-line
    }, [authenticated]);
${fetchRegistrationsFunction}`
);

fs.writeFileSync(adminPath, adminCode);

// 4. Create .env
fs.writeFileSync(path.join(__dirname, '.env'), 'REACT_APP_API_BASE_URL=https://sns-backend-t230.onrender.com\n');

console.log("Edits complete");
