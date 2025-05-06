import React, { useState } from 'react';

function ModuloContatti({ destinatarioEmail }) {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [via, setVia] = useState('');
  const [città, setCittà] = useState('');
  const [messaggio, setMessaggio] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [dimensioni, setDimensioni] = useState(Array(10).fill('')); // Dimensioni finestre
  const [materiale, setMateriale] = useState('Seleziona un accessorio'); // Materiale desiderato
  const [colore, setColore] = useState('seleziona un colore'); // Colore desiderato
  const [accessori, setAccessori] = useState(''); // Accessori desiderati
  const [invioStato, setInvioStato] = useState(null); // Stato dell'invio: null, 'inviando', 'successo', 'errore'

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!privacy) {
      setInvioStato('errore');
      alert('Devi accettare i termini e le condizioni sulla privacy.');
      return;
    }
    if (!nome || !cognome || !email) {
      setInvioStato('errore');
      alert('Nome, cognome ed email sono obbligatori.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInvioStato('errore');
      alert('Email non valida.');
      return;
    }
    const almenoUnaDimensioneInserita = dimensioni.some((val) => val.trim() !== '');
    if (!almenoUnaDimensioneInserita) {
      setInvioStato('errore');
      alert('Inserisci almeno una dimensione per i serramenti.');
      return;
    }

    setInvioStato('inviando');

    const formData = {
      nome,
      cognome,
      email,
      telefono,
      via,
      città,
      messaggio,
      dimensioni,
      materiale,
      colore,
      accessori,
      destinatarioEmail: destinatarioEmail, // Includi l'email di destinazione nei dati inviati
    };

    try {
      const response = await fetch('/api/invia-email', { // Crea un'API route in Next.js
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setInvioStato('successo');
        alert('La tua richiesta è stata inviata con successo!');
        // Resetta il form
        setNome('');
        setCognome('');
        setEmail('');
        setTelefono('');
        setVia('');
        setCittà('');
        setMessaggio('');
        setPrivacy(false);
        setDimensioni(Array(10).fill(''));
        setMateriale('Seleziona un materiale');
        setColore('Seleziona un colore');
        setAccessori('Seleziona un accessorio');
      } else {
        setInvioStato('errore');
        alert('Si è verificato un errore durante l\'invio della richiesta. Riprova più tardi.');
        console.error('Errore nell\'invio:', response);
        const errorData = await response.json();
        console.error('Dettagli errore:', errorData);
      }
    } catch (error) {
      setInvioStato('errore');
      alert('Si è verificato un errore durante l\'invio della richiesta. Riprova più tardi.');
      console.error('Errore durante la fetch:', error);
    } finally {
      // Puoi rimuovere questo se non vuoi resettare lo stato di invio
      // setTimeout(() => setInvioStato(null), 5000);
    }
  };

  const handleDimensioniChange = (index, value) => {
    const newDimensioni = [...dimensioni];
    newDimensioni[index] = value;
    setDimensioni(newDimensioni);
  };

  return (
    <section id="modulo-contatti" className="mx-auto max-w-7xl px-0">
      <div className="flex flex-col items-center justify-center">
        <div className="md:w-1/1 p-0 bg-brown rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">Compila tutti i campi</h3>
          <form className="space-y-0" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="dimensioni" className="block text-sm font-medium mb-2">
                Dimensioni serramenti
              </label>
              <div className="grid grid-cols-1 gap-4 mb-0">
                {dimensioni.map((dimensione, index) => (
                  <div key={index} className="flex items-center gap-8">
                    <label className="text-xs font-medium text-gray-700">
                      Finestra {index + 1}:
                    </label>
                    <input
                      type="text"
                      placeholder="Larghezza (cm)"
                      value={dimensione.split('x')[0] || ''}
                      onChange={(e) => handleDimensioniChange(index, `${e.target.value}x${dimensione.split('x')[1] || ''}`)}
                      style={{ width: "120px" }}
                      className="w-full p-2 border rounded bg-gray-700 text-white placeholder:text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Altezza (cm)"
                      value={dimensione.split('x')[1] || ''}
                      onChange={(e) => handleDimensioniChange(index, `${dimensione.split('x')[0] || ''}x${e.target.value}`)}
                      style={{ width: "120px" }}
                      className="w-full p-2 border rounded bg-gray-700 text-white placeholder:text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
            <label htmlFor="colore" className="block text-sm font-medium mb-2" style={{ marginRight: '10px' }}>
                Colore
              </label>
              <select
                id="colore"
                value={colore}
                onChange={(e) => setColore(e.target.value)}
                className="p-3 border rounded bg-gray-700 w-full"
              >
                <option value="">Seleziona un colore</option>
                <option value="legno">Legno</option>
                <option value="ral">Ral</option>
              </select>
              <label htmlFor="materiale" className="block text-sm font-medium mb-2" style={{ marginTop: '56px', marginRight: '10px' }}>
                Materiale
              </label>
              <select
                id="materiale"
                value={materiale}
                onChange={(e) => setMateriale(e.target.value)}
                className="p-3 border rounded bg-gray-700 w-full"
              >
                <option value="">Seleziona un materiale</option>
                <option value="alluminio">Alluminio</option>
                <option value="pvc">PVC</option>
              </select>
              <label htmlFor="accessori" className="block text-sm font-medium mb-1" style={{ marginTop: '54px', marginRight: '10px' }}>
                Accessori
              </label>
              <select
                id="accessori"
                value={accessori}
                onChange={(e) => setAccessori(e.target.value)}
                className="p-3 border rounded bg-gray-700 w-full"
              >
                <option value="">Seleziona un accessorio</option>
                <option value="persiana">Persiana</option>
                <option value="tapparella">Tapparella</option>
                <option value="tapparella motorizzata">Tapparella motorizzata</option>
              </select>
            </div>
            <div>
              <label htmlFor="nome" className="block text-sm font-medium mb-2">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={{ width: "250px" }}
                className="p-2 border rounded bg-gray-700 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="cognome" className="block text-sm font-medium mb-2">
                Cognome
              </label>
              <input
                type="text"
                id="cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                style={{ width: "250px" }}
                className="p-2 border rounded bg-gray-700 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Indirizzo e-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "250px" }}
                className="p-2 border rounded bg-gray-700 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium mb-2">
                Telefono
              </label>
              <input
                type="tel"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                style={{ width: "250px" }}
                className="p-2 border rounded bg-gray-700 w-full"
              />
            </div>
            <div>
              <label htmlFor="via" className="block text-sm font-medium mb-2">
                Via
              </label>
              <input
                type="text"
                id="via"
                value={via}
                onChange={(e) => setVia(e.target.value)}
                style={{ width: "250px" }}
                className="p-2 border rounded bg-gray-700 w-full"
              />
            </div>
            <div>
              <label htmlFor="città" className="block text-sm font-medium mb-2">
                Città
              </label>
              <input
                type="text"
                id="città"
                value={città}
                onChange={(e) => setCittà(e.target.value)}
                style={{ width: "250px" }}
                className="p-2 border rounded bg-gray-700 w-full"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-3"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
              />
              <label className="text-sm text-gray-400 whitespace-nowrap">
                Accetto i{' '}
                <a href="/termini e condizioni.pdf" className="text-blue-500">
                  termini e condizioni
                </a>{' '}
                e acconsento al trattamento
                <br />
                dei miei dati personali secondo la{' '}
                <a href="/normativa privacy.pdf" className="text-blue-500">
                  normativa sulla privacy.
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
            >
              Richiedi Preventivo
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ModuloContatti;
