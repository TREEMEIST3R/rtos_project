import type React from "react";   
import "./App.css";

function App() {
  // ---- Power data (edit these numbers) ----
  const MAX_POWER = 2;      // watts
  const lampPower = 1.2;    // watts
  const phonePower = 0.4;   // watts

  // Clamp total
  const usedTotal = Math.min(lampPower + phonePower, MAX_POWER);

  // Percentages for bars (0–100%)
  const lampPercentOfMax = (lampPower / MAX_POWER) * 100;
  const phonePercentOfMax = (phonePower / MAX_POWER) * 100;

  // Pie chart percentages
  const lampShare = lampPower / MAX_POWER;
  const phoneShare = phonePower / MAX_POWER;
  // ❌ removed: const unusedShare = Math.max(0, 1 - lampShare - phoneShare);

  const lampPercent = lampShare * 100;
  const phonePercent = phoneShare * 100;

  // Inline style requires type
  const pieStyle: React.CSSProperties = {
    background: `conic-gradient(
      #f97316 0 ${lampPercent}%,
      #22c55e ${lampPercent}% ${lampPercent + phonePercent}%,
      #0f172a ${lampPercent + phonePercent}% 100%
    )`,
  };

  return (
    <div className="dashboard-root">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <h1>Smart Home Dashboard</h1>
          <p>Live power usage (max {MAX_POWER}W)</p>
        </header>

        <section className="section">
          <h2>Devices</h2>

          {/* Lamp */}
          <div className="device-row">
            <div className="device-info">
              <span className="device-name">Lamp</span>
              <span className="device-power">{lampPower.toFixed(2)} W</span>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill lamp"
                style={{ width: `${Math.min(lampPercentOfMax, 100)}%` }}
              />
            </div>
          </div>

          {/* Phone Charger */}
          <div className="device-row">
            <div className="device-info">
              <span className="device-name">Phone Charger</span>
              <span className="device-power">{phonePower.toFixed(2)} W</span>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill phone"
                style={{ width: `${Math.min(phonePercentOfMax, 100)}%` }}
              />
            </div>
          </div>
        </section>

        <section className="section pie-section">
          <div>
            <h2>Overall Usage</h2>
            <p className="overall-text">
              Using {usedTotal.toFixed(2)}W of {MAX_POWER}W
            </p>

            <ul className="legend">
              <li>
                <span className="legend-dot lamp-dot" />
                Lamp ({lampPower.toFixed(2)}W)
              </li>
              <li>
                <span className="legend-dot phone-dot" />
                Phone ({phonePower.toFixed(2)}W)
              </li>
              <li>
                <span className="legend-dot unused-dot" />
                Unused ({(MAX_POWER - usedTotal).toFixed(2)}W)
              </li>
            </ul>
          </div>

          <div className="pie-wrapper">
            <div className="pie" style={pieStyle} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
