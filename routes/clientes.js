var express = require('express');
var router = express.Router();
var model = require("..//index");

/* GET users listing. */
router.get('/', function (req, res, next) {
	model.clientes.findAll({})
		.then(clientes => res.json({
			error: false,
			data: clientes
		}))
		.catch(error => res.json({
			error: true,
			data: [],
			error: error
		}))
});

router.post('/', function (req, res, next) {
	const {
		nome,
		cpf
	} = req.body;
	model.clientes.create({
		nome: nome,
		cpf: cpf
	}).then(clientes => res.status(201).json({
		error: false,
		data: clientes,
		message: 'Cliente cadastrado com sucesso!'
	})).catch(error=>res.json({
		error:true,
		data:[],
		error:error
	}));
});

router.put('/:id', function (req, res, next) {
	const cliente_id = req.params.id;
	const {nome, cpf} = req.body;
	model.clientes.update({
		nome:nome,
		cpf:cpf
	},{
		where:{
			id: cliente_id
		}
	}).then(()=>res.status(201).json({
		error:false,
		message: 'Cliente alterado com sucesso!'
	})).catch(error=>res.json({
		error:true,
		error:error
	}));
});

router.delete('/:id', function (req, res, next) {
	const cliente_id = req.params.id;
	model.clientes.destroy({
		where:{
			id:cliente_id
		}
	}).then(()=>res.status(201).json({
		error:false,
		message: 'Cliente excluido com sucesso!'
	})).catch(error=>res.json({
		error:true,
		error:error
	}));
});

module.exports = router;
