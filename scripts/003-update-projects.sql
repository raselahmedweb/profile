-- Update projects with real GitHub URLs
UPDATE projects SET 
  github_url = 'https://github.com/raselahmedweb/client-shop.git',
  title = 'Client Shop',
  description = 'Full-stack e-commerce solution with modern UI and seamless shopping experience',
  long_description = 'A comprehensive e-commerce platform built with React and Node.js. Features include product catalog, shopping cart, user authentication, payment integration, and admin dashboard for inventory management.',
  technologies = ARRAY['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS']
WHERE slug = 'cloudscale-analytics';

UPDATE projects SET 
  github_url = 'https://github.com/raselahmedweb/map-crm-dashboard.git',
  title = 'Map CRM Dashboard',
  description = 'Interactive CRM dashboard with map integration for location-based customer management',
  long_description = 'A powerful CRM dashboard featuring interactive maps for visualizing customer locations, sales territories, and delivery routes. Built with React and integrates with mapping APIs for real-time geolocation features.',
  technologies = ARRAY['React', 'TypeScript', 'Leaflet', 'Tailwind CSS', 'Chart.js']
WHERE slug = 'securevault-pro';

UPDATE projects SET 
  github_url = 'https://github.com/raselahmedweb/map-crm-server.git',
  title = 'Map CRM Server',
  description = 'Backend API server for Map CRM with robust data handling and authentication',
  long_description = 'The backend server powering the Map CRM Dashboard. Features RESTful API endpoints, JWT authentication, database management, and geospatial queries for efficient location-based data retrieval.',
  technologies = ARRAY['Node.js', 'Express', 'MongoDB', 'JWT', 'Mongoose']
WHERE slug = 'dataflow-engine';

UPDATE projects SET 
  github_url = 'https://github.com/raselahmedweb/addabd-frontend.git',
  title = 'AddaBD Frontend',
  description = 'React Native mobile app for social networking with real-time features',
  long_description = 'A React Native mobile application for social networking. Features include real-time chat, user profiles, news feed, and push notifications. Built with Expo for cross-platform development.',
  technologies = ARRAY['React Native', 'Expo', 'TypeScript', 'Firebase', 'Redux'],
  status = 'live'
WHERE slug = 'neural-networks-lab';

-- Update slugs to match new project names
UPDATE projects SET slug = 'client-shop' WHERE title = 'Client Shop';
UPDATE projects SET slug = 'map-crm-dashboard' WHERE title = 'Map CRM Dashboard';
UPDATE projects SET slug = 'map-crm-server' WHERE title = 'Map CRM Server';
UPDATE projects SET slug = 'addabd-frontend' WHERE title = 'AddaBD Frontend';
