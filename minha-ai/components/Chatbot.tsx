'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Olá! Sou sua IA assistente. Posso responder perguntas sobre inteligência artificial, machine learning e muito mais! Como posso ajudar?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Respostas inteligentes baseadas em palavras-chave
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('hello')) {
      return 'Olá! É ótimo conversar com você! Como posso ajudar no seu aprendizado sobre IA hoje?'
    }
    
    if (lowerMessage.includes('o que é ia') || lowerMessage.includes('o que é inteligência artificial')) {
      return 'Inteligência Artificial (IA) é a capacidade de máquinas realizarem tarefas que normalmente requerem inteligência humana, como aprendizado, raciocínio, percepção e tomada de decisões. Existem vários tipos: IA fraca (específica para uma tarefa) e IA forte (inteligência geral).'
    }
    
    if (lowerMessage.includes('machine learning') || lowerMessage.includes('aprendizado de máquina')) {
      return 'Machine Learning é um subcampo da IA onde sistemas aprendem e melhoram automaticamente através da experiência, sem serem explicitamente programados. Existem 3 tipos principais: Supervisionado (com dados rotulados), Não-supervisionado (encontra padrões) e Por Reforço (aprende por tentativa e erro).'
    }
    
    if (lowerMessage.includes('rede neural') || lowerMessage.includes('neural network')) {
      return 'Redes Neurais são modelos inspirados no cérebro humano, compostos por camadas de neurônios artificiais conectados. Cada neurônio processa informações e passa para a próxima camada. Deep Learning usa redes neurais profundas (muitas camadas) para resolver problemas complexos como reconhecimento de imagem e processamento de linguagem.'
    }
    
    if (lowerMessage.includes('como criar') || lowerMessage.includes('como fazer')) {
      return 'Para criar sua própria IA, você pode: 1) Aprender Python (linguagem mais usada), 2) Estudar bibliotecas como TensorFlow, PyTorch ou scikit-learn, 3) Entender matemática básica (álgebra linear, cálculo), 4) Praticar com datasets públicos (Kaggle é ótimo!), 5) Começar com projetos simples e ir evoluindo!'
    }
    
    if (lowerMessage.includes('python') || lowerMessage.includes('linguagem')) {
      return 'Python é a linguagem mais popular para IA! Principais bibliotecas: TensorFlow e PyTorch (deep learning), scikit-learn (ML tradicional), Pandas (manipulação de dados), NumPy (computação numérica), e Matplotlib (visualização). É fácil de aprender e tem uma comunidade enorme!'
    }
    
    if (lowerMessage.includes('dataset') || lowerMessage.includes('dados')) {
      return 'Dados são o combustível da IA! Você precisa de datasets para treinar modelos. Fontes populares: Kaggle (competições e datasets), UCI ML Repository, Google Dataset Search, e datasets públicos de empresas. Lembre-se: qualidade > quantidade!'
    }
    
    if (lowerMessage.includes('aplicação') || lowerMessage.includes('usar') || lowerMessage.includes('exemplo')) {
      return 'IA tem aplicações incríveis: reconhecimento facial, assistentes virtuais (Siri, Alexa), carros autônomos, diagnóstico médico, recomendações (Netflix, Spotify), tradução automática, detecção de fraudes, jogos (AlphaGo), e muito mais! As possibilidades são infinitas!'
    }
    
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('valeu')) {
      return 'Por nada! Estou aqui para ajudar você a aprender sobre IA. Tem mais alguma dúvida? 😊'
    }

    // Resposta padrão
    const defaultResponses = [
      'Interessante pergunta! IA é um campo vasto. Posso explicar sobre redes neurais, machine learning, ou aplicações práticas. O que te interessa mais?',
      'Ótima questão! Para te ajudar melhor, você pode perguntar sobre: conceitos de IA, como criar modelos, linguagens de programação, ou aplicações práticas.',
      'Hmm, não tenho certeza sobre isso especificamente, mas posso te ajudar com: fundamentos de IA, machine learning, redes neurais, ou como começar a programar IA!',
      'Essa é uma área fascinante! Você gostaria de saber mais sobre os fundamentos de IA, ferramentas práticas, ou exemplos de aplicações?'
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simula tempo de processamento da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(input),
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Assistente IA</h3>
            <p className="text-purple-100 text-sm">Online • Sempre pronto para ajudar</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-slate-700 text-purple-100'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className="text-xs mt-2 opacity-70">
                {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-700 rounded-2xl p-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-purple-500/20 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta sobre IA..."
            className="flex-1 bg-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-300/50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
        <p className="text-purple-300/50 text-xs mt-2 text-center">
          Pressione Enter para enviar • Shift+Enter para nova linha
        </p>
      </div>
    </div>
  )
}
