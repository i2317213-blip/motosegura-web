import React, { useEffect, useState } from 'react'
import MapView from './components/MapView'
import { initializeFirebase, db } from './firebaseConfig'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

initializeFirebase()

export default function App(){
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const q = query(collection(db,'sosAlerts'), orderBy('timestamp','desc'))
    const unsub = onSnapshot(q, snapshot=>{
      const docs = snapshot.docs.map(d=>({ id: d.id, ...d.data() }))
      setAlerts(docs)
      setLoading(false)
    }, err=>{
      console.error('Firestore err', err)
      setLoading(false)
    })
    return ()=> unsub()
  },[])

  return (
    <div className="container">
      <header>
        <h1>MotoSegura - Panel SOS</h1>
        <p>Panel en tiempo real: alertas recibidas desde la app móvil</p>
      </header>
      <main>
        <section className="map-section">
          <MapView alerts={alerts} />
        </section>
        <aside className="list-section">
          <h2>Alertas recientes</h2>
          {loading && <p>cargando...</p>}
          {!loading && alerts.length===0 && <p>No hay alertas.</p>}
          <ul>
            {alerts.map(a=>(
              <li key={a.id}>
                <strong>{a.userId || 'Usuario anónimo'}</strong><br/>
                {a.timestamp && typeof a.timestamp === 'object' && a.timestamp.toDate ? a.timestamp.toDate().toLocaleString() : (a.timestamp? new Date(a.timestamp).toLocaleString() : '')}<br/>
                Lat: {a.lat?.toFixed(5)} Lng: {a.lng?.toFixed(5)}<br/>
                Estado: {a.acknowledged ? 'Atendida' : 'Pendiente'}
              </li>
            ))}
          </ul>
        </aside>
      </main>
      <footer>
        <p>Panel de administración - MotoSegura (prototipo)</p>
      </footer>
    </div>
  )
}
