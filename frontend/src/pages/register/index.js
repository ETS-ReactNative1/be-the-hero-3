import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./style.css";
import Logoimg from "../../assets/logo.svg";

import api from "../../services/api";
import { wait } from "@testing-library/react";

export default function Register() {
  // Pegar as informaçãoes de cada input
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [city, setCity] = useState();
  const [uf, setUf] = useState();

  // Redirecionar o usuario para a página desejada
  const history = useHistory();

  // Evitar que a página seja carregada toda vex que clicar no botão cadastrar.
  async function handleRegister(e) {
    e.preventDefault();

    const data = { name, email, whatsapp, city, uf };

    // Enviar os dados para api para realizar o cadastro
    try {
      const res = await api.post("ongs", data);

      alert(`Seu ID de acesso: ${res.data.id}`);

      history.push("/"); // Redirecionar para página inicial
    } catch (error) {
      alert("Erro no cadastro, tente novamente!");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={Logoimg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
