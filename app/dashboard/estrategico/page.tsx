"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const DashboardEstrategico: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [costsData, setCostsData] = useState([
    { value: 3000, name: 'Hardware' },
    { value: 1200, name: 'Licenças' },
    { value: 800, name: 'Manutenção' },
    { value: 500, name: 'Serviços em Nuvem' },
  ]);
  const [efficiencyData, setEfficiencyData] = useState([
    { name: 'Servidores Utilizados', value: 85 },
    { name: 'Servidores Ociosos', value: 15 },
  ]);
  const [trendData, setTrendData] = useState<number[]>([]);
  const [timeData, setTimeData] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTrend = Math.round(Math.random() * 100);

      setTrendData((prev) => {
        const updated = [...prev, newTrend];
        return updated.length > 10 ? updated.slice(1) : updated;
      });

      setTimeData((prev) => {
        const now = new Date().toLocaleTimeString();
        const updated = [...prev, now];
        return updated.length > 10 ? updated.slice(1) : updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const theme = darkMode ? 'dark' : 'light';

  const costsPieOption = {
    title: { text: 'Custos da Infraestrutura' },
    tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
    series: [
      {
        name: 'Custos',
        type: 'pie',
        radius: '50%',
        data: costsData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const efficiencyBarOption = {
    title: { text: 'Eficiência Operacional' },
    xAxis: { type: 'category', data: ['Servidores Utilizados', 'Servidores Ociosos'] },
    yAxis: { type: 'value', max: 100 },
    series: [
      {
        name: 'Eficiência',
        type: 'bar',
        data: efficiencyData.map((item) => item.value),
        itemStyle: {
          color: darkMode ? '#bb86fc' : '#6200ee',
        },
      },
    ],
  };

  const trendsLineOption = {
    title: { text: 'Tendências de Performance' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: timeData },
    yAxis: { type: 'value', min: 0, max: 100 },
    series: [
      {
        name: 'Performance',
        type: 'line',
        data: trendData,
        smooth: true,
        itemStyle: {
          color: darkMode ? '#03dac5' : '#03a9f4',
        },
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
        <h1 style={{ textAlign: 'center' }}>Dashboard Estratégico - Eficiência e Custos</h1>
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
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          <div style={{ flex: '1 1 400px', maxWidth: '45%', height: 300 }}>
            <ReactECharts
              option={costsPieOption}
              theme={theme}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          <div style={{ flex: '1 1 400px', maxWidth: '45%', height: 300 }}>
            <ReactECharts
              option={efficiencyBarOption}
              theme={theme}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          <div style={{ flex: '1 1 600px', maxWidth: '100%', height: 400 }}>
            <ReactECharts
              option={trendsLineOption}
              theme={theme}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEstrategico;
