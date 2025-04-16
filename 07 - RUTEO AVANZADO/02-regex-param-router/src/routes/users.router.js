import { Router } from "express";
const router = Router();

// router.get("/:email", (req, res) => {
//   const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//   const { email } = req.params;
//   if (emailRegex.test(email)) return res.send("email valido");
//   /*
//       controller --> service --> dao --> DB
//       */
//   return res.status(400).send("email invalido");
// });

// router.get("/:email([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})", (req, res) => {
//     return res.send("email valido");
//     /*
//     controller --> service --> dao --> DB
//     */
// });

router.get("/:email", (req, res) => {
  return res.send("email valido");
  /*
    controller --> service --> dao --> DB
    */
});


router.param("email", (req, res, next, email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isValid = emailRegex.test(email);
    if (isValid) return next();
    return res.status(400).send("email invalido");
});

/* ------------------------------------ - ----------------------------------- */
router.all('/admin/*', (req, res, next)=>{
    const isAdmin = true
    if(!isAdmin) return res.status(403).send('acceso denegado')
        return next()
})

router.get("/admin/profile", (req, res) => {
    return res.send("ok");
    /*
      controller --> service --> dao --> DB
      */
  });
/* ------------------------------------ - ----------------------------------- */

router.get("*", (req, res) => {
  res.json({ message: "Ruta inexistente" });
});

export default router;

