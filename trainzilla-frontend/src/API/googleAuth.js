import { OAuth2Client } from 'google-auth-library';
import axios from "axios";

const client = new OAuth2Client('853290800594-0r97u6c6olmb86jqjb8ia4pfd6dihul6.apps.googleusercontent.com')

axios.post("/api/v1/auth/google", async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();

    console.log(name, email)
    // const user = await db.user.upsert({
    //     where: { email: email },
    //     update: { name, picture },
    //     create: { name, email, picture }
    // })
    res.status(201)
    // res.json(user)
})