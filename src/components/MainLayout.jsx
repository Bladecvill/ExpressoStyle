// src/components/MainLayout.jsx (CORRIGIDO)

import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CardsResumoContainer from "./CardsResumoContainer";
// 1. IMPORTAR O CSS MODULE (Agora ele existe!)
import styles from "./MainLayout.module.css";

function MainLayout() {
  const { utilizador, logout } = useAuth();

  // 2. DEFINIR A FUNÇÃO (Corrigindo o erro 'getNavLinkClass is not defined')
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
  };

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.logoArea}>
        <NavLink to="/HomePage" className={styles.logoLink}>
          Expresso Finance
        </NavLink>
        {/* Botao sair */}
        <div className={styles.userArea}>
          <button onClick={logout} className="btn-sair">
            Sair
          </button>
        </div>
      </div>

      {/* A navegação correta */}
      <nav className={styles.navArea}>
        <ul className={styles.navTabs}>
          <li>
            <NavLink to="/" end className={getNavLinkClass}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/contas" className={getNavLinkClass}>
              Minhas Contas
            </NavLink>
          </li>
          <li>
            <NavLink to="/transacoes" className={getNavLinkClass}>
              Transações
            </NavLink>
          </li>
          <li>
            <NavLink to="/metas" className={getNavLinkClass}>
              Metas
            </NavLink>
          </li>
          <li>
            <NavLink to="/transferencias" className={getNavLinkClass}>
              Transferências
            </NavLink>
          </li>
          <li>
            <NavLink to="/perfil" className={getNavLinkClass}>
              Perfil
            </NavLink>
          </li>
          <li>
            <NavLink to="/relatorios" className={getNavLinkClass}>
              Relatórios
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* O conteúdo principal */}
      <main className={styles.mainContent}>
        <CardsResumoContainer />
        <hr />
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
