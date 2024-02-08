const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // лимит запросов 100
  handler(req, res, next) {
    res.status(429).json({
      message: 'Слишком много запросов, пожалуйста, повторите попытку позже.',
    });
    next();
  },
});

module.exports = limiter;
