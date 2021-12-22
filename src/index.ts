import {PrismaClient} from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
	(req: express.Request, res: express.Response, next: express.NextFunction) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "*");
		res.header("Access-Control-Allow-Headers", "*");
		next();
	}
);

app.listen(3000, () => {
	console.log("Start on port 3000.");
});

app.get("/", (req: express.Request, res: express.Response) => {
	console.log("Helloworld");
	res.send(JSON.stringify({Hello: "world"}));
});

const createUser = async (name: string): Promise<any> => {
	return await prisma.user.create({
		data: {
			name: name,
			email: `${name}@example.com`,
		},
	});
};

const getUsers = async (): Promise<any> => {
	return await prisma.user.findMany();
};

app.post("/users", (req: express.Request, res: express.Response) => {
	const name = req.body.name;
	console.log(name);
	createUser(name)
		.then((user) => {
			console.log(user);
			res.redirect("/users");
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/users");
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
});

app.get("/users", (req: express.Request, res: express.Response) => {
	getUsers()
		.then((users) => {
			console.log(users);
			res.send(JSON.stringify(users));
		})
		.catch((err) => {
			console.log(err);
			process.exit(1);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
});
