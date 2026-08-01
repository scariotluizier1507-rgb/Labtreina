-- ==========================================
-- TREINACCGL
-- Banco de Dados - Gestão de Treinamentos
-- Laboratório
-- ==========================================


CREATE DATABASE treinaccgl;


-- USUÁRIOS DO SISTEMA

CREATE TABLE usuarios (

    id_usuario SERIAL PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    matricula VARCHAR(50),

    login VARCHAR(50) UNIQUE NOT NULL,

    senha VARCHAR(255) NOT NULL,

    perfil VARCHAR(50) NOT NULL,

    ativo BOOLEAN DEFAULT TRUE

);



-- TURNOS DO LABORATÓRIO

CREATE TABLE turnos (

    id_turno SERIAL PRIMARY KEY,

    nome_turno VARCHAR(10) NOT NULL

);



INSERT INTO turnos(nome_turno)
VALUES
('A'),
('B'),
('C');



-- FUNCIONÁRIOS

CREATE TABLE funcionarios (

    id_funcionario SERIAL PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    matricula VARCHAR(50),

    cargo VARCHAR(100),

    id_turno INTEGER REFERENCES turnos(id_turno),

    data_admissao DATE,

    status VARCHAR(20) DEFAULT 'ATIVO'

);



-- DOCUMENTOS E TREINAMENTOS

CREATE TABLE treinamentos (

    id_treinamento SERIAL PRIMARY KEY,

    codigo VARCHAR(50),

    nome VARCHAR(200) NOT NULL,

    tipo_documento VARCHAR(50),

    versao VARCHAR(20),

    data_emissao DATE,

    responsavel VARCHAR(100),

    validade INTEGER

);



-- REGISTRO DE REALIZAÇÃO

CREATE TABLE aplicacoes_treinamento (

    id_aplicacao SERIAL PRIMARY KEY,

    id_funcionario INTEGER REFERENCES funcionarios(id_funcionario),

    id_treinamento INTEGER REFERENCES treinamentos(id_treinamento),

    data_realizacao DATE,

    nota DECIMAL(5,2),

    status VARCHAR(30),

    instrutor VARCHAR(100)

);



-- CERTIFICADOS

CREATE TABLE certificados (

    id_certificado SERIAL PRIMARY KEY,

    id_funcionario INTEGER REFERENCES funcionarios(id_funcionario),

    id_treinamento INTEGER REFERENCES treinamentos(id_treinamento),

    data_emissao DATE,

    codigo_validacao VARCHAR(100)

);



-- LOG DE AUDITORIA

CREATE TABLE auditoria (

    id_log SERIAL PRIMARY KEY,

    usuario VARCHAR(100),

    acao VARCHAR(200),

    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
