import { Router } from "express";
import { checkAuthTokenCookies, checkUserLogged } from "../middlewares/check-auth.js";

const router = Router();

router.get('/login', checkUserLogged, (req, res)=>{
    res.render('login')
});

router.get('/current', checkAuthTokenCookies, (req, res)=>{
    res.render('current', { user: req.user })
})

export default router;