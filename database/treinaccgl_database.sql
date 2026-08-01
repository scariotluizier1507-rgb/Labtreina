-- ==========================================
-- TREINACCGL 2.0
-- Banco de Dados - Gestão de Competências
-- Treinamentos e Documentos Laboratoriais
-- PostgreSQL
-- ==========================================


-- ==========================================
-- USUÁRIOS DO SISTEMA
-- ==========================================

CREATE TABLE usuarios (

    id_usuario SERIAL PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    matricula VARCHAR(50),

    login VARCHAR(50) UNIQUE NOT NULL,

    senha VARCHAR(255) NOT NULL,

    perfil VARCHAR(50) NOT NULL,

    ativo BOOLEAN DEFAULT TRUE

);



-- ==========================================
-- TURNOS
-- ==========================================

CREATE TABLE turnos (

    id_turno SERIAL PRIMARY KEY,

    nome_turno VARCHAR(10) NOT NULL

);



INSERT INTO turnos(nome_turno)
VALUES
('A'),
('B'),
('C');



-- ==========================================
-- FUNCIONÁRIOS
-- ==========================================

CREATE TABLE funcionarios (

    id_funcionario SERIAL PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    matricula VARCHAR(50),

    cargo VARCHAR(100),

    id_turno INTEGER REFERENCES turnos(id_turno),

    data_admissao DATE,

    status VARCHAR(20) DEFAULT 'ATIVO'

);



-- ==========================================
-- COMPETÊNCIAS DO LABORATÓRIO
-- ==========================================

CREATE TABLE competencias (

    id_competencia SERIAL PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    descricao TEXT,

    ativo BOOLEAN DEFAULT TRUE

);



-- ==========================================
-- COMPETÊNCIA DOS FUNCIONÁRIOS
-- MATRIZ DE HABILIDADES
-- ==========================================

CREATE TABLE funcionario_competencia (

    id_funcionario_competencia SERIAL PRIMARY KEY,

    id_funcionario INTEGER REFERENCES funcionarios(id_funcionario),

    id_competencia INTEGER REFERENCES competencias(id_competencia),

    status VARCHAR(30) DEFAULT 'EM TREINAMENTO',

    data_aprovacao DATE,

    validade DATE,

    aprovado_por VARCHAR(100)

);



-- ==========================================
-- DOCUMENTOS CONTROLADOS
-- ICOQ / PCC / IT / MANUAL
-- ==========================================

CREATE TABLE documentos (

    id_documento SERIAL PRIMARY KEY,

    codigo VARCHAR(50) NOT NULL,

    nome VARCHAR(200) NOT NULL,

    tipo VARCHAR(50),

    versao VARCHAR(20),

    status VARCHAR(30) DEFAULT 'VIGENTE',

    responsavel VARCHAR(100),

    data_publicacao DATE,

    arquivo TEXT

);



-- ==========================================
-- HISTÓRICO DE DOCUMENTOS
-- ==========================================

CREATE TABLE historico_documentos (

    id_historico SERIAL PRIMARY KEY,

    id_documento INTEGER REFERENCES documentos(id_documento),

    versao_anterior VARCHAR(20),

    nova_versao VARCHAR(20),

    alterado_por VARCHAR(100),

    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- ==========================================
-- TREINAMENTOS
-- ==========================================

CREATE TABLE treinamentos (

    id_treinamento SERIAL PRIMARY KEY,

    nome VARCHAR(200) NOT NULL,

    tipo VARCHAR(50),

    id_documento INTEGER REFERENCES documentos(id_documento),

    id_competencia INTEGER REFERENCES competencias(id_competencia),

    video_url TEXT,

    material_url TEXT,

    responsavel VARCHAR(100),

    data_criacao DATE DEFAULT CURRENT_DATE

);



-- ==========================================
-- PARTICIPANTES DOS TREINAMENTOS
-- ==========================================

CREATE TABLE aplicacoes_treinamento (

    id_aplicacao SERIAL PRIMARY KEY,

    id_funcionario INTEGER REFERENCES funcionarios(id_funcionario),

    id_treinamento INTEGER REFERENCES treinamentos(id_treinamento),

    data_realizacao DATE,

    nota DECIMAL(5,2),

    status VARCHAR(30),

    instrutor VARCHAR(100)

);



-- ==========================================
-- BANCO DE PERGUNTAS
-- ==========================================

CREATE TABLE perguntas (

    id_pergunta SERIAL PRIMARY KEY,

    id_treinamento INTEGER REFERENCES treinamentos(id_treinamento),

    pergunta TEXT NOT NULL,

    alternativa_a TEXT,

    alternativa_b TEXT,

    alternativa_c TEXT,

    alternativa_d TEXT,

    resposta_correta CHAR(1)

);



-- ==========================================
-- AVALIAÇÕES PRÁTICAS
-- ==========================================

CREATE TABLE avaliacoes_praticas (

    id_avaliacao SERIAL PRIMARY KEY,

    id_funcionario INTEGER REFERENCES funcionarios(id_funcionario),

    id_competencia INTEGER REFERENCES competencias(id_competencia),

    avaliador VARCHAR(100),

    resultado VARCHAR(30),

    observacao TEXT,

    data_avaliacao DATE

);



-- ==========================================
-- CERTIFICADOS
-- ==========================================

CREATE TABLE certificados (

    id_certificado SERIAL PRIMARY KEY,

    id_funcionario INTEGER REFERENCES funcionarios(id_funcionario),

    id_treinamento INTEGER REFERENCES treinamentos(id_treinamento),

    data_emissao DATE,

    codigo_validacao VARCHAR(100)

);



-- ==========================================
-- NOTIFICAÇÕES
-- ==========================================

CREATE TABLE notificacoes (

    id_notificacao SERIAL PRIMARY KEY,

    id_usuario INTEGER REFERENCES usuarios(id_usuario),

    mensagem TEXT,

    tipo VARCHAR(50),

    lida BOOLEAN DEFAULT FALSE,

    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- ==========================================
-- AUDITORIA DO SISTEMA
-- ==========================================

CREATE TABLE auditoria (

    id_log SERIAL PRIMARY KEY,

    usuario VARCHAR(100),

    acao VARCHAR(200),

    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
