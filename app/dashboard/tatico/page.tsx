"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const DashboardTatico: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [timeData, setTimeData] = useState<string[]>([]);
  const [cpuTrend, setCpuTrend] = useState<number[]>([]);
  const [memoryTrend, setMemoryTrend] = useState<number[]>([]);
  const [servicesData, setServicesData] = useState<number[]>([30, 40, 20, 10]); // Exemplo de uso por serviço
  const [categoriesData, setCategoriesData] = useState([
    { value: 45, name: 'Banco de Dados' },
    { value: 25, name: 'Frontend' },
    { value: 30, name: 'Backend' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpuTrend = Math.round(Math.random() * 100);
      const newMemoryTrend = Math.round(Math.random() * 100);

      setTimeData((prev) => {
        const now = new Date().toLocaleTimeString();
        const updated = [...prev, now];
        return updated.length > 10 ? updated.slice(1) : updated;
      });
      setCpuTrend((prev) => {
        const updated = [...prev, newCpuTrend];
        return updated.length > 10 ? updated.slice(1) : updated;
      });
      setMemoryTrend((prev) => {
        const updated = [...prev, newMemoryTrend];
        return updated.length > 10 ? updated.slice(1) : updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const theme = darkMode ? 'dark' : 'light';

  const trendChartOption = {
    title: { text: 'Tendências de Uso de CPU e Memória' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: timeData },
    yAxis: { type: 'value', min: 0, max: 100 },
    series: [
      {
        name: 'CPU',
        type: 'line',
        data: cpuTrend,
        smooth: true,
        itemStyle: {
          color: darkMode ? '#bb86fc' : '#6200ee',
        },
      },
      {
        name: 'Memória',
        type: 'line',
        data: memoryTrend,
        smooth: true,
        itemStyle: {
          color: darkMode ? '#03dac5' : '#03a9f4',
        },
      },
    ],
  };

  const serviceUsageOption = {
    title: { text: 'Uso de Recursos por Serviço' },
    xAxis: { type: 'category', data: ['Service A', 'Service B', 'Service C', 'Service D'] },
    yAxis: { type: 'value', min: 0, max: 100 },
    series: [
      {
        name: 'Uso de Serviço',
        type: 'bar',
        data: servicesData,
        itemStyle: {
          color: darkMode ? '#bb86fc' : '#6200ee',
        },
      },
    ],
  };

  const categoryPieOption = {
    title: { text: 'Consumo por Categoria' },
    tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
    series: [
      {
        name: 'Categorias',
        type: 'pie',
        radius: '50%',
        data: categoriesData,
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
        <h1 style={{ textAlign: 'center' }}>Dashboard Tático - Análise de Tendências</h1>
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
              option={trendChartOption}
              theme={theme}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          <div style={{ flex: '1 1 400px', maxWidth: '45%', height: 300 }}>
            <ReactECharts
              option={serviceUsageOption}
              theme={theme}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          <div style={{ flex: '1 1 600px', maxWidth: '100%', height: 400 }}>
            <ReactECharts
              option={categoryPieOption}
              theme={theme}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTatico;
