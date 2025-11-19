// src/pages/ContasPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import FormCriarConta from '../components/FormCriarConta';
import ModalEditarConta from '../components/ModalEditarConta';
import axios from 'axios';
// IMPORTANTE: Importe os estilos do módulo
import styles from './ContasPage.module.css';

const API_BASE_URL = 'http://localhost:8080/api';

function ContasPage() {
  const { contas, loading, refreshContas } = useData();
  const { utilizador } = useAuth();
  const [contaParaEditar, setContaParaEditar] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem a certeza? Isso pode apagar o histórico desta conta.")) return;
    try {
      await axios.delete(`${API_BASE_URL}/contas/${id}`);
      alert("Conta excluída!");
      refreshContas();
    } catch (error) {
      alert("Erro ao excluir: " + error.message);
    }
  };

  if (loading) return <div>A carregar dados...</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Gestão de Contas</h2>
      </div>

      {/* --- NOVO LAYOUT: LADO A LADO --- */}
      <div className={styles.layoutGrid}>
        
        {/* COLUNA DA ESQUERDA: Formulário */}
        <div className={styles.formColumn}>
          <div className="card">
            {/* Título opcional dentro do card do formulário */}
            <h4 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Nova Conta</h4>
            <FormCriarConta
              clienteId={utilizador.id}
              onContaCriada={() => {
                refreshContas();
              }}
            />
          </div>
        </div>

        {/* COLUNA DA DIREITA: Lista de Carteiras */}
        <div className={styles.listColumn}>
          <h3 className={styles.sectionTitle}>Minhas Carteiras</h3>
          
          <ul className="contas-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', listStyle: 'none', padding: 0 }}>
            {contas.length > 0 ? (
              contas.map(conta => (
                <li key={conta.id} className="conta-item-card" style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderLeft: '5px solid var(--primary-color)' }}>
                  
                  <div className="conta-item-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{conta.nome}</h3>
                    <span className="conta-tipo" style={{ fontSize: '0.8rem', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>
                      {conta.tipo ? conta.tipo.replace('_', ' ') : 'Conta'}
                    </span>
                  </div>

                  <div 
                    className="conta-saldo"
                    style={{ color: conta.saldoAtual >= 0 ? '#2ecc71' : '#e74c3c', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px' }}
                  >
                    R$ {conta.saldoAtual.toFixed(2)}
                  </div>

                  <div className="conta-actions" style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      className="btn-editar"
                      style={{ flex: 1, padding: '5px', border: '1px solid #ddd', background: 'transparent', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={() => setContaParaEditar(conta)}
                    >
                      Editar
                    </button>
                    
                    <button 
                      className="btn-excluir"
                      style={{ flex: 1, padding: '5px', border: '1px solid #fee', background: '#fff5f5', color: 'red', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={() => handleDelete(conta.id)}
                    >
                      Excluir
                    </button>
                  </div>

                </li>
              ))
            ) : (
              <p>Nenhuma conta encontrada.</p>
            )}
          </ul>
        </div>

      </div>
      {/* --- FIM DO NOVO LAYOUT --- */}

      {/* MODAL DE EDIÇÃO */}
      {contaParaEditar && (
        <ModalEditarConta 
          conta={contaParaEditar}
          onClose={() => setContaParaEditar(null)}
          onSave={() => {
            refreshContas();
          }}
        />
      )}

    </div>
  );
}

export default ContasPage;