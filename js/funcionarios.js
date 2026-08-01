const API='https://treinaccgl-backend.onrender.com/funcionarios';
window.onload=listarFuncionarios;
async function cadastrarFuncionario(){
 const f={nome:nome.value,matricula:matricula.value,cargo:cargo.value,id_turno:turno.value,id_setor:setor.value,status:status.value,data_admissao:admissao.value};
 const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(f)});
 if(!r.ok){alert('Erro ao cadastrar');return;}
 alert('Funcionário cadastrado!');
 listarFuncionarios();
}
async function listarFuncionarios(){
 const r=await fetch(API); const dados=await r.json();
 const filtro=(busca.value||'').toLowerCase();
 listaFuncionarios.innerHTML='';
 dados.filter(f=>(f.nome||'').toLowerCase().includes(filtro)||(f.matricula||'').includes(filtro))
 .forEach(f=>listaFuncionarios.innerHTML+=`<tr><td>${f.matricula}</td><td>${f.nome}</td><td>${f.cargo}</td><td>${f.nome_setor||'Laboratório'}</td><td>${f.nome_turno||f.id_turno}</td><td>${f.status}</td></tr>`);
}
