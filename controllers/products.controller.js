const Products = require('../models/products.model');

exports.getProducts = async (req, res) => {
    try{
        Products.find().then((data) => {
            res.status(200).send({message: 'Products have been retrieved successfully.', data: data})
        }).catch(error => {
            res.status(400).send({message: 'Error while retrieving products.'})
        });
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error',
            error: error
        })
    }
};

exports.getProductById = (req, res) => {
    try{
        Products.findById(req.params.productId).then((data) => {
            if(!data){ 
                return res.status(404).send({message: 'No product found with the given ID'})
            }
            res.status(200).send({message: 'Product has been retrieved successfully.', data: data})
        }).catch(error => {
            res.status(400).send({message: 'Error while retrieving product.'})
        });
    }catch(error){
        res.status(500).send({message: "Internal Server Error"});
    }
};


exports.addProduct = (req, res) => {
    try{
        let newProduct = new Products(req.body);
        newProduct.save().then(data => {
            res.status(201).send({message: 'A new product has been added successfully.', data: data});
        }).catch(error => {
            res.status(400).send({message: "Error while adding a new product"});
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
};

exports.updateProduct = (req, res) => {
    try{
        Products.findByIdAndUpdate({_id: req.params.productId}, {$set: req.body}).then((data) => {
            res.status(200).send({message: 'Product has been updated successfully.', productId: data._id});
        }).catch(error => {
            res.status(400).send({message: 'Error while updating product.'});
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.deleteProduct = (req, res) => {
    try {
        Products.deleteOne({ _id: req.params.productId }).then(data => {
            res.status(200).send({ message: 'Product has been deleted successfully.' });
        }).catch(error => {
            res.status(400).send({ message: 'Error while deleting product.' });
        })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}