import Role from '../models/Role.js';

export const createRole = async (req,res,next) => {
    try {
        if (req.body.role && req.body.role != "") {
            const newRole = new Role(req.body);
            await newRole.save();
            return res.send("Role Created!");
        } else {
            return res.send("Bad Request");
        }
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
};

export const updateRole = async (req,res,next) => {
    try {
        const role = await Role.findById({_id:req.params.id});
        if (role) {
            const newRole = await Role.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}
            );
            return res.status(200).send("Role Updated");
        } else{
            return res.status(404).send("Role Not Found");
        }
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
}

export const getAllRoles = async (req,res,next) => {
    try {
        const roles = await Role.find({});
        // res .send(roles);
        return res.status(200).send(roles);
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
}

export const deleteRole = async (req,res,next) => {
    try {
        const role = await Role.find({_id:req.params.id});
        if (role) {
            await Role.findByIdAndDelete(req.params.id);
            return res.status(200).send("Role Deleted!");
        } else {
            return res.status(404).send("Role Not Found");
        }
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
}