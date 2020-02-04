/* eslint-disable eol-last */
/* eslint-disable quotes */
/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/* eslint-disable indent */

/* eslint-disable no-multiple-empty-lines */

/* eslint-disable linebreak-style */
import bcrypt from "bcryptjs";

export const encryptPassword = pswd =>
    // eslint-disable-next-line implicit-arrow-linebreak
    bcrypt.hashSync(pswd, Number(process.env.PASSWORD_SALT));
export const decryptPassword = (userPswd, hashedPswd) =>
    bcrypt.compareSync(userPswd, hashedPswd);