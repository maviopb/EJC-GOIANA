
import { auth, db } from "../js/firebase-config.js";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// ELEMENTOS DA PÁGINA
const $ = id => document.getElementById(id);

const telaLogin = $("tela-login");
const painel = $("painel");
const mensagem = $("mensagem");
const lista = $("lista-eventos");

let eventoEditando = null;
let eventosCarregados = [];

function avisar(texto) {
  mensagem.textContent = texto;
}

function limparFormulario() {
  $("form-evento").reset();
  $("publicado").checked = true;
  $("titulo-form").textContent = "Cadastrar evento";
  $("salvar").textContent = "Publicar evento";
  $("cancelar").hidden = true;
  eventoEditando = null;
}

function mostrarErro(erro) {
  console.error(erro);

  if (
    erro.code === "permission-denied" ||
    erro.code === "auth/invalid-credential"
  ) {
    avisar("Acesso negado ou credenciais inválidas.");
  } else {
    avisar("Não foi possível concluir a operação. Tente novamente.");
  }
}

// LOGIN
$("form-login").addEventListener("submit", async event => {
  event.preventDefault();

  const botao = event.target.querySelector("button");
  botao.disabled = true;

  try {
    await signInWithEmailAndPassword(
      auth,
      $("email").value.trim(),
      $("senha").value
    );

    $("senha").value = "";
    avisar("");
  } catch (erro) {
    mostrarErro(erro);
  } finally {
    botao.disabled = false;
  }
});

// SAIR
$("sair").addEventListener("click", async () => {
  try {
    await signOut(auth);
    avisar("");
  } catch (erro) {
    mostrarErro(erro);
  }
});

// VERIFICAR AUTENTICAÇÃO
onAuthStateChanged(auth, async usuario => {
  telaLogin.hidden = Boolean(usuario);
  painel.hidden = !usuario;
  $("sair").hidden = !usuario;

  if (usuario) {
    await carregarEventos();
  } else {
    eventosCarregados = [];
    lista.replaceChildren();
    limparFormulario();
  }
});

// CARREGAR EVENTOS
async function carregarEventos() {
  lista.textContent = "Carregando eventos...";

  try {
    const resultado = await getDocs(collection(db, "eventos"));

    eventosCarregados = resultado.docs.map(documento => ({
      id: documento.id,
      ...documento.data()
    }));

    eventosCarregados.sort((a, b) =>
      (a.data || "").localeCompare(b.data || "")
    );

    renderizarEventos();
  } catch (erro) {
    lista.textContent = "Não foi possível carregar os eventos.";
    mostrarErro(erro);
  }
}

// MOSTRAR EVENTOS
function renderizarEventos() {
  lista.replaceChildren();

  if (eventosCarregados.length === 0) {
    lista.textContent = "Nenhum evento cadastrado.";
    return;
  }

  eventosCarregados.forEach(evento => {
    const item = document.createElement("article");
    item.className = "evento-item";

    const estado = document.createElement("span");
    estado.className = "estado";
    estado.textContent = evento.publicado
      ? "PUBLICADO"
      : "RASCUNHO";

    const titulo = document.createElement("h3");
    titulo.textContent = evento.titulo || "Sem título";

    const detalhes = document.createElement("p");
    detalhes.textContent = [
      evento.data,
      evento.hora,
      evento.local
    ].filter(Boolean).join(" • ");

    const acoes = document.createElement("div");
    acoes.className = "evento-acoes";

    const editar = document.createElement("button");
    editar.type = "button";
    editar.className = "botao-secundario";
    editar.textContent = "Editar";
    editar.addEventListener("click", () => editarEvento(evento));

    const excluir = document.createElement("button");
    excluir.type = "button";
    excluir.className = "botao-secundario";
    excluir.textContent = "Excluir";
    excluir.addEventListener("click", () => excluirEvento(evento));

    acoes.append(editar, excluir);
    item.append(estado, titulo, detalhes, acoes);
    lista.appendChild(item);
  });
}

// SALVAR EVENTO
$("form-evento").addEventListener("submit", async event => {
  event.preventDefault();

  const botao = $("salvar");
  botao.disabled = true;

  const dados = {
    titulo: $("titulo").value.trim(),
    data: $("data").value,
    hora: $("hora").value,
    local: $("local").value.trim(),
    tipo: $("tipo").value,
    descricao: $("descricao").value.trim(),
    link: $("link").value.trim(),
    publicado: $("publicado").checked
  };

  try {
    if (eventoEditando) {
      await updateDoc(
        doc(db, "eventos", eventoEditando),
        dados
      );
      avisar("Evento atualizado com sucesso!");
    } else {
      await addDoc(collection(db, "eventos"), dados);
      avisar("Evento cadastrado com sucesso!");
    }

    limparFormulario();
    await carregarEventos();
  } catch (erro) {
    mostrarErro(erro);
  } finally {
    botao.disabled = false;
  }
});

// EDITAR EVENTO
function editarEvento(evento) {
  eventoEditando = evento.id;

  $("titulo").value = evento.titulo || "";
  $("data").value = evento.data || "";
  $("hora").value = evento.hora || "";
  $("local").value = evento.local || "";
  $("tipo").value = evento.tipo || "ENCONTRO";
  $("descricao").value = evento.descricao || "";
  $("link").value = evento.link || "";
  $("publicado").checked = evento.publicado === true;

  $("titulo-form").textContent = "Editar evento";
  $("salvar").textContent = "Salvar alterações";
  $("cancelar").hidden = false;

  $("form-evento").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// CANCELAR EDIÇÃO
$("cancelar").addEventListener("click", limparFormulario);

// EXCLUIR EVENTO
async function excluirEvento(evento) {
  const confirmou = confirm(
    `Deseja realmente excluir "${evento.titulo}"?`
  );

  if (!confirmou) return;

  try {
    await deleteDoc(doc(db, "eventos", evento.id));

    if (eventoEditando === evento.id) {
      limparFormulario();
    }

    avisar("Evento excluído com sucesso!");
    await carregarEventos();
  } catch (erro) {
    mostrarErro(erro);
  }
}
