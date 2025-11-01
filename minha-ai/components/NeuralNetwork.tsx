'use client'

import { useState, useEffect } from 'react'

interface Neuron {
  id: string
  layer: number
  index: number
  value: number
}

interface Connection {
  from: string
  to: string
  weight: number
  active: boolean
}

export default function NeuralNetwork() {
  const [neurons, setNeurons] = useState<Neuron[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [inputValues, setInputValues] = useState([0.5, 0.8, 0.3])

  // Inicializa a rede neural
  useEffect(() => {
    const layers = [3, 4, 4, 2] // Input, Hidden1, Hidden2, Output
    const newNeurons: Neuron[] = []
    const newConnections: Connection[] = []

    // Cria neurônios
    layers.forEach((count, layerIndex) => {
      for (let i = 0; i < count; i++) {
        newNeurons.push({
          id: `L${layerIndex}N${i}`,
          layer: layerIndex,
          index: i,
          value: layerIndex === 0 ? inputValues[i] || 0 : 0
        })
      }
    })

    // Cria conexões entre camadas
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayer = newNeurons.filter(n => n.layer === l)
      const nextLayer = newNeurons.filter(n => n.layer === l + 1)

      currentLayer.forEach(from => {
        nextLayer.forEach(to => {
          newConnections.push({
            from: from.id,
            to: to.id,
            weight: Math.random() * 2 - 1,
            active: false
          })
        })
      })
    }

    setNeurons(newNeurons)
    setConnections(newConnections)
  }, [])

  const activateNetwork = async () => {
    setIsAnimating(true)

    // Atualiza valores de entrada
    const updatedNeurons = [...neurons]
    inputValues.forEach((val, idx) => {
      const neuron = updatedNeurons.find(n => n.layer === 0 && n.index === idx)
      if (neuron) neuron.value = val
    })
    setNeurons(updatedNeurons)

    // Propaga através das camadas
    for (let layer = 0; layer < 3; layer++) {
      const currentLayerNeurons = updatedNeurons.filter(n => n.layer === layer)
      const nextLayerNeurons = updatedNeurons.filter(n => n.layer === layer + 1)

      // Ativa conexões
      const layerConnections = connections.filter(c => 
        currentLayerNeurons.some(n => n.id === c.from)
      )
      
      setConnections(prev => prev.map(c => ({
        ...c,
        active: layerConnections.some(lc => lc.from === c.from && lc.to === c.to)
      })))

      await new Promise(resolve => setTimeout(resolve, 500))

      // Calcula valores da próxima camada
      nextLayerNeurons.forEach(nextNeuron => {
        let sum = 0
        currentLayerNeurons.forEach(currentNeuron => {
          const connection = connections.find(
            c => c.from === currentNeuron.id && c.to === nextNeuron.id
          )
          if (connection) {
            sum += currentNeuron.value * connection.weight
          }
        })
        // Função de ativação sigmoid
        nextNeuron.value = 1 / (1 + Math.exp(-sum))
      })

      setNeurons([...updatedNeurons])
    }

    // Desativa todas as conexões
    await new Promise(resolve => setTimeout(resolve, 500))
    setConnections(prev => prev.map(c => ({ ...c, active: false })))
    setIsAnimating(false)
  }

  const getLayerName = (layer: number) => {
    const names = ['Entrada', 'Oculta 1', 'Oculta 2', 'Saída']
    return names[layer]
  }

  const getNeuronColor = (value: number) => {
    const intensity = Math.floor(value * 255)
    return `rgb(${intensity}, ${100 + intensity / 2}, ${255})`
  }

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">🧠 Visualizador de Rede Neural</h3>
        <p className="text-purple-100">
          Veja como uma rede neural processa informações através de suas camadas. 
          Ajuste os valores de entrada e observe a propagação dos dados!
        </p>
      </div>

      {/* Controls */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
        <h4 className="text-white font-bold text-lg mb-4">⚙️ Controles de Entrada</h4>
        <div className="space-y-4">
          {inputValues.map((value, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-purple-300">
                <label>Entrada {idx + 1}</label>
                <span className="font-mono">{value.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={value}
                onChange={(e) => {
                  const newValues = [...inputValues]
                  newValues[idx] = parseFloat(e.target.value)
                  setInputValues(newValues)
                  
                  // Atualiza neurônios de entrada
                  setNeurons(prev => prev.map(n => 
                    n.layer === 0 && n.index === idx 
                      ? { ...n, value: newValues[idx] }
                      : n
                  ))
                }}
                disabled={isAnimating}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          ))}
        </div>
        
        <button
          onClick={activateNetwork}
          disabled={isAnimating}
          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnimating ? '⚡ Processando...' : '🚀 Ativar Rede Neural'}
        </button>
      </div>

      {/* Neural Network Visualization */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 overflow-x-auto">
        <div className="min-w-[800px]">
          <svg width="100%" height="400" className="mx-auto">
            {/* Desenha conexões */}
            {connections.map((conn, idx) => {
              const fromNeuron = neurons.find(n => n.id === conn.from)
              const toNeuron = neurons.find(n => n.id === conn.to)
              
              if (!fromNeuron || !toNeuron) return null

              const x1 = 100 + fromNeuron.layer * 200
              const y1 = 50 + fromNeuron.index * 80 + (fromNeuron.layer === 0 ? 40 : 0)
              const x2 = 100 + toNeuron.layer * 200
              const y2 = 50 + toNeuron.index * 80

              return (
                <line
                  key={idx}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={conn.active ? '#a855f7' : '#334155'}
                  strokeWidth={conn.active ? '2' : '1'}
                  opacity={conn.active ? '0.8' : '0.2'}
                  className="transition-all duration-300"
                />
              )
            })}

            {/* Desenha neurônios */}
            {neurons.map((neuron) => {
              const x = 100 + neuron.layer * 200
              const y = 50 + neuron.index * 80 + (neuron.layer === 0 ? 40 : 0)

              return (
                <g key={neuron.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r="20"
                    fill={getNeuronColor(neuron.value)}
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  <text
                    x={x}
                    y={y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {neuron.value.toFixed(2)}
                  </text>
                </g>
              )
            })}

            {/* Labels das camadas */}
            {[0, 1, 2, 3].map((layer) => (
              <text
                key={layer}
                x={100 + layer * 200}
                y={20}
                textAnchor="middle"
                fill="#a78bfa"
                fontSize="14"
                fontWeight="bold"
              >
                {getLayerName(layer)}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
        <h4 className="text-white font-bold text-lg mb-3">📚 Como Funciona?</h4>
        <div className="space-y-2 text-purple-200">
          <p>• <strong>Camada de Entrada:</strong> Recebe os dados iniciais (3 neurônios)</p>
          <p>• <strong>Camadas Ocultas:</strong> Processam e transformam os dados (4 neurônios cada)</p>
          <p>• <strong>Camada de Saída:</strong> Produz o resultado final (2 neurônios)</p>
          <p>• <strong>Conexões:</strong> Cada linha representa um peso que multiplica o valor</p>
          <p>• <strong>Ativação:</strong> Função sigmoid transforma a soma em valor entre 0 e 1</p>
        </div>
      </div>
    </div>
  )
}
