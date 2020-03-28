import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import LogoImg from "../../assets/logo.svg";
import "./styles.css";
import api from "../../services/api";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  async function handleDeleteIncidents(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incidents => incidents.id !== id));
    } catch {
      alert("Erro ao deletar caso");
    }
  }

  function handleLougout() {
    localStorage.clear();
    history.push("/");
  }

  useEffect(() => {
    api
      .get("/profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);
  return (
    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="Be the Hero" />
        <span>Bem vindo {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo Caso
        </Link>
        <button
          type="button"
          onClick={() => {
            handleLougout();
          }}
        >
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incidentes => (
          <li key={incidentes.id}>
            <strong>CASO: </strong>
            <p>{incidentes.title}</p>
            <strong>DESCRIÇÃO: </strong>
            <p>{incidentes.description}</p>
            <strong>VALOR: </strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incidentes.value)}
            </p>
            <button
              onClick={() => {
                handleDeleteIncidents(incidentes.id);
              }}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
