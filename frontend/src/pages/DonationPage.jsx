"use client"

import { useState } from "react"
import { Heart, Coffee, Gift, CreditCard, QrCode, Copy, Check, DollarSign } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useToast } from "../components/ui/Toast"
import "../styles/DonationPage.css"
import qrCodePix from '../assets/qrcode_pix.png';

export function DonationPage() {
  const { showSuccess, showError } = useToast()
  const [copiedMethod, setCopiedMethod] = useState(null)

  // Métodos de pagamento disponíveis
  const donationMethods = [
    {
      id: "pix",
      title: "PIX",
      description: "Transferência instantânea",
      icon: <QrCode size={24} />,
      color: "var(--primary)",
      details: {
        chave: "af72c238-0345-45e4-95c7-27471b999436", // Chave PIX UUID
        nome: "João Vitor",
        qrCode: qrCodePix // Imagem importada corretamente
      }
    },
    {
      id: "nubank",
      title: "Nubank",
      description: "Transferência bancária",
      icon: <CreditCard size={24} />,
      color: "#8A05BE",
      details: {
        banco: "0260",
        agencia: "0001",
        conta: "88555295-2",
        tipo: "Corrente",
        nome: "João Vitor"
      }
    }
  ]

  // Valores sugeridos para doação
  const donationAmounts = [
    { value: 5, label: "R$ 5", icon: <Coffee size={16} /> },
    { value: 10, label: "R$ 10", icon: <Heart size={16} /> },
    { value: 20, label: "R$ 20", icon: <Gift size={16} /> },
    { value: 50, label: "R$ 50", icon: <Gift size={16} /> }
  ];
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState("");

  // Gerenciar valor personalizado
  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    setSelectedAmount(Number(value) || "");
  };

  const [selectedMethod, setSelectedMethod] = useState(null)

  // Copiar dados para área de transferência
  const copyToClipboard = async (text, methodId) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMethod(methodId)
      showSuccess("Copiado para a área de transferência!")
      setTimeout(() => setCopiedMethod(null), 2000)
    } catch (error) {
      showError("Erro ao copiar para a área de transferência")
    }
  }

  const handleDonation = (method) => {
    setSelectedMethod(method)
  }

  return (
    <div className="donation-page">
      {/* Cabeçalho da página */}
      <div className="donation-header">
        <div className="donation-heart">
          <Heart size={32} fill="var(--primary)" color="var(--primary)" />
        </div>
        <h1 className="donation-title">Apoie o Projeto</h1>
        <p className="donation-subtitle">
          Este sistema de controle financeiro é gratuito e de código aberto. 
          Se ele te ajudou, considere fazer uma doação para manter o projeto ativo!
        </p>
      </div>

      {/* Seleção de valores */}
      <div className="donation-amounts">
        <h3>Escolha um valor:</h3>
        <div className="amount-grid">
          {donationAmounts.map((amount) => (
            <button
              key={amount.value}
              className={`amount-button ${selectedAmount === amount.value && !customAmount ? 'selected' : ''}`}
              onClick={() => { setSelectedAmount(amount.value); setCustomAmount(""); }}
            >
              {amount.icon}
              <span>{amount.label}</span>
            </button>
          ))}
          <div
            className={`amount-button amount-input-wrapper ${customAmount ? 'selected' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <DollarSign size={16} />
            <input
              type="text"
              className="amount-input"
              placeholder="Outro valor"
              value={customAmount}
              onChange={handleCustomAmountChange}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                width: 60,
                fontSize: 16
              }}
            />
          </div>
        </div>
      </div>

      {/* Métodos de pagamento */}
      <div className="donation-methods">
        <h3>Escolha uma forma de pagamento:</h3>
        <div className="methods-grid">
          {donationMethods.map((method) => (
            <div key={method.id} className="method-card">
              <div 
                className="method-header"
                style={{ backgroundColor: method.color }}
              >
                {method.icon}
                <h4>{method.title}</h4>
              </div>
              <div className="method-content">
                <p>{method.description}</p>
                <Button 
                  onClick={() => handleDonation(method)}
                  style={{ backgroundColor: method.color }}
                >
                  Doar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal com detalhes do pagamento */}
      {selectedMethod && (
        <div className="donation-modal-overlay" onClick={() => setSelectedMethod(null)}>
          <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalhes para {selectedMethod.title}</h3>
              <button 
                className="close-button"
                onClick={() => setSelectedMethod(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              {selectedMethod.id === "pix" && (
                <div className="pix-details">
                  <div className="qr-code-section">
                    <img 
                      src={selectedMethod.details.qrCode} 
                      alt="QR Code PIX" 
                      className="qr-code"
                    />
                    <p>Escaneie o QR Code acima</p>
                  </div>
                  
                  <div className="pix-keys">
                    <div className="key-item">
                      <label>Chave PIX:</label>
                      <div className="copy-field">
                        <span>{selectedMethod.details.chave}</span>
                        <button
                          onClick={() => copyToClipboard(selectedMethod.details.chave, 'pix-chave')}
                          className="copy-button"
                        >
                          {copiedMethod === 'pix-chave' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="key-item">
                      <label>Nome:</label>
                      <div className="copy-field">
                        <span>{selectedMethod.details.nome}</span>
                        <button
                          onClick={() => copyToClipboard(selectedMethod.details.nome, 'pix-nome')}
                          className="copy-button"
                        >
                          {copiedMethod === 'pix-nome' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod.id === "nubank" && (
                <div className="nubank-details">
                  <div className="bank-info">
                    <h4>Dados Bancários</h4>
                    <div className="bank-details">
                      <div className="detail-item">
                        <label>Banco:</label>
                        <span>{selectedMethod.details.banco}</span>
                      </div>
                      <div className="detail-item">
                        <label>Agência:</label>
                        <div className="copy-field">
                          <span>{selectedMethod.details.agencia}</span>
                          <button
                            onClick={() => copyToClipboard(selectedMethod.details.agencia, 'nubank-agencia')}
                            className="copy-button"
                          >
                            {copiedMethod === 'nubank-agencia' ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>
                      <div className="detail-item">
                        <label>Conta:</label>
                        <div className="copy-field">
                          <span>{selectedMethod.details.conta}</span>
                          <button
                            onClick={() => copyToClipboard(selectedMethod.details.conta, 'nubank-conta')}
                            className="copy-button"
                          >
                            {copiedMethod === 'nubank-conta' ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>
                      <div className="detail-item">
                        <label>Tipo:</label>
                        <span>{selectedMethod.details.tipo}</span>
                      </div>
                      <div className="detail-item">
                        <label>Nome:</label>
                        <div className="copy-field">
                          <span>{selectedMethod.details.nome}</span>
                          <button
                            onClick={() => copyToClipboard(selectedMethod.details.nome, 'nubank-nome')}
                            className="copy-button"
                          >
                            {copiedMethod === 'nubank-nome' ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Informações sobre doações */}
      <div className="donation-info">
        <h3>Por que doar?</h3>
        <div className="info-grid">
          <div className="info-item">
            <Heart size={20} />
            <h4>Mantenha o projeto ativo</h4>
            <p>Ajude a cobrir custos de servidor e domínio</p>
          </div>
          <div className="info-item">
            <Coffee size={20} />
            <h4>Desenvolvimento contínuo</h4>
            <p>Novas funcionalidades e melhorias</p>
          </div>
          <div className="info-item">
            <Gift size={20} />
            <h4>Gratuito para sempre</h4>
            <p>O sistema continuará gratuito para todos</p>
          </div>
        </div>
      </div>
    </div>
  )
} 