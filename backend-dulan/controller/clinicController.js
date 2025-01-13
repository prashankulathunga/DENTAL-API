import clinicSchema from "../../model/admin/clinicSchema.js";

// Create a new clinic
const createClinic = async (req, res) => {
  const { name, address, phone, email, status } = req.body;

  try {
    const newClinic = new clinicSchema({
      name,
      address,
      phone,
      email,
      status,
    });

await newClinic.save().then(data => {
    res.status(201).json({message: 'Clinic successfully created', data:data});
})

  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getClinic = async(req, res) => {
    try {
        const clinic = await clinicSchema.findOne();
        if(clinic){
            res.status(200).json({message: 'Clinic loaded successfully', data:clinic});
        }else{
            res.status(404).json({message: 'Clinic not found'});
        }
    }catch(error){
        return res.status(500).json({message:'Internal Server Error'});
    }
}

const updateClinic = async (req, res) => {
    const {id} = req.params;
    const {name, address, phone, email, status} = req.body;

    try {
        const updatedClinic = await clinicSchema.findByIdAndUpdate(id, {name, address, phone, email, status}, {new: true});
        if(updatedClinic){
            res.status(200).json({message: 'Clinic updated successfully', data:updatedClinic});
        }else{
            res.status(404).json({message: 'Clinic not found'});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteClinic = (req, res) => {
    const {id} = req.params;
    clinicSchema.findByIdAndDelete(id).then(() => {
        return res.status(200).json({message: 'Clinic deleted successfully'});
    }).catch(err => {
        return res.status(500).json({message: err.message});
    })
}

export default {createClinic, getClinic, updateClinic, deleteClinic};