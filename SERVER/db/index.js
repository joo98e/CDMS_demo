const status = process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'prod' : 'dev';
const app = require('./app');
const port = status === "prod" ? process.env.PORT || 80 : process.env.PORT || 5005;
const Member = require('./routes/Member');
const Org = require('./routes/Org');
const Register = require('./routes/Register');
const Menu = require('./routes/Menu');
const Agency = require('./routes/Agency');
const Project = require('./routes/Project');
const Process = require('./routes/Process');
const Util = require('./routes/Util');
const Mail = require('./routes/Mail');
const Release = require('./routes/Release');

app.use("/api/member", Member);
app.use("/api/org", Org);
app.use("/api/register", Register);
app.use("/api/agency", Agency);
app.use("/api/project", Project);
app.use("/api/process", Process);
app.use("/api/util", Util);
app.use("/api/menu", Menu);
app.use("/api/mail", Mail);
app.use("/api/release", Release);

app.listen(port, () => console.log(`Listening on PORT ${port}`));