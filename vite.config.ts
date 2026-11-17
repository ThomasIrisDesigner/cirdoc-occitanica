import os from 'node:os'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function lanIpv4() {
  const candidates: string[] = []
  for (const list of Object.values(os.networkInterfaces())) {
    for (const net of list ?? []) {
      const family = String(net.family)
      if ((family === 'IPv4' || family === '4') && !net.internal) candidates.push(net.address)
    }
  }
  return (
    candidates.find(
      (ip) => ip.startsWith('192.168.') || ip.startsWith('10.') || /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip),
    ) ??
    candidates[0] ??
    ''
  )
}

function lanPreviewPlugin(): Plugin {
  return {
    name: 'lan-preview',
    configureServer(server) {
      server.middlewares.use('/__lan.json', (_req, res) => {
        const address = server.httpServer?.address()
        const port = typeof address === 'object' && address ? address.port : 5173
        const ip = lanIpv4()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ url: ip ? `http://${ip}:${port}/` : '' }))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), lanPreviewPlugin()],
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

