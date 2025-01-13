import AdminSchema from '../../model/admin/AdminSchema.js'

const signup = async(req, resp)=>{
    const { email, password } = req.body;
    const admin = new AdminSchema({ email, password });
    await admin.save()
        .then(() => {
            resp.status(201).send('Admin created successfully');
        })
        .catch((error) => {
            resp.status(400).send(error.message);
        });

}

const login = async(req, resp)=>{
    const  {email, password} = req.body;

    await AdminSchema.findOne({email, password})
        .then((admin) => {
            if (admin) {
                resp.status(200).send('Login successful');
            } else {
                resp.status(401).send('Invalid credentials');
            }
        })
        .catch((error) => {
            resp.status(400).send(error.message);
        });
}


export default { signup, login };