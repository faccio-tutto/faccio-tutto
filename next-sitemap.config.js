/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.faccio-tutto.it',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/admin/*',
    '/private/*',
    '/api/*',
    '/cart/*',
    '/checkout/*',
    '/login',
    '/register',
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
          '/login',
          '/register',
          '/*?sort=',
          '/*?filter=',
          '/*?search=',
          '/*&utm_source=',
          '/*&utm_medium=',
          '/*&utm_campaign=',
        ],
      },
    ],
    additionalSitemaps: [
      // qui inserisci SOLO altre sitemap esterne, non la sitemap generata da next-sitemap
      // ad esempio: 'https://www.faccio-tutto.it/sitemap-blog.xml'
    ],
  },
};