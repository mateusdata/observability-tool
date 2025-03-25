"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [memoryUsage, setMemoryUsage] = useState<number>(0);
  const [timeData, setTimeData] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<number[]>([]);
  const [totalCpu, setTotalCpu] = useState<number>(8); // Total de CPUs (exemplo)
  const [totalMemory, setTotalMemory] = useState<number>(16); // Total de memória RAM em GB (exemplo)

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpuUsage = Math.round(Math.random() * 100);
      const newMemoryUsage = Math.round(Math.random() * 100);
      setCpuUsage(newCpuUsage);
      setMemoryUsage(newMemoryUsage);

      const now = new Date().toLocaleTimeString();
      setTimeData((prev) => {
        const updated = [...prev, now];
        return updated.length > 10 ? updated.slice(1) : updated;
      });
      setResponseData((prev) => {
        const newResponse = Math.round(Math.random() * 300);
        const updated = [...prev, newResponse];
        return updated.length > 10 ? updated.slice(1) : updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const theme = darkMode ? 'dark' : 'light';

  const gaugeOptionCpu = {
    tooltip: { formatter: '{a} <br/>{b} : {c}%' },
    series: [
      {
        name: 'Uso de CPU',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: cpuUsage, name: 'CPU' }],
      },
    ],
  };

  const gaugeOptionMemory = {
    tooltip: { formatter: '{a} <br/>{b} : {c}%' },
    series: [
      {
        name: 'Uso de Memória',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: memoryUsage, name: 'Memória' }],
      },
    ],
  };

  const lineChartOption = {
    title: { text: 'Tempo de Resposta do Servidor (ms)' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: timeData },
    yAxis: { type: 'value', min: 0, max: 500 },
    series: [
      {
        name: 'Tempo de Resposta',
        type: 'line',
        data: responseData,
        smooth: true,
      },
    ],
  };

  return (
    <div
      style={{
        padding: '1rem',
        backgroundColor: darkMode ? '#121212' : '#ffffff',
        color: darkMode ? '#ffffff' : '#000000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          border: `4px solid ${darkMode ? '#bb86fc' : '#6200ee'}`,
          borderRadius: '15px',
          padding: '1rem',
          boxShadow: darkMode
            ? '0 4px 10px rgba(187, 134, 252, 0.5)'
            : '0 4px 10px rgba(98, 0, 238, 0.5)',
          width: '100%',
          maxWidth: '1920px',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Dashboard Operacional - Observabilidade</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <h2>Total de CPUs: {totalCpu}</h2>
          </div>
          <div>
            <h2>Total de RAM: {totalMemory} GB</h2>
          </div>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            display: 'block',
            margin: '1rem auto',
            padding: '0.5rem 1rem',
            backgroundColor: darkMode ? '#bb86fc' : '#6200ee',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Alternar para {darkMode ? 'Modo Claro' : 'Modo Escuro'}
        </button>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          <div style={{ flex: '1 1 400px', maxWidth: '45%', height: 300 }}>
            <ReactECharts
              option={gaugeOptionCpu}
              theme={theme}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          <div style={{ flex: '1 1 400px', maxWidth: '45%', height: 300 }}>
            <ReactECharts
              option={gaugeOptionMemory}
              theme={theme}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>
        <div style={{ marginTop: '3rem', width: '100%' }}>
          <ReactECharts
            option={lineChartOption}
            theme={theme}
            style={{ height: 400, width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
