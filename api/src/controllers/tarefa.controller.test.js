const request = require ( 'supertest' );
const app = require ( '../../app' );
const sequelize = require('../models/index');
const TagModel = require ( '../models/Tag' );
const UsuarioModel = require ( '../models/Usuario' );
const TarefaModel = require ( '../models/Tarefa' );

