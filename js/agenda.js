
import { db } from "./firebase-config.js";

import {
  collection,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const lista = document.getElementById("agenda-lista");
const tituloMes = document.getElementById("agenda-mes-titulo");
const anterior = document.getElementById("agenda-anterior");
const proximo = document.getElementById("agenda-proximo");

if (lista && tituloMes && anterior && proximo) {

  const hoje = new Date();
  let mes = hoje.getMonth();
  let ano = hoje.getFullYear();
  let eventos = [];

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const mesesCurtos = [
    "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
    "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
  ];

  function elemento(tag, classe, conteudo) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (conteudo !== undefined) el.textContent = conteudo;
    return el;
  }

  function renderizar() {
    tituloMes.textContent = `${meses[mes]} ${ano}`;
    lista.replaceChildren();

    const eventosMes = eventos
      .filter(e => {
        if (typeof e.data !== "string") return false;
        const partes = e.data.split("-").map(Number);
        return partes.length === 3 &&
          partes[0] === ano &&
          partes[1] === mes + 1;
      })
      .sort((a, b) =>
        `${a.data} ${a.hora || ""}`.localeCompare(
          `${b.data} ${b.hora || ""}`
        )
      );

    if (!eventosMes.length) {
      const vazio = elemento("div", "agenda-vazia");
      vazio.append(
        elemento("span", "", "✦"),
        elemento("h4", "", "Nenhum evento neste mês."),
        elemento("p", "", "Em breve, novos encontros.")
      );
      lista.appendChild(vazio);
      return;
    }

    eventosMes.forEach(e => {
      const card = elemento("article", "agenda-evento");
      const data = elemento("div", "agenda-data");
      const partes = e.data.split("-").map(Number);

      data.append(
        elemento("strong", "", String(partes[2]).padStart(2, "0")),
        elemento("span", "", mesesCurtos[partes[1] - 1])
      );

      const conteudo = elemento(
        "div", "agenda-evento-conteudo"
      );

      conteudo.append(
        elemento("span", "agenda-tipo", e.tipo || "EVENTO"),
        elemento("h4", "", e.titulo || "Evento")
      );

      const detalhes = [
        e.hora ? `🕒 ${e.hora}` : "",
        e.local ? `📍 ${e.local}` : ""
      ].filter(Boolean).join(" • ");

      if (detalhes) {
        conteudo.appendChild(elemento("p", "", detalhes));
      }

      if (e.descricao) {
        conteudo.appendChild(
          elemento("p", "agenda-descricao", e.descricao)
        );
      }

      if (e.link) {
        try {
          const url = new URL(e.link);

          if (["https:", "http:"].includes(url.protocol)) {
            const link = elemento(
              "a", "agenda-link", "Ver localização ↗"
            );
            link.href = url.href;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            conteudo.appendChild(link);
          }
        } catch {
          console.warn("Link de evento inválido.");
        }
      }

      card.append(data, conteudo);
      lista.appendChild(card);
    });
  }

  anterior.addEventListener("click", () => {
    mes--;
    if (mes < 0) {
      mes = 11;
      ano--;
    }
    renderizar();
  });

  proximo.addEventListener("click", () => {
    mes++;
    if (mes > 11) {
      mes = 0;
      ano++;
    }
    renderizar();
  });

  lista.textContent = "Carregando programação...";

  const consulta = query(
    collection(db, "eventos"),
    where("publicado", "==", true)
  );

  onSnapshot(consulta, resultado => {
    eventos = resultado.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    renderizar();
  }, erro => {
    console.error(erro);
    lista.textContent =
      "Não foi possível carregar a programação.";
  });
}
