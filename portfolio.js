/* Depends on common.js for `projects` data, buildProjectCard, wireFilters. */

const portfolioGrid = document.getElementById('portfolioGrid');
renderProjectGrid(portfolioGrid, projects);
wireFilters();
