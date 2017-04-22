import { Router } from 'express';

const router = new Router();

router.use((req, res, next) => {
  switch (req.message.type) {
    case '':
      res.send(req.message.text);
      break;
    default:

  }

  next();
});

export default router;
