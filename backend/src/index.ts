import express, { Request, Response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import zod from "zod";
import { Content, Link, User } from "./db";
import { userMiddleware } from "./middleware";
// import { JWT_SECRET } from "./config";
import { random } from "./utils";

const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret";
console.log(JWT_SECRET);

var app = express();
app.use(express.json());
app.use(cors());

const signupBody = zod.object({
    name: zod.string(),
    username: zod.string().email(),
    password: zod.string(),
});
app.post("/api/v1/user/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Incorrect inputs",
        });
        return;
    }

    const existingUser = await User.findOne({ username: req.body.username });


    if (existingUser != null) {


        res.status(403).json({
            message: "User already exists",
            existingUser
        });
        return;
    }

    try {
        console.log(req.body);

        const user = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        });

        console.log("control reaches after user created");

        const userId = user._id;

        const token = jwt.sign({ userId }, JWT_SECRET);

        res.status(200).json({
            token,
        });
        return;
    } catch (err) {
        const message = (err as Error).message;
        res.status(411).json({
            message,
        });
    }
});
const signinBody = zod.object({
    username: zod.string(),
    password: zod.string(),
});

app.post("/api/v1/user/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: "Incorrect inputs",
        });
        return;
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.status(200).json({
            token,
        });
        return;
    } else {
        res.status(403).json({
            message: "Incorrect email or password",
        });
        return;
    }

});

const contentBody = zod.object({
    link: zod.string(),
    title: zod.string(),
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { success } = contentBody.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: "Incorrect inputs",
        });
        return;
    }
    if (!req.userId) {
        res.status(401).json({
            message: "User not authenticated",
        });
        return;
    }

    try {
        await Content.create({
            link: req.body.link,
            title: req.body.title,
            type: req.body.type,
            userId: req.userId, // Add userId here
            Tags: [],
        });

        res.status(200).json({
            message: "Content added successfully",
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Failed to add content",

        });
        return;
    }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;

    const content = await Content.find({ userId }).populate(
        "userId",
        "username"
    );

    res.status(200).json({
        content,
    });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {

    const userId = req.userId;

    const contentId = req.body.contentId;
    const content = await Content.findOne({ _id: contentId });

    if (!content) {
        res.status(403).json({
            message: "Content not found",
        });
    }
    else {
        await Content.deleteOne({ _id: contentId, userId });
        res.status(200).json({
            message: "Content deleted successfully",
        });
    }
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    const hash = random(10);
    if (share) {
        const existingUser = await Link.findOne({ userId: req.userId });
        if (existingUser) {
            res.json({
                message: "Link already exists",
                hash: existingUser.hash,
            });
            return;
        }
        await Link.create({
            userId: req.userId,
            hash,
        })
        res.json({
            message: "Link created successfully",
            hash,
        });
    } else {
        await Link.deleteOne({
            userId: req.userId,
        })
        res.json({
            message: "Link deleted successfully",
        })

    }


});

app.get("/api/v1/brain/:sharelink", async (req, res) => {
    const sharelink = req.params.sharelink;
    const link = await Link.findOne({ hash: sharelink });

    if (!link) {
        res.status(411).json({
            message: "Link not found",
        });
        return;
    }
    const content = await Content.findOne({
        userId: link.userId
    })

    const userData = await User.findOne({ _id: link.userId });
    if (!userData) {
        res.status(411).json({
            message: "User not found",
        });
        return;
    }
    res.json({
        username: userData.username,
        content
    })
})
app.all("*", (req, res) => {
  res.status(200).send("Handled by catch-all route");
});

app.listen(3000);
