import React, { useState, useEffect } from 'react';
import {
  Server, Database, Activity, Shield, CheckCircle, XCircle, ArrowRight, Cpu, Wind,
} from 'lucide-react';
import { api } from '../services/api';
import KpiCard from '../components/KpiCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const StatusCard = ({ service, status, icon: Icon, delay = 0 }) => {
  const isUp = status === 'UP';
  return (
    <div className="health-card" style={{ animationDelay: `${delay}s` }}>
      <div className="health-card-label">
        <div className={`health-card-icon ${isUp ? 'healthy' : 'unhealthy'}`}>
          <Icon size={18} />
        </div>
        <span className="health-card-name">{service}</span>
      </div>
      <div className="health-card-status">
        <div className={`status-dot ${isUp ? 'up' : 'down'}`} />
        {isUp ? (
          <span className="badge badge-success"><CheckCircle size={11} /> UP</span>
        ) : (
          <span className="badge badge-danger"><XCircle size={11} /> DOWN</span>
        )}
      </div>
    </div>
  );
};

const HealthGauge = ({ score }) => {
  const circumference = 2 * Math.PI * 55;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <span className="card-title">Health Score</span>
      </div>
      <div className="gauge-container">
        <div className="gauge-ring">
          <svg width="130" height="130" viewBox="0 0 130 130">
            <circle className="gauge-ring-bg" cx="65" cy="65" r="55" />
            <circle
              className="gauge-ring-fill"
              cx="65"
              cy="65"
              r="55"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ stroke: score >= 80 ? 'var(--success)' : score >= 50 ? 'var(--warning)' : 'var(--danger)' }}
            />
          </svg>
          <div className="gauge-value">{score}%</div>
        </div>
        <span className="gauge-label">Overall System Health</span>
      </div>
    </div>
  );
};

const PipelineNode = ({ name, status }) => {
  const isUp = status === 'UP';
  return (
    <div className={`pipeline-node ${isUp ? 'healthy' : 'unhealthy'}`}>
      <span className="pipeline-node-name">{name}</span>
      <div className={`status-dot ${isUp ? 'up' : 'down'}`} />
    </div>
  );
};

const MonitoringDashboard = () => {
  const [health, setHealth] = useState(null);
  const [quality, setQuality] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [healthRes, qualityRes] = await Promise.all([
        api.getSystemHealth().catch(() => null),
        api.getDataQuality().catch(() => null),
      ]);
      if (healthRes) setHealth(healthRes);
      if (qualityRes) setQuality(qualityRes);
    } catch (error) {
      console.error('Error fetching monitoring data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingSkeleton type="kpi-row" count={5} />
        <LoadingSkeleton type="chart-row" count={2} />
      </div>
    );
  }

  const services = [
    { name: 'PostgreSQL', status: health?.postgres_status || 'DOWN', icon: Database },
    { name: 'Kafka Cluster', status: health?.kafka_status || 'DOWN', icon: Wind },
    { name: 'Spark Streaming', status: health?.spark_status || 'DOWN', icon: Cpu },
    { name: 'Airflow Scheduler', status: health?.airflow_status || 'DOWN', icon: Activity },
    { name: 'FastAPI Backend', status: health?.backend_status || 'DOWN', icon: Server },
  ];

  const pipelineSteps = [
    { name: 'Generator', status: 'UP' },
    { name: 'Kafka', status: health?.kafka_status || 'UP' },
    { name: 'Spark Streaming', status: health?.spark_status || 'UP' },
    { name: 'PostgreSQL', status: health?.postgres_status || 'UP' },
    { name: 'Airflow', status: health?.airflow_status || 'UP' },
    { name: 'FastAPI', status: health?.backend_status || 'UP' },
    { name: 'Dashboard', status: 'UP' },
  ];

  return (
    <div>
      {/* Breadcrumb + Title */}
      <div className="page-header">
        <div>
          <div className="page-breadcrumb">
            <a href="/">Dashboards</a> <span>→ Monitoring</span>
          </div>
          <h1 className="page-title">System Monitoring & Data Quality</h1>
        </div>
      </div>

      {/* Service Health + Gauge */}
      <div className="section-header">
        <span className="section-title">Service Health</span>
        <div className="section-line" />
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {services.map((s, i) => (
              <StatusCard
                key={s.name}
                service={s.name}
                status={s.status}
                icon={s.icon}
                delay={i * 0.06}
              />
            ))}
          </div>
        </div>
        <HealthGauge score={health?.health_score || 0} />
      </div>

      {/* Data Quality */}
      <div className="section-header">
        <span className="section-title">Data Quality Metrics</span>
        <div className="section-line" />
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        <KpiCard
          title="Total Processed"
          value={new Intl.NumberFormat('en-IN').format(quality?.total_orders || 0)}
          icon={Database}
          color="purple"
          style={{ animationDelay: '0.05s' }}
        />
        <KpiCard
          title="Null Customer IDs"
          value={quality?.null_customer_ids ?? '-'}
          icon={Shield}
          color={quality?.null_customer_ids > 0 ? 'red' : 'success'}
          style={{ animationDelay: '0.1s' }}
        />
        <KpiCard
          title="Null Product IDs"
          value={quality?.null_product_ids ?? '-'}
          icon={Shield}
          color={quality?.null_product_ids > 0 ? 'red' : 'success'}
          style={{ animationDelay: '0.15s' }}
        />
        <KpiCard
          title="Negative Revenue"
          value={quality?.negative_revenue_rows ?? '-'}
          icon={Activity}
          color={quality?.negative_revenue_rows > 0 ? 'amber' : 'success'}
          style={{ animationDelay: '0.2s' }}
        />
        <KpiCard
          title="Negative Profit"
          value={quality?.negative_profit_rows ?? '-'}
          icon={Activity}
          color={quality?.negative_profit_rows > 0 ? 'amber' : 'success'}
          style={{ animationDelay: '0.25s' }}
        />
      </div>

      {/* Pipeline */}
      <div className="section-header">
        <span className="section-title">Real-Time Pipeline</span>
        <div className="section-line" />
      </div>

      <div className="pipeline-container">
        <div className="pipeline-flow">
          {pipelineSteps.map((step, i) => (
            <React.Fragment key={step.name}>
              <PipelineNode name={step.name} status={step.status} />
              {i < pipelineSteps.length - 1 && (
                <ArrowRight className="pipeline-arrow" size={18} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;
