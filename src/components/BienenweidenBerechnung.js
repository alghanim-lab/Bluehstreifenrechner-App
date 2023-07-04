import React, { useState } from 'react';
import './bienenweide.css';
import userEvent from '@testing-library/user-event';

const BienenweideBerechnung = () => {
  const [aussaatFläche, setAussaatFläche] = useState(0);
  const [ausgewähltePflanzenart, setAusgewähltePflanzenart] = useState('');
  const [co2InDerStadt, setCo2InDerStadt]= useState(0);
  const [ergebnis, setErgebnis] = useState(null);


  const pflanzenarten = [
    { name: 'Buchweizen', saatgutProQuadratmeter: 7, saatzeitpunkt:'Ab mitte Mai', bluetezeit:'Mitte Juni bis Ende Septemper' ,vegetationszeit: 75 },
    { name: 'Sonnenblume', saatgutProQuadratmeter: 2.5, saatzeitpunkt:'Ab April (im Beet) | Ab mitte Mai (in Töpfen)', bluetezeit:'Juni bis Mitte Septemper' , vegetationszeit: 105},
    { name: 'Kornblume', saatgutProQuadratmeter: 1.5,  saatzeitpunkt:'Maerz bis Abril',  bluetezeit:'Ende Juni bis Ende Oktober', vegetationszeit: 120},
    { name: 'Raps', saatgutProQuadratmeter: 1.25,  saatzeitpunkt:'Mitte August bis Anfang Septemper',   bluetezeit:'Anfang Mai bis Ende Septemper', vegetationszeit: 150},
    { name: 'Gelbsenf', saatgutProQuadratmeter: 2,  saatzeitpunkt:'Ab April',   bluetezeit:'Anfang Juni bis Mitte Oktober', vegetationszeit: 135},
    { name: 'Bienenweide - Phacelia', saatgutProQuadratmeter: 1.3,  saatzeitpunkt:'Ab Mitte April im Hauptfruchtanbau und bis Mitte September im Zwischenfruchtanbau',  bluetezeit:'Anfang Mai bis Ende Oktober',  vegetationszeit: 180 },
    { name: 'Klatschmohn', saatgutProQuadratmeter: 0.5,  saatzeitpunkt:'Maers bis April',  bluetezeit:'Anfang Mai bis Ende Juli',  vegetationszeit: 60},
    { name: 'Cephalaria transsylvanica', saatgutProQuadratmeter: 3,  saatzeitpunkt:'Mitte November',  bluetezeit:'Juni bis August',  vegetationszeit: 60}
  ];



  const berechneBienenweide = () => {
    const ausgewähltePflanze = pflanzenarten.find(
      (pflanze) => pflanze.name === ausgewähltePflanzenart
    );

    if (ausgewähltePflanze) {
      const benötigteMenge = aussaatFläche * ausgewähltePflanze.saatgutProQuadratmeter;
      const gesamtAnzahlBienenProQm = aussaatFläche * 32.62; // Bienen pro Quadratmeter
      const vegetationszeitInMonaten = ausgewähltePflanze.vegetationszeit / 30; // Umwandlung der Vegetationszeit in Monate
      const co2Bindung = aussaatFläche/10000 * 0.48*1000; // Co2 pro hektar umrechenen * Megagramm in Kg umrechnen
      const gesamterZeitraum = vegetationszeitInMonaten.toFixed(1);
      const nahrungFürBienen = gesamtAnzahlBienenProQm * aussaatFläche * ausgewähltePflanze.vegetationszeit;
      const saatzeitpunkt = ausgewähltePflanze.saatzeitpunkt;
      const bluetezeit = ausgewähltePflanze.bluetezeit;
      const positiverBeitrag = co2InDerStadt - (co2Bindung/1000000000); // umrechnen in Millionen Tonnen 
      return { benötigteMenge, gesamtAnzahlBienenProQm, gesamterZeitraum, nahrungFürBienen, co2Bindung,saatzeitpunkt, bluetezeit, positiverBeitrag };
    }

    return {
      benötigteMenge: 0,
      gesamtAnzahlBienenProQm: 0,
      gesamterZeitraum: 0,
      nahrungFürBienen: 0,
      co2Bindung: 0,
      saatzeitpunkt: '',
      bluetezeit: '',
      positiverBeitrag: ''
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { benötigteMenge, gesamtAnzahlBienenProQm, gesamterZeitraum, nahrungFürBienen, co2Bindung,saatzeitpunkt,bluetezeit, positiverBeitrag } =
      berechneBienenweide();
    // alert(
    //   `Die benötigte Saatgutmenge beträgt ${benötigteMenge} Gramm.\nDie Fläche der Bienenweide bietet Nahrung für insgesamt ${gesamtAnzahlBienen} Bienen über einen Zeitraum von ${gesamterZeitraum} Monaten. Insgesamt wird genug Nahrung für ${nahrungFürBienen} Bienen bereitgestellt.\nDie Bienenweide bindet während der Vegetationszeit ${co2Bindung} kg CO2.\nDer positive Beitrag zur Verbesserung des Stadtklimas: ${positiverBeitrag}`
    // );

    // Anzeige der Ergebnisse in einer Tabelle
    const ergebnisHTML = (
      <div>
        <h2>Ergebnis</h2>
        <table className="bienenweide-table">
          <tbody>
            <tr>
              <th>Benötigte Saatgutmenge (Gramm)</th>
              <td>{benötigteMenge}</td>
            </tr>
            <tr>
              <th>Aussatzeitpunkt</th>
              <td>{saatzeitpunkt}</td>
            </tr>
            <tr>
              <th>Fläche bietet Nahrung für Bienen pro Tag</th>
              <td>{gesamtAnzahlBienenProQm}</td>
            </tr>
            <tr>
              <th> Vegetationszeit </th>
              <td>{bluetezeit}</td>
            </tr>
            <tr>
              <th> Gesamter Zeitraum (Monate)</th>
              <td>{gesamterZeitraum}</td>
            </tr>
            <tr>
              <th>Nahrung für Bienen über die Vegatationzeit</th>
              <td>{nahrungFürBienen}</td>
            </tr>
            <tr>
              <th>CO2-Bindung (in KG)</th>
              <td>{co2Bindung}</td>
            </tr>
            <tr>
              <th>Positiver Beitrag (CO2 übrig in Millionen Tonnen)</th>
              <td>{positiverBeitrag}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    setErgebnis(ergebnisHTML);
  };

  return (
    <div>
      <h2>Blühstreifenrechner App</h2>
      <form >
        <label htmlFor="aussaatFläche">Aussaatfläche der Bienenweide (in Quadratmetern):</label>
        <input
          type="number"
          id="aussaatFläche"
          value={aussaatFläche}
          onChange={(e) => setAussaatFläche(parseFloat(e.target.value))}
          required
        />

        <label htmlFor="ausgewähltePflanzenart">Gewünschte Pflanzenart:</label>
        <select
          id="ausgewähltePflanzenart"
          value={ausgewähltePflanzenart}
          onChange={(e) => setAusgewähltePflanzenart(e.target.value)}
          required
        >
          <option value="">Bitte wählen</option>
          {pflanzenarten.map((pflanze, index) => (
            <option key={index} value={pflanze.name}>
              {pflanze.name}
            </option>
          ))}
        </select>

        <label htmlFor='co2InDerStadt'>CO2-Emissionen in Millionen Tonnen Ihrer Stadt:</label>
        <input
        type="number"
        id="co2InDerStadt"
        value={co2InDerStadt}
        onChange={(e)=> setCo2InDerStadt(e.target.value)}
        required
        ></input>

        <button type="button" onClick={handleSubmit}>
          Berechnen
        </button>  
     </form>
     {ergebnis && ergebnis}

    </div>
  );
};

export default BienenweideBerechnung;
