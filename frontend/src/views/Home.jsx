// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Building2, TrendingUp } from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Active Jobs", value: "12,847", icon: TrendingUp },
    { label: "Companies", value: "2,156", icon: Building2 },
    { label: "Job Seekers", value: "45,231", icon: Users },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1e40af', color: 'white', padding: '2rem' }}>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3730a3 100%)',
        color: 'white',
        padding: '5rem 0',
        borderRadius: '8px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            {/* Left side - Text content */}
            <div style={{ textAlign: 'left', maxWidth: '32rem' }}>
              {/* Logo */}
              <div style={{ marginBottom: '2rem' }}>
                <Link to="/">
                  <img 
                    src="/LINXLogo.webp" 
                    alt="LINX Logo" 
                    width="64"
                    height="64"
                    style={{ width: '64px', height: '64px' }}
                  />
                </Link>
              </div>

              <h1 style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem', 
                lineHeight: '1.2'
              }}>
                Welcome to <span style={{ color: '#fbbf24' }}>LINX</span>
              </h1>

              <p style={{ 
                fontSize: '1.25rem', 
                marginBottom: '2rem', 
                color: '#dbeafe',
                lineHeight: '1.5'
              }}>
                Connect. Hire. Grow. The portal that links talent to
                opportunity.
              </p>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <Link
                  to="/register"
                  style={{ 
                    backgroundColor: 'white',
                    color: '#2563eb',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Get Started
                  <ArrowRight style={{ marginLeft: '0.5rem', width: '20px', height: '20px' }} />
                </Link>
                <Link
                  to="/jobs"
                  style={{ 
                    border: '2px solid white',
                    color: 'white',
                    backgroundColor: 'transparent',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  Browse Jobs
                </Link>
              </div>
            </div>

            {/* Right side - Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 1fr', 
              gap: '1.5rem'
            }}>
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(4px)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <Icon style={{ 
                      width: '32px', 
                      height: '32px', 
                      margin: '0 auto 0.75rem', 
                      color: '#fbbf24',
                      display: 'block'
                    }} />
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      {stat.value}
                    </div>
                    <div style={{ color: '#dbeafe', fontSize: '0.875rem' }}>
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
