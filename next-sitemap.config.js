/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.faccio-tutto.it', // URL principale del sito
  generateRobotsTxt: true, // Genera robots.txt automaticamente
  changefreq: 'weekly', // Frequenza di aggiornamento suggerita ai motori di ricerca
  priority: 0.7, // Priorità media per tutte le pagine
  sitemapSize: 5000, // Numero massimo di URL per sitemap
  exclude: [
    '/admin/*',
    '/private/*',
    '/api/*',
    '/cart/*',
    '/checkout/*',
    '/login',
    '/register'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/cgi-bin/',
          '/tmp/',
          '/cart/',
          '/checkout/',
          '/login/',
          '/register/',
          '/*?sort=',
          '/*?filter=',
          '/*?search=',
          '/*&utm_source=',
          '/*&utm_medium=',
          '/*&utm_campaign='
        ]
      }
    ],
    additionalSitemaps: [
      'https://www.faccio-tutto.it/sitemap.xml' // Sitemap principale
    ]
  }
};