'use client'

import { useState } from 'react'
import Chatbot from '@/components/Chatbot'
import NeuralNetwork from '@/components/NeuralNetwork'
import MLExamples from '@/components/MLExamples'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chat' | 'neural' | 'examples'>('chat')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <h1 className="text-3xl font-bold text-white">Minha IA</h1>
            </div>
            <div className="text-purple-300 text-sm">
              Aprenda e crie sua própria Inteligência Artificial
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Crie sua Própria <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Inteligência Artificial</span>
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Explore conceitos de IA, treine modelos e interaja com chatbots inteligentes
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
            }`}
          >
            💬 Chatbot IA
          </button>
          <button
            onClick={() => setActiveTab('neural')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'neural'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
            }`}
          >
            🧠 Rede Neural
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'examples'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
            }`}
          >
            🎯 Exemplos ML
          </button>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'chat' && <Chatbot />}
          {activeTab === 'neural' && <NeuralNetwork />}
          {activeTab === 'examples' && <MLExamples />}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-slate-900/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-6 text-center text-purple-300">
          <p>Criado com 💜 para aprender Inteligência Artificial</p>
        </div>
      </footer>
    </div>
  )
}
